import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CalendarEvent } from 'novo-elements/utils';

@Component({
  selector: 'novo-agenda-all-day-event',
  template: `
    <ng-template #defaultTemplate>
      <div class="cal-all-day-event" [style.backgroundColor]="event.color.secondary" [style.borderColor]="event.color.primary">
        {{ event.title }}
        <!--<novo-agenda-event-title
          [event]="event"
          view="day"
          (click)="eventClicked.emit()">
        </novo-agenda-event-title>
        <novo-agenda-event-actions [event]="event"></novo-agenda-event-actions>-->
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        eventClicked: eventClicked
      }"
    >
    </ng-template>
  `,
})
export class NovoAgendaAllDayEventElement {
  @Input()
  event: CalendarEvent;

  @Input()
  customTemplate: TemplateRef<any>;

  @Output()
  eventClicked: EventEmitter<any> = new EventEmitter();
}
