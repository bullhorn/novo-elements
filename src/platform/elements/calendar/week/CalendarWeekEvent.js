"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NovoCalendarWeekEventElement = (function () {
    function NovoCalendarWeekEventElement() {
        this.eventClicked = new core_1.EventEmitter();
    }
    return NovoCalendarWeekEventElement;
}());
NovoCalendarWeekEventElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-calendar-week-event',
                template: "\n    <ng-template #defaultTemplate>\n      <div\n        class=\"cal-event\"\n        [class.cal-starts-within-week]=\"!weekEvent.startsBeforeWeek\"\n        [class.cal-ends-within-week]=\"!weekEvent.endsAfterWeek\"\n        [ngClass]=\"weekEvent.event?.cssClass\"\n        [tooltip]=\"weekEvent.event.description\"\n        [tooltipPosition]=\"tooltipPosition\"\n        (click)=\"eventClicked.emit({event: weekEvent.event})\">\n        <div class=\"cal-event-ribbon\" [style.backgroundColor]=\"weekEvent.event.color.primary\"></div>\n        <div class=\"cal-event-title\">{{weekEvent.event?.title}}</div>\n        <div class=\"cal-event-description\">{{weekEvent.event?.description}}</div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngOutletContext]=\"{weekEvent: weekEvent, tooltipPosition: tooltipPosition, eventClicked: eventClicked}\">\n    </ng-template>\n  "
            },] },
];
/** @nocollapse */
NovoCalendarWeekEventElement.ctorParameters = function () { return []; };
NovoCalendarWeekEventElement.propDecorators = {
    'weekEvent': [{ type: core_1.Input },],
    'tooltipPosition': [{ type: core_1.Input },],
    'customTemplate': [{ type: core_1.Input },],
    'eventClicked': [{ type: core_1.Output },],
};
exports.NovoCalendarWeekEventElement = NovoCalendarWeekEventElement;
//# sourceMappingURL=CalendarWeekEvent.js.map