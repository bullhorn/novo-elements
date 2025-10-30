import { EventEmitter, TemplateRef } from '@angular/core';
import { CalendarEvent } from 'novo-elements/utils';
import * as i0 from "@angular/core";
export declare class NovoEventTypeLegendElement {
    events: CalendarEvent[];
    customTemplate: TemplateRef<any>;
    eventTypeClicked: EventEmitter<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoEventTypeLegendElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoEventTypeLegendElement, "novo-event-type-legend", never, { "events": { "alias": "events"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, { "eventTypeClicked": "eventTypeClicked"; }, never, never, false, never>;
}
