import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { addSeconds, differenceInSeconds, getDate, getMonth, getYear, setDate, setMonth, setYear } from 'date-fns';
import { Subject, Subscription } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  getMonthView,
  getWeekViewHeader,
  MonthView,
  MonthViewDay,
  WeekDay,
} from 'novo-elements/utils';

/**
 * Shows all events on a given month. Example usage:
 *
 * ```
 * &lt;novo-agenda-month-view
 *  [viewDate]="viewDate"
 *  [events]="events"&gt;
 * &lt;/novo-agenda-month-view&gt;
 * ```
 */
@Component({
  selector: 'novo-agenda-month',
  template: `
    <div class="agenda-month-view">
      <novo-agenda-month-header
        [(viewDate)]="viewDate"
        [days]="columnHeaders"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (viewDateChange)="refreshAll()"
        >
      </novo-agenda-month-header>
      <div class="agenda-days">
        @for (rowIndex of view.rowOffsets; track rowIndex) {
          <div>
            <div class="agenda-cell-row">
              @for (day of view.days | slice: rowIndex:rowIndex + view.totalDaysVisibleInWeek; track day) {
                <novo-agenda-month-day
                  [day]="day"
                  [locale]="locale"
                  [customTemplate]="cellTemplate"
                  (click)="dayClicked.emit({ day: day })"
                  (eventClicked)="eventClicked.emit({ day: day, event: $event.event })"
                  >
                </novo-agenda-month-day>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styleUrls: ['./AgendaMonthView.scss'],
  standalone: false
})
export class NovoAgendaMonthViewElement implements OnChanges, OnInit, OnDestroy {
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
  weekStartsOn: Day;

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
    const year: number = getYear(day.date);
    const month: number = getMonth(day.date);
    const date: number = getDate(day.date);
    const newStart: Date = setYear(setMonth(setDate(event.start, date), month), year);
    let newEnd: Date;
    if (event.end) {
      const secondsDiff: number = differenceInSeconds(newStart, event.start);
      newEnd = addSeconds(event.end, secondsDiff);
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
