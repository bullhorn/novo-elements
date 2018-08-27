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
import { Subject, Subscription } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  DayViewHour,
  getDayViewHourGrid,
  getWeekView,
  getWeekViewHeader,
  WeekDay,
  WeekViewEventRow,
} from '../../../utils/calendar-utils/CalendarUtils';

/**
 * @hidden
 */
const SEGMENT_HEIGHT: number = 30;

/**
 * @hidden
 */
const MINUTES_IN_HOUR: number = 60;
/**
 * Shows all events on a given week. Example usage:
 *
 * ```typescript
 * &lt;novo-calendar-week
 *  [viewDate]="viewDate"
 *  [events]="events"&gt;
 * &lt;/novo-calendar-week&gt;
 * ```
 */
@Component({
  selector: 'novo-calendar-week',
  template: `
    <div class="cal-week-view" #weekViewContainer>
      <novo-calendar-week-header
        [days]="days"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (dayClicked)="dayClicked.emit($event)">
      </novo-calendar-week-header>
      <div *ngFor="let eventRow of eventRows" #eventRowContainer>
        <div
          class="cal-event-container"
          #event
          *ngFor="let weekEvent of eventRow.row"
          [style.width]="((100 / days.length) * weekEvent.span) + '%'"
          [style.marginTop.px]="weekEvent.top"
          [style.height.px]="weekEvent.height"
          [style.marginLeft]="((100 / days.length) * weekEvent.offset) + '%'">
          <novo-calendar-week-event
            [weekEvent]="weekEvent"
            [tooltipPosition]="tooltipPosition"
            [customTemplate]="eventTemplate"
            (eventClicked)="eventClicked.emit($event)">
          </novo-calendar-week-event>
        </div>
      </div>
      <div class="cal-hour" *ngFor="let hour of hours" [style.minWidth.px]="70">
        <novo-calendar-day-hour-segment
          *ngFor="let segment of hour.segments"
          [segment]="segment"
          [locale]="locale"
          [customTemplate]="hourSegmentTemplate"
          (click)="hourSegmentClicked.emit({date: segment.date})">
        </novo-calendar-day-hour-segment>
      </div>
    </div>
  `,
})
export class NovoCalendarWeekViewElement implements OnChanges, OnInit, OnDestroy {
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
   * An observable that when emitted on will re-render the current view
   */
  @Input()
  refresh: Subject<any>;

  /**
   * The locale used to format dates
   */
  @Input()
  locale: string;

  /**
   * The placement of the event tooltip
   */
  @Input()
  tooltipPosition: string = 'bottom';

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
   * A custom template to use for week view events
   */
  @Input()
  eventTemplate: TemplateRef<any>;

  /**
   * The precision to display events.
   * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
   */
  @Input()
  precision: 'days' | 'minutes' = 'days';
  /**
   * The number of segments in an hour. Must be <= 6
   */
  @Input()
  hourSegments: number = 2;

  /**
   * The day start hours in 24 hour time. Must be 0-23
   */
  @Input()
  dayStartHour: number = 0;

  /**
   * The day start minutes. Must be 0-59
   */
  @Input()
  dayStartMinute: number = 0;

  /**
   * The day end hours in 24 hour time. Must be 0-23
   */
  @Input()
  dayEndHour: number = 23;

  /**
   * The day end minutes. Must be 0-59
   */
  @Input()
  dayEndMinute: number = 59;
  /**
   * A custom template to use to replace the hour segment
   */
  @Input()
  hourSegmentTemplate: TemplateRef<any>;
  /**
   * Called when an hour segment is clicked
   */
  @Output()
  hourSegmentClicked: EventEmitter<{ date: Date }> = new EventEmitter<{ date: Date }>();
  /**
   * Called when a header week day is clicked
   */
  @Output()
  dayClicked: EventEmitter<{ date: Date }> = new EventEmitter<{ date: Date }>();

  /**
   * Called when the event title is clicked
   */
  @Output()
  eventClicked: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{ event: CalendarEvent }>();

  /**
   * Called when an event is resized or dragged and dropped
   */
  @Output()
  eventTimesChanged: EventEmitter<CalendarEventTimesChangedEvent> = new EventEmitter<CalendarEventTimesChangedEvent>();

  /**
   * @hidden
   */
  days: WeekDay[];
  /**
   * @hidden
   */
  hours: DayViewHour[] = [];

  /**
   * @hidden
   */
  eventRows: WeekViewEventRow[] = [];

  /**
   * @hidden
   */
  refreshSubscription: Subscription;

  /**
   * @hidden
   */
  currentResize: {
    originalOffset: number;
    originalSpan: number;
    edge: string;
  };

