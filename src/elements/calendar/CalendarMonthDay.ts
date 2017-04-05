import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { MonthViewDay, CalendarEvent, CalendarEventResponse } from '../../utils/calendar-utils/CalendarUtils';

@Component({
  selector: 'novo-calendar-month-day',
  template: `
    <template #defaultTemplate>
      <div class="calendar-day-top">
        <span class="calendar-day-badge" *ngIf="day.badgeTotal > 0">{{ day.badgeTotal }}</span>
        <span class="calendar-day-number">{{ day.date | dayofmonth:locale }}</span>
      </div>
      <div class="calendar-events">
        <div
          class="calendar-event"
          *ngFor="let event of day.events"
          [style.backgroundColor]="event.color.primary"
          [ngClass]="event?.cssClass"
          (click)="$event.stopPropagation(); eventClicked.emit({event:event})">
        </div>
      </div>
    </template>
    <template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngOutletContext]="{
        day: day,
        actions: actions,
        locale: locale,
        tooltipPlacement: tooltipPlacement,
        eventClicked: eventClicked,
        accepted: accepted,
        rejected: rejected,
        maybes: maybes
      }">
    </template>
  `,
  host: {
    '[class]': '"calendar-cell calendar-day-cell " + day?.cssClass',
    '[class.calendar-day-accepted]': 'accepted.length',
    '[class.calendar-day-rejected]': 'rejected.length',
    '[class.calendar-past]': 'day.isPast',
    '[class.calendar-today]': 'day.isToday',
    '[class.calendar-future]': 'day.isFuture',
    '[class.calendar-weekend]': 'day.isWeekend',
    '[class.calendar-in-month]': 'day.inMonth',
    '[class.calendar-out-month]': '!day.inMonth',
    '[class.calendar-has-events]': 'day.events.length > 0',
    '[style.backgroundColor]': 'day.backgroundColor'
  }
})
export class CalendarMonthDayElement {

  @Input() day: MonthViewDay;

  @Input() locale: string;

  @Input() tooltipPlacement: string;

  @Input() customTemplate: TemplateRef<any>;

  @Output() eventClicked: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{ event: CalendarEvent }>();

  get accepted(): Array<CalendarEvent> {
    if (!this.day) {
      return [];
    }
    return this.day.events.filter((evt) => {
      return (evt.response === CalendarEventResponse.Accepted);
    });
  }

  get rejected(): Array<CalendarEvent> {
    if (!this.day) {
      return [];
    }
    return this.day.events.filter((evt) => {
      return (evt.response === CalendarEventResponse.Rejected);
    });
  }

  get maybes(): Array<CalendarEvent> {
    if (!this.day) {
      return [];
    }
    return this.day.events.filter((evt) => {
      return (evt.response === CalendarEventResponse.Maybe);
    });
  }
}
