import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import * as dateFns from 'date-fns';
import { WeekDay } from 'novo-elements/utils';

@Component({
  selector: 'novo-agenda-month-header',
  template: `
    <ng-template #defaultTemplate>
      <div class="agenda-header">
        <div class="agenda-header-top">
          <novo-button theme="icon" icon="previous" (click)="prevMonth($event)"></novo-button>
          <div class="agenda-month">{{ viewDate | month: locale }}</div>
          <novo-button theme="icon" icon="next" (click)="nextMonth($event)"></novo-button>
        </div>
        <div class="agenda-weekdays">
          <div
            class="agenda-weekday"
            *ngFor="let day of days"
            [class.agenda-past]="day.isPast"
            [class.agenda-today]="day.isToday"
            [class.agenda-future]="day.isFuture"
            [class.agenda-weekend]="day.isWeekend"
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
export class NovoAgendaMonthHeaderElement {
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
