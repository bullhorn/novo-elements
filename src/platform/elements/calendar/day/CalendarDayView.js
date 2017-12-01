"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CalendarUtils_1 = require("../../../utils/calendar-utils/CalendarUtils");
//import { ResizeEvent } from 'angular-resizable-element';
// import * as dateFns from 'date-fns';
// import { CalendarDragHelper } from '../../providers/calendarDragHelper.provider';
// import { CalendarResizeHelper } from '../../providers/calendarResizeHelper.provider';
// import { CalendarEventTimesChangedEvent } from '../../interfaces/calendarEventTimesChangedEvent.interface';
/**
 * @hidden
 */
var SEGMENT_HEIGHT = 30;
/**
 * @hidden
 */
var MINUTES_IN_HOUR = 60;
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
var NovoCalendarDayViewElement = (function () {
    /**
     * @hidden
     */
    function NovoCalendarDayViewElement(cdr, locale) {
        this.cdr = cdr;
        /**
         * An array of events to display on view
         */
        this.events = [];
        /**
         * The number of segments in an hour. Must be <= 6
         */
        this.hourSegments = 2;
        /**
         * The day start hours in 24 hour time. Must be 0-23
         */
        this.dayStartHour = 0;
        /**
         * The day start minutes. Must be 0-59
         */
        this.dayStartMinute = 0;
        /**
         * The day end hours in 24 hour time. Must be 0-23
         */
        this.dayEndHour = 23;
        /**
         * The day end minutes. Must be 0-59
         */
        this.dayEndMinute = 59;
        /**
         * The width in pixels of each event on the view
         */
        this.eventWidth = 150;
        /**
         * The grid size to snap resizing and dragging of events to
         */
        this.eventSnapSize = 30;
        /**
         * The placement of the event tooltip
         */
        this.tooltipPosition = 'top';
        /**
         * Called when an event title is clicked
         */
        this.eventClicked = new core_1.EventEmitter();
        /**
         * Called when an hour segment is clicked
         */
        this.hourSegmentClicked = new core_1.EventEmitter();
        /**
         * Called when an event is resized or dragged and dropped
         */
        this.eventTimesChanged = new core_1.EventEmitter();
        /**
         * @hidden
         */
        this.hours = [];
        /**
         * @hidden
         */
        this.width = 0;
        this.locale = locale;
    }
    /**
     * @hidden
     */
    NovoCalendarDayViewElement.prototype.ngOnInit = function () {
        var _this = this;
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(function () {
                _this.refreshAll();
                _this.cdr.detectChanges();
            });
        }
    };
    /**
     * @hidden
     */
    NovoCalendarDayViewElement.prototype.ngOnDestroy = function () {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    NovoCalendarDayViewElement.prototype.ngOnChanges = function (changes) {
        if (changes.viewDate ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute) {
            this.refreshHourGrid();
        }
        if (changes.viewDate ||
            changes.events ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute ||
            changes.eventWidth) {
            this.refreshView();
        }
    };
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
    NovoCalendarDayViewElement.prototype.refreshHourGrid = function () {
        var _this = this;
        this.hours = CalendarUtils_1.getDayViewHourGrid({
            viewDate: this.viewDate,
            hourSegments: this.hourSegments,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            }
        });
        if (this.hourSegmentModifier) {
            this.hours.forEach(function (hour) {
                hour.segments.forEach(function (segment) { return _this.hourSegmentModifier(segment); });
            });
        }
    };
    NovoCalendarDayViewElement.prototype.refreshView = function () {
        this.view = CalendarUtils_1.getDayView({
            events: this.events,
            viewDate: this.viewDate,
            hourSegments: this.hourSegments,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            },
            eventWidth: this.eventWidth,
            segmentHeight: SEGMENT_HEIGHT
        });
    };
    NovoCalendarDayViewElement.prototype.refreshAll = function () {
        this.refreshHourGrid();
        this.refreshView();
    };
    return NovoCalendarDayViewElement;
}());
NovoCalendarDayViewElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-calendar-day',
                template: "\n    <div class=\"cal-day-view\" #dayViewContainer>\n      <novo-calendar-all-day-event\n        *ngFor=\"let event of view.allDayEvents\"\n        [event]=\"event\"\n        [customTemplate]=\"allDayEventTemplate\"\n        (eventClicked)=\"eventClicked.emit({event: event})\">\n      </novo-calendar-all-day-event>\n      <div class=\"cal-hour-rows\">\n        <div class=\"cal-events\">\n          <div\n            #event\n            *ngFor=\"let dayEvent of view?.events\"\n            class=\"cal-event-container\"\n            [style.marginTop.px]=\"dayEvent.top\"\n            [style.height.px]=\"dayEvent.height\"\n            [style.marginLeft.px]=\"dayEvent.left + 70\"\n            [style.width.px]=\"dayEvent.width - 1\">\n            <novo-calendar-day-event\n              [dayEvent]=\"dayEvent\"\n              [tooltipPosition]=\"tooltipPosition\"\n              [customTemplate]=\"eventTemplate\"\n              (eventClicked)=\"eventClicked.emit($event)\">\n            </novo-calendar-day-event>\n          </div>\n        </div>\n        <div class=\"cal-hour\" *ngFor=\"let hour of hours\" [style.minWidth.px]=\"view?.width + 70\">\n          <novo-calendar-day-hour-segment\n            *ngFor=\"let segment of hour.segments\"\n            [segment]=\"segment\"\n            [locale]=\"locale\"\n            [customTemplate]=\"hourSegmentTemplate\"\n            (click)=\"hourSegmentClicked.emit({date: segment.date})\">\n          </novo-calendar-day-hour-segment>\n        </div>\n      </div>\n    </div>\n  "
            },] },
];
/** @nocollapse */
NovoCalendarDayViewElement.ctorParameters = function () { return [
    { type: core_1.ChangeDetectorRef, },
    { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.LOCALE_ID,] },] },
]; };
NovoCalendarDayViewElement.propDecorators = {
    'viewDate': [{ type: core_1.Input },],
    'events': [{ type: core_1.Input },],
    'hourSegments': [{ type: core_1.Input },],
    'dayStartHour': [{ type: core_1.Input },],
    'dayStartMinute': [{ type: core_1.Input },],
    'dayEndHour': [{ type: core_1.Input },],
    'dayEndMinute': [{ type: core_1.Input },],
    'eventWidth': [{ type: core_1.Input },],
    'refresh': [{ type: core_1.Input },],
    'locale': [{ type: core_1.Input },],
    'hourSegmentModifier': [{ type: core_1.Input },],
    'eventSnapSize': [{ type: core_1.Input },],
    'tooltipPosition': [{ type: core_1.Input },],
    'hourSegmentTemplate': [{ type: core_1.Input },],
    'allDayEventTemplate': [{ type: core_1.Input },],
    'eventTemplate': [{ type: core_1.Input },],
    'eventClicked': [{ type: core_1.Output },],
    'hourSegmentClicked': [{ type: core_1.Output },],
    'eventTimesChanged': [{ type: core_1.Output },],
};
exports.NovoCalendarDayViewElement = NovoCalendarDayViewElement;
//# sourceMappingURL=CalendarDayView.js.map