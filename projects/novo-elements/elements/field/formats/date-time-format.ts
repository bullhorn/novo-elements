import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Renderer2, SimpleChanges, OnChanges, LOCALE_ID } from '@angular/core';
import { COMPOSITION_BUFFER_MODE, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IMaskDirective, IMaskFactory } from 'angular-imask';
import { format, isValid, parse } from 'date-fns';
import * as IMask from 'imask';
import { NovoLabelService } from 'novo-elements/services';
import { NovoInputFormat, DATE_FORMATS, NOVO_INPUT_FORMAT } from './base-format';
import { Key } from 'novo-elements/utils';

export const DATETIMEFORMAT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoDateTimeFormatDirective),
  multi: true,
};

@Directive({
  selector: 'input[dateTimeFormat]',
  host: {
    class: 'novo-date-time-format',
    '(input)': '_checkInput($event)',
    '(blur)': '_handleBlur($event)',
    '(keydown)': '_handleKeydown($event)',
  },
  providers: [DATETIMEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoDateTimeFormatDirective }],
})
export class NovoDateTimeFormatDirective extends IMaskDirective<any> implements NovoInputFormat, OnChanges {
  valueChange: EventEmitter<any> = new EventEmitter();

  @Input() military: boolean = false;
  @Input() dateTimeFormat: DATE_FORMATS = DATE_FORMATS.DATE;

  constructor(
    private _element: ElementRef,
    _renderer: Renderer2,
    _factory: IMaskFactory,
    @Optional() @Inject(COMPOSITION_BUFFER_MODE) _compositionMode: boolean,
    private labels: NovoLabelService,
  ) {
    super(_element, _renderer, _factory, _compositionMode);
    this.initFormatOptions();
    
  }

  initFormatOptions() {
    const amFormat = this.labels.timeFormatAM.toUpperCase();
    const pmFormat = this.labels.timeFormatPM.toUpperCase();

    this.unmask = 'typed';
    this.imask = {
      mask: Date,
      pattern: this.military ? 'm{/}`d{/}`Y, HH:mm' : 'm{/}`d{/}`Y, HH:mm aa',
      overwrite: true,
      autofix: true,
      lazy: false,
      min: new Date(1900, 0, 1),
      max: new Date(2030, 0, 1),
      prepare: (str) => str.toUpperCase(),
      format: (date) => {
        const test1 = this.formatValue(date)
        return test1;
    },
      parse: (str) => {
        const test = parse(str);

        return test;
      },
      blocks: {
        d: {
          mask: IMask.MaskedRange,
          placeholderChar: 'D',
          from: 1,
          to: 31,
          maxLength: 2,
        },
        m: {
          mask: IMask.MaskedRange,
          placeholderChar: 'M',
          from: 1,
          to: 12,
          maxLength: 2,
        },
        Y: {
          mask: IMask.MaskedRange,
          placeholderChar: 'Y',
          from: 1900,
          to: 9999,
        },
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
          ss: {
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
  
  ngOnChanges(changes: SimpleChanges): void {
    if (Object.keys(changes).some((key) => ['military', 'dateFormat'].includes(key))) {
      this.initFormatOptions();
    }
  }

  _checkInput(event: InputEvent): void {
    if (document.activeElement === event.target) {
      const text = (event.target as HTMLInputElement).value;
      const dateTime =  text.split(', ');
      const hour = dateTime[1].slice(0, 2);
      if ((this.military && Number(dateTime[1][0]) > 2) || (!this.military && Number(dateTime[1][0]) > 1)) {
        event.preventDefault();
        const value = `0${dateTime[1]}`;
        (event.target as HTMLInputElement).value = value;
        // this.onChange(value);
      }
      if (!this.military) {
        const input = dateTime[1].substr(5, 4).replace(/\-/g, '').trim().slice(0, 2);
        const timePeriod = this.imask.blocks.aa.enum.find((it) => it[0] === input[0]);
        if (timePeriod) {
          (event.target as HTMLInputElement).value = `${dateTime[0]}, ${dateTime[1].slice(0, 5)} ${timePeriod}`;
        }
        if ((event.target as HTMLInputElement).selectionStart >= 3 && this.hourOneFormatRequired(hour)) {
          (event.target as HTMLInputElement).value = `${dateTime[0]}, 01:${(event.target as HTMLInputElement).value.slice(
            3,
            (event.target as HTMLInputElement).value.length,
          )}`;
        }
      }
    }
  }

  _handleBlur(event: FocusEvent): void {
    const text = (event.target as HTMLInputElement).value;
    const dateTime =  text.split(', ');
    const hour: string = dateTime[1].slice(0, 2);
    if (!this.military) {
      const input = dateTime[1].substr(5, 4).replace(/\-/g, '').trim().slice(0, 2);
      const timePeriod = this.imask.blocks.aa.enum.find((it) => it[0] === input[0]);
      if (this.hourOneFormatRequired(hour)) {
        (event.target as HTMLInputElement).value = `${dateTime[0]}, 01:${dateTime[1].slice(3, dateTime[1].length)}`;
      }
      if (!timePeriod) {
        (event.target as HTMLInputElement).value = `${dateTime[0]}, ${dateTime[1].slice(0, 5)} --`;
      }
    }
  }

  _handleKeydown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const dateTime =  input.value.split(', ');
    const hour: string = dateTime[1].slice(0, 2);

    if (event.key === Key.Backspace && input.selectionStart === dateTime[1].length) {
      (event.target as HTMLInputElement).value = `${dateTime[1].slice(0, 5)} --`;
    } else if (event.key === Key.Tab && input.selectionStart <= 2 && this.hourOneFormatRequired(hour)) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      input.value = `${dateTime[0]}, 01:${dateTime[1].slice(3, dateTime[1].length)}`;
      input.setSelectionRange(15, 15);
    } else if (event.key === Key.ArrowRight && input.selectionStart >= 2 && this.hourOneFormatRequired(hour)) {
      input.value = `${dateTime[0]}, 01:${dateTime[1].slice(3, dateTime[1].length)}`;
      input.setSelectionRange(14, 14);
    }
  }

  normalize(value: string) {
    const pattern = this.labels.dateFormat.toUpperCase();
    return format(parse(value), pattern);
  }

  formatAsIso(date: Date): string {
    if (date && isValid(date)) {
      return date.toISOString();
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

  formatValue(value: any): string {
    if (value == null) return '';
    // Use `parse` because it keeps dates in locale
    const date = parse(value);
    if (isValid(date)) {
      const dateFormat = `${this.labels.dateFormat.toUpperCase()}, ${this.military ? 'HH:mm' : 'hh:mm A'}`;
      return format(date, dateFormat);
    }
    return this.normalize(value);
  }

  writeValue(value: any) {
    super.writeValue(this.formatValue(value));
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = (date: any) => {
      let formatted = date;
      switch (this.dateTimeFormat) {
        case DATE_FORMATS.ISO8601:
          formatted = this.formatAsIso(date);
          break;
        case DATE_FORMATS.STRING:
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
