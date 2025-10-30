import { EventEmitter, TemplateRef } from '@angular/core';
import { DayViewEvent } from 'novo-elements/utils';
import * as i0 from "@angular/core";
export declare class NovoAgendaDayEventElement {
    dayEvent: DayViewEvent;
    tooltipPosition: string;
    customTemplate: TemplateRef<any>;
    eventClicked: EventEmitter<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAgendaDayEventElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAgendaDayEventElement, "novo-agenda-day-event", never, { "dayEvent": { "alias": "dayEvent"; "required": false; }; "tooltipPosition": { "alias": "tooltipPosition"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, { "eventClicked": "eventClicked"; }, never, never, false, never>;
}
