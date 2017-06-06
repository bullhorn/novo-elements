import { Component, Input, Output, EventEmitter, Inject, LOCALE_ID } from '@angular/core';

import * as addDays from 'date-fns/add_days';
import * as addWeeks from 'date-fns/add_weeks';
import * as addMonths from 'date-fns/add_months';

import * as startOfWeek from 'date-fns/start_of_week';
import * as endOfWeek from 'date-fns/end_of_week';

@Component({
    selector: 'novo-calendar-date-change',
    template: `
    <div class="cal-date-change">
        <i class="bhi-arrow-left" (click)="subtractDate()" ></i>
        <span [ngSwitch]="view">
            <span *ngSwitchCase="'month'">{{ ( viewDate | month:locale ) + ' ' + ( viewDate | year:locale ) }}</span>
            <span *ngSwitchCase="'week'">{{ ( startOfWeek | monthday:locale:'long' ) + ' - ' + ( endOfWeek | endofweekdisplay:startOfWeek:locale:'long' ) }}</span>
            <span *ngSwitchCase="'day'">{{ ( viewDate | weekday:locale:'long' ) + ', ' + ( viewDate | month:locale ) + ' ' + ( viewDate | dayofmonth:locale ) }}</span>
        </span>
        <i class="bhi-arrow-right" (click)="addDate()"></i>
    </div>
  `
})
export class NovoCalendarDateChangeElement {

  /**
   * The current view
   */
  @Input() view: string;

  /**
   * The current view date
   */
  @Input() viewDate: Date;

  @Input() locale: string;

  /**
   * Called when the view date is changed
   */
  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  constructor(@Inject(LOCALE_ID) locale: string) {
      this.locale = locale;
  }

  /**
   * @hidden
   */
  subtractDate(): void {
      this.changeDate(-1);
  }

  addDate(): void {
      this.changeDate(1);
  }

  changeDate(unit: number): void {
      const addFn: any = {
          day: addDays,
          week: addWeeks,
          month: addMonths
      }[this.view];

      this.viewDateChange.emit(addFn(this.viewDate, unit));
  }

  get startOfWeek() {
      return startOfWeek(this.viewDate);
  }

  get endOfWeek() {
      return endOfWeek(this.viewDate);
  }

}
