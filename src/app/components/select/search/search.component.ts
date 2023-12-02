import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output,} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from "rxjs";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'ghg-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
  get value(): string {
    return this._value;
  }

  @Input()
  set value(value: string) {
    this._value = value;
    this.setValue();
  }

  private _value: string = '';

  @Input({required: true}) placeholder!: string;

  @Output() onSearch = new EventEmitter<string>();

  search = new FormControl<string>('');
  private readonly _destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      takeUntil(this._destroy$)
    ).subscribe(text => this.onSearch.emit(text as string));
  }

  setValue(): void {
    this.search.setValue(this._value, {emitEvent: false});
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
