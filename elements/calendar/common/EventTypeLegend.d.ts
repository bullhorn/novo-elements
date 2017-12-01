import { EventEmitter, TemplateRef } from '@angular/core';
import { CalendarEvent } from '../../../utils/calendar-utils/CalendarUtils';
export declare class NovoEventTypeLegendElement {
    events: CalendarEvent[];
    customTemplate: TemplateRef<any>;
    eventTypeClicked: EventEmitter<any>;
}
