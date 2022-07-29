// NG2
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import { ReplaySubject } from 'rxjs';
import { NovoLabelService } from '../../services/novo-label-service';
import { Key } from '../../utils';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import { Helpers } from '../../utils/Helpers';

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
        *ngFor="let item of _items | async"
        [class.selected]="item == selected"
        [selectable]="true"
        [disabled]="disablePickerInput"
        (removed)="remove($event, item)"
        (selectionChange)="select($event, item)"
        (deselect)="deselect($event, item)"
      >
        <novo-icon *ngIf="getAvatarType(item)" class="txc-{{ getAvatarType(item) }}" novoChipAvatar>circle</novo-icon>
        {{ item.label }}
        <novo-icon *ngIf="!disablePickerInput" novoChipRemove>x</novo-icon>
      </novo-chip>
    </div>
    <div class="chip-input-container" *ngIf="!maxlength || (maxlength && items.length < maxlength)">
      <novo-picker
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
        [overrideElement]="element"
      >
      </novo-picker>
    </div>
    <div class="preview-container">
      <span #preview></span>
    </div>
    <i class="bhi-search" [class.has-value]="items.length" *ngIf="!disablePickerInput"></i>
    <label class="clear-all" *ngIf="items.length && !disablePickerInput" (click)="clearValue()"
      >{{ labels.clearAll }} <i class="bhi-times"></i
    ></label>
  `,
  host: {
    '[class.with-value]': 'items.length > 0',
    '[class.disabled]': 'disablePickerInput',
  },
})
export class NovoChipsElement implements OnInit, ControlValueAccessor {
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
  set disablePickerInput(v: boolean) {
    this._disablePickerInput = coerceBooleanProperty(v);
  }
  get disablePickerInput() {
    return this._disablePickerInput;
  }
  private _disablePickerInput: boolean = false;

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

  items: Array<any> = [];
  selected: any = null;
  config: any = {};
  model: any;
  itemToAdd: any;
  popup: any;
  // private data model
  _value: any = '';
  _items = new ReplaySubject(1);
  // Placeholders for the callbacks
  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  constructor(public element: ElementRef, private componentUtils: ComponentUtils, public labels: NovoLabelService) {}

  ngOnInit() {
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
          this._items.next(this.items);
        });
      }
    }
    this._items.next(this.items);
    const valueToSet = this.source && this.source.valueFormatter ? this.source.valueFormatter(this.items) : this.items.map((i) => i.value);
    if (Helpers.isBlank(this.value) !== Helpers.isBlank(valueToSet) || JSON.stringify(this.value) !== JSON.stringify(valueToSet)) {
      this.value = valueToSet;
      this._propagateChanges();
    }
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

  getAvatarType(item: any) {
    return (this.type || item?.value?.searchEntity || '').toLowerCase();
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

  remove(event, item) {
    this.items.splice(this.items.indexOf(item), 1);
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

  /** Emits change event to set the model value. */
  private _propagateChanges(fallbackValue?: any): void {
    this.changed.emit({ value: this.value?.length ? this.value : '', rawValue: this.items });
    this.onModelChange(this.value);
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
