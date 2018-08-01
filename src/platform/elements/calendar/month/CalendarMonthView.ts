import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  LOCALE_ID,
  Inject,
  TemplateRef,
} from '@angular/core';
import {
  CalendarEvent,
  WeekDay,
  MonthView,
  MonthViewDay,
  CalendarEventTimesChangedEvent,
  getWeekViewHeader,
  getMonthView,
} from '../../../utils/calendar-utils/CalendarUtils';
import { Subject, Subscription } from 'rxjs';
import * as dateFns from 'date-fns';

/**
 * Shows all events on a given month. Example usage:
 *
 * ```
 * &lt;novo-calendar-month-view
 *  [viewDate]="viewDate"
 *  [events]="events"&gt;
 * &lt;/novo-calendar-month-view&gt;
 * ```
 */
@Component({
  selector: 'novo-calendar-month',
  template: `
    <div class="calendar-month-view">
       <novo-calendar-month-header
         [(viewDate)]="viewDate"
         [days]="columnHeaders"
         [locale]="locale"
         [customTemplate]="headerTemplate"
         (viewDateChange)="refreshAll()">
       </novo-calendar-month-header>
      <div class="calendar-days">
        <div *ngFor="let rowIndex of view.rowOffsets">
          <div class="calendar-cell-row">
            <novo-calendar-month-day
              *ngFor="let day of view.days | slice : rowIndex : rowIndex + (view.totalDaysVisibleInWeek)"
              [day]="day"
              [locale]="locale"
              [customTemplate]="cellTemplate"
              (click)="dayClicked.emit({day: day})"
              (eventClicked)="eventClicked.emit({ day: day, event: $event.event})">
            </novo-calendar-month-day>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class NovoCalendarMonthViewElement implements OnChanges, OnInit, OnDestroy {
  /**
   * The current view date
   */
  @Input()
  viewDate: Date;

  /**
   * An array of events to display on view
   */
  @Input()
  events: CalendarEvent[] = [];

  /**
   * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
   */
  @Input()
  excludeDays: number[] = [];

  /**
   * A function that will be called before each cell is rendered. The first argument will contain the calendar cell.
   * If you add the `cssClass` property to the cell it will add that class to the cell in the template
   */
  @Input()
  dayModifier: Function;

  /**
   * An observable that when emitted on will re-render the current view
   */
  @Input()
  refresh: Subject<any>;

  /**
   * The locale used to format dates
   */
  @Input()
  locale: string = 'en-US';

  /**
   * The placement of the event tooltip
   */
  @Input()
  tooltipPosition: string = 'top';

  /**
   * The start number of the week
   */
  @Input()
  weekStartsOn: number;

  /**
   * A custom template to use to replace the header
   */
  @Input()
  headerTemplate: TemplateRef<any>;

  /**
   * A custom template to use to replace the day cell
   */
  @Input()
  cellTemplate: TemplateRef<any>;

  /**
   * Called when the day cell is clicked
   */
  @Output()
  dayClicked: EventEmitter<{ day: MonthViewDay }> = new EventEmitter<{ day: MonthViewDay }>();

  /**
   * Called when the event title is clicked
   */
  @Output()
  eventClicked: EventEmitter<{ day: any; event: CalendarEvent }> = new EventEmitter<{ day: any; event: CalendarEvent }>();

  /**
   * Called when an event is dragged and dropped
   */
  @Output()
  eventTimesChanged: EventEmitter<CalendarEventTimesChangedEvent> = new EventEmitter<CalendarEventTimesChangedEvent>();

  @Output()
  viewDateChange: EventEmitter<Date> = new EventEmitter<Date>();

  /**
   * @hidden
   */
  columnHeaders: WeekDay[];

  /**
   * @hidden
   */
  view: MonthView;

  /**
   * @hidden
   */
  refreshSubscription: Subscription;

  /**
   * @hidden
   */
  constructor(private cdr: ChangeDetectorRef, @Inject(LOCALE_ID) locale: string) {
    this.locale = locale;
  }

  /**
   * @hidden
   */
  ngOnInit(): void {
    if (this.refresh) {
      this.refreshSubscription = this.refresh.subscribe(() => {
        this.refreshAll();
        this.cdr.markForCheck();
      });
    }
  }

  /**
   * @hidden
   */
  ngOnChanges(changes: any): void {
    if (changes.viewDate || changes.excludeDays) {
      this.refreshHeader();
    }
    if (changes.viewDate || changes.events || changes.excludeDays) {
      this.refreshBody();
    }
  }

  /**
   * @hidden
   */
  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  /**
   * @hidden
   */
  eventDropped(day: MonthViewDay, event: CalendarEvent): void {
    const year: number = dateFns.getYear(day.date);
    const month: number = dateFns.getMonth(day.date);
    const date: number = dateFns.getDate(day.date);
    const newStart: Date = dateFns.setYear(dateFns.setMonth(dateFns.setDate(event.start, date), month), year);
    let newEnd: Date;
    if (event.end) {
      const secondsDiff: number = dateFns.differenceInSeconds(newStart, event.start);
      newEnd = dateFns.addSeconds(event.end, secondsDiff);
    }
    this.eventTimesChanged.emit({ event, newStart, newEnd });
  }

  private refreshHeader(): void {
    this.columnHeaders = getWeekViewHeader({
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
    });
  }

  private refreshBody(): void {
    this.view = getMonthView({
      events: this.events,
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
    });
    if (this.dayModifier) {
      this.view.days.forEach((day) => this.dayModifier(day));
    }
  }

  public refreshAll(): void {
    this.refreshHeader();
    this.refreshBody();
    this.viewDateChange.emit(this.viewDate);
  }
}
