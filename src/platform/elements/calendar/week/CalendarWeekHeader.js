"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NovoCalendarWeekHeaderElement = (function () {
    function NovoCalendarWeekHeaderElement() {
        this.dayClicked = new core_1.EventEmitter();
        this.eventDropped = new core_1.EventEmitter();
    }
    return NovoCalendarWeekHeaderElement;
}());
NovoCalendarWeekHeaderElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-calendar-week-header',
                template: "\n    <ng-template #defaultTemplate>\n      <div class=\"cal-day-headers\">\n        <div\n          class=\"cal-header\"\n          *ngFor=\"let day of days\"\n          [class.cal-past]=\"day.isPast\"\n          [class.cal-today]=\"day.isToday\"\n          [class.cal-future]=\"day.isFuture\"\n          [class.cal-weekend]=\"day.isWeekend\"\n          [class.cal-drag-over]=\"day.dragOver\"\n          (click)=\"dayClicked.emit({date: day.date})\"\n          mwlDroppable\n          (dragEnter)=\"day.dragOver = true\"\n          (dragLeave)=\"day.dragOver = false\"\n          (drop)=\"day.dragOver = false; eventDropped.emit({event: $event.dropData.event, newStart: day.date})\">\n          <b>{{ day.date | weekday:locale:'long'}}</b><br>\n          <span>{{ day.date | monthday:locale }}</span>\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngOutletContext]=\"{days: days, locale: locale, dayClicked: dayClicked, eventDropped: eventDropped}\">\n    </ng-template>\n  "
            },] },
];
/** @nocollapse */
NovoCalendarWeekHeaderElement.ctorParameters = function () { return []; };
NovoCalendarWeekHeaderElement.propDecorators = {
    'days': [{ type: core_1.Input },],
    'locale': [{ type: core_1.Input },],
    'customTemplate': [{ type: core_1.Input },],
    'dayClicked': [{ type: core_1.Output },],
    'eventDropped': [{ type: core_1.Output },],
};
exports.NovoCalendarWeekHeaderElement = NovoCalendarWeekHeaderElement;
//# sourceMappingURL=CalendarWeekHeader.js.map