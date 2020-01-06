// NG
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  Output,
  OnInit,
  ViewChild,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ENTER, ESCAPE, TAB } from '@angular/cdk/keycodes';
// Vendor
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
// App
import { NovoOverlayTemplateComponent } from '../overlay/Overlay';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';
import { DateFormatService } from '../../services/date-format/DateFormat';

// Value accessor for the component (supports ngModel)
const DATE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoTimePickerInputElement),
  multi: true,
};

@Component({
  selector: 'novo-time-picker-input',
  providers: [DATE_VALUE_ACCESSOR],
  template: `
    <input
      type="text"
      [name]="name"
      [(ngModel)]="formattedValue"
      [textMask]="maskOptions"
      [placeholder]="placeholder"
      (focus)="_handleFocus($event)"
      (keydown)="_handleKeydown($event)"
      (input)="_handleInput($event)"
      (blur)="_handleBlur($event)"
      #input
      data-automation-id="time-input"
      [disabled]="disabled"
    />
    <i *ngIf="!hasValue" (click)="openPanel()" class="bhi-clock"></i> <i *ngIf="hasValue" (click)="clearValue()" class="bhi-times"></i>

    <novo-overlay-template [parent]="element" position="above-below">
      <novo-time-picker inline="true" (onSelect)="setValue($event)" [ngModel]="value" [military]="military"></novo-time-picker>
    </novo-overlay-template>
  `,
})
export class NovoTimePickerInputElement implements OnInit, ControlValueAccessor {
  public value: any;
  public formattedValue: string = '';

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void = () => {};
  /** View -> model callback called when autocomplete has been touched */
  _onTouched = () => {};

  @Input()
  name: string;
  @Input()
  placeholder: string;
  @Input()
  military: boolean = false;
  @Input()
  maskOptions: any;
  @HostBinding('class.disabled')
  @Input()
  disabled: boolean = false;
  @Output()
  blurEvent: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output()
  focusEvent: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  /** Element for the panel containing the autocomplete options. */
  @ViewChild(NovoOverlayTemplateComponent, { static: false })
  overlay: NovoOverlayTemplateComponent;

  constructor(
    public element: ElementRef,
    public labels: NovoLabelService,
    public dateFormatService: DateFormatService,
    protected _changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.placeholder = this.military ? this.labels.timeFormatPlaceholder24Hour : this.labels.timeFormatPlaceholderAM;
    this.maskOptions = {
      mask: this.military ? [/\d/, /\d/, ':', /\d/, /\d/] : [/\d/, /\d/, ':', /\d/, /\d/, ' ', /[aApP上下]/, /[mM午]/],
      pipe: this.military ? createAutoCorrectedDatePipe('HH:MM') : createAutoCorrectedDatePipe('mm:MM'),
      keepCharPositions: false,
      guide: true,
    };
  }

  /** BEGIN: Convenient Panel Methods. */
  openPanel(): void {
    if (!this.overlay.panelOpen) {
      this.overlay.openPanel();
      const hour = new Date().getHours();
      Promise.resolve(null).then(() => this.scrollToIndex(hour * 4));
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
      this.closePanel();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  }

  _handleInput(event: KeyboardEvent): void {
    if (document.activeElement === event.target) {
      // this._onChange((event.target as HTMLInputElement).value);
      const text = (event.target as HTMLInputElement).value;
      if (this.military ? text.replace(/_/g, '').length === 5 : text.replace(/_/g, '').length === 8) {
        const [dateTimeValue, formatted] = this.dateFormatService.parseString(text, this.military, 'time');
        this.dispatchOnChange(dateTimeValue);
      } else {
        this.dispatchOnChange(null);
      }
      this.openPanel();
      const num = Number(text.split(':')[0]);
      this.scrollToIndex(num * 4);
    }
  }

  _handleBlur(event: FocusEvent): void {
    this.blurEvent.emit(event);
  }

  _handleFocus(event: FocusEvent): void {
    this.openPanel();
    this.focusEvent.emit(event);
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

  public dispatchOnChange(newValue?: any, skip: boolean = false) {
    if (newValue !== this.value) {
      this._onChange(newValue);
      !skip && this.writeValue(newValue);
    }
  }

  private _setTriggerValue(value: any): void {
    if (value instanceof Date && this.value instanceof Date) {
      value = new Date(value.setFullYear(this.value.getFullYear(), this.value.getMonth(), this.value.getDate()));
    }
    this.value = value;
    if (this.value) {
      this.formattedValue = this.formatDateValue(this.value);
    }
    this._changeDetectorRef.markForCheck();
  }

  public setValue(event: any | null): void {
    if (event && event.date) {
      this.dispatchOnChange(event.date);
    }
  }

  public setValueAndClose(event: any | null): void {
    this.setValue(event);
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
    if (!value) {
      return '';
    }
    const format = this.labels.formatTimeWithFormat(value, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: !this.military,
    });
    if (format.split(':')[0].length === 1) {
      return `0${format}`;
    }
    return format;
  }

  public get hasValue() {
    return !Helpers.isEmpty(this.value);
  }

  public scrollToIndex(index: number) {
    const element = this.overlay.overlayRef.overlayElement;
    const list = element.querySelector('.increments');
    const items = list.querySelectorAll('novo-list-item');
    const item = items[index];
    if (item) {
      list.scrollTop = (item as HTMLElement).offsetTop;
    }
  }
}
