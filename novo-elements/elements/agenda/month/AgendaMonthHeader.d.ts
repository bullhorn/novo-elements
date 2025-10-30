import { EventEmitter, TemplateRef } from '@angular/core';
import { WeekDay } from 'novo-elements/utils';
import * as i0 from "@angular/core";
export declare class NovoAgendaMonthHeaderElement {
    viewDate: Date;
    days: WeekDay[];
    locale: string;
    customTemplate: TemplateRef<any>;
    /**
     * Called when the view date is changed
     */
    viewDateChange: EventEmitter<Date>;
    prevMonth(event: Event): void;
    nextMonth(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAgendaMonthHeaderElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAgendaMonthHeaderElement, "novo-agenda-month-header", never, { "viewDate": { "alias": "viewDate"; "required": false; }; "days": { "alias": "days"; "required": false; }; "locale": { "alias": "locale"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, { "viewDateChange": "viewDateChange"; }, never, never, false, never>;
}
