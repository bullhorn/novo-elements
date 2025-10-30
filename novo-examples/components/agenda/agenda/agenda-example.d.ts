import { CalendarEvent } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Agenda Example
 */
export declare class AgendaExample {
    views: Array<any>;
    view: string;
    viewDate: Date;
    events: CalendarEvent[];
    getNewEvent(date: any, color: any, type: any): CalendarEvent;
    dayClicked(date: any): void;
    addShift(event: any): void;
    removeShift(event: any): void;
    toggleAvailable(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AgendaExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AgendaExample, "agenda-example", never, {}, {}, never, never, false, never>;
}
