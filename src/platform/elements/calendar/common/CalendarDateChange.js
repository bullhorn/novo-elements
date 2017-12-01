"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dateFns = require("date-fns");
var NovoCalendarDateChangeElement = (function () {
    function NovoCalendarDateChangeElement(locale) {
        /**
         * Called when the view date is changed
         */
        this.viewDateChange = new core_1.EventEmitter();
        this.locale = locale;
    }
    /**
     * @hidden
     */
    NovoCalendarDateChangeElement.prototype.subtractDate = function () {
        this.changeDate(-1);
    };
    NovoCalendarDateChangeElement.prototype.addDate = function () {
        this.changeDate(1);
    };
    NovoCalendarDateChangeElement.prototype.changeDate = function (unit) {
        var addFn = {
            day: dateFns.addDays,
            week: dateFns.addWeeks,
            month: dateFns.addMonths
        }[this.view];
        this.viewDateChange.emit(addFn(this.viewDate, unit));
    };
    Object.defineProperty(NovoCalendarDateChangeElement.prototype, "startOfWeek", {
        get: function () {
            return dateFns.startOfWeek(this.viewDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoCalendarDateChangeElement.prototype, "endOfWeek", {
        get: function () {
            return dateFns.endOfWeek(this.viewDate);
        },
        enumerable: true,
        configurable: true
    });
    return NovoCalendarDateChangeElement;
}());
NovoCalendarDateChangeElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-calendar-date-change',
                template: "\n    <div class=\"cal-date-change\">\n        <i class=\"bhi-arrow-left\" (click)=\"subtractDate()\" ></i>\n        <span [ngSwitch]=\"view\">\n            <span *ngSwitchCase=\"'month'\">{{ ( viewDate | month:locale ) + ' ' + ( viewDate | year:locale ) }}</span>\n            <span *ngSwitchCase=\"'week'\">{{ ( startOfWeek | monthday:locale:'long' ) + ' - ' + ( endOfWeek | endofweekdisplay:startOfWeek:locale:'long' ) }}</span>\n            <span *ngSwitchCase=\"'day'\">{{ ( viewDate | weekday:locale:'long' ) + ', ' + ( viewDate | month:locale ) + ' ' + ( viewDate | dayofmonth:locale ) }}</span>\n        </span>\n        <i class=\"bhi-arrow-right\" (click)=\"addDate()\"></i>\n    </div>\n  "
            },] },
];
/** @nocollapse */
NovoCalendarDateChangeElement.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.LOCALE_ID,] },] },
]; };
NovoCalendarDateChangeElement.propDecorators = {
    'view': [{ type: core_1.Input },],
    'viewDate': [{ type: core_1.Input },],
    'locale': [{ type: core_1.Input },],
    'viewDateChange': [{ type: core_1.Output },],
};
exports.NovoCalendarDateChangeElement = NovoCalendarDateChangeElement;
//# sourceMappingURL=CalendarDateChange.js.map