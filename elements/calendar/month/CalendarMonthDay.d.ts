import { EventEmitter, TemplateRef } from '@angular/core';
import { MonthViewDay, CalendarEvent } from '../../../utils/calendar-utils/CalendarUtils';
export declare class NovoCalendarMonthDayElement {
    day: MonthViewDay;
    locale: string;
    tooltipPosition: string;
    customTemplate: TemplateRef<any>;
    eventClicked: EventEmitter<{
        event: CalendarEvent;
    }>;
    readonly accepted: Array<CalendarEvent>;
    readonly rejected: Array<CalendarEvent>;
    readonly maybes: Array<CalendarEvent>;
}
