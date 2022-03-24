import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'month' })
export class MonthPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string = 'en-US') {}
  transform(date: Date, locale: string = this.locale, method: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' = 'long'): string {
    return new Intl.DateTimeFormat(locale, { month: method }).format(date);
  }
}
