export type DateLike = Date | string | number;
export declare class DateRange<D = DateLike> {
    /** The start date of the range. */
    readonly start: D | null;
    /** The end date of the range. */
    readonly end: D | null;
    private _disableStructuralEquivalency;
    constructor(
    /** The start date of the range. */
    start: D | null, 
    /** The end date of the range. */
    end: D | null);
}
export interface RangeModel {
    startDate: Date;
    endDate: Date;
}
export interface DataTableRangeModel {
    min: Date;
    max: Date;
}
export type modelTypes = Date | Date[] | RangeModel | DataTableRangeModel;
export interface Day {
    date: Date;
    isCurrentMonth?: boolean;
    isToday?: boolean;
    name?: string;
    number?: string | number;
}
export interface NovoDateSelectEvent {
    event: Event;
    day: Day;
}
export interface NovoMonthSelectEvent {
    event: Event;
    month: number;
}
export interface NovoYearSelectEvent {
    event: Event;
    year: number;
}
export type DatePickerValueFormats = 'date' | 'iso8601';
export type DatePickerSelectModes = 'single' | 'multiple' | 'range' | 'week';
export type rangeSelectModes = 'startDate' | 'endDate';
/** Object that can be provided in order to customize the date range selection behavior. */
export interface NovoDateSelectionStrategy<D = DateLike> {
    /**
     * Called when the user has finished selecting a value.
     * @param date Date that was selected. Will be null if the user cleared the selection.
     * @param currentValue Value that is currently shown in the calendar.
     * @param event DOM event that triggered the selection. Currently only corresponds to a `click`
     *    event, but it may get expanded in the future.
     */
    selectionFinished(date: DateLike | null, currentValue: D, event: Event): D;
    /**
     * Called when the user has activated a new date (e.g. by hovering over
     * it or moving focus) and the calendar tries to display a date range.
     *
     * @param activeDate Date that the user has activated. Will be null if the user moved
     *    focus to an element that's no a calendar cell.
     * @param currentValue Value that is currently shown in the calendar.
     * @param event DOM event that caused the preview to be changed. Will be either a
     *    `mouseenter`/`mouseleave` or `focus`/`blur` depending on how the user is navigating.
     */
    createPreview(activeDate: DateLike | null, currentValue: D, event: Event): D;
    isSelected(activeDate: DateLike | null, currentValue: D): boolean;
}
export interface OverlayDate {
    date: Date;
    type: string;
}
