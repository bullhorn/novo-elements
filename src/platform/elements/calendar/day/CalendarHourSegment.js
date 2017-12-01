"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NovoCalendarHourSegmentElement = (function () {
    function NovoCalendarHourSegmentElement() {
    }
    return NovoCalendarHourSegmentElement;
}());
NovoCalendarHourSegmentElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-calendar-day-hour-segment',
                template: "\n    <ng-template #defaultTemplate>\n      <div\n        class=\"cal-hour-segment\"\n        [class.cal-hour-start]=\"segment.isStart\"\n        [class.cal-after-hour-start]=\"!segment.isStart\"\n        [ngClass]=\"segment.cssClass\">\n        <div class=\"cal-time\">\n          {{ segment.date | hours:locale }}\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngOutletContext]=\"{\n        segment: segment,\n        locale: locale\n      }\">\n    </ng-template>\n  "
            },] },
];
/** @nocollapse */
NovoCalendarHourSegmentElement.ctorParameters = function () { return []; };
NovoCalendarHourSegmentElement.propDecorators = {
    'segment': [{ type: core_1.Input },],
    'locale': [{ type: core_1.Input },],
    'customTemplate': [{ type: core_1.Input },],
};
exports.NovoCalendarHourSegmentElement = NovoCalendarHourSegmentElement;
//# sourceMappingURL=CalendarHourSegment.js.map