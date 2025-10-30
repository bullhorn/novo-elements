import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NovoAgendaDateChangeElement {
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
    get startOfWeek(): Date;
    get endOfWeek(): Date;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAgendaDateChangeElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAgendaDateChangeElement, "novo-agenda-date-change", never, { "view": { "alias": "view"; "required": false; }; "viewDate": { "alias": "viewDate"; "required": false; }; "locale": { "alias": "locale"; "required": false; }; }, { "viewDateChange": "viewDateChange"; }, never, never, false, never>;
}
