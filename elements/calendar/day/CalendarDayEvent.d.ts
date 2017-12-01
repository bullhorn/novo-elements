import { EventEmitter, TemplateRef } from '@angular/core';
import { DayViewEvent } from '../../../utils/calendar-utils/CalendarUtils';
export declare class NovoCalendarDayEventElement {
    dayEvent: DayViewEvent;
    tooltipPosition: string;
    customTemplate: TemplateRef<any>;
    eventClicked: EventEmitter<any>;
}
