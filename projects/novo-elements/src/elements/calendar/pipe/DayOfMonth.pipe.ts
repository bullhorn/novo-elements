import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dayofmonth' })
export class DayOfMonthPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string = 'en-US') {}
  transform(date: Date, locale: string = this.locale, method: string = 'numeric'): string {
    return new Intl.DateTimeFormat(locale, { day: method }).format(date);
  }
}
