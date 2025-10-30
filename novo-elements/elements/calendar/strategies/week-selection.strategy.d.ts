import type { DateLike, NovoDateSelectionStrategy } from 'novo-elements/utils';
export declare class WeekSelectionStrategy implements NovoDateSelectionStrategy<DateLike[]> {
    private weekStartsOn;
    constructor(weekStartsOn?: Day);
    selectionFinished(date: DateLike | null): DateLike[];
    createPreview(activeDate: DateLike | null): DateLike[];
    private _createWeekRange;
    isSelected(activeDate: DateLike | null, currentRange: DateLike[]): boolean;
}
