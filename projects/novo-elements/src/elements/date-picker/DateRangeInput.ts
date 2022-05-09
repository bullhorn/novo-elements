// NG
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import * as dateFns from 'date-fns';
import { createAutoCorrectedDatePipe } from 'text-mask-addons';
import { DateFormatService } from '../../services/date-format/DateFormat';
import { NovoLabelService } from '../../services/novo-label-service';
import { Key } from '../../utils';
import { Helpers } from '../../utils/Helpers';
// App
import { NovoOverlayTemplateComponent } from '../common/overlay/Overlay';
import { RangeModel } from './date-picker.types';

// Value accessor for the component (supports ngModel)
const DATE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoDateRangeInputElement),
  multi: true,
};

@Component({
  selector: 'novo-date-range-input',
  providers: [DATE_VALUE_ACCESSOR],
  template: `
    <div class="date-range-input-container">
      <input
        type="text"
        [name]="name"
        [(ngModel)]="formattedStartDate"
        [textMask]="maskOptions"
        [placeholder]="placeholder"
        (keydown)="_onStartInputChange($event)"
        (input)="_onStartInputChange($event)"
        (focus)="_handleFocus($event)"
        (blur)="_handleBlur($event)"
        #startDate
        data-automation-id="date-range-input-start"
        [disabled]="disabled"
      />
      <novo-icon *ngIf="!hasStartValue" (click)="openPanel()">calendar</novo-icon>
      <novo-icon *ngIf="hasStartValue" (click)="clearStartValue()">x</novo-icon>
    </div>
    <div class="date-range-input-divider">-</div>
    <div class="date-range-input-container">
      <input
        type="text"
        [name]="name"
        [(ngModel)]="formattedEndDate"
        [textMask]="maskOptions"
        [placeholder]="placeholder"
        (keydown)="_onEndInputChange($event)"
        (input)="_onEndInputChange($event)"
        (focus)="_handleFocus($event)"
        (blur)="_handleBlur($event)"
        #endDate
        data-automation-id="date-range-input-end"
        [disabled]="disabled"
      />
      <novo-icon *ngIf="!hasEndValue" (click)="openPanel()">calendar</novo-icon>
      <novo-icon *ngIf="hasEndValue" (click)="clearEndValue()">x</novo-icon>
    </div>
    <novo-overlay-template [parent]="element" position="above-below">
      <novo-date-picker
        [start]="start"
        [end]="end"
        [mode]="mode"
        range="true"
        inline="true"
        (onSelect)="setValueAndClose($event)"
        [ngModel]="value"
        [weekStart]="weekStart"
      ></novo-date-picker>
    </novo-overlay-template>
  `,
})
export class NovoDateRangeInputElement implements OnInit, OnChanges, ControlValueAccessor {
  public formattedStartDate: string = '';
  public formattedEndDate: string = '';
  private userDefinedFormat: boolean;

  @Input()
  name: string;
  @Input()
  start: Date;
  @Input()
  end: Date;
  @Input()
  weekRangeSelect: boolean = false;
  @Input()
  mode: string = 'range';
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
  @Input()
  weekStart: number = 0;
  @Output()
  blurEvent: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output()
  focusEvent: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  /** Element for the panel containing the autocomplete options. */
  @ViewChild(NovoOverlayTemplateComponent)
  overlay: NovoOverlayTemplateComponent;

  @Output() change = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();

  private _value: RangeModel = { startDate: null, endDate: null };
  private _disabled: boolean = false;

  @Input() get value(): RangeModel {
    return this._value;
  }
  set value(value) {
    if (this.value !== value) {
      this._value = value;
      this._setFormValue(value);
      this.onChangeCallback(this._value);
    }
  }

