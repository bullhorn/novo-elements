import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CalendarEvent, WeekDay } from 'novo-elements/utils';

@Component({
  selector: 'novo-agenda-week-header',
  template: `
    <ng-template #defaultTemplate>
      <div class="cal-day-headers">
        @for (day of days; track day) {
          <div
            class="cal-header"
            [class.cal-past]="day.isPast"
            [class.cal-today]="day.isToday"
            [class.cal-future]="day.isFuture"
            [class.cal-weekend]="day.isWeekend"
            [class.cal-drag-over]="$any(day).dragOver"
            (click)="dayClicked.emit({ date: day.date })"
            mwlDroppable
            (dragEnter)="$any(day).dragOver = true"
            (dragLeave)="$any(day).dragOver = false"
            (drop)="$any(day).dragOver = false; eventDropped.emit({ event: $event.dropData.event, newStart: day.date })"
            >
            <b>{{ day.date | weekday: locale:'long' }}</b
              ><br />
              <span>{{ day.date | monthday: locale }}</span>
            </div>
          }
        </div>
      </ng-template>
      <ng-template
        [ngTemplateOutlet]="customTemplate || defaultTemplate"
        [ngTemplateOutletContext]="{ days: days, locale: locale, dayClicked: dayClicked, eventDropped: eventDropped }"
        >
      </ng-template>
  `,
  standalone: false
})
export class NovoAgendaWeekHeaderElement {
  @Input()
  days: WeekDay[];

  @Input()
  locale: string;

  @Input()
  customTemplate: TemplateRef<any>;

  @Output()
  dayClicked: EventEmitter<{ date: Date }> = new EventEmitter<{ date: Date }>();

  @Output()
  eventDropped: EventEmitter<{ event: CalendarEvent; newStart: Date }> = new EventEmitter<{ event: CalendarEvent; newStart: Date }>();
}
