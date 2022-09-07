import { DateUtil } from '../../../utils';
import type { DateLike, NovoDateSelectionStrategy } from '../../date-picker/date-picker.types';

export class WeekSelectionStrategy implements NovoDateSelectionStrategy<DateLike[]> {
  constructor(private weekStartsOn: Day = 0) {}

  selectionFinished(date: DateLike | null): DateLike[] {
    return this._createWeekRange(date);
  }

  createPreview(activeDate: DateLike | null): DateLike[] {
    return this._createWeekRange(activeDate);
  }

  private _createWeekRange(date: DateLike | null): DateLike[] {
    if (date) {
      const { weekStartsOn } = this;
      const start = DateUtil.startOfWeek(date as DateLike, { weekStartsOn });
      const end = DateUtil.endOfWeek(date as DateLike, { weekStartsOn });
      return [start, end];
    }

    return [null, null];
  }

  isSelected(activeDate: DateLike | null, currentRange: DateLike[]) {
    const [start, end] = currentRange;
    return DateUtil.isWithinRange(activeDate, start, end);
  }
}
