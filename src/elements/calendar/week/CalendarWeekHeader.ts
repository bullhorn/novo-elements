import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CalendarEvent, WeekDay } from '../../../utils/calendar-utils/CalendarUtils';

@Component({
    selector: 'novo-calendar-week-header',
    template: `
    <ng-template #defaultTemplate>
      <div class="cal-day-headers">
        <div
          class="cal-header"
          *ngFor="let day of days"
          [class.cal-past]="day.isPast"
          [class.cal-today]="day.isToday"
          [class.cal-future]="day.isFuture"
          [class.cal-weekend]="day.isWeekend"
          [class.cal-drag-over]="day.dragOver"
          (click)="dayClicked.emit({date: day.date})"
          mwlDroppable
          (dragEnter)="day.dragOver = true"
          (dragLeave)="day.dragOver = false"
          (drop)="day.dragOver = false; eventDropped.emit({event: $event.dropData.event, newStart: day.date})">
          <b>{{ day.date | weekday:locale:'long'}}</b><br>
          <span>{{ day.date | monthday:locale }}</span>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngOutletContext]="{days: days, locale: locale, dayClicked: dayClicked, eventDropped: eventDropped}">
    </ng-template>
  `
})
export class NovoCalendarWeekHeaderElement {

    @Input() days: WeekDay[];

    @Input() locale: string;

    @Input() customTemplate: TemplateRef<any>;

    @Output() dayClicked: EventEmitter<{ date: Date }> = new EventEmitter<{ date: Date }>();

    @Output() eventDropped: EventEmitter<{ event: CalendarEvent, newStart: Date }> = new EventEmitter<{ event: CalendarEvent, newStart: Date }>();

}
