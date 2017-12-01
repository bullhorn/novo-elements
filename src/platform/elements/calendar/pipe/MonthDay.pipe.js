"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MonthDayPipe = (function () {
    function MonthDayPipe(locale) {
        if (locale === void 0) { locale = 'en-US'; }
        this.locale = locale;
    }
    MonthDayPipe.prototype.transform = function (date, locale, method) {
        if (locale === void 0) { locale = this.locale; }
        if (method === void 0) { method = 'short'; }
        return new Intl.DateTimeFormat(locale, { month: method, day: 'numeric' }).format(date);
    };
    return MonthDayPipe;
}());
MonthDayPipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'monthday' },] },
];
/** @nocollapse */
MonthDayPipe.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.LOCALE_ID,] },] },
]; };
exports.MonthDayPipe = MonthDayPipe;
//# sourceMappingURL=MonthDay.pipe.js.map