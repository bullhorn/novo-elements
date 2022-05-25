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
import { format, parse } from 'date-fns';
import * as IMask from 'imask';
import { DateFormatService } from '../../services/date-format/DateFormat';
import { NovoLabelService } from '../../services/novo-label-service';
import { Key } from '../../utils';
import { Helpers } from '../../utils/Helpers';
// App
import { NovoOverlayTemplateComponent } from '../common/overlay/Overlay';

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
      [(ngModel)]="value"
      [imask]="maskOptions"
      [unmask]="'typed'"
      (complete)="onComplete($event)"
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
      <novo-time-picker
        inline="true"
        [analog]="analog"
        (onSelect)="setValue($event)"
        [ngModel]="value"
        [military]="military"
      ></novo-time-picker>
    </novo-overlay-template>
  `,
})
export class NovoTimePickerInputElement implements OnInit, OnChanges, ControlValueAccessor {
  public value: any;

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

  /**
   * @deprecated don't use
   */
  @Input()
  analog: boolean = false;

  @Output()
  blurEvent: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output()
  focusEvent: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  /** Element for the panel containing the autocomplete options. */
  @ViewChild(NovoOverlayTemplateComponent)
  overlay: NovoOverlayTemplateComponent;
  @ViewChild('input')
  input: HTMLInputElement;

  constructor(
    public element: ElementRef,
    public labels: NovoLabelService,
    public dateFormatService: DateFormatService,
    protected _changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.initFormatOptions();
  }

  ngOnChanges(changes?: SimpleChanges) {
    // set icon and styling
    if (Object.keys(changes).some((key) => ['military', 'maskOptions'].includes(key))) {
      this.initFormatOptions();
    }
  }

  initFormatOptions() {
    this.placeholder = this.military ? this.labels.timeFormatPlaceholder24Hour : this.labels.timeFormatPlaceholderAM;
    const timeFormat = this.military ? 'HH:mm' : 'hh:mm A';
    const amFormat = this.labels.timeFormatAM.toUpperCase();
    const pmFormat = this.labels.timeFormatPM.toUpperCase();
    this.maskOptions = {
      mask: Date,
      pattern: this.military ? 'HH:mm' : 'hh:mm aa',
      overwrite: true,
      autofix: true,
      lazy: false,
      min: new Date(1970, 0, 1),
      max: new Date(2030, 0, 1),
      prepare(str) {
        return str.toUpperCase();
      },
      format(date) {
        return format(date, timeFormat);
      },
      parse: (str) => {
        const time = this.military ? str : this.convertTime12to24(str);
        return parse(`${format(Date.now(), 'YYYY-MM-DD')}T${time}`);
      },
      blocks: {
        HH: {
          mask: IMask.MaskedRange,
          placeholderChar: 'H',
          maxLength: 2,
          from: 0,
          to: 23,
        },
        hh: {
          mask: IMask.MaskedRange,
          placeholderChar: 'h',
          maxLength: 2,
          from: 1,
          to: 12,
        },
        mm: {
          mask: IMask.MaskedRange,
          placeholderChar: 'm',
          maxLength: 2,
          from: 0,
          to: 59,
        },
        aa: {
          mask: IMask.MaskedEnum,
          placeholderChar: 'x',
          enum: ['AM', 'PM', 'am', 'pm', amFormat, pmFormat],
        },
      },
    };
  }

  onComplete(dt) {
    if (this.value instanceof Date && dt instanceof Date) {
      if (this.value.getTime() !== dt.getTime()) {
        this.dispatchOnChange(dt);
      }
    }
    else if (this.value !== dt) {
      this.dispatchOnChange(dt);
    }
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
    const input = event.target as HTMLInputElement;
    const hour: string = input.value.slice(0, 2);
    if ((event.key === Key.Escape || event.key === Key.Enter) && this.panelOpen) {
      this.closePanel();
      event.stopPropagation();
      event.stopImmediatePropagation();
      if (this.hourOneFormatRequired(hour)) {
        input.value = `01:${input.value.slice(3, input.value.length)}`;
      }
    } else if (event.key === Key.Tab && input.selectionStart <= 2 && this.hourOneFormatRequired(hour)) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      input.value = `01:${input.value.slice(3, input.value.length)}`;
      input.setSelectionRange(3, 3);
    } else if (event.key === Key.Backspace && input.selectionStart === input.value.length) {
      input.value = `${input.value.slice(0, 5)} xx`;
    } else if (event.key === Key.Tab && this.panelOpen) {
      this.closePanel();
      event.stopPropagation();
      event.stopImmediatePropagation();
    } else if (event.key === Key.ArrowRight && input.selectionStart >= 2 && this.hourOneFormatRequired(hour)) {
      input.value = `01:${input.value.slice(3, input.value.length)}`;
      input.setSelectionRange(2, 2);
    }
  }

  _handleInput(event: KeyboardEvent): void {
    if (document.activeElement === event.target) {
      const text = (event.target as HTMLInputElement).value;
      const hour = text.slice(0, 2);
      this.openPanel();
      if ((this.military && Number(text[0]) > 2) || (!this.military && Number(text[0]) > 1)) {
        event.preventDefault();
        (event.target as HTMLInputElement).value = `0${text}`;
      }
      if (!this.military) {
        const test = text.substr(5, 4).replace(/x/g, '').trim().slice(0, 2);
        const timePeriod = this.maskOptions.blocks.aa.enum.find((it) => it[0] === test[0]);
        if (timePeriod) {
          (event.target as HTMLInputElement).value = `${(event.target as HTMLInputElement).value.slice(0, 5)} ${timePeriod}`;
        }
        if ((event.target as HTMLInputElement).selectionStart >= 3 && this.hourOneFormatRequired(hour)) {
          (event.target as HTMLInputElement).value = `01:${(event.target as HTMLInputElement).value.slice(
            3,
            (event.target as HTMLInputElement).value.length,
          )}`;
        }
      }
    }
  }

  _handleBlur(event: FocusEvent): void {
    const text = (event.target as HTMLInputElement).value;
    const hour: string = text.slice(0, 2);
    if (!this.military) {
      const test = text.substr(5, 4).replace(/x/g, '').trim().slice(0, 2);
      const timePeriod = this.maskOptions.blocks.aa.enum.find((it) => it[0] === test[0]);
      if (this.hourOneFormatRequired(hour)) {
        (event.target as HTMLInputElement).value = `01:${text.slice(3, text.length)}`;
      }
      if (!timePeriod) {
        (event.target as HTMLInputElement).value = `${(event.target as HTMLInputElement).value.slice(0, 5)} xx`;
      }
    }
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
    this.dispatchOnChange(null);
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

  convertTime12to24(time12h: string) {
    const pmFormat = this.labels.timeFormatPM.toUpperCase();

    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (['PM', pmFormat].includes(modifier)) {
      hours = `${parseInt(hours, 10) + 12}`.padStart(2, '0');
    }
    return `${hours}:${minutes}`;
  }

  hourOneFormatRequired(hourInput: string): boolean {
    return hourInput === 'h1' || hourInput === '1h';
  }
}
