import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CalendarEvent } from 'novo-elements/utils';

@Component({
    selector: 'novo-agenda-all-day-event',
    template: `
    <ng-template #defaultTemplate>
      <div class="cal-all-day-event" [style.backgroundColor]="event.color.secondary" [style.borderColor]="event.color.primary">
        {{ event.title }}
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
    standalone: false
})
export class NovoAgendaAllDayEventElement {
  @Input()
  event: CalendarEvent;

  @Input()
  customTemplate: TemplateRef<any>;

  @Output()
  eventClicked: EventEmitter<any> = new EventEmitter();
}
