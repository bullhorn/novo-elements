import { FactoryProvider, Injectable, InjectionToken, Optional, SkipSelf } from '@angular/core';
import { isSameDay } from 'date-fns';
import type { DateLike, NovoDateSelectionStrategy } from '../../date-picker/date-picker.types';

/** Injection token used to customize the date range selection behavior. */
export const NOVO_DATE_SELECTION_STRATEGY = new InjectionToken<NovoDateSelectionStrategy>('NOVO_DATE_SELECTION_STRATEGY');

/** Provides the default date selection behavior. Single Date */
@Injectable()
export class DefaultDateSelectionStrategy implements NovoDateSelectionStrategy<DateLike[]> {
  selectionFinished(date: DateLike | null, currentValue: DateLike[], event: Event): DateLike[] {
    return [date];
  }

  createPreview(activeDate: DateLike | null, [currentDate]: DateLike[]) {
    return [activeDate];
  }

  isSelected(activeDate: DateLike | null, [currentDate]: DateLike[]) {
    return isSameDay(activeDate, currentDate);
  }
}

/** @docs-private */
export function NOVO_DATE_SELECTION_STRATEGY_PROVIDER_FACTORY(parent: NovoDateSelectionStrategy<unknown>) {
  return parent || new DefaultDateSelectionStrategy();
}

/** @docs-private */
export const NOVO_DATE_SELECTION_STRATEGY_PROVIDER: FactoryProvider = {
  provide: NOVO_DATE_SELECTION_STRATEGY,
  deps: [[new Optional(), new SkipSelf(), NOVO_DATE_SELECTION_STRATEGY]],
  useFactory: NOVO_DATE_SELECTION_STRATEGY_PROVIDER_FACTORY,
};
