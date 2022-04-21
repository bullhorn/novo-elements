import { Injectable } from '@angular/core';
import type { DateLike, NovoDateSelectionStrategy } from '../../date-picker/date-picker.types';

@Injectable()
export class MultiDateSelectionStrategy implements NovoDateSelectionStrategy<DateLike[]> {
  selectionFinished(dateLike: DateLike | null, currentValue: DateLike[], event: Event): DateLike[] {
    const date = dateLike as Date;
    const current = new Set(currentValue.map((c: Date) => c.getTime()));
    if (current.has(date.getTime())) {
      current.delete(date.getTime());
    } else {
      current.add(date.getTime());
    }
    return [...current].map((c) => new Date(c));
  }

  createPreview(activeDate: DateLike | null, currentValue: DateLike[]) {
    return [activeDate];
  }

  isSelected(activeDate: DateLike | null, currentValue: DateLike[]) {
    return currentValue && currentValue.includes(activeDate);
  }
}
