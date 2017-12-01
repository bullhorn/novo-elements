"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CalendarUtils_1 = require("../../../utils/calendar-utils/CalendarUtils");
/**
 * @hidden
 */
var SEGMENT_HEIGHT = 30;
/**
 * @hidden
 */
var MINUTES_IN_HOUR = 60;
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
var NovoCalendarWeekViewElement = (function () {
    /**
     * @hidden
     */
    function NovoCalendarWeekViewElement(cdr, locale) {
        this.cdr = cdr;
        /**
         * An array of events to display on view
         */
        this.events = [];
        /**
         * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
         */
        this.excludeDays = [];
        /**
         * The placement of the event tooltip
         */
        this.tooltipPosition = 'bottom';
        /**
         * The precision to display events.
         * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
         */
        this.precision = 'days';
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
         * Called when an hour segment is clicked
         */
        this.hourSegmentClicked = new core_1.EventEmitter();
        /**
         * Called when a header week day is clicked
         */
        this.dayClicked = new core_1.EventEmitter();
        /**
         * Called when the event title is clicked
         */
        this.eventClicked = new core_1.EventEmitter();
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
        this.eventRows = [];
        this.locale = locale;
    }
    /**
     * @hidden
     */
    NovoCalendarWeekViewElement.prototype.ngOnInit = function () {
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
    NovoCalendarWeekViewElement.prototype.ngOnChanges = function (changes) {
        if (changes.viewDate || changes.excludeDays) {
            this.refreshHeader();
        }
        if (changes.events || changes.viewDate || changes.excludeDays) {
            this.refreshBody();
        }
        if (changes.viewDate ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute) {
            this.refreshHourGrid();
        }
    };
    /**
     * @hidden
     */
    NovoCalendarWeekViewElement.prototype.ngOnDestroy = function () {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    };
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
    NovoCalendarWeekViewElement.prototype.getDayColumnWidth = function (eventRowContainer) {
        return Math.floor(eventRowContainer.offsetWidth / this.days.length);
    };
    NovoCalendarWeekViewElement.prototype.refreshHeader = function () {
        this.days = CalendarUtils_1.getWeekViewHeader({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays
        });
    };
    NovoCalendarWeekViewElement.prototype.refreshBody = function () {
        this.eventRows = CalendarUtils_1.getWeekView({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            hourSegments: this.hourSegments,
            segmentHeight: SEGMENT_HEIGHT,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            },
        });
    };
    NovoCalendarWeekViewElement.prototype.refreshHourGrid = function () {
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
        // if (this.hourSegmentModifier) {
        //   this.hours.forEach(hour => {
        //     hour.segments.forEach(segment => this.hourSegmentModifier(segment));
        //   });
        // }
    };
    NovoCalendarWeekViewElement.prototype.refreshAll = function () {
        this.refreshHeader();
        this.refreshHourGrid();
        this.refreshBody();
    };
    return NovoCalendarWeekViewElement;
}());
NovoCalendarWeekViewElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-calendar-week',
                template: "\n    <div class=\"cal-week-view\" #weekViewContainer>\n      <novo-calendar-week-header\n        [days]=\"days\"\n        [locale]=\"locale\"\n        [customTemplate]=\"headerTemplate\"\n        (dayClicked)=\"dayClicked.emit($event)\">\n      </novo-calendar-week-header>\n      <div *ngFor=\"let eventRow of eventRows\" #eventRowContainer>\n        <div\n          class=\"cal-event-container\"\n          #event\n          *ngFor=\"let weekEvent of eventRow.row\"\n          [style.width]=\"((100 / days.length) * weekEvent.span) + '%'\"\n          [style.marginTop.px]=\"weekEvent.top\"\n          [style.height.px]=\"weekEvent.height\"\n          [style.marginLeft]=\"((100 / days.length) * weekEvent.offset) + '%'\">\n          <novo-calendar-week-event\n            [weekEvent]=\"weekEvent\"\n            [tooltipPosition]=\"tooltipPosition\"\n            [customTemplate]=\"eventTemplate\"\n            (eventClicked)=\"eventClicked.emit($event)\">\n          </novo-calendar-week-event>\n        </div>\n      </div>\n      <div class=\"cal-hour\" *ngFor=\"let hour of hours\" [style.minWidth.px]=\"view?.width + 70\">\n        <novo-calendar-day-hour-segment\n          *ngFor=\"let segment of hour.segments\"\n          [segment]=\"segment\"\n          [locale]=\"locale\"\n          [customTemplate]=\"hourSegmentTemplate\"\n          (click)=\"hourSegmentClicked.emit({date: segment.date})\">\n        </novo-calendar-day-hour-segment>\n      </div>\n    </div>\n  "
            },] },
];
/** @nocollapse */
NovoCalendarWeekViewElement.ctorParameters = function () { return [
    { type: core_1.ChangeDetectorRef, },
    { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.LOCALE_ID,] },] },
]; };
NovoCalendarWeekViewElement.propDecorators = {
    'viewDate': [{ type: core_1.Input },],
    'events': [{ type: core_1.Input },],
    'excludeDays': [{ type: core_1.Input },],
    'refresh': [{ type: core_1.Input },],
    'locale': [{ type: core_1.Input },],
    'tooltipPosition': [{ type: core_1.Input },],
    'weekStartsOn': [{ type: core_1.Input },],
    'headerTemplate': [{ type: core_1.Input },],
    'eventTemplate': [{ type: core_1.Input },],
    'precision': [{ type: core_1.Input },],
    'hourSegments': [{ type: core_1.Input },],
    'dayStartHour': [{ type: core_1.Input },],
    'dayStartMinute': [{ type: core_1.Input },],
    'dayEndHour': [{ type: core_1.Input },],
    'dayEndMinute': [{ type: core_1.Input },],
    'hourSegmentTemplate': [{ type: core_1.Input },],
    'hourSegmentClicked': [{ type: core_1.Output },],
    'dayClicked': [{ type: core_1.Output },],
    'eventClicked': [{ type: core_1.Output },],
    'eventTimesChanged': [{ type: core_1.Output },],
};
exports.NovoCalendarWeekViewElement = NovoCalendarWeekViewElement;
//# sourceMappingURL=CalendarWeekView.js.map