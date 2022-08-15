import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Renderer2 } from '@angular/core';
import { COMPOSITION_BUFFER_MODE, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IMaskDirective, IMaskFactory } from 'angular-imask';
import { format, isValid, parse } from 'date-fns';
import * as IMask from 'imask';
import { NovoLabelService } from '../../../services/novo-label-service';
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
})
export class NovoDateRangeFormatDirective extends IMaskDirective<any> {
  valueChange: EventEmitter<any> = new EventEmitter();

  @Input() dateRangeFormat: DATE_FORMATS = DATE_FORMATS.DATE;

  constructor(
    private _element: ElementRef,
    _renderer: Renderer2,
    _factory: IMaskFactory,
    @Optional() @Inject(COMPOSITION_BUFFER_MODE) _compositionMode: boolean,
    private labels: NovoLabelService,
  ) {
    super(_element, _renderer, _factory, _compositionMode);
    const dateRangeFormat = this.labels.dateFormat.toUpperCase();

    this.unmask = false;
    this.imask = {
      mask: 'm{/}`d{/}`Y - m{/}`d{/}`Y',
      overwrite: true,
      autofix: true,
      lazy: false,
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
      },
    };
  }

  normalize(value: string | Date) {
    const pattern = this.labels.dateFormat.toUpperCase();
    return format(parse(value), pattern);
  }

  formatAsIso(value: DateRange): string {
    if (!value) return '';
    const { startDate, endDate } = value;
    if (startDate && isValid(startDate) && endDate && isValid(endDate)) {
      const startIso = startDate.toISOString().slice(0, 10);
      const endIso = endDate.toISOString().slice(0, 10);
      return `${startIso}/${endIso}`;
    }
    return null;
  }

  formatValue(value: DateRange): string {
    if (!value) return '';
    const { startDate, endDate } = value;
    return `${this.formatDate(startDate)} - ${this.formatDate(endDate)}`;
  }

  formatDate(source: Date | string) {
    const date = parse(source);
    if (isValid(date)) {
      const dateRangeFormat = this.labels.dateFormat.toUpperCase();
      return format(date, dateRangeFormat);
    }
    return this.normalize(source);
  }

  writeValue(value: any) {
    const formattedValue = this.formatValue(value);
    if (formattedValue !== this.maskValue) {
      super.writeValue(this.formatValue(value));
      this.onChange(this.formatValue(value));
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
    const startDate = parse(startStr);
    const endDate = parse(endStr);
    return { startDate, endDate };
  }

  validate(dateStr: string) {
    const { startDate, endDate } = this.extractDatesFromInput(dateStr);
    return isValid(startDate) && isValid(endDate);
  }
}
