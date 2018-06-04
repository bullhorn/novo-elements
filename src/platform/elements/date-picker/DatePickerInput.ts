// NG
import { ChangeDetectorRef, Component, ElementRef, OnInit, forwardRef, Host, Input, Inject, ViewChild, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TAB, ENTER, ESCAPE } from '@angular/cdk/keycodes';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
import * as dateFns from 'date-fns';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
// App
import { NovoDatePickerElement } from './DatePicker';
import { NovoOverlayTemplateComponent } from '../overlay/Overlay';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';

// Value accessor for the component (supports ngModel)
const DATE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoDatePickerInputElement),
  multi: true,
};

@Component({
  selector: 'novo-date-picker-input',
  providers: [DATE_VALUE_ACCESSOR],
  template: `
        <input type="text" [name]="name" [(ngModel)]="formattedValue" [textMask]="maskOptions" [placeholder]="placeholder" (focus)="openPanel()" (keydown)="_handleKeydown($event)" (input)="_handleInput($event)" #input data-automation-id="date-input"/>
        <i *ngIf="!hasValue" (click)="openPanel()" class="bhi-calendar"></i>
        <i *ngIf="hasValue" (click)="clearValue()" class="bhi-times"></i>

        <novo-overlay-template [parent]="element">
            <novo-date-picker inline="true" (onSelect)="setValueAndClose($event)" [ngModel]="value"></novo-date-picker>
        </novo-overlay-template>
  `,
})
export class NovoDatePickerInputElement implements OnInit, ControlValueAccessor {
  public value: any;
  public formattedValue: string = '';
  private userDefinedFormat: boolean;

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void = () => {};

  /** View -> model callback called when autocomplete has been touched */
  _onTouched = () => {};

  @Input() name: string;
  @Input() placeholder: string;
  @Input() maskOptions: any;
  @Input() format: string;
  @Input() textMaskEnabled: boolean = true;
  @Input() allowInvalidDate: boolean = false;
  /** Element for the panel containing the autocomplete options. */
  @ViewChild(NovoOverlayTemplateComponent) overlay: NovoOverlayTemplateComponent;

  constructor(
    public element: ElementRef,
    public labels: NovoLabelService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this.placeholder = this.labels.dateFormatPlaceholder;
  }

  ngOnInit() {
    this.userDefinedFormat = this.format? !this.format.match(/^(DD\/MM\/YYYY|MM\/DD\/YYYY)$/g): false;
    if(!this.userDefinedFormat && this.textMaskEnabled && !this.allowInvalidDate) {
      this.maskOptions = this.maskOptions || {
        mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
        pipe: createAutoCorrectedDatePipe(this.format || this.labels.dateFormat.toLowerCase()),
        keepCharPositions: false,
        guide: true,
      };
    } else {
      this.maskOptions = {mask: false};
    }
  }

  /** BEGIN: Convenient Panel Methods. */
  openPanel(): void {
    this.overlay.openPanel();
  }
  closePanel(): void {
    this.overlay.closePanel();
  }
  get panelOpen(): boolean {
    return this.overlay && this.overlay.panelOpen;
  }
  /** END: Convenient Panel Methods. */

  _handleKeydown(event: KeyboardEvent): void {
    if ((event.keyCode === ESCAPE || event.keyCode === ENTER || event.keyCode === TAB) && this.panelOpen) {
      this.closePanel();
      event.stopPropagation();
    }
  }

  _handleInput(event: KeyboardEvent): void {
    if (document.activeElement === event.target) {
      let value = (event.target as HTMLInputElement).value;
      try {
        let dateTimeValue = Date.parse(value);
        if (!isNaN(dateTimeValue)) {
          let dt = new Date(dateTimeValue);
          this.dispatchOnChange(dt);
        } else {
          this.dispatchOnChange(null);
        }
      } catch (err) {}
      this.openPanel();
    }
  }

  writeValue(value: any): void {
    Promise.resolve(null).then(() => this._setTriggerValue(value));
  }
  registerOnChange(fn: (value: any) => {}): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: () => {}) {
    this._onTouched = fn;
  }
  public dispatchOnChange(newValue?: any, skip: boolean = false) {
    if (newValue !== this.value) {
      this._onChange(newValue);
      !skip && this.writeValue(newValue);
    }
  }

  private _setTriggerValue(value: any): void {
    if (value instanceof Date && this.value instanceof Date) {
      value = new Date(value.setHours(this.value.getHours(), this.value.getMinutes()));
    }
    this.value = value;
    if (this.value) {
      let test = this.formatDateValue(this.value);
      this.formattedValue = test;
    }
    this._changeDetectorRef.markForCheck();
  }

  /**
   * This method closes the panel, and if a value is specified, also sets the associated
   * control to that value. It will also mark the control as dirty if this interaction
   * stemmed from the user.
   */
  public setValueAndClose(event: any | null): void {
    if (event && event.date) {
      this.dispatchOnChange(event.date);
    }
    this.closePanel();
  }

  /**
   * Clear any previous selected option and emit a selection change event for this option
   */
  public clearValue() {
    this.formattedValue = '';
    this.dispatchOnChange(null);
  }

  public formatDateValue(value) {
    let originalValue = value;
    try {
      if (!value) {
        return '';
      }
      if (this.userDefinedFormat && dateFns.isValid(value)) {
        return dateFns.format(value, this.format);
      }
      if (!(value instanceof Date)) {
        value = new Date(value);
      }
      if(!(isNaN(value.valueOf()) && this.allowInvalidDate) ){
        return this.labels.formatDateWithFormat(value, {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        });
      } else {
        return originalValue;
      }

    } catch (err) {
      return '';
    }
  }

  public get hasValue() {
    return !Helpers.isEmpty(this.value);
  }
}
