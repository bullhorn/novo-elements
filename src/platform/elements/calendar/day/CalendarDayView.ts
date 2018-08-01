import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  LOCALE_ID,
  Inject,
  OnInit,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import {
  CalendarEvent,
  DayView,
  DayViewHour,
  DayViewHourSegment,
  DayViewEvent,
  CalendarEventTimesChangedEvent,
  getDayView,
  getDayViewHourGrid,
} from '../../../utils/calendar-utils/CalendarUtils';
import { Subject, Subscription } from 'rxjs';

/**
 * @hidden
 */
const SEGMENT_HEIGHT: number = 30;

/**
 * @hidden
 */
const MINUTES_IN_HOUR: number = 60;

/**
 * Shows all events on a given day. Example usage:
 *
 * ```typescript
 * &lt;novo-calendar-day
 *  [viewDate]="viewDate"
 *  [events]="events"&gt;
 * &lt;/novo-calendar-day&gt;
 * ```
 */
@Component({
  selector: 'novo-calendar-day',
  template: `
    <div class="cal-day-view" #dayViewContainer>
      <novo-calendar-all-day-event
        *ngFor="let event of view.allDayEvents"
        [event]="event"
        [customTemplate]="allDayEventTemplate"
        (eventClicked)="eventClicked.emit({event: event})">
      </novo-calendar-all-day-event>
      <div class="cal-hour-rows">
        <div class="cal-events">
          <div
            #event
            *ngFor="let dayEvent of view?.events"
            class="cal-event-container"
            [style.marginTop.px]="dayEvent.top"
            [style.height.px]="dayEvent.height"
            [style.marginLeft.px]="dayEvent.left + 70"
            [style.width.px]="dayEvent.width - 1">
            <novo-calendar-day-event
              [dayEvent]="dayEvent"
              [tooltipPosition]="tooltipPosition"
              [customTemplate]="eventTemplate"
              (eventClicked)="eventClicked.emit($event)">
            </novo-calendar-day-event>
          </div>
        </div>
        <div class="cal-hour" *ngFor="let hour of hours" [style.minWidth.px]="view?.width + 70">
          <novo-calendar-day-hour-segment
            *ngFor="let segment of hour.segments"
            [segment]="segment"
            [locale]="locale"
            [customTemplate]="hourSegmentTemplate"
            (click)="hourSegmentClicked.emit({date: segment.date})">
          </novo-calendar-day-hour-segment>
        </div>
      </div>
    </div>
  `,
})
export class NovoCalendarDayViewElement implements OnChanges, OnInit, OnDestroy {
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
   * The width in pixels of each event on the view
   */
  @Input()
  eventWidth: number = 150;

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
   * A function that will be called before each hour segment is called. The first argument will contain the hour segment.
   * If you add the `cssClass` property to the segment it will add that class to the hour segment in the template
   */
  @Input()
  hourSegmentModifier: Function;

  /**
   * The grid size to snap resizing and dragging of events to
   */
  @Input()
  eventSnapSize: number = 30;

  /**
   * The placement of the event tooltip
   */
  @Input()
  tooltipPosition: string = 'top';

  /**
   * A custom template to use to replace the hour segment
   */
  @Input()
  hourSegmentTemplate: TemplateRef<any>;

  /**
   * A custom template to use for all day events
   */
  @Input()
  allDayEventTemplate: TemplateRef<any>;

  /**
   * A custom template to use for day view events
   */
  @Input()
  eventTemplate: TemplateRef<any>;

  /**
   * Called when an event title is clicked
   */
  @Output()
  eventClicked: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{ event: CalendarEvent }>();

  /**
   * Called when an hour segment is clicked
   */
  @Output()
  hourSegmentClicked: EventEmitter<{ date: Date }> = new EventEmitter<{ date: Date }>();

  /**
   * Called when an event is resized or dragged and dropped
   */
  @Output()
  eventTimesChanged: EventEmitter<CalendarEventTimesChangedEvent> = new EventEmitter<CalendarEventTimesChangedEvent>();

  /**
   * @hidden
   */
  hours: DayViewHour[] = [];

  /**
   * @hidden
   */
  view: DayView;

  /**
   * @hidden
   */
  width: number = 0;

  /**
   * @hidden
   */
  refreshSubscription: Subscription;

