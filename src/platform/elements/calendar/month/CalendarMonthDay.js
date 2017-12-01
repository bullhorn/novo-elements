"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CalendarUtils_1 = require("../../../utils/calendar-utils/CalendarUtils");
var NovoCalendarMonthDayElement = (function () {
    function NovoCalendarMonthDayElement() {
        this.eventClicked = new core_1.EventEmitter();
    }
    Object.defineProperty(NovoCalendarMonthDayElement.prototype, "accepted", {
        get: function () {
            if (!this.day) {
                return [];
            }
            return this.day.events.filter(function (evt) {
                return (evt.response === CalendarUtils_1.CalendarEventResponse.Accepted);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoCalendarMonthDayElement.prototype, "rejected", {
        get: function () {
            if (!this.day) {
                return [];
            }
            return this.day.events.filter(function (evt) {
                return (evt.response === CalendarUtils_1.CalendarEventResponse.Rejected);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoCalendarMonthDayElement.prototype, "maybes", {
        get: function () {
            if (!this.day) {
                return [];
            }
            return this.day.events.filter(function (evt) {
                return (evt.response === CalendarUtils_1.CalendarEventResponse.Maybe);
            });
        },
        enumerable: true,
        configurable: true
    });
    return NovoCalendarMonthDayElement;
}());
NovoCalendarMonthDayElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-calendar-month-day',
                template: "\n    <ng-template #defaultTemplate>\n      <div class=\"calendar-day-top\">\n        <span class=\"calendar-day-badge\" *ngIf=\"day.badgeTotal > 0\">{{ day.badgeTotal }}</span>\n        <span class=\"calendar-day-number\">{{ day.date | dayofmonth:locale }}</span>\n      </div>\n      <div class=\"calendar-events\">\n        <div\n          class=\"calendar-event\"\n          *ngFor=\"let type of day.events | groupBy : 'type'\"\n          [style.backgroundColor]=\"type?.value[0]?.color.primary\"\n          [ngClass]=\"type?.value[0]?.cssClass\"\n          (click)=\"$event.stopPropagation(); eventClicked.emit({event:type?.value[0]})\">\n          {{type?.value.length}}\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngOutletContext]=\"{\n        day: day,\n        locale: locale,\n        tooltipPosition: tooltipPosition,\n        eventClicked: eventClicked,\n        accepted: accepted,\n        rejected: rejected,\n        maybes: maybes\n      }\">\n    </ng-template>\n  ",
                host: {
                    '[class]': '"calendar-cell calendar-day-cell " + day?.cssClass',
                    '[class.calendar-day-accepted]': 'accepted.length',
                    '[class.calendar-day-rejected]': 'rejected.length',
                    '[class.calendar-past]': 'day.isPast',
                    '[class.calendar-today]': 'day.isToday',
                    '[class.calendar-future]': 'day.isFuture',
                    '[class.calendar-weekend]': 'day.isWeekend',
                    '[class.calendar-in-month]': 'day.inMonth',
                    '[class.calendar-out-month]': '!day.inMonth',
                    '[class.calendar-has-events]': 'day.events.length > 0',
                    '[style.backgroundColor]': 'day.backgroundColor'
                }
            },] },
];
/** @nocollapse */
NovoCalendarMonthDayElement.ctorParameters = function () { return []; };
NovoCalendarMonthDayElement.propDecorators = {
    'day': [{ type: core_1.Input },],
    'locale': [{ type: core_1.Input },],
    'tooltipPosition': [{ type: core_1.Input },],
    'customTemplate': [{ type: core_1.Input },],
    'eventClicked': [{ type: core_1.Output },],
};
exports.NovoCalendarMonthDayElement = NovoCalendarMonthDayElement;
//# sourceMappingURL=CalendarMonthDay.js.map