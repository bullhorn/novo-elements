// NG2
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, inject, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import { ReplaySubject } from 'rxjs';
import { ComponentUtils, NovoLabelService } from 'novo-elements/services';
import { Helpers, Key } from 'novo-elements/utils';
import { NovoPickerElement } from 'novo-elements/elements/picker';

// Value accessor for the component (supports ngModel)
const CHIPS_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoChipsElement),
  multi: true,
};

@Component({
  selector: 'chips,novo-chips',
  providers: [CHIPS_VALUE_ACCESSOR],
  template: `
    <div class="novo-chip-container">
      <novo-chip
        *ngFor="let item of _items | async | slice: 0:hiddenChipsLimit"
        [class.selected]="item == selected"
        [selectable]="true"
        [disabled]="disablePickerInput"
        (removed)="remove($event, item)"
        (selectionChange)="select($event, item)"
        (deselect)="deselect($event, item)"
      >
        <novo-icon *ngIf="item | avatarType:type as avatarType" class="txc-{{ avatarType }}" novoChipAvatar>circle</novo-icon>
        <span class="chip-label">{{ item.label }}</span>
        <novo-icon *ngIf="!disablePickerInput" novoChipRemove>x</novo-icon>
      </novo-chip>
      <div *ngIf="hiddenChipsCount" class="hidden-chips-toggle" (click)="toggleHiddenChips()">
        <novo-label *ngIf="hiddenChipsLimit !== CHIPS_SHOWN_MAX" color="positive">+ {{ hiddenChipsCount }} {{ labels.more }} </novo-label>
        <novo-label *ngIf="hiddenChipsLimit === CHIPS_SHOWN_MAX" color="positive"><novo-icon>sort-asc</novo-icon> {{labels.showLess}}</novo-label>
      </div>
      <div class="chip-input-container" *ngIf="!maxlength || (maxlength && items.length < maxlength)">
        <novo-picker
          #picker
          clearValueOnSelect="true"
          [closeOnSelect]="closeOnSelect"
          [config]="source"
          [disablePickerInput]="disablePickerInput"
          [placeholder]="placeholder"
          [(ngModel)]="itemToAdd"
          (select)="add($event)"
          (keydown)="onKeyDown($event)"
          (focus)="onFocus($event)"
          (typing)="onTyping($event)"
          (blur)="onTouched($event)"
          [selected]="items"
          [overrideElement]="overrideElement || element"
          [allowCustomValues]="allowCustomValues"
        >
          <ng-content/>
        </novo-picker>
      </div>
    </div>
    <div class="preview-container">
      <span #preview></span>
    </div>
    <i class="bhi-search" [class.has-value]="items.length" *ngIf="!disablePickerInput"></i>
    <label class="clear-all" *ngIf="items.length && !disablePickerInput" (click)="clearValue()"
      >{{ labels.clearAll }} <i class="bhi-times"></i
    ></label>
  `,
  styleUrls: ['./Chips.scss'],
  host: {
    '[class.with-value]': 'items.length > 0',
    '[class.disabled]': 'disablePickerInput',
  },
})
export class NovoChipsElement implements OnInit, ControlValueAccessor {
  readonly CHIPS_SHOWN_MAX = 999;
  @Input()
  closeOnSelect: boolean = false;
  @Input()
  placeholder: string = '';
  @Input()
  source: any;
  @Input()
  maxlength: any;
  @Input()
  type: any;
  @Input()
  allowCustomValues = false;
  @Input()
  set disablePickerInput(v: boolean) {
    this._disablePickerInput = coerceBooleanProperty(v);
  }
  get disablePickerInput() {
    return this._disablePickerInput;
  }
  private _disablePickerInput: boolean = false;
  @Input()
  overrideElement: ElementRef;

  @Output()
  changed: EventEmitter<any> = new EventEmitter();
  @Output()
  focus: EventEmitter<any> = new EventEmitter();
  @Output()
  blur: EventEmitter<any> = new EventEmitter();
  @Output()
  typing: EventEmitter<any> = new EventEmitter();

  @ViewChild('preview', { read: ViewContainerRef })
  preview: ViewContainerRef;

  @ViewChild('picker', { static: false })
  picker: NovoPickerElement;

  items: any[] = [];
  selected: any = null;
  config: any = {};
  model: any;
  itemToAdd: any;
  popup: any;
  hiddenChipsLimit: number;
  hiddenChipsCount: number;
  // private data model
  _value: any = '';
  _items = new ReplaySubject<any[]>(1);
  _hiddenChipsLimit: number;
  // Placeholders for the callbacks
  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  changeRef = inject(ChangeDetectorRef);

  constructor(public element: ElementRef, private componentUtils: ComponentUtils, public labels: NovoLabelService) {}

  ngOnInit() {
    this.hiddenChipsLimit = this.source.hiddenChipsLimit;
    this._hiddenChipsLimit = this.hiddenChipsLimit; // copy of original chip limit
    this.setItems();
  }

  get value() {
    return this._value;
  }

  @Input()
  set value(selected) {
    this.itemToAdd = '';
    this._value = selected;
  }

  clearValue() {
    this.items = [];
    this.updateHiddenChips();
    this._items.next(this.items);
    this.value = null;
    this._propagateChanges();
  }

