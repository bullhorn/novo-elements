import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { DayViewEvent } from '../../../utils/calendar-utils/CalendarUtils';

@Component({
  selector: 'novo-calendar-day-event',
  template: `
    <template #defaultTemplate>
      <div
        class="cal-event"
        [style.backgroundColor]="dayEvent.event.color.secondary"
        [style.borderColor]="dayEvent.event.color.primary"
        [class.cal-starts-within-day]="!dayEvent.startsBeforeDay"
        [class.cal-ends-within-day]="!dayEvent.endsAfterDay"
        [ngClass]="dayEvent.event.cssClass"
        [tooltip]="dayEvent.event.title"
        [tooltipPosition]="tooltipPosition">
          {{dayEvent.event.title}}
      </div>
    </template>
    <template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngOutletContext]="{dayEvent: dayEvent, tooltipPosition: tooltipPosition, eventClicked: eventClicked}">
    </template>
  `
})
export class NovoCalendarDayEventElement {

  @Input() dayEvent: DayViewEvent;

  @Input() tooltipPosition: string;

  @Input() customTemplate: TemplateRef<any>;

  @Output() eventClicked: EventEmitter<any> = new EventEmitter();

}