import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CalendarEvent } from 'novo-elements/utils';

@Component({
  selector: 'novo-event-type-legend',
  template: `
    <ng-template #defaultTemplate>
      <div class="cal-event-legend">
        @for (type of events | groupBy: 'type'; track type) {
          <div class="cal-event-type"
            (click)="$event.stopPropagation(); eventTypeClicked.emit({ event: type?.key })">
            <div class="cal-event-type-swatch"></div>
            <div>{{ type?.key }}</div>
          </div>
        }
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{ events: events, eventTypeClicked: eventTypeClicked }"
      >
    </ng-template>
  `,
  standalone: false
})
export class NovoEventTypeLegendElement {
  @Input()
  events: CalendarEvent[];

  @Input()
  customTemplate: TemplateRef<any>;

  @Output()
  eventTypeClicked: EventEmitter<any> = new EventEmitter();
}
