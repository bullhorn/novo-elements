import { EventEmitter, TemplateRef } from '@angular/core';
import { CalendarEvent, WeekDay } from '../../../utils/calendar-utils/CalendarUtils';
export declare class NovoCalendarWeekHeaderElement {
    days: WeekDay[];
    locale: string;
    customTemplate: TemplateRef<any>;
    dayClicked: EventEmitter<{
        date: Date;
    }>;
    eventDropped: EventEmitter<{
        event: CalendarEvent;
        newStart: Date;
    }>;
}
