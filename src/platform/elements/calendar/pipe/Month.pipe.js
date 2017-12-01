"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MonthPipe = (function () {
    function MonthPipe(locale) {
        if (locale === void 0) { locale = 'en-US'; }
        this.locale = locale;
    }
    MonthPipe.prototype.transform = function (date, locale, method) {
        if (locale === void 0) { locale = this.locale; }
        if (method === void 0) { method = 'long'; }
        return new Intl.DateTimeFormat(locale, { month: method }).format(date);
    };
    return MonthPipe;
}());
MonthPipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'month' },] },
];
/** @nocollapse */
MonthPipe.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.LOCALE_ID,] },] },
]; };
exports.MonthPipe = MonthPipe;
//# sourceMappingURL=Month.pipe.js.map