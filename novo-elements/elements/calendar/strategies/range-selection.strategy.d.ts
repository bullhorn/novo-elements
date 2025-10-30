import type { DateLike, NovoDateSelectionStrategy } from 'novo-elements/utils';
import * as i0 from "@angular/core";
export declare class RangeSelectionStrategy implements NovoDateSelectionStrategy<DateLike[]> {
    selectionFinished(date: DateLike, currentRange: DateLike[]): DateLike[];
    createPreview(activeDate: DateLike | null, currentRange: DateLike[]): DateLike[];
    isSelected(activeDate: DateLike | null, currentRange: DateLike[]): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<RangeSelectionStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RangeSelectionStrategy>;
}
