"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NovoCalendarDayEventElement = (function () {
    function NovoCalendarDayEventElement() {
        this.eventClicked = new core_1.EventEmitter();
    }
    return NovoCalendarDayEventElement;
}());
NovoCalendarDayEventElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-calendar-day-event',
                template: "\n    <ng-template #defaultTemplate>\n      <div\n        class=\"cal-event\"\n        [style.borderColor]=\"dayEvent.event.color.secondary\"\n        [class.cal-starts-within-day]=\"!dayEvent.startsBeforeDay\"\n        [class.cal-ends-within-day]=\"!dayEvent.endsAfterDay\"\n        [ngClass]=\"dayEvent.event.cssClass\"\n        [tooltip]=\"dayEvent.event.description\"\n        [tooltipPosition]=\"tooltipPosition\"\n        (click)=\"eventClicked.emit({event: dayEvent.event})\">\n          <div class=\"cal-event-ribbon\" [style.backgroundColor]=\"dayEvent.event.color.primary\"></div>\n          <div class=\"cal-event-group\">\n            <div class=\"cal-event-title\">{{dayEvent.event.title}}</div>\n            <div class=\"cal-event-description\">{{dayEvent.event?.description}}</div>\n          </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngOutletContext]=\"{dayEvent: dayEvent, tooltipPosition: tooltipPosition, eventClicked: eventClicked}\">\n    </ng-template>\n  "
            },] },
];
/** @nocollapse */
NovoCalendarDayEventElement.ctorParameters = function () { return []; };
NovoCalendarDayEventElement.propDecorators = {
    'dayEvent': [{ type: core_1.Input },],
    'tooltipPosition': [{ type: core_1.Input },],
    'customTemplate': [{ type: core_1.Input },],
    'eventClicked': [{ type: core_1.Output },],
};
exports.NovoCalendarDayEventElement = NovoCalendarDayEventElement;
//# sourceMappingURL=CalendarDayEvent.js.map