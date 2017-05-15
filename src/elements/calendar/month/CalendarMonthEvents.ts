import { Component, Input, Output, EventEmitter, TemplateRef, trigger, style, transition, animate } from '@angular/core';
// import { trigger, style, transition, animate } from '@angular/animations';
import { CalendarEvent } from '../../../utils/calendar-utils/CalendarUtils';

@Component({
    selector: 'novo-calendar-month-events',
    template: `
    <template #defaultTemplate>
      <div
        *ngFor="let event of events"
        [ngClass]="event?.cssClass"
        <span class="cal-event" [style.backgroundColor]="event.color.primary"></span>
        <novo-calendar-event-title [event]="event" view="month" (click)="eventClicked.emit({event: event})"></novo-calendar-event-title>
        <novo-calendar-event-actions [event]="event"></novo-calendar-event-actions>
      </div>
    </template>
    <div class="cal-open-day-events" [@collapse] *ngIf="isOpen">
      <template [ngTemplateOutlet]="customTemplate || defaultTemplate"
        [ngOutletContext]="{
          events: events,
          eventClicked: eventClicked
        }">
      </template>
    </div>
  `,
    animations: [
        trigger('collapse', [
            transition('void => *', [
                style({ height: 0 }),
                animate('150ms linear', style({ height: '*' }))
            ]),
            transition('* => void', [
                style({ height: '*' }),
                animate('150ms linear', style({ height: 0 }))
            ])
        ])
    ]
})
export class NovoCalendarMonthEventsElement {

    @Input() isOpen: boolean = false;

    @Input() events: CalendarEvent[];

    @Input() customTemplate: TemplateRef<any>;

    @Output() eventClicked: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{ event: CalendarEvent }>();

}
