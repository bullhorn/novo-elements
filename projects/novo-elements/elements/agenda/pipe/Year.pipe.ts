import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'year' })
export class YearPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string = 'en-US') {}
  transform(date: Date, locale: string = this.locale, method: 'numeric' | '2-digit' = 'numeric'): string {
    return new Intl.DateTimeFormat(locale, { year: method }).format(date);
  }
}