  /**
   * @hidden
   */
  validateDrag: Function;

  /**
   * @hidden
   */
  validateResize: Function;

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
        this.cdr.detectChanges();
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

    if (changes.events || changes.viewDate || changes.excludeDays) {
      this.refreshBody();
    }

    if (changes.viewDate || changes.dayStartHour || changes.dayStartMinute || changes.dayEndHour || changes.dayEndMinute) {
      this.refreshHourGrid();
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

  /*
    resizeStarted(weekViewContainer: HTMLElement, weekEvent: WeekViewEvent, resizeEvent: ResizeEvent): void {
      this.currentResize = {
        originalOffset: weekEvent.offset,
        originalSpan: weekEvent.span,
        edge: typeof resizeEvent.edges.left !== 'undefined' ? 'left' : 'right'
      };
      const resizeHelper: CalendarResizeHelper = new CalendarResizeHelper(weekViewContainer, this.getDayColumnWidth(weekViewContainer));
      this.validateResize = ({rectangle}) => resizeHelper.validateResize({rectangle});
      this.cdr.detectChanges();
    }

    resizing(weekEvent: WeekViewEvent, resizeEvent: ResizeEvent, dayWidth: number): void {
      if (resizeEvent.edges.left) {
        const diff: number = Math.round(+resizeEvent.edges.left / dayWidth);
        weekEvent.offset = this.currentResize.originalOffset + diff;
        weekEvent.span = this.currentResize.originalSpan - diff;
      } else if (resizeEvent.edges.right) {
        const diff: number = Math.round(+resizeEvent.edges.right / dayWidth);
        weekEvent.span = this.currentResize.originalSpan + diff;
      }
    }

    resizeEnded(weekEvent: WeekViewEvent): void {

      let daysDiff: number;
      if (this.currentResize.edge === 'left') {
        daysDiff = weekEvent.offset - this.currentResize.originalOffset;
      } else {
        daysDiff = weekEvent.span - this.currentResize.originalSpan;
      }

      weekEvent.offset = this.currentResize.originalOffset;
      weekEvent.span = this.currentResize.originalSpan;

      let newStart: Date = weekEvent.event.start;
      let newEnd: Date = weekEvent.event.end;
      if (this.currentResize.edge === 'left') {
        newStart = addDays(newStart, daysDiff);
      } else if (newEnd) {
        newEnd = addDays(newEnd, daysDiff);
      }

      this.eventTimesChanged.emit({newStart, newEnd, event: weekEvent.event});
      this.currentResize = null;

    }

    eventDragged(weekEvent: WeekViewEvent, draggedByPx: number, dayWidth: number): void {

      const daysDragged: number = draggedByPx / dayWidth;
      const newStart: Date = addDays(weekEvent.event.start, daysDragged);
      let newEnd: Date;
      if (weekEvent.event.end) {
        newEnd = addDays(weekEvent.event.end, daysDragged);
      }

      this.eventTimesChanged.emit({newStart, newEnd, event: weekEvent.event});

    }

    dragStart(weekViewContainer: HTMLElement, event: HTMLElement): void {
      const dragHelper: CalendarDragHelper = new CalendarDragHelper(weekViewContainer, event);
      this.validateDrag = ({x, y}) => !this.currentResize && dragHelper.validateDrag({x, y});
      this.cdr.detectChanges();
    }
    */

  getDayColumnWidth(eventRowContainer: HTMLElement): number {
    return Math.floor(eventRowContainer.offsetWidth / this.days.length);
  }

  private refreshHeader(): void {
    this.days = getWeekViewHeader({
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
    });
  }

  private refreshBody(): void {
    this.eventRows = getWeekView({
      events: this.events,
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      hourSegments: this.hourSegments,
      segmentHeight: SEGMENT_HEIGHT,
      dayStart: {
        hour: this.dayStartHour,
        minute: this.dayStartMinute,
      },
      dayEnd: {
        hour: this.dayEndHour,
        minute: this.dayEndMinute,
      },
      // precision: this.precision
    });
  }

  private refreshHourGrid(): void {
    this.hours = getDayViewHourGrid({
      viewDate: this.viewDate,
      hourSegments: this.hourSegments,
      dayStart: {
        hour: this.dayStartHour,
        minute: this.dayStartMinute,
      },
      dayEnd: {
        hour: this.dayEndHour,
        minute: this.dayEndMinute,
      },
    });
    // if (this.hourSegmentModifier) {
    //   this.hours.forEach(hour => {
    //     hour.segments.forEach(segment => this.hourSegmentModifier(segment));
    //   });
    // }
  }

  private refreshAll(): void {
    this.refreshHeader();
    this.refreshHourGrid();
    this.refreshBody();
  }
}
