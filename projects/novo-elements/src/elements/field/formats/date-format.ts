import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Renderer2 } from '@angular/core';
import { COMPOSITION_BUFFER_MODE, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IMaskDirective, IMaskFactory } from 'angular-imask';
import { format, isValid, parse } from 'date-fns';
import * as IMask from 'imask';
import { NovoLabelService } from '../../../services/novo-label-service';
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
})
export class NovoDateFormatDirective extends IMaskDirective<any> {
  valueChange: EventEmitter<any> = new EventEmitter();

  @Input() dateFormat: DATE_FORMATS = DATE_FORMATS.DATE;

  constructor(
    private _element: ElementRef,
    _renderer: Renderer2,
    _factory: IMaskFactory,
    @Optional() @Inject(COMPOSITION_BUFFER_MODE) _compositionMode: boolean,
    private labels: NovoLabelService,
  ) {
    super(_element, _renderer, _factory, _compositionMode);
    const dateFormat = this.labels.dateFormat.toUpperCase();

    this.unmask = 'typed';
    this.imask = {
      mask: Date,
      pattern: 'm{/}`d{/}`Y',
      overwrite: true,
      autofix: true,
      lazy: false,
      min: new Date(1900, 0, 1),
      max: new Date(2030, 0, 1),
      prepare: (str) => str.toUpperCase(),
      format: (date) => this.formatValue(date),
      parse: (str) => {
        return parse(str);
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
      },
    };
  }

  normalize(value: string) {
    const pattern = this.labels.dateFormat.toUpperCase();
    return format(parse(value), pattern);
  }

  formatAsIso(date: Date): string {
    if (date && isValid(date)) {
      return date.toISOString().slice(0, 10);
    }
    return null;
  }

  formatValue(value: any): string {
    if (value == null) return '';
    // Use `parse` because it keeps dates in locale
    const date = parse(value);
    if (isValid(date)) {
      const dateFormat = this.labels.dateFormat.toUpperCase();
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
      switch (this.dateFormat) {
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
}
