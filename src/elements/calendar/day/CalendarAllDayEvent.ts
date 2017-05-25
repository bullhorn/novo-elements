import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CalendarEvent } from '../../../utils/calendar-utils/CalendarUtils';

@Component({
  selector: 'novo-calendar-all-day-event',
  template: `
    <template #defaultTemplate>
      <div
        class="cal-all-day-event"
        [style.backgroundColor]="event.color.secondary"
        [style.borderColor]="event.color.primary">
        {{event.title}}
        <!--<novo-calendar-event-title
          [event]="event"
          view="day"
          (click)="eventClicked.emit()">
        </novo-calendar-event-title>
        <novo-calendar-event-actions [event]="event"></novo-calendar-event-actions>-->
      </div>
    </template>
    <template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngOutletContext]="{
        event: event,
        eventClicked: eventClicked
      }">
    </template>
  `
})
export class NovoCalendarAllDayEventElement {

  @Input() event: CalendarEvent;

  @Input() customTemplate: TemplateRef<any>;

  @Output() eventClicked: EventEmitter<any> = new EventEmitter();

}
