// NG
import { ChangeDetectorRef, Component, ElementRef, forwardRef, Host, Input, Inject, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TAB, ENTER, ESCAPE } from '@angular/cdk/keycodes';
// Vendor
import { parse, isDate } from 'date-fns';
// App
import { NovoDateTimePickerElement } from './DateTimePicker';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';

// Value accessor for the component (supports ngModel)
const DATE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoDateTimePickerInputElement),
  multi: true,
};

@Component({
  selector: 'novo-date-time-picker-input',
  providers: [DATE_VALUE_ACCESSOR],
  template: `
        <novo-date-picker-input [ngModel]="datePart" (ngModelChange)="updateDate($event)" [maskOptions]="maskOptions"></novo-date-picker-input>
        <novo-time-picker-input [ngModel]="timePart" (ngModelChange)="updateTime($event)" [military]="military"></novo-time-picker-input>
  `,
})
export class NovoDateTimePickerInputElement implements ControlValueAccessor {
  public value: any;
  public datePart: any;
  public timePart: any;

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void = () => {};

  /** View -> model callback called when autocomplete has been touched */
  _onTouched = () => {};

  @Input() name: string;
  @Input() placeholder: string;
  @Input() maskOptions: any;
  @Input() military: boolean = false;
  @Input() format: string;

  constructor(public element: ElementRef, public labels: NovoLabelService, private _changeDetectorRef: ChangeDetectorRef) {}

  writeValue(value: any): void {
    this.datePart = isDate(value) ? parse(value) : value;
    this.timePart = isDate(value) ? parse(value) : value;
    Promise.resolve(null).then(() => this._setTriggerValue(value));
  }
  updateDate(event) {
    this.datePart = event;
    this.checkParts();
  }
  updateTime(event) {
    this.timePart = event;
    this.checkParts();
  }

  checkParts() {
    try {
      if (this.datePart instanceof Date && this.timePart instanceof Date) {
        let newDt = new Date(
          this.datePart.getFullYear(),
          this.datePart.getMonth(),
          this.datePart.getDate(),
          this.timePart.getHours(),
          this.timePart.getMinutes(),
        );
        this.dispatchOnChange(newDt);
      } else {
        this.dispatchOnChange(null);
      }
    } catch (err) {
      // Date not valid
      this.dispatchOnChange(null);
    }
  }

  registerOnChange(fn: (value: any) => {}): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: () => {}) {
    this._onTouched = fn;
  }
  public dispatchOnChange(newValue?: any) {
    if (newValue !== this.value) {
      this._onChange(newValue);
      this._setTriggerValue(newValue);
    }
  }
  private _setTriggerValue(value: any): void {
    this.value = value;
    this._changeDetectorRef.markForCheck();
  }

  public setValue(event: any | null): void {
    if (event && event.date) {
      this.dispatchOnChange(event.date);
    }
  }

  public setValueAndClose(event: any | null): void {
    this.setValue(event);
  }

  /**
   * Clear any previous selected option and emit a selection change event for this option
   */
  public clearValue() {
    this.dispatchOnChange(null);
  }

  public get hasValue() {
    return !Helpers.isEmpty(this.value);
  }
}
