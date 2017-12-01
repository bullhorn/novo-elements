"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DayOfMonthPipe = (function () {
    function DayOfMonthPipe(locale) {
        if (locale === void 0) { locale = 'en-US'; }
        this.locale = locale;
    }
    DayOfMonthPipe.prototype.transform = function (date, locale, method) {
        if (locale === void 0) { locale = this.locale; }
        if (method === void 0) { method = 'numeric'; }
        return new Intl.DateTimeFormat(locale, { day: method }).format(date);
    };
    return DayOfMonthPipe;
}());
DayOfMonthPipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'dayofmonth' },] },
];
/** @nocollapse */
DayOfMonthPipe.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.LOCALE_ID,] },] },
]; };
exports.DayOfMonthPipe = DayOfMonthPipe;
//# sourceMappingURL=DayOfMonth.pipe.js.map