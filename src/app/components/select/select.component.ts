import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output
} from '@angular/core';
import {Option} from "../../models/option.interface";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {isFunction} from "../../utils/helper.util";
import {DOCUMENT, NgForOf, NgIf} from "@angular/common";
import {VISIBLE_ITEMS_COUNT} from "../../tokens/tokens";
import {SearchComponent} from "./search/search.component";
import {OptionsComponent} from "./options/options.component";
import {first, fromEvent} from "rxjs";

@Component({
  selector: 'ghg-select',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    SearchComponent,
    OptionsComponent
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements ControlValueAccessor {
  @Input({required: true})
  set items(values: Option[]) {
    this._items = values;
    this.filteredItems = values;
    this.isSearchable = values.length > 4;
  }

  @Input() visibleItemsCount: number = inject(VISIBLE_ITEMS_COUNT);
  @Input() placeholder = '---Select---';
  @Input() value: number | null = null;

  @Output() valueChange = new EventEmitter<number | null>;
  @Output() searchValueChanged = new EventEmitter<string>;

  private _onChange?: (value: number | null) => void;
  private _onTouched?: () => void;

  private _items!: Option[];

  filteredItems!: Option[];
  isOpen = false;
  selectedItem: string = '';
  isSearchable!: boolean;
  touched = false;

  private readonly _document = inject(DOCUMENT);
  private readonly _cdRef = inject(ChangeDetectorRef);

  registerOnChange(fn: (value: number | null) => void): void {
    if (!isFunction(fn)) {
      return;
    }
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    if (!isFunction(fn)) {
      return;
    }
    this._onTouched = fn;
  }

  writeValue(value: number): void {
    this.value = value;
    if (value) {
      this.selectedItem = this._items.find(item => item.id === value)?.name || '';
    }
  }

  selectOption(option: Option | null): void {
    this.selectedItem = option?.name || '';
    this.value = option?.id || null;
    this.valueChange.emit(this.value);
    this._onChange && this._onChange(this.value);
  }

  toggleDropdown(): void {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    this.filteredItems = this._items;
    setTimeout(() =>
      fromEvent(this._document, 'click')
        .pipe(first())
        .subscribe(() => {
          this.close();
          this._cdRef.detectChanges();
        })
    );
  }

  private close(): void {
    this.isOpen = false;
    this.markTouched();
  }

  reset(event: MouseEvent): void {
    event.stopPropagation();
    this.selectOption(null);
    this.filteredItems = this._items;
    this.close();
  }

  private markTouched(): void {
    if (!this.touched) {
      this.touched = true;
      this._onTouched && this._onTouched();
    }
  }

  filterItems(text: string): void {
    text = text.toLowerCase();
    this.filteredItems = this._items.filter(item => item.name.toLowerCase().includes(text));
    this.searchValueChanged.emit(text);
  }
}
