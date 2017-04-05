import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { WeekDay } from '../../utils/calendar-utils/CalendarUtils';
import addMonths from 'date-fns/add_months';
import subMonths from 'date-fns/sub_months';

@Component({
  selector: 'novo-calendar-month-header',
  template: `
    <template #defaultTemplate>
      <div class="calendar-header">
        <div class="calendar-header-top">
          <button theme="icon" icon="previous" (click)="prevMonth($event)"></button>
          <div class="calendar-month">{{ viewDate | month:locale }}</div>
          <!--<div class="calendar-year">{{ viewDate | year:locale }}</div>-->
          <button theme="icon" icon="next" (click)="nextMonth($event)"></button>
        </div>
        <div class="calendar-weekdays">
          <div
            class="calendar-weekday"
            *ngFor="let day of days"
            [class.calendar-past]="day.isPast"
            [class.calendar-today]="day.isToday"
            [class.calendar-future]="day.isFuture"
            [class.calendar-weekend]="day.isWeekend">
            {{ day.date | weekday:locale }}
          </div>
        </div>
      </div>
    </template>
    <template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngOutletContext]="{days: days, locale: locale, viewDate: viewDate}">
    </template>
  `
})
export class CalendarMonthHeaderElement {
  @Input() viewDate: Date;

  @Input() days: WeekDay[];

  @Input() locale: string;

  @Input() customTemplate: TemplateRef<any>;

  /**
   * Called when the view date is changed
   */
  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  prevMonth() {
    this.viewDateChange.emit(subMonths(this.viewDate, 1));
  }

  nextMonth() {
    this.viewDateChange.emit(addMonths(this.viewDate, 1));
  }

}
