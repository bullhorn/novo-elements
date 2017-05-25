import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CalendarEvent } from '../../../utils/calendar-utils/CalendarUtils';

@Component({
  selector: 'novo-event-type-legend',
  template: `
    <template #defaultTemplate>
      <div class="cal-event-legend">
        <div class="cal-event-type"
          *ngFor="let type of events | groupBy : 'type'"
          (click)="$event.stopPropagation(); eventTypeClicked.emit({event:type?.key})">
          <div class="cal-event-type-swatch"></div><div>{{type?.key}}</div>
        </div>
      </div>
    </template>
    <template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngOutletContext]="{events: events, eventTypeClicked: eventTypeClicked}">
    </template>
  `
})
export class NovoEventTypeLegendElement {

  @Input() events: CalendarEvent[];

  @Input() customTemplate: TemplateRef<any>;

  @Output() eventTypeClicked: EventEmitter<any> = new EventEmitter();

}