import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import * as dateFns from 'date-fns';
import { WeekDay } from '../../../utils/calendar-utils/CalendarUtils';

@Component({
  selector: 'novo-calendar-month-header',
  template: `
    <ng-template #defaultTemplate>
      <div class="calendar-header">
        <div class="calendar-header-top">
          <novo-button theme="icon" icon="previous" (click)="prevMonth($event)"></novo-button>>
          <div class="calendar-month">{{ viewDate | month: locale }}</div>
          <novo-button theme="icon" icon="next" (click)="nextMonth($event)"></novo-button>>
        </div>
        <div class="calendar-weekdays">
          <div
            class="calendar-weekday"
            *ngFor="let day of days"
            [class.calendar-past]="day.isPast"
            [class.calendar-today]="day.isToday"
            [class.calendar-future]="day.isFuture"
            [class.calendar-weekend]="day.isWeekend"
          >
            {{ day.date | weekday: locale }}
          </div>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{ days: days, locale: locale, viewDate: viewDate }"
    >
    </ng-template>
  `,
})
export class NovoCalendarMonthHeaderElement {
  @Input()
  viewDate: Date;

  @Input()
  days: WeekDay[];

  @Input()
  locale: string;

  @Input()
  customTemplate: TemplateRef<any>;

  /**
   * Called when the view date is changed
   */
  @Output()
  viewDateChange: EventEmitter<Date> = new EventEmitter();

  prevMonth(event: Event) {
    this.viewDateChange.emit(dateFns.subMonths(this.viewDate, 1));
  }

  nextMonth(event: Event) {
    this.viewDateChange.emit(dateFns.addMonths(this.viewDate, 1));
  }
}
