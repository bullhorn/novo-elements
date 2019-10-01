// NG
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  forwardRef,
  Host,
  Input,
  Output,
  Inject,
  ViewChild,
  EventEmitter,
  HostBinding,
} from '@angular/core';
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
import { DateFormatService } from '../../services/date-format/DateFormat';

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
        <input type="text" [name]="name" [(ngModel)]="formattedValue" [textMask]="maskOptions" [placeholder]="placeholder" (focus)="_handleFocus($event)" (keydown)="_handleKeydown($event)" (input)="_handleInput($event)" (blur)="_handleBlur($event)" #input data-automation-id="date-input" [disabled]="disabled"/>
        <i *ngIf="!hasValue" (click)="openPanel()" class="bhi-calendar"></i>
        <i *ngIf="hasValue" (click)="clearValue()" class="bhi-times"></i>
        <novo-overlay-template [parent]="element" position="above-below">
            <novo-date-picker [start]="start" [end]="end" inline="true" (onSelect)="setValueAndClose($event)" [ngModel]="value"></novo-date-picker>
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

  @Input()
  name: string;
  @Input()
  start: Date;
  @Input()
  end: Date;
  @Input()
  placeholder: string;
  @Input()
  maskOptions: any;
  @Input()
  format: string;
  @Input()
  textMaskEnabled: boolean = true;
  @Input()
  allowInvalidDate: boolean = false;
  @HostBinding('class.disabled')
  @Input()
  disabled: boolean = false;
  @Output()
  blurEvent: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output()
  focusEvent: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  /** Element for the panel containing the autocomplete options. */
  @ViewChild(NovoOverlayTemplateComponent)
  overlay: NovoOverlayTemplateComponent;

  constructor(
    public element: ElementRef,
    public labels: NovoLabelService,
    private _changeDetectorRef: ChangeDetectorRef,
    public dateFormatService: DateFormatService,
  ) {
    this.placeholder = this.labels.dateFormatString().toUpperCase() || this.labels.dateFormatPlaceholder;
  }

  ngOnInit() {
    this.userDefinedFormat = this.format ? !this.format.match(/^(DD\/MM\/YYYY|MM\/DD\/YYYY)$/g) : false;
    if (!this.userDefinedFormat && this.textMaskEnabled && !this.allowInvalidDate) {
      this.maskOptions = this.maskOptions || {
        mask: this.dateFormatService.getDateMask(),
        pipe: createAutoCorrectedDatePipe(this.format || this.labels.dateFormatString().toLowerCase()),
        keepCharPositions: false,
        guide: true,
      };
    } else {
      this.maskOptions = { mask: false };
    }
  }

  /** BEGIN: Convenient Panel Methods. */
  openPanel(): void {
    if (!this.disabled) {
      this.overlay.openPanel();
    }
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
      this._handleEvent(event, true);
      this.closePanel();
      event.stopPropagation();
    }
  }

  _handleInput(event: KeyboardEvent): void {
    if (document.activeElement === event.target) {
      this._handleEvent(event, false);
    }
  }

  _handleBlur(event: FocusEvent): void {
    this.blurEvent.emit(event);
  }

  _handleFocus(event: FocusEvent): void {
    this.openPanel();
    this.focusEvent.emit(event);
  }

  _handleEvent(event: Event, blur: boolean): void {
    let value = (event.target as HTMLInputElement).value;
    this.formatDate(value, blur);
    this.openPanel();
  }

  protected formatDate(value: string, blur: boolean) {
    try {
      let [dateTimeValue, formatted] = this.dateFormatService.parseString(value, false, 'date');
      if (!isNaN(dateTimeValue.getUTCDate())) {
        let dt = new Date(dateTimeValue);
        this.dispatchOnChange(dt, blur);
      } else {
        this.dispatchOnChange(null, blur);
      }
    } catch (err) {}
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

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  public dispatchOnChange(newValue?: any, blur: boolean = false, skip: boolean = false) {
    if (newValue !== this.value) {
      this._onChange(newValue);
      if (blur) {
        !skip && this.writeValue(newValue);
      } else {
        !skip && this._setCalendarValue(newValue);
      }
    }
  }

  private _setTriggerValue(value: any): void {
    this._setCalendarValue(value);
    this._setFormValue(value);
    this._changeDetectorRef.markForCheck();
  }

  private _setCalendarValue(value: any): void {
    if (value instanceof Date && this.value instanceof Date) {
      value = new Date(value.setHours(this.value.getHours(), this.value.getMinutes()));
    }
    this.value = value;
  }

  private _setFormValue(value: any): void {
    if (this.value) {
      let test = this.formatDateValue(this.value);
      this.formattedValue = test;
    }
  }

  /**
   * This method closes the panel, and if a value is specified, also sets the associated
   * control to that value. It will also mark the control as dirty if this interaction
   * stemmed from the user.
   */
  public setValueAndClose(event: any | null): void {
    if (event && event.date) {
      this.dispatchOnChange(event.date, true);
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
      if (!(isNaN(value.valueOf()) && this.allowInvalidDate)) {
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
