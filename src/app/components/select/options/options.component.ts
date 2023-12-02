import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy, Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {NgForOf, NgTemplateOutlet} from "@angular/common";
import {animationFrameScheduler, fromEvent, observeOn, Subject, takeUntil, tap} from "rxjs";
import {Option} from "../../../models/option.interface";
import {trackById} from "../../../utils/helper.util";

@Component({
  selector: 'ghg-options',
  standalone: true,
  imports: [
    NgForOf,
    NgTemplateOutlet
  ],
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionsComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input({required: true}) items!: Option[];
  @Input({required: true}) visibleNodeCount!: number;
  @Input() renderBufferCount: number = 3;
  @Input() itemHeightPx = 40;

  @ViewChild("viewPort") viewPort!: ElementRef;
  @ViewChild("viewPortItems") viewPortItems!: ElementRef;
  @ViewChild("container") container!: ElementRef;

  @Output() onSelect = new EventEmitter<Option>();

  itemsForView: Option[] = [];
  private readonly _destroy$ = new Subject<void>();
  private readonly renderer = inject(Renderer2);
  private readonly cdRef = inject(ChangeDetectorRef);

  private inited = false;

  readonly trackById = trackById<Option>;

  ngOnChanges(): void {
    if (this.inited) {
      this.ngAfterViewInit();
    }
  }

  ngAfterViewInit(): void {
    this._destroy$.next();
    this.renderer.setStyle(this.viewPort.nativeElement, "maxHeight", this.visibleNodeCount * this.itemHeightPx + "px");
    this.renderer.setStyle(this.container.nativeElement, "height", this.items.length * this.itemHeightPx + "px");
    this.transform(this.viewPort.nativeElement.scrollTop);
    this.inited = true;

    fromEvent(this.viewPort.nativeElement, "scroll").pipe(
      observeOn(animationFrameScheduler),
      tap((event: any) => this.transform(event.target.scrollTop)),
      takeUntil(this._destroy$)
    ).subscribe();
  }

  transform(scrollTop: number): void {
    const startNode = Math.max(0, Math.floor(scrollTop / this.itemHeightPx) - this.renderBufferCount);
    const visibleNodeCount = Math.min(this.items.length - startNode, this.visibleNodeCount);
    this.renderer.setStyle(this.viewPortItems.nativeElement, "transform", `translateY(${startNode * this.itemHeightPx}px)`);
    this.itemsForView = this.items.slice(startNode, startNode + visibleNodeCount + this.renderBufferCount + 1);
    this.cdRef.detectChanges();
  }

  selectOption(option: Option): void {
    this.onSelect.next(option);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
