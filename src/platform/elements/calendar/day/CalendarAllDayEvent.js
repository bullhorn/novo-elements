"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NovoCalendarAllDayEventElement = (function () {
    function NovoCalendarAllDayEventElement() {
        this.eventClicked = new core_1.EventEmitter();
    }
    return NovoCalendarAllDayEventElement;
}());
NovoCalendarAllDayEventElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-calendar-all-day-event',
                template: "\n    <ng-template #defaultTemplate>\n      <div\n        class=\"cal-all-day-event\"\n        [style.backgroundColor]=\"event.color.secondary\"\n        [style.borderColor]=\"event.color.primary\">\n        {{event.title}}\n        <!--<novo-calendar-event-title\n          [event]=\"event\"\n          view=\"day\"\n          (click)=\"eventClicked.emit()\">\n        </novo-calendar-event-title>\n        <novo-calendar-event-actions [event]=\"event\"></novo-calendar-event-actions>-->\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngOutletContext]=\"{\n        event: event,\n        eventClicked: eventClicked\n      }\">\n    </ng-template>\n  "
            },] },
];
/** @nocollapse */
NovoCalendarAllDayEventElement.ctorParameters = function () { return []; };
NovoCalendarAllDayEventElement.propDecorators = {
    'event': [{ type: core_1.Input },],
    'customTemplate': [{ type: core_1.Input },],
    'eventClicked': [{ type: core_1.Output },],
};
exports.NovoCalendarAllDayEventElement = NovoCalendarAllDayEventElement;
//# sourceMappingURL=CalendarAllDayEvent.js.map