import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'monthday' })
export class MonthDayPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string = 'en-US') {}
  transform(date: Date, locale: string = this.locale, method: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' = 'short'): string {
    return new Intl.DateTimeFormat(locale, { month: method, day: 'numeric' }).format(date);
  }
}
