import { Directive, EventEmitter, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IMaskDirective } from 'angular-imask';
import { isValid } from 'date-fns';
import { MaskedRange } from 'imask';
import { DateFormatService, NovoLabelService } from 'novo-elements/services';
import { DateParseOptions, DateUtil } from 'novo-elements/utils';
import { DATE_FORMATS, NOVO_INPUT_FORMAT } from './base-format';

export const DATEFORMAT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoDateFormatDirective),
  multi: true,
};

@Directive({
    selector: 'input[dateFormat]',
    host: {
        class: 'novo-date-format',
    },
    providers: [DATEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoDateFormatDirective }],
    standalone: false
})
export class NovoDateFormatDirective extends IMaskDirective<any> {
  valueChange: EventEmitter<any> = new EventEmitter();

  @Input() dateFormat: DATE_FORMATS = DATE_FORMATS.DATE;

  constructor(private labels: NovoLabelService, private dateFormatService: DateFormatService) {
    super();
    this.unmask = 'typed' as unknown as false; // typing is to work around angular-imask bug
    this.imask = {
      mask: Date,
      pattern: this.dateFormatService.dateFormatAsImaskPattern,
      overwrite: true,
      autofix: true,
      lazy: false,
      min: new Date(1900, 0, 1),
      max: new Date(2100, 0, 1),
      prepare: (str) => str.toUpperCase(),
      format: (date) => this.formatValue(date, { userDateFormat: this.labels.dateFormatString()}),
      parse: (str) => DateUtil.parse(str, { userDateFormat: this.labels.dateFormatString().toUpperCase() }),
      blocks: {
        d: {
          mask: MaskedRange,
          placeholderChar: 'D',
          from: 1,
          to: 31,
          maxLength: 2,
        },
        m: {
          mask: MaskedRange,
          placeholderChar: 'M',
          from: 1,
          to: 12,
          maxLength: 2,
        },
        Y: {
          mask: MaskedRange,
          placeholderChar: 'Y',
          from: 1900,
          to: 9999,
        },
      },
    };
  }

  normalize(value: string) {
    const pattern = this.labels.dateFormatString().toUpperCase();
    if (!value) {
      return "";
    }
    return DateUtil.format(DateUtil.parse(value, { userDateFormat: this.labels.dateFormatString()}), pattern);
  }

  formatAsIso(date: Date): string {
    if (date && isValid(date)) {
      return date.toISOString().slice(0, 10);
    }
    return null;
  }

  formatYearMonthDay(date: Date): string {
    if (date && isValid(date)) {
       return DateUtil.format(date, 'YYYY-MM-DD');
    }
    return null;
  }

  formatValue(value: any, options?: DateParseOptions): string {
    if (value == null) return '';
    const dateFormat = this.labels.dateFormatString().toUpperCase();
    const date = DateUtil.parse(value, options);
    if (isValid(date)) {
      return DateUtil.format(date, dateFormat);
    }
    return this.normalize(value);
  }

  writeValue(value: any) {
    const initialValue = this['_initialValue'];
    if (initialValue != null && value === initialValue) {
      // This value has already been formatted from the first call to writeValue, simply use it.
      super.writeValue(initialValue);
    } else {
      super.writeValue(this.formatValue(value));
      this.valueChange.emit(value);
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = (date: any) => {
      let formatted = date;
      switch (this.dateFormat) {
        case DATE_FORMATS.ISO8601:
          formatted = this.formatAsIso(date);
          break;
        case DATE_FORMATS.STRING:
          formatted = this.formatValue(date);
          break;
        case DATE_FORMATS.YEAR_MONTH_DAY:
          formatted = this.formatYearMonthDay(date);
          break;
        default:
          formatted = date;
          break;
      }
      this.valueChange.emit(date);
      fn(formatted);
    };
  }
}