  // Disabled State
  @Input()
  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = !!value;
  }

  constructor(
    public element: ElementRef,
    public labels: NovoLabelService,
    private cdr: ChangeDetectorRef,
    public dateFormatService: DateFormatService,
  ) {
    this.placeholder = this.labels.dateFormatString().toUpperCase() || this.labels.dateFormatPlaceholder;
  }

  ngOnInit() {
    this._initFormatOptions();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (Object.keys(changes).some((key) => ['format'].includes(key))) {
      this._initFormatOptions();
    }
  }

  _initFormatOptions() {
    this.userDefinedFormat = this.format ? !this.format.match(/^(DD\/MM\/YYYY|MM\/DD\/YYYY)$/g) : false;
    if (!this.userDefinedFormat && this.textMaskEnabled && !this.allowInvalidDate) {
      this.maskOptions = this.maskOptions || {
        mask: this.dateFormatService.getDateMask(),
        pipe: createAutoCorrectedDatePipe((this.format || this.labels.dateFormatString()).toLowerCase()),
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
    this.overlay && this.overlay.closePanel();
  }
  get panelOpen(): boolean {
    return this.overlay && this.overlay.panelOpen;
  }
  /** END: Convenient Panel Methods. */

  _handleKeydown(event: KeyboardEvent): void {
    if ((event.key === Key.Escape || event.key === Key.Enter || event.key === Key.Tab) && this.panelOpen) {
      this.closePanel();
      event.stopPropagation();
    }
  }

  _handleBlur(event: FocusEvent): void {
    this.blurEvent.emit(event);
  }

  _handleFocus(event: FocusEvent): void {
    this.openPanel();
    this.focusEvent.emit(event);
  }

  protected formatDate(value: string) {
    try {
      const [dateTimeValue] = this.dateFormatService.parseString(value, false, 'date');
      return new Date(dateTimeValue);
    } catch (err) {
      return null;
    }
  }

  writeValue(value: any): void {
    this.value = value;
    this.cdr.markForCheck();
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  private onChangeCallback = (_: any) => {
    // placeholder
  };

  private onTouchedCallback = () => {
    // placeholder
  };

  _onStartInputChange(event: KeyboardEvent) {
    this._handleKeydown(event);
    if (document.activeElement === event.target) {
      event.stopPropagation();
      const startDate = this.formatDate((event.target as HTMLInputElement).value);
      if (startDate) {
        this.value = {
          ...this.value,
          startDate,
        };
        this.change.emit(this.value);
      }
    }
  }

  _onEndInputChange(event: KeyboardEvent) {
    this._handleKeydown(event);
    if (document.activeElement === event.target) {
      event.stopPropagation();
      const endDate = this.formatDate((event.target as HTMLInputElement).value);
      if (endDate) {
        this.value = {
          ...this.value,
          endDate,
        };
        this.change.emit(this.value);
      }
    }
  }

  private _setFormValue(value: RangeModel): void {
    if (this.value) {
      this.formattedStartDate = this.formatDateValue(this.value.startDate);
      this.formattedEndDate = this.formatDateValue(this.value.endDate);
    }
  }

  /**
   * This method closes the panel, and if a value is specified, also sets the associated
   * control to that value. It will also mark the control as dirty if this interaction
   * stemmed from the user.
   */
  public setValueAndClose(event: any | null): void {
    if (event && event.startDate && event.endDate) {
      const startDate = event.startDate.date;
      const endDate = event.endDate.date;
      this.value = { startDate, endDate };
      this.change.emit(this.value);
    }
    this.closePanel();
  }

  /**
   * Clear any previous selected option and emit a selection change event for this option
   */
  public clearStartValue() {
    this.formattedStartDate = '';
    this.value = { ...this.value, startDate: null };
    this.change.emit(this.value);
  }
  public clearEndValue() {
    this.formattedEndDate = '';
    this.value = { ...this.value, endDate: null };
    this.change.emit(this.value);
  }

  public formatDateValue(value) {
    const originalValue = value;
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

  public get hasStartValue() {
    return !Helpers.isEmpty(this.value?.startDate);
  }
  public get hasEndValue() {
    return !Helpers.isEmpty(this.value?.endDate);
  }
}
