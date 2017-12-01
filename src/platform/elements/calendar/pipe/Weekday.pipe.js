"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WeekdayPipe = (function () {
    function WeekdayPipe(locale) {
        if (locale === void 0) { locale = 'en-US'; }
        this.locale = locale;
    }
    WeekdayPipe.prototype.transform = function (date, locale, method) {
        if (locale === void 0) { locale = this.locale; }
        if (method === void 0) { method = 'short'; }
        return new Intl.DateTimeFormat(locale, { weekday: method }).format(date);
    };
    return WeekdayPipe;
}());
WeekdayPipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'weekday' },] },
];
/** @nocollapse */
WeekdayPipe.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.LOCALE_ID,] },] },
]; };
exports.WeekdayPipe = WeekdayPipe;
//# sourceMappingURL=Weekday.pipe.js.map