import { endOfWeek, isWithinRange, startOfWeek } from 'date-fns';
import type { DateLike, NovoDateSelectionStrategy } from '../../date-picker/date-picker.types';

export class WeekSelectionStrategy implements NovoDateSelectionStrategy<DateLike[]> {
  constructor(private weekStartsOn: number = 0) {}

  selectionFinished(date: DateLike | null): DateLike[] {
    return this._createWeekRange(date);
  }

  createPreview(activeDate: DateLike | null): DateLike[] {
    return this._createWeekRange(activeDate);
  }

  private _createWeekRange(date: DateLike | null): DateLike[] {
    if (date) {
      const { weekStartsOn } = this;
      const start = startOfWeek(date as DateLike, { weekStartsOn });
      const end = endOfWeek(date as DateLike, { weekStartsOn });
      return [start, end];
    }

    return [null, null];
  }

  isSelected(activeDate: DateLike | null, currentRange: DateLike[]) {
    const [start, end] = currentRange;
    return isWithinRange(activeDate, start, end);
  }
}
