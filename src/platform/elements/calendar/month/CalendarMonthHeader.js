"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dateFns = require("date-fns");
var NovoCalendarMonthHeaderElement = (function () {
    function NovoCalendarMonthHeaderElement() {
        /**
         * Called when the view date is changed
         */
        this.viewDateChange = new core_1.EventEmitter();
    }
    NovoCalendarMonthHeaderElement.prototype.prevMonth = function () {
        this.viewDateChange.emit(dateFns.subMonths(this.viewDate, 1));
    };
    NovoCalendarMonthHeaderElement.prototype.nextMonth = function () {
        this.viewDateChange.emit(dateFns.addMonths(this.viewDate, 1));
    };
    return NovoCalendarMonthHeaderElement;
}());
NovoCalendarMonthHeaderElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-calendar-month-header',
                template: "\n    <ng-template #defaultTemplate>\n      <div class=\"calendar-header\">\n        <div class=\"calendar-header-top\">\n          <button theme=\"icon\" icon=\"previous\" (click)=\"prevMonth($event)\"></button>\n          <div class=\"calendar-month\">{{ viewDate | month:locale }}</div>\n          <button theme=\"icon\" icon=\"next\" (click)=\"nextMonth($event)\"></button>\n        </div>\n        <div class=\"calendar-weekdays\">\n          <div\n            class=\"calendar-weekday\"\n            *ngFor=\"let day of days\"\n            [class.calendar-past]=\"day.isPast\"\n            [class.calendar-today]=\"day.isToday\"\n            [class.calendar-future]=\"day.isFuture\"\n            [class.calendar-weekend]=\"day.isWeekend\">\n            {{ day.date | weekday:locale }}\n          </div>\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngOutletContext]=\"{days: days, locale: locale, viewDate: viewDate}\">\n    </ng-template>\n  "
            },] },
];
/** @nocollapse */
NovoCalendarMonthHeaderElement.ctorParameters = function () { return []; };
NovoCalendarMonthHeaderElement.propDecorators = {
    'viewDate': [{ type: core_1.Input },],
    'days': [{ type: core_1.Input },],
    'locale': [{ type: core_1.Input },],
    'customTemplate': [{ type: core_1.Input },],
    'viewDateChange': [{ type: core_1.Output },],
};
exports.NovoCalendarMonthHeaderElement = NovoCalendarMonthHeaderElement;
//# sourceMappingURL=CalendarMonthHeader.js.map