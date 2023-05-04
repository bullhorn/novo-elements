import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CalendarEvent, CalendarEventResponse, MonthViewDay } from 'novo-elements/utils';

@Component({
  selector: 'novo-agenda-month-day',
  template: `
    <ng-template #defaultTemplate>
      <div class="agenda-day-top">
        <span class="agenda-day-badge" *ngIf="day.badgeTotal > 0">{{ day.badgeTotal }}</span>
        <span class="agenda-day-number">{{ day.date | dayofmonth: locale }}</span>
      </div>
      <div class="agenda-events">
        <div
          class="agenda-event"
          *ngFor="let type of day.events | groupBy: 'type'"
          [style.backgroundColor]="type?.value[0]?.color.primary"
          [ngClass]="type?.value[0]?.cssClass"
          (click)="$event.stopPropagation(); eventClicked.emit({ event: type?.value[0] })"
        >
          {{ type?.value.length }}
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        day: day,
        locale: locale,
        tooltipPosition: tooltipPosition,
        eventClicked: eventClicked,
        accepted: accepted,
        rejected: rejected,
        maybes: maybes
      }"
    >
    </ng-template>
  `,
  host: {
    '[class]': '"agenda-cell agenda-day-cell " + day?.cssClass',
    '[class.agenda-day-accepted]': 'accepted.length',
    '[class.agenda-day-rejected]': 'rejected.length',
    '[class.agenda-past]': 'day.isPast',
    '[class.agenda-today]': 'day.isToday',
    '[class.agenda-future]': 'day.isFuture',
    '[class.agenda-weekend]': 'day.isWeekend',
    '[class.agenda-in-month]': 'day.inMonth',
    '[class.agenda-out-month]': '!day.inMonth',
    '[class.agenda-has-events]': 'day.events.length > 0',
    '[style.backgroundColor]': 'day.backgroundColor',
  },
})
export class NovoAgendaMonthDayElement {
  @Input()
  day: MonthViewDay;

  @Input()
  locale: string;

  @Input()
  tooltipPosition: string;

  @Input()
  customTemplate: TemplateRef<any>;

  @Output()
  eventClicked: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{ event: CalendarEvent }>();

  get accepted(): Array<CalendarEvent> {
    if (!this.day) {
      return [];
    }
    return this.day.events.filter((evt) => {
      return evt.response === CalendarEventResponse.Accepted;
    });
  }

  get rejected(): Array<CalendarEvent> {
    if (!this.day) {
      return [];
    }
    return this.day.events.filter((evt) => {
      return evt.response === CalendarEventResponse.Rejected;
    });
  }

  get maybes(): Array<CalendarEvent> {
    if (!this.day) {
      return [];
    }
    return this.day.events.filter((evt) => {
      return evt.response === CalendarEventResponse.Maybe;
    });
  }
}
