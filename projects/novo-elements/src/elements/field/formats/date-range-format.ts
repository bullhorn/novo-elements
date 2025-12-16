import { Directive, EventEmitter, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IMaskDirective } from 'angular-imask';
import { isValid } from 'date-fns';
import { MaskedRange } from 'imask';
import { DateFormatService, NovoLabelService } from 'novo-elements/services';
import { DateParseOptions, DateUtil } from 'novo-elements/utils';
import { DATE_FORMATS, NOVO_INPUT_FORMAT } from './base-format';

export const DATERANGEFORMAT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoDateRangeFormatDirective),
  multi: true,
};

type DateRange = {
  startDate: Date;
  endDate: Date;
};

@Directive({
    selector: 'input[dateRangeFormat]',
    host: {
        class: 'novo-date-range-format',
    },
    providers: [DATERANGEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoDateRangeFormatDirective }],
    standalone: false
})
export class NovoDateRangeFormatDirective extends IMaskDirective<any> {
  valueChange: EventEmitter<any> = new EventEmitter();

  @Input() dateRangeFormat: DATE_FORMATS = DATE_FORMATS.DATE;

  constructor(private labels: NovoLabelService, private dateFormat: DateFormatService) {
    super();
    this.unmask = false;
    this.imask = {
      mask: `${this.dateFormat.dateFormatAsImaskPattern} - ${this.dateFormat.dateFormatAsImaskPattern}`,
      overwrite: true,
      autofix: true,
      lazy: false,
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

  normalize(value: string | Date, options?: DateParseOptions) {
    const pattern = this.labels.dateFormatString().toUpperCase();
    return DateUtil.format(value ? DateUtil.parse(value, options) : null, pattern);
  }

  formatAsIso(value: DateRange): string {
    if (!value) {
      return '';
    }
    const { startDate, endDate } = value;
    if (startDate && isValid(startDate) && endDate && isValid(endDate)) {
      const startIso = startDate.toISOString().slice(0, 10);
      const endIso = endDate.toISOString().slice(0, 10);
      return `${startIso}/${endIso}`;
    }
    return null;
  }

  formatValue(value: DateRange): string {
    if (!value) {
      return '';
    }
    const { startDate, endDate } = value;
    return `${this.formatDate(startDate)} - ${this.formatDate(endDate)}`;
  }

  formatDate(source: Date | string) {
    const dateRangeFormat = this.labels.dateFormatString().toUpperCase();
    const date = DateUtil.parse(source);
    if (isValid(date)) {
      return DateUtil.format(date, dateRangeFormat);
    }
    return this.normalize(source);
  }

  writeValue(value: any) {
    if (this['_initialValue'] && value === this['_initialValue']) {
      // if this call is coming from the super class, skip through.
      // If we ever wanted to reduce the need for this hack/workaround, we could refactor
      // IMaskDirective to exist as a child portion of DateRangeFormatDirective.
      super.writeValue(value);
      return;
    }
    const formattedValue = this.formatValue(value);
    if (formattedValue !== this.maskValue) {
      super.writeValue(this.formatValue(value));
      this.onChange(this.formatValue(value));
      this.valueChange.emit(value);
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = (input: any) => {
      if (this.validate(input)) {
        const dates = this.extractDatesFromInput(input);
        let formatted: DateRange | string = dates;
        switch (this.dateRangeFormat) {
          case DATE_FORMATS.ISO8601:
            formatted = this.formatAsIso(dates);
            break;
          case DATE_FORMATS.STRING:
            formatted = this.formatValue(dates);
            break;
          default:
            formatted = dates;
            break;
        }
        this.valueChange.emit(dates);
        fn(formatted);
      }
    };
  }

  extractDatesFromInput(value) {
    const [startStr, endStr] = value.split(' - ');
    const startDate = DateUtil.parse(startStr, { userDateFormat: this.labels.dateFormatString()});
    const endDate = DateUtil.parse(endStr, { userDateFormat: this.labels.dateFormatString()});
    return { startDate, endDate };
  }

  validate(dateStr: string) {
    const { startDate, endDate } = this.extractDatesFromInput(dateStr);
    return isValid(startDate) && isValid(endDate);
  }
}
