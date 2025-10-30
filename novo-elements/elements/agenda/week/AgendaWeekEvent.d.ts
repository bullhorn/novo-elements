import { EventEmitter, TemplateRef } from '@angular/core';
import { WeekViewEvent } from 'novo-elements/utils';
import * as i0 from "@angular/core";
export declare class NovoAgendaWeekEventElement {
    weekEvent: WeekViewEvent;
    tooltipPosition: string;
    customTemplate: TemplateRef<any>;
    eventClicked: EventEmitter<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAgendaWeekEventElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAgendaWeekEventElement, "novo-agenda-week-event", never, { "weekEvent": { "alias": "weekEvent"; "required": false; }; "tooltipPosition": { "alias": "tooltipPosition"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, { "eventClicked": "eventClicked"; }, never, never, false, never>;
}
