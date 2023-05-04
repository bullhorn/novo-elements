import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { DayViewEvent } from 'novo-elements/utils';

@Component({
  selector: 'novo-agenda-day-event',
  template: `
    <ng-template #defaultTemplate>
      <div
        class="cal-event"
        [style.borderColor]="dayEvent.event.color.secondary"
        [class.cal-starts-within-day]="!dayEvent.startsBeforeDay"
        [class.cal-ends-within-day]="!dayEvent.endsAfterDay"
        [ngClass]="dayEvent.event.cssClass"
        [tooltip]="dayEvent.event.description"
        [tooltipPosition]="tooltipPosition"
        (click)="eventClicked.emit({ event: dayEvent.event })"
      >
        <div class="cal-event-ribbon" [style.backgroundColor]="dayEvent.event.color.primary"></div>
        <div class="cal-event-group">
          <div class="cal-event-title">{{ dayEvent.event.title }}</div>
          <div class="cal-event-description">{{ dayEvent.event?.description }}</div>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{ dayEvent: dayEvent, tooltipPosition: tooltipPosition, eventClicked: eventClicked }"
    >
    </ng-template>
  `,
})
export class NovoAgendaDayEventElement {
  @Input()
  dayEvent: DayViewEvent;

  @Input()
  tooltipPosition: string;

  @Input()
  customTemplate: TemplateRef<any>;

  @Output()
  eventClicked: EventEmitter<any> = new EventEmitter();
}
