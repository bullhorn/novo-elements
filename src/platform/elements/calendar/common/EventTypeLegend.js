"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NovoEventTypeLegendElement = (function () {
    function NovoEventTypeLegendElement() {
        this.eventTypeClicked = new core_1.EventEmitter();
    }
    return NovoEventTypeLegendElement;
}());
NovoEventTypeLegendElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-event-type-legend',
                template: "\n    <ng-template #defaultTemplate>\n      <div class=\"cal-event-legend\">\n        <div class=\"cal-event-type\"\n          *ngFor=\"let type of events | groupBy : 'type'\"\n          (click)=\"$event.stopPropagation(); eventTypeClicked.emit({event:type?.key})\">\n          <div class=\"cal-event-type-swatch\"></div><div>{{type?.key}}</div>\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngOutletContext]=\"{events: events, eventTypeClicked: eventTypeClicked}\">\n    </ng-template>\n  "
            },] },
];
/** @nocollapse */
NovoEventTypeLegendElement.ctorParameters = function () { return []; };
NovoEventTypeLegendElement.propDecorators = {
    'events': [{ type: core_1.Input },],
    'customTemplate': [{ type: core_1.Input },],
    'eventTypeClicked': [{ type: core_1.Output },],
};
exports.NovoEventTypeLegendElement = NovoEventTypeLegendElement;
//# sourceMappingURL=EventTypeLegend.js.map