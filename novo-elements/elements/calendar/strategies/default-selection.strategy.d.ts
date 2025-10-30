import { FactoryProvider, InjectionToken } from '@angular/core';
import type { DateLike, NovoDateSelectionStrategy } from 'novo-elements/utils';
import * as i0 from "@angular/core";
/** Injection token used to customize the date range selection behavior. */
export declare const NOVO_DATE_SELECTION_STRATEGY: InjectionToken<NovoDateSelectionStrategy<DateLike>>;
/** Provides the default date selection behavior. Single Date */
export declare class DefaultDateSelectionStrategy implements NovoDateSelectionStrategy<DateLike[]> {
    selectionFinished(date: DateLike | null, currentValue: DateLike[], event: Event): DateLike[];
    createPreview(activeDate: DateLike | null, [currentDate]: DateLike[]): DateLike[];
    isSelected(activeDate: DateLike | null, [currentDate]: DateLike[]): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<DefaultDateSelectionStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DefaultDateSelectionStrategy>;
}
/** @docs-private */
export declare function NOVO_DATE_SELECTION_STRATEGY_PROVIDER_FACTORY(parent: NovoDateSelectionStrategy<unknown>): NovoDateSelectionStrategy<unknown>;
/** @docs-private */
export declare const NOVO_DATE_SELECTION_STRATEGY_PROVIDER: FactoryProvider;