  /**
   * @hidden
   */
  currentResize: {
    originalTop: number;
    originalHeight: number;
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
  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  /**
   * @hidden
   */
  ngOnChanges(changes: any): void {
    if (changes.viewDate || changes.dayStartHour || changes.dayStartMinute || changes.dayEndHour || changes.dayEndMinute) {
      this.refreshHourGrid();
    }

    if (
      changes.viewDate ||
      changes.events ||
      changes.dayStartHour ||
      changes.dayStartMinute ||
      changes.dayEndHour ||
      changes.dayEndMinute ||
      changes.eventWidth
    ) {
      this.refreshView();
    }
  }

  /*
    eventDropped(dropEvent: {dropData?: {event?: CalendarEvent}}, segment: DayViewHourSegment): void {
      if (dropEvent.dropData && dropEvent.dropData.event) {
        this.eventTimesChanged.emit({event: dropEvent.dropData.event, newStart: segment.date});
      }
    }

    resizeStarted(event: DayViewEvent, resizeEvent: ResizeEvent, dayViewContainer: HTMLElement): void {
      this.currentResize = {
        originalTop: event.top,
        originalHeight: event.height,
        edge: typeof resizeEvent.edges.top !== 'undefined' ? 'top' : 'bottom'
      };
      const resizeHelper: CalendarResizeHelper = new CalendarResizeHelper(dayViewContainer);
      this.validateResize = ({rectangle}) => resizeHelper.validateResize({rectangle});
      this.cdr.detectChanges();
    }

    resizing(event: DayViewEvent, resizeEvent: ResizeEvent): void {
      if (resizeEvent.edges.top) {
        event.top = this.currentResize.originalTop + +resizeEvent.edges.top;
        event.height = this.currentResize.originalHeight - +resizeEvent.edges.top;
      } else if (resizeEvent.edges.bottom) {
        event.height = this.currentResize.originalHeight + +resizeEvent.edges.bottom;
      }
    }

    resizeEnded(dayEvent: DayViewEvent): void {

      let pixelsMoved: number;
      if (this.currentResize.edge === 'top') {
        pixelsMoved = (dayEvent.top - this.currentResize.originalTop);
      } else {
        pixelsMoved = (dayEvent.height - this.currentResize.originalHeight);
      }

      dayEvent.top = this.currentResize.originalTop;
      dayEvent.height = this.currentResize.originalHeight;

      const pixelAmountInMinutes: number = MINUTES_IN_HOUR / (this.hourSegments * SEGMENT_HEIGHT);
      const minutesMoved: number = pixelsMoved * pixelAmountInMinutes;
      let newStart: Date = dayEvent.event.start;
      let newEnd: Date = dayEvent.event.end;
      if (this.currentResize.edge === 'top') {
        newStart = addMinutes(newStart, minutesMoved);
      } else if (newEnd) {
        newEnd = addMinutes(newEnd, minutesMoved);
      }

      this.eventTimesChanged.emit({newStart, newEnd, event: dayEvent.event});
      this.currentResize = null;

    }

    dragStart(event: HTMLElement, dayViewContainer: HTMLElement): void {
      const dragHelper: CalendarDragHelper = new CalendarDragHelper(dayViewContainer, event);
      this.validateDrag = ({x, y}) => !this.currentResize && dragHelper.validateDrag({x, y});
      this.cdr.detectChanges();
    }

    eventDragged(dayEvent: DayViewEvent, draggedInPixels: number): void {
      const pixelAmountInMinutes: number = MINUTES_IN_HOUR / (this.hourSegments * SEGMENT_HEIGHT);
      const minutesMoved: number = draggedInPixels * pixelAmountInMinutes;
      const newStart: Date = addMinutes(dayEvent.event.start, minutesMoved);
      let newEnd: Date;
      if (dayEvent.event.end) {
        newEnd = addMinutes(dayEvent.event.end, minutesMoved);
      }
      this.eventTimesChanged.emit({newStart, newEnd, event: dayEvent.event});
    }
    */

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
    if (this.hourSegmentModifier) {
      this.hours.forEach((hour) => {
        hour.segments.forEach((segment) => this.hourSegmentModifier(segment));
      });
    }
  }

  private refreshView(): void {
    this.view = getDayView({
      events: this.events,
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
      eventWidth: this.eventWidth,
      segmentHeight: SEGMENT_HEIGHT,
    });
  }

  private refreshAll(): void {
    this.refreshHourGrid();
    this.refreshView();
  }
}
