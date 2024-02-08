import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CalendarEvent, WeekDay } from 'novo-elements/utils';


// TODO: This component contains references to the angular-draggable-droppable library, which we're not currently importing.
// This includes properties on the drag-drop event that can never be there. Should it be cleaned up?
// https://mattlewis-github.com/angular-draggable-droppable/docs/directives/DroppableDirective.html#source
@Component({
  selector: 'novo-agenda-week-header',
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
          (click)="dayClicked.emit({ date: day.date })"
          mwlDroppable
          (dragEnter)="day.dragOver = true"
          (dragLeave)="day.dragOver = false"
          (drop)="day.dragOver = false; eventDropped.emit({ event: $any($event).dropData.event, newStart: day.date })"
        >
          <b>{{ day.date | weekday: locale:'long' }}</b
          ><br />
          <span>{{ day.date | monthday: locale }}</span>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{ days: days, locale: locale, dayClicked: dayClicked, eventDropped: eventDropped }"
    >
    </ng-template>
  `,
})
export class NovoAgendaWeekHeaderElement {
  @Input()
  days: WeekDay[];

  @Input()
  locale: string;

  @Input()
  customTemplate: TemplateRef<any>;

  @Output()
  dayClicked = new EventEmitter<{ date: Date, event?: CalendarEvent }>();

  @Output()
  eventDropped: EventEmitter<{ event: CalendarEvent; newStart: Date }> = new EventEmitter<{ event: CalendarEvent; newStart: Date }>();
}
