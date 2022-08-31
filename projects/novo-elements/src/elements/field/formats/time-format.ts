import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnChanges,
  Optional,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { COMPOSITION_BUFFER_MODE, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IMaskDirective, IMaskFactory } from 'angular-imask';
import { format, isValid, parse } from 'date-fns';
import * as IMask from 'imask';
import { NovoLabelService } from '../../../services/novo-label-service';
import { Key } from '../../../utils';
import { NovoInputFormat, NOVO_INPUT_FORMAT } from './base-format';

export const TIMEFORMAT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoTimeFormatDirective),
  multi: true,
};

export enum TIME_FORMATS {
  DATE = 'date',
  ISO8601 = 'iso8601',
  STRING = 'string',
}

@Directive({
  selector: 'input[timeFormat]',
  host: {
    class: 'novo-time-format',
    '(input)': '_checkInput($event)',
    '(blur)': '_handleBlur($event)',
    '(keydown)': '_handleKeydown($event)',
  },
  providers: [TIMEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoTimeFormatDirective }],
})
export class NovoTimeFormatDirective extends IMaskDirective<any> implements NovoInputFormat, AfterViewInit, OnChanges {
  valueChange: EventEmitter<any> = new EventEmitter();

  @Input() military: boolean = false;
  @Input() timeFormat: TIME_FORMATS = TIME_FORMATS.DATE;

  constructor(
    private _element: ElementRef,
    _renderer: Renderer2,
    _factory: IMaskFactory,
    @Optional() @Inject(COMPOSITION_BUFFER_MODE) _compositionMode: boolean,
    private labels: NovoLabelService,
    private cdr: ChangeDetectorRef,
  ) {
    super(_element, _renderer, _factory, _compositionMode);
    this.initFormatOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.keys(changes).some((key) => ['military', 'timeFormat'].includes(key))) {
      this.initFormatOptions();
    }
  }

  initFormatOptions() {
    // const pattern = this.military ? 'HH:mm' : 'hh:mm A';
    const amFormat = this.labels.timeFormatAM.toUpperCase();
    const pmFormat = this.labels.timeFormatPM.toUpperCase();
    this.unmask = 'typed';
    this.imask = {
      mask: Date,
      pattern: this.military ? 'HH:mm' : 'hh:mm aa',
      overwrite: true,
      autofix: true,
      lazy: false,
      min: new Date(1970, 0, 1),
      max: new Date(2030, 0, 1),
      prepare: (str) => str.toUpperCase(),
      format: (value) => this.formatValue(value),
      parse: (str) => {
        const time = this.convertTime12to24(str);
        return parse(`${format(Date.now(), 'YYYY-MM-DD')}T${time}`);
      },
      blocks: {
        HH: {
          mask: IMask.MaskedRange,
          placeholderChar: '-',
          maxLength: 2,
          from: 0,
          to: 23,
        },
        hh: {
          mask: IMask.MaskedRange,
          placeholderChar: '-',
          maxLength: 2,
          from: 1,
          to: 12,
        },
        mm: {
          mask: IMask.MaskedRange,
          placeholderChar: '-',
          maxLength: 2,
          from: 0,
          to: 59,
        },
        aa: {
          mask: IMask.MaskedEnum,
          placeholderChar: '-',
          enum: ['AM', 'PM', 'am', 'pm', amFormat, pmFormat],
        },
      },
    };
  }

  _checkInput(event: InputEvent): void {
    if (document.activeElement === event.target) {
      const text = (event.target as HTMLInputElement).value;
      const hour = text.slice(0, 2);
      if ((this.military && Number(text[0]) > 2) || (!this.military && Number(text[0]) > 1)) {
        event.preventDefault();
        const value = `0${text}`;
        (event.target as HTMLInputElement).value = value;
        // this.onChange(value);
      }
      if (!this.military) {
        const input = text.substr(5, 4).replace(/\-/g, '').trim().slice(0, 2);
        const timePeriod = this.imask.blocks.aa.enum.find((it) => it[0] === input[0]);
        if (timePeriod) {
          (event.target as HTMLInputElement).value = `${text.slice(0, 5)} ${timePeriod}`;
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
      const input = text.substr(5, 4).replace(/\-/g, '').trim().slice(0, 2);
      const timePeriod = this.imask.blocks.aa.enum.find((it) => it[0] === input[0]);
      if (this.hourOneFormatRequired(hour)) {
        (event.target as HTMLInputElement).value = `01:${text.slice(3, text.length)}`;
      }
      if (!timePeriod) {
        (event.target as HTMLInputElement).value = `${text.slice(0, 5)} --`;
      }
    }
  }

  _handleKeydown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const hour: string = input.value.slice(0, 2);

    if (event.key === Key.Backspace && input.selectionStart === input.value.length) {
      (event.target as HTMLInputElement).value = `${input.value.slice(0, 5)} --`;
    } else if (event.key === Key.Tab && input.selectionStart <= 2 && this.hourOneFormatRequired(hour)) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      input.value = `01:${input.value.slice(3, input.value.length)}`;
      input.setSelectionRange(3, 3);
    } else if (event.key === Key.ArrowRight && input.selectionStart >= 2 && this.hourOneFormatRequired(hour)) {
      input.value = `01:${input.value.slice(3, input.value.length)}`;
      input.setSelectionRange(2, 2);
    }
  }

  normalize(value: string) {
    if (this.military) {
      return this.convertTime12to24(value);
    }
    return this.convertTime24to12(value);
  }

  formatValue(value: any): string {
    const date = parse(value);
    if (isValid(date)) {
      const pattern = this.military ? 'HH:mm' : 'hh:mm A';
      return format(date, pattern);
    }
    return this.normalize(value);
  }

  formatAsIso(date: Date): string {
    if (date && isValid(date)) {
      return format(date, 'HH:mm');
    }
    return null;
  }

  convertTime12to24(time12h: string) {
    const pmFormat = this.labels.timeFormatPM.toUpperCase();
    const [time, meridian] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (['PM', pmFormat].includes(meridian)) {
      hours = `${parseInt(hours, 10) + 12}`.padStart(2, '0');
    }
    return `${hours}:${minutes}`;
  }

  convertTime24to12(time24h: string) {
    if (time24h.length === 5) {
      const date = parse(`2020-01-01T${time24h}`);
      return format(date, 'hh:mm A');
    }
    return time24h;
  }

  writeValue(value: any) {
    super.writeValue(this.formatValue(value));
  }

  registerOnChange(fn: (date: any) => void): void {
    this.onChange = (date: any) => {
      let formatted = date;
      switch (this.timeFormat) {
        case TIME_FORMATS.ISO8601:
          formatted = this.formatAsIso(date);
          break;
        case TIME_FORMATS.STRING:
          formatted = this.formatValue(date);
          break;
        default:
          formatted = date;
          break;
      }
      this.valueChange.emit(date);
      fn(formatted);
    };
  }

  hourOneFormatRequired(hourInput: string): boolean {
    return hourInput === '-1' || hourInput === '1-';
  }
}
