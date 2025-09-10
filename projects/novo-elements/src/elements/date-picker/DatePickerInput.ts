// NG
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import { isValid } from 'date-fns';
// App
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import { DateFormatService, NovoLabelService } from 'novo-elements/services';
import { BooleanInput, DateUtil, Helpers, Key } from 'novo-elements/utils';

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
    <input
      type="text"
      [name]="name"
      [(ngModel)]="formattedValue"
      [imask]="maskOptions"
      [placeholder]="placeholder"
      (focus)="_handleFocus($event)"
      (keydown)="_handleKeydown($event)"
      (input)="_handleInput($event)"
      (blur)="_handleBlur($event)"
      (accept)="handleMaskAccept($event)"
      #input
      data-automation-id="date-input"
      [disabled]="disabled"
    />
    <span class="error-text" *ngIf="showInvalidDateError">{{ invalidDateErrorMessage }}</span>
    <i *ngIf="!hasValue" (click)="openPanel()" class="bhi-calendar"></i>
    <i *ngIf="hasValue" (click)="clearAction()" class="bhi-times"></i>
    <novo-overlay-template [parent]="overlayElement" position="above-below">
      <novo-date-picker
        [start]="start"
        [end]="end"
        inline="true"
        (onSelect)="onSelected($event)"
        [disabledDateMessage]="disabledDateMessage"
        [ngModel]="value"
        [weekStart]="weekStart"
        [hideFooter]="hideFooter"
        [hideToday]="hideToday"
        [dateForInitialView]="dateForInitialView">
        <div *ngIf="hasButtons" class="footer-content">
          <novo-button
            class="cancel-button"
            theme="dialogue"
            size="small"
            (click)="cancel()">{{ labels.cancel }}</novo-button>
          <novo-button
            class="save-button"
            theme="primary"
            color="primary"
            size="small"
            (click)="save()">{{ labels.save }}</novo-button>
        </div>
      </novo-date-picker>
    </novo-overlay-template>
  `,
  styleUrls: ['./DatePickerInput.scss'],
})
export class NovoDatePickerInputElement implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor {
  public value: any;
  public formattedValue: string = '';
  public showInvalidDateError: boolean;
  public invalidDateErrorMessage: string = '';
  private userDefinedFormat: boolean;
  private isInvalidDate: boolean;

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void = () => {};

  /** View -> model callback called when autocomplete has been touched */
  _onTouched = () => {};

  /**
   * The name of the form field, get passed to the native `input` element
   **/
  @Input()
  name: string;
  /**
   * The minimum date that can be selected.
   **/
  @Input()
  start: Date;
  /**
   * The maximum date that can be selected.
   **/
  @Input()
  end: Date;
  /**
   * Placeholder text to display in the input when it is empty.
   **/
  @Input()
  placeholder: string;
  /**
   * MaskOptions to pass to the angular-imask plugin
   **/
  @Input()
  maskOptions: any;
  /**
   * The format to use to parse and render dates: DD/MM/YYYY or MM/DD/YYYY
   **/
  @Input()
  format: string;
  /**
   * Whether to apply a text mask to the date (see `maskOptions`). Only enabled if allowInvalidDate is false.
   */
  @Input()
  textMaskEnabled: boolean = true;
  /**
   * Whether the input should emit values when the field does not yet constitute a valid date
   */
  @Input()
  allowInvalidDate: boolean = false;
  /**
   * The element to use as the parent for the date picker's overlay (to determine bounds sizing). By default,
   * this refers to the input element itself, but may be a container if it has a padded border.
   */
  @Input()
  overlayOnElement: ElementRef;
  /**
   * Whether the footer in the date picker which contains `today` button should be hidden.
   * This will automatically be enabled if enabling either the today button or submit buttons.
   **/
  @Input()
  @BooleanInput()
  public hideFooter: boolean = false;
  /**
   * Whether to hide the 'today' button
   */
  @Input()
  @BooleanInput()
  public hideToday: boolean = false;
  /**
   * Whether to display the picker together with 'cancel'/'save' buttons
   */
  @Input()
  @BooleanInput()
  public hasButtons: boolean = false;
  /**
   * Sets the field as to appear disabled, users will not be able to interact with the text field.
   **/
  @HostBinding('class.disabled')
  @Input()
  disabled: boolean = false;
  /**
   * A message to display in the picker overlay when a given date is disabled through minimum/maximum
   */
  @Input()
  disabledDateMessage: string;
  /**
   * An optional date/month to show in the DatePicker initially besides the current date/month
   */
  @Input()
  dateForInitialView?: Date;
  /**
   * Day of the week the calendar should display first, Sunday=0...Saturday=6
   **/
  @Input()
  weekStart: Day = 0;
  @Output()
  blurEvent: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output()
  focusEvent: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output()
  changeEvent: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output()
  onSave: EventEmitter<any> = new EventEmitter();
  @Output()
  onCancel: EventEmitter<any> = new EventEmitter();
  @Output()
  valueCleared: EventEmitter<any> = new EventEmitter();
  /** Element for the panel containing the autocomplete options. */
  @ViewChild(NovoOverlayTemplateComponent)
  overlay: NovoOverlayTemplateComponent;

  constructor(
    public element: ElementRef,
    public labels: NovoLabelService,
    private _changeDetectorRef: ChangeDetectorRef,
    public dateFormatService: DateFormatService,
  ) {
    this.placeholder = this.labels.localizedDatePlaceholder();
  }

  ngOnInit() {
    this._initFormatOptions();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (Object.keys(changes).some((key) => ['format'].includes(key))) {
      this._initFormatOptions();
    }
  }

  ngAfterViewInit(): void {
    this.overlay.panelClosingActions.subscribe(this._handleOverlayClickout.bind(this));
  }

  _initFormatOptions() {
    this.userDefinedFormat = this.format ? !this.format.match(/^(DD\/MM\/YYYY|MM\/DD\/YYYY)$/g) : false;
    if (!this.userDefinedFormat && this.textMaskEnabled && !this.allowInvalidDate) {
      this.maskOptions = this.maskOptions || this.dateFormatService.getDateMask();
    } else {
      this.maskOptions = undefined;
    }
    this.setupInvalidDateErrorMessage();
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
    return this.overlay?.panelOpen;
  }

  get overlayElement(): ElementRef {
    return this.overlayOnElement || this.element;
  }
  /** END: Convenient Panel Methods. */

  _handleKeydown(event: KeyboardEvent): void {
    if ((event.key === Key.Escape || event.key === Key.Enter || event.key === Key.Tab) && this.panelOpen) {
      this._handleValueUpdate((event.target as HTMLInputElement).value, true);
      this.closePanel();
      event.stopPropagation();
    }
  }

  _handleInput(event: KeyboardEvent): void {
    // if maskOptions is enabled, then we do not want to process inputs until the mask has accepted them - so those events will be
    // handled by the (accept) event.
    if (document.activeElement === event.target && !this.maskOptions) {
      this._handleValueUpdate((event.target as HTMLInputElement).value, false);
    }
  }

  _handleBlur(event: FocusEvent): void {
    if (!this.overlay.isBlurRecipient(event)) {
      this.handleInvalidDate();
      this.blurEvent.emit(event);
    }
  }

  _handleOverlayClickout(): void {
    this.handleInvalidDate(/*fromPanelClose:*/true);
    this.blurEvent.emit();
  }

  _handleFocus(event: FocusEvent): void {
    this.showInvalidDateError = false;
    this.openPanel();
    this.focusEvent.emit(event);
  }

  _handleValueUpdate(value: string, blur: boolean): void {
    if (value === '') {
      this.clearValue();
      if (!this.hasButtons) {
        this.closePanel();
      }
    } else {
      this.formatDate(value, blur);
      this.openPanel();
    }
  }

  handleMaskAccept(maskValue: string): void {
    this._handleValueUpdate(maskValue, false);
  }

  protected formatDate(value: string, blur: boolean) {
    try {
      let dateTimeValue: Date;
      let isInvalidDate: boolean;
      if (this.format) {
        [dateTimeValue, , isInvalidDate] = this.dateFormatService.parseCustomDateString(value, this.format);
      } else {
        [dateTimeValue, , isInvalidDate] = this.dateFormatService.parseString(value, false, 'date');
      }
      this.isInvalidDate = isInvalidDate;
      // if we have a full date - set the dateTimeValue
      if (dateTimeValue?.getFullYear()?.toString().length === 4) {
        const dt = new Date(dateTimeValue);
        this.dispatchOnChange(dt, blur);
      // if we only have a partial date - set the value to null
      } else if (isNaN(dateTimeValue?.getUTCDate())) {
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

  handleInvalidDate(fromPanelClose = false): void {
    if (this.isInvalidDate) { //} && this.value) {
      this.showInvalidDateError = true;
      this.clearValue();
      if (!fromPanelClose) {
        this.closePanel();
      }
    }
  }

  setupInvalidDateErrorMessage(): void {
    let dateFormat: string = this.labels.dateFormatString();
    if (Helpers.isEmpty(dateFormat)) {
      // Default to mm/dd/yyyy
      dateFormat = 'mm/dd/yyyy';
    } else {
      dateFormat = dateFormat.toLowerCase();
    }
    this.invalidDateErrorMessage = `Invalid date field entered. Date format of ${dateFormat} is required.`;
  }

  public dispatchOnChange(newValue?: any, blur: boolean = false, skip: boolean = false) {
    if (newValue !== this.value) {
      this._onChange(newValue);
      this.changeEvent.emit(newValue);
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
      let newDate = new Date(value);
      newDate.setHours(0, 0, 0, 0);
      this.value = newDate;
      return;
    }
    this.value = value;
  }

  private _setFormValue(value: any): void {
    if (value) {
      const test = this.formatDateValue(value);
      this.formattedValue = test;
    } else {
      this.formattedValue = '';
    }
  }

  public onSelected(event: any): void {
    this.setValue(event);
    if (!this.hasButtons) {
      this.closePanel();
    }
  }

  private setValue(event: any | null): void {
    if (event?.date) {
      this.showInvalidDateError = false;
      this.dispatchOnChange(event.date, true);
    }
  }

  /**
   * This method closes the panel, and if a value is specified, also sets the associated
   * control to that value. It will also mark the control as dirty if this interaction
   * stemmed from the user.
   */
  public setValueAndClose(event: any | null): void {
    this.setValue(event);
    this.closePanel();
  }

  /**
   * Respond to clicking the X button within the input
   */
  public clearAction() {
    this.clearValue();
    this.valueCleared.emit();
  }

  /**
   * Clear any previous selected option and emit a selection change event for this option
   */
  public clearValue() {
    this._setFormValue(null);
    this.dispatchOnChange(null);
  }

  public formatDateValue(value) {
    const originalValue = value;
    try {
      if (!value) {
        return '';
      }
      if (this.userDefinedFormat && isValid(value)) {
        return DateUtil.format(value, this.format);
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
      return err;
    }
  }

  public get hasValue() {
    return !Helpers.isEmpty(this.value);
  }

  save(): void {
    this.onSave.emit();
  }

  cancel(): void {
    this.onCancel.emit();
  }
}
