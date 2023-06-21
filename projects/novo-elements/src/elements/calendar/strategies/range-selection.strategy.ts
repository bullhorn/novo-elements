import { Injectable } from '@angular/core';
import type { DateLike, NovoDateSelectionStrategy } from 'novo-elements/utils';
import { DateUtil } from 'novo-elements/utils';

@Injectable()
export class RangeSelectionStrategy implements NovoDateSelectionStrategy<DateLike[]> {
  selectionFinished(date: DateLike, currentRange: DateLike[]) {
    let [start, end] = currentRange;

    if (start == null) {
      start = date;
    } else if (end == null && date && DateUtil.differenceInCalendarDays(date, start) >= 0) {
      end = date;
    } else {
      start = date;
      end = null;
    }

    return [start, end];
  }

  createPreview(activeDate: DateLike | null, currentRange: DateLike[]) {
    let start: DateLike | null = null;
    let end: DateLike | null = null;
    const [currStart, currEnd] = currentRange;

    if (currStart && !currEnd && activeDate) {
      start = currStart;
      end = activeDate;
    }

    return [start, end];
  }

  isSelected(activeDate: DateLike | null, currentRange: DateLike[]) {
    const [start, end] = currentRange;
    return DateUtil.isWithinRange(activeDate, start, end);
  }
}
