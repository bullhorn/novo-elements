import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';

@Pipe({ name: 'endofweekdisplay' })
export class EndOfWeekDisplayPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string = 'en-US') {}

  transform(endOfWeek: Date, startOfWeek: Date, locale: string = this.locale, method: string = 'short'): String {
    if (endOfWeek.getMonth() === startOfWeek.getMonth()) {
      return new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(endOfWeek);
    }

    return new Intl.DateTimeFormat(locale, { month: method, day: 'numeric' }).format(endOfWeek);
  }
}
