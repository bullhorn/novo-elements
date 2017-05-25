import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { WeekViewEvent } from '../../../utils/calendar-utils/CalendarUtils';

@Component({
  selector: 'novo-calendar-week-event',
  template: `
    <template #defaultTemplate>
      <div
        class="cal-event"
        [class.cal-starts-within-week]="!weekEvent.startsBeforeWeek"
        [class.cal-ends-within-week]="!weekEvent.endsAfterWeek"
        [ngClass]="weekEvent.event?.cssClass"
        [tooltip]="weekEvent.event.title"
        [tooltipPosition]="tooltipPosition">
        <div class="cal-event-ribbon" [style.backgroundColor]="weekEvent.event.color.primary"></div>
        <div class="cal-event-title">{{weekEvent.event?.title}}</div>
        <div class="cal-event-description">{{weekEvent.event?.description}}</div>
      </div>
    </template>
    <template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngOutletContext]="{weekEvent: weekEvent, tooltipPosition: tooltipPosition, eventClicked: eventClicked}">
    </template>
  `
})
export class NovoCalendarWeekEventElement {

  @Input() weekEvent: WeekViewEvent;

  @Input() tooltipPosition: string;

  @Input() customTemplate: TemplateRef<any>;

  @Output() eventClicked: EventEmitter<any> = new EventEmitter();

}
