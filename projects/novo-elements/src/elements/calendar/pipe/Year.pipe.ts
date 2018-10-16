import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';

@Pipe({ name: 'year' })
export class YearPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string = 'en-US') {}
  transform(date: Date, locale: string = this.locale, method: string = 'numeric'): string {
    return new Intl.DateTimeFormat(locale, { year: method }).format(date);
  }
}
