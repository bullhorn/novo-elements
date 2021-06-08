import { Pipe, PipeTransform } from '@angular/core';

type IsoDateRangeArgs = (string | Date)[];

@Pipe({ name: 'isoDateRange' })
export class IsoDateRangePipe implements PipeTransform {
  constructor() {}
  transform(dates: IsoDateRangeArgs): string {
    // TODO: Lookup Locale to convert to Users DateFormat
    const [start, end] = dates.map((date) => {
      if (date instanceof Date) {
        return date.toISOString().slice(0, 10);
      }
      return (date as string).slice(0, 10);
    });

    return `${start} - ${end}`;
  }
}
