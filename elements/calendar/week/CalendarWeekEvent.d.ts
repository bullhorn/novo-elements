import { EventEmitter, TemplateRef } from '@angular/core';
import { WeekViewEvent } from '../../../utils/calendar-utils/CalendarUtils';
export declare class NovoCalendarWeekEventElement {
    weekEvent: WeekViewEvent;
    tooltipPosition: string;
    customTemplate: TemplateRef<any>;
    eventClicked: EventEmitter<any>;
}
