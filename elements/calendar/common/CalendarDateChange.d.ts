import { EventEmitter } from '@angular/core';
export declare class NovoCalendarDateChangeElement {
    /**
     * The current view
     */
    view: string;
    /**
     * The current view date
     */
    viewDate: Date;
    locale: string;
    /**
     * Called when the view date is changed
     */
    viewDateChange: EventEmitter<Date>;
    constructor(locale: string);
    /**
     * @hidden
     */
    subtractDate(): void;
    addDate(): void;
    changeDate(unit: number): void;
    readonly startOfWeek: Date;
    readonly endOfWeek: Date;
}
