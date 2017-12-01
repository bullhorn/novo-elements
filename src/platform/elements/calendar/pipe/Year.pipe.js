"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var YearPipe = (function () {
    function YearPipe(locale) {
        if (locale === void 0) { locale = 'en-US'; }
        this.locale = locale;
    }
    YearPipe.prototype.transform = function (date, locale, method) {
        if (locale === void 0) { locale = this.locale; }
        if (method === void 0) { method = 'numeric'; }
        return new Intl.DateTimeFormat(locale, { year: method }).format(date);
    };
    return YearPipe;
}());
YearPipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'year' },] },
];
/** @nocollapse */
YearPipe.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.LOCALE_ID,] },] },
]; };
exports.YearPipe = YearPipe;
//# sourceMappingURL=Year.pipe.js.map