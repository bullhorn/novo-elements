import { Pipe, PipeTransform } from '@angular/core';

type IsoTimeRangeArgs = (string | Date)[];

@Pipe({ name: 'isoTimeRange' })
export class IsoTimeRangePipe implements PipeTransform {
  constructor() {}
  transform(dates: IsoTimeRangeArgs): string {
    // TODO: Lookup Locale to convert to 12hour
    const [start, end] = dates.map((date) => {
      if (date instanceof Date) {
        return date.toISOString().slice(11, 16);
      }
      return (date as string).slice(11, 16);
    });

    return `${start} - ${end}`;
  }
}
