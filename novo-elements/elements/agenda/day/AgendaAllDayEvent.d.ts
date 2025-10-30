import { EventEmitter, TemplateRef } from '@angular/core';
import { CalendarEvent } from 'novo-elements/utils';
import * as i0 from "@angular/core";
export declare class NovoAgendaAllDayEventElement {
    event: CalendarEvent;
    customTemplate: TemplateRef<any>;
    eventClicked: EventEmitter<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAgendaAllDayEventElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAgendaAllDayEventElement, "novo-agenda-all-day-event", never, { "event": { "alias": "event"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, { "eventClicked": "eventClicked"; }, never, never, false, never>;
}