  setItems() {
    this.items = [];
    if (this.model && Array.isArray(this.model)) {
      const noLabels = [];
      for (const value of this.model) {
        let label;
        if (this.source && this.source.format && Helpers.validateInterpolationProps(this.source.format, value)) {
          label = Helpers.interpolate(this.source.format, value);
        }
        if (this.source && label && label !== this.source.format) {
          this.items.push({
            value,
            label,
          });
        } else if (this.source.getLabels && typeof this.source.getLabels === 'function') {
          noLabels.push(value);
        } else if (this.source.options && Array.isArray(this.source.options)) {
          this.items.push(this.getLabelFromOptions(value));
        } else if (this.source.categoryMap && this.source.categoryMap.size) {
          this.items.push(value);
        } else {
          this.items.push({
            value,
            label: value,
          });
        }
      }
      if (noLabels.length > 0 && this.source && this.source.getLabels && typeof this.source.getLabels === 'function') {
        this.source.getLabels(noLabels).then((result) => {
          for (const value of result) {
            if (value.hasOwnProperty('label')) {
              this.items.push({
                value,
                label: value.label,
              });
            } else if (this.source.options && Array.isArray(this.source.options)) {
              this.items.push(this.getLabelFromOptions(value));
            } else {
              this.items.push(value);
            }
          }
          this.updateHiddenChips();
          this._finalizeItemValue();
          this._updateOverlay();
        });
      }
    }
    this.updateHiddenChips();
    this._finalizeItemValue();
  }

  getLabelFromOptions(value) {
    let id = value;
    let optLabel = this.source.options.find((val) => val.value === value);
    if (!optLabel && value.hasOwnProperty('id')) {
      optLabel = this.source.options.find((val) => val.value === value.id);
      id = value.id;
    }
    return {
      value: id,
      label: optLabel ? optLabel.label : value,
    };
  }

  deselectAll(event?) {
    this.selected = null;
    this.hidePreview();
  }

  select(event?, item?) {
    this.blur.emit(event);
    this.deselectAll();
    this.selected = item;
    this.showPreview();
  }

  deselect(event?, item?) {
    this.blur.emit(event);
    this.deselectAll();
  }

  onTyping(event?) {
    this.typing.emit(event);
  }

  onFocus(event?) {
    this.deselectAll();
    this.element.nativeElement.classList.add('selected');
    this.focus.emit(event);
  }

  add(event) {
    if (event && !(event instanceof Event)) {
      this.items.push(event);
      this.updateHiddenChips();
      this.value = this.source && this.source.valueFormatter ? this.source.valueFormatter(this.items) : this.items.map((i) => i.value);
      // Set focus on the picker
      const input = this.element.nativeElement.querySelector('novo-picker > input');
      if (input) {
        input.focus();
      }
    }
    this._items.next(this.items);
    this._propagateChanges();
  }

  updateHiddenChips() {
    this.hiddenChipsCount = Math.max(0, this.items.length - this._hiddenChipsLimit);
    if (!this.hiddenChipsCount && this.hiddenChipsLimit === this.CHIPS_SHOWN_MAX)
      this.hiddenChipsLimit = this._hiddenChipsLimit; // reset hiddenChipsLimit to original #
  }

  toggleHiddenChips() {
    this.hiddenChipsLimit = this.hiddenChipsLimit === this.CHIPS_SHOWN_MAX ? this._hiddenChipsLimit : this.CHIPS_SHOWN_MAX;
  }

  remove(event, item) {
    this.items.splice(this.items.indexOf(item), 1);
    this.updateHiddenChips();
    this.deselectAll();
    this.value = this.source && this.source.valueFormatter ? this.source.valueFormatter(this.items) : this.items.map((i) => i.value);
    this._items.next(this.items);
    this._propagateChanges();
  }

  onKeyDown(event) {
    if (event.key === Key.Backspace) {
      if (event.target && event.target.value.length === 0 && this.items.length) {
        if (event) {
          event.stopPropagation();
          event.preventDefault();
        }
        if (this.selected) {
          this.remove(event, this.selected);
        } else {
          this.select(event, this.items[this.items.length - 1]);
        }
      }
    }
  }

  // Set touched on blur
  onTouched(e) {
    this.element.nativeElement.classList.remove('selected');
    this.onModelTouched();
    this.blur.emit(e);
  }

  writeValue(model: any): void {
    this.model = model;
    this.setItems();
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this._disablePickerInput = disabled;
  }

  private _finalizeItemValue(): void {
    this._items.next(this.items);
    const valueToSet = this.source && this.source.valueFormatter ? this.source.valueFormatter(this.items) : this.items.map((i) => i.value);
    if (Helpers.isBlank(this.value) !== Helpers.isBlank(valueToSet) || JSON.stringify(this.value) !== JSON.stringify(valueToSet)) {
      this.value = valueToSet;
    }
  }

  /** Emits change event to set the model value. */
  private _propagateChanges(fallbackValue?: any): void {
    this.changed.emit({ value: this.value?.length ? this.value : '', rawValue: this.items });
    this.onModelChange(this.value);
    this._updateOverlay();    
  }

  private _updateOverlay() {
    if (this.picker?.container?.overlayRef) {
      setTimeout(() => {
        this.picker.container.overlayRef.updatePosition();
        this.picker.popup.instance.selected = this.picker.selected;
        this.changeRef.detectChanges();
      });
    }
  }

  /**
   * @name showPreview
   *
   * @description This method creates an instance of the preview (called popup) and adds all the bindings to that
   * instance. Will reuse the popup or create a new one if it does not already exist. Will only work if there is
   * a previewTemplate given in the config.
   */
  showPreview() {
    if (this.source.previewTemplate) {
      if (!this.popup) {
        this.popup = this.componentUtils.append(this.source.previewTemplate, this.preview);
      }
      this.popup.instance.match = { data: this.selected.data ?? this.selected.value };
    }
  }

  /**
   * @name hidePreview
   *
   * @description - This method deletes the preview popup from the DOM.
   */
  hidePreview() {
    if (this.popup) {
      this.popup.destroy();
      this.popup = null;
    }
  }
}
