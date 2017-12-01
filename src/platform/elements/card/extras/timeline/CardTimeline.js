"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var CardTimelineElement = (function () {
    function CardTimelineElement() {
        this.now = new Date().getFullYear();
    }
    CardTimelineElement.prototype.ngOnChanges = function (changes) {
        this.length = ((this.end - this.start) / (this.now - this.created)) * 100;
        this.offset = ((this.start - this.created) * (100 / (this.now - this.created)));
    };
    return CardTimelineElement;
}());
CardTimelineElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-card-timeline',
                template: "\n        <div class=\"timeline-container\">\n            <div class=\"timeline-background\">\n                <div class=\"timeline\" [style.width]=\"length + '%'\" [style.margin-left]=\"offset + '%'\" data-automation-id=\"timeline\">\n                    <div class=\"first annotate\" [class.one]=\"start == end\" [class.reverse]=\"start != end && ((end - start) < 3 || length < 22)\" [class.overlap]=\"length < 22\" data-automation-id=\"timeline-first\">{{start}}</div>\n                    <div class=\"last annotate\" *ngIf=\"start != end\" [class.reverse]=\"(end - start) < 3 && end != now && length >= 22\" [class.smoosh]=\"length < 22\" data-automation-id=\"timeline-last\">{{end}}</div>\n                    <div class=\"hidden-width\" data-automation-id=\"timeline-hidden\">{{length}}</div>\n                </div>\n            </div>\n        </div>\n    "
            },] },
];
/** @nocollapse */
CardTimelineElement.ctorParameters = function () { return []; };
CardTimelineElement.propDecorators = {
    'start': [{ type: core_1.Input },],
    'end': [{ type: core_1.Input },],
    'created': [{ type: core_1.Input },],
};
exports.CardTimelineElement = CardTimelineElement;
//# sourceMappingURL=CardTimeline.js.map