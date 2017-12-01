import { EventEmitter, TemplateRef } from '@angular/core';
import { CalendarEvent } from '../../../utils/calendar-utils/CalendarUtils';
export declare class NovoCalendarAllDayEventElement {
    event: CalendarEvent;
    customTemplate: TemplateRef<any>;
    eventClicked: EventEmitter<any>;
}
