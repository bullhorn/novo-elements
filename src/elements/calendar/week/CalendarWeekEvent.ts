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
        [style.backgroundColor]="weekEvent.event.color.secondary"
        [ngClass]="weekEvent.event?.cssClass"
        [tooltip]="weekEvent.event.title"
        [tooltipPosition]="tooltipPosition">
        {{weekEvent.event.title}}
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