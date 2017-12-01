"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CalendarUtils_1 = require("../../../utils/calendar-utils/CalendarUtils");
var dateFns = require("date-fns");
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
var NovoCalendarMonthViewElement = (function () {
    /**
     * @hidden
     */
    function NovoCalendarMonthViewElement(cdr, locale) {
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
         * The locale used to format dates
         */
        this.locale = 'en-US';
        /**
         * The placement of the event tooltip
         */
        this.tooltipPosition = 'top';
        /**
         * Called when the day cell is clicked
         */
        this.dayClicked = new core_1.EventEmitter();
        /**
         * Called when the event title is clicked
         */
        this.eventClicked = new core_1.EventEmitter();
        /**
         * Called when an event is dragged and dropped
         */
        this.eventTimesChanged = new core_1.EventEmitter();
        this.viewDateChange = new core_1.EventEmitter();
        this.locale = locale;
    }
    /**
     * @hidden
     */
    NovoCalendarMonthViewElement.prototype.ngOnInit = function () {
        var _this = this;
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(function () {
                _this.refreshAll();
                _this.cdr.markForCheck();
            });
        }
    };
    /**
     * @hidden
     */
    NovoCalendarMonthViewElement.prototype.ngOnChanges = function (changes) {
        if (changes.viewDate || changes.excludeDays) {
            this.refreshHeader();
        }
        if (changes.viewDate || changes.events || changes.excludeDays) {
            this.refreshBody();
        }
    };
    /**
     * @hidden
     */
    NovoCalendarMonthViewElement.prototype.ngOnDestroy = function () {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    NovoCalendarMonthViewElement.prototype.eventDropped = function (day, event) {
        var year = dateFns.getYear(day.date);
        var month = dateFns.getMonth(day.date);
        var date = dateFns.getDate(day.date);
        var newStart = dateFns.setYear(dateFns.setMonth(dateFns.setDate(event.start, date), month), year);
        var newEnd;
        if (event.end) {
            var secondsDiff = dateFns.differenceInSeconds(newStart, event.start);
            newEnd = dateFns.addSeconds(event.end, secondsDiff);
        }
        this.eventTimesChanged.emit({ event: event, newStart: newStart, newEnd: newEnd });
    };
    NovoCalendarMonthViewElement.prototype.refreshHeader = function () {
        this.columnHeaders = CalendarUtils_1.getWeekViewHeader({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays
        });
    };
    NovoCalendarMonthViewElement.prototype.refreshBody = function () {
        var _this = this;
        this.view = CalendarUtils_1.getMonthView({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays
        });
        if (this.dayModifier) {
            this.view.days.forEach(function (day) { return _this.dayModifier(day); });
        }
    };
    NovoCalendarMonthViewElement.prototype.refreshAll = function () {
        this.refreshHeader();
        this.refreshBody();
        this.viewDateChange.emit(this.viewDate);
    };
    return NovoCalendarMonthViewElement;
}());
NovoCalendarMonthViewElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-calendar-month',
                template: "\n    <div class=\"calendar-month-view\">\n       <novo-calendar-month-header\n         [(viewDate)]=\"viewDate\"\n         [days]=\"columnHeaders\"\n         [locale]=\"locale\"\n         [customTemplate]=\"headerTemplate\"\n         (viewDateChange)=\"refreshAll()\">\n       </novo-calendar-month-header>\n      <div class=\"calendar-days\">\n        <div *ngFor=\"let rowIndex of view.rowOffsets\">\n          <div class=\"calendar-cell-row\">\n            <novo-calendar-month-day\n              *ngFor=\"let day of view.days | slice : rowIndex : rowIndex + (view.totalDaysVisibleInWeek)\"\n              [day]=\"day\"\n              [locale]=\"locale\"\n              [customTemplate]=\"cellTemplate\"\n              (click)=\"dayClicked.emit({day: day})\"\n              (eventClicked)=\"eventClicked.emit({ day: day, event: $event.event})\">\n            </novo-calendar-month-day>\n          </div>\n        </div>\n      </div>\n    </div>\n  "
            },] },
];
/** @nocollapse */
NovoCalendarMonthViewElement.ctorParameters = function () { return [
    { type: core_1.ChangeDetectorRef, },
    { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.LOCALE_ID,] },] },
]; };
NovoCalendarMonthViewElement.propDecorators = {
    'viewDate': [{ type: core_1.Input },],
    'events': [{ type: core_1.Input },],
    'excludeDays': [{ type: core_1.Input },],
    'dayModifier': [{ type: core_1.Input },],
    'refresh': [{ type: core_1.Input },],
    'locale': [{ type: core_1.Input },],
    'tooltipPosition': [{ type: core_1.Input },],
    'weekStartsOn': [{ type: core_1.Input },],
    'headerTemplate': [{ type: core_1.Input },],
    'cellTemplate': [{ type: core_1.Input },],
    'dayClicked': [{ type: core_1.Output },],
    'eventClicked': [{ type: core_1.Output },],
    'eventTimesChanged': [{ type: core_1.Output },],
    'viewDateChange': [{ type: core_1.Output },],
};
exports.NovoCalendarMonthViewElement = NovoCalendarMonthViewElement;
//# sourceMappingURL=CalendarMonthView.js.map