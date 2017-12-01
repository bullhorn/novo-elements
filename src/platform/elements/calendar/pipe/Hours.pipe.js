"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HoursPipe = (function () {
    function HoursPipe(locale) {
        if (locale === void 0) { locale = 'en-US'; }
        this.locale = locale;
    }
    HoursPipe.prototype.transform = function (date, locale, method) {
        if (locale === void 0) { locale = this.locale; }
        if (method === void 0) { method = 'numeric'; }
        return new Intl.DateTimeFormat(locale, { hour: method }).format(date);
    };
    return HoursPipe;
}());
HoursPipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'hours' },] },
];
/** @nocollapse */
HoursPipe.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.LOCALE_ID,] },] },
]; };
exports.HoursPipe = HoursPipe;
//# sourceMappingURL=Hours.pipe.js.map