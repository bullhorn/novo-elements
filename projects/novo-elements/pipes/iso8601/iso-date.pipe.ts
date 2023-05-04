import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isoDate' })
export class IsoDatePipe implements PipeTransform {
  constructor() {}
  transform(date: string | Date): string {
    if (date instanceof Date) {
      return date.toISOString().slice(0, 10);
    }
    return (date as string).slice(0, 10);
  }
}
