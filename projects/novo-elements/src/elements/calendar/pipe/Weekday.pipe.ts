import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';

@Pipe({ name: 'weekday' })
export class WeekdayPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string = 'en-US') {}
  transform(date: Date, locale: string = this.locale, method: string = 'short'): string {
    return new Intl.DateTimeFormat(locale, { weekday: method }).format(date);
  }
}
