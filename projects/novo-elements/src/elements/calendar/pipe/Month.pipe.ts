import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';

@Pipe({ name: 'month' })
export class MonthPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string = 'en-US') {}
  transform(date: Date, locale: string = this.locale, method: string = 'long'): string {
    return new Intl.DateTimeFormat(locale, { month: method }).format(date);
  }
}
