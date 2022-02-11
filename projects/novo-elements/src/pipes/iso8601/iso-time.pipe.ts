import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isoTime' })
export class IsoTimePipe implements PipeTransform {
  constructor() {}
  transform(date: string | Date): string {
    // TODO: Lookup Locale to convert to 12hour
    if (date instanceof Date) {
      return date.toISOString().slice(11, 16);
    }
    return (date as string).slice(11, 16);
  }
}
