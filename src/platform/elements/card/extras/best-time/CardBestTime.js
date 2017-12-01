"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var CardBestTimeElement = (function () {
    function CardBestTimeElement() {
    }
    CardBestTimeElement.prototype.ngOnChanges = function (changes) {
        if (this.time) {
            var timeIconAndStyle = this.getTimeOfDayStyleAndIcon(this.time);
            this.timeIcon = timeIconAndStyle.icon;
            this.timeStyle = timeIconAndStyle.style;
            this.dayLowerCase = (this.day || '').toLowerCase();
            this.dataAutomationId = this.label ? this.label.replace(/\s+/g, '-').toLowerCase() : '';
        }
    };
    CardBestTimeElement.prototype.getTimeOfDayStyleAndIcon = function (time) {
        var icon = null;
        var style = null;
        var transformedTime = time.replace(/\s+/g, '-').toUpperCase();
        var TIMES = {
            morningTimes: {
                times: ['5-AM', '6-AM', '7-AM', '8-AM', '9-AM', '10-AM'],
                icon: 'bhi-coffee'
            },
            dayTimes: {
                times: ['11-AM', '12-PM', '1-PM', '2-PM', '3-PM', '4-PM', '5-PM', '6-PM'],
                icon: 'bhi-day'
            },
            eveningTimes: {
                times: ['7-PM', '8-PM', '9-PM', '10-PM', '11-PM', '12-AM', '1-AM', '2-AM', '3-AM', '4-AM'],
                icon: 'bhi-evening'
            }
        };
        for (var prop in TIMES) {
            if (TIMES[prop].times.indexOf(transformedTime) > -1) {
                icon = TIMES[prop].icon;
                if (icon === 'bhi-coffee') {
                    style = 'morning';
                }
                else if (icon === 'bhi-day') {
                    style = 'day';
                }
                else if (icon === 'bhi-evening') {
                    style = 'evening';
                }
            }
        }
        return { icon: icon, style: style };
    };
    return CardBestTimeElement;
}());
CardBestTimeElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-card-best-time',
                template: "\n        <label *ngIf=\"!hideLabel\" [attr.data-automation-id]=\"dataAutomationId + '-label'\">{{ label }}</label>\n        <div class=\"best-time\">\n            <i [attr.data-automation-id]=\"dataAutomationId + '-icon'\" [ngClass]=\"[timeIcon, timeStyle]\"></i>\n            <div class=\"time-and-day\">\n                <span class=\"time\" [ngClass]=\"timeStyle\" [attr.data-automation-id]=\"dataAutomationId + '-time'\">{{ time }}</span>\n                <div class=\"days\" [attr.data-automation-id]=\"dataAutomationId + '-days'\">\n                    <span class=\"day\" [class.active]=\"dayLowerCase === 'sunday'\" [attr.data-automation-id]=\"'sunday'\">S</span>\n                    <span class=\"day\" [class.active]=\"dayLowerCase === 'monday'\" [attr.data-automation-id]=\"'monday'\">M</span>\n                    <span class=\"day\" [class.active]=\"dayLowerCase === 'tuesday'\" [attr.data-automation-id]=\"'tuesday'\">T</span>\n                    <span class=\"day\" [class.active]=\"dayLowerCase === 'wednesday'\" [attr.data-automation-id]=\"'wednesday'\">W</span>\n                    <span class=\"day\" [class.active]=\"dayLowerCase === 'thursday'\" [attr.data-automation-id]=\"'thursday'\">T</span>\n                    <span class=\"day\" [class.active]=\"dayLowerCase === 'friday'\" [attr.data-automation-id]=\"'friday'\">F</span>\n                    <span class=\"day\" [class.active]=\"dayLowerCase === 'saturday'\" [attr.data-automation-id]=\"'saturday'\">S</span>\n                </div>\n            </div>\n        </div>\n    "
            },] },
];
/** @nocollapse */
CardBestTimeElement.ctorParameters = function () { return []; };
CardBestTimeElement.propDecorators = {
    'label': [{ type: core_1.Input },],
    'time': [{ type: core_1.Input },],
    'day': [{ type: core_1.Input },],
    'hideLabel': [{ type: core_1.Input },],
};
exports.CardBestTimeElement = CardBestTimeElement;
//# sourceMappingURL=CardBestTime.js.map