"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var EndOfWeekDisplayPipe = (function () {
    function EndOfWeekDisplayPipe(locale) {
        if (locale === void 0) { locale = 'en-US'; }
        this.locale = locale;
    }
    EndOfWeekDisplayPipe.prototype.transform = function (endOfWeek, startOfWeek, locale, method) {
        if (locale === void 0) { locale = this.locale; }
        if (method === void 0) { method = 'short'; }
        if (endOfWeek.getMonth() === startOfWeek.getMonth()) {
            return new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(endOfWeek);
        }
        return new Intl.DateTimeFormat(locale, { month: method, day: 'numeric' }).format(endOfWeek);
    };
    return EndOfWeekDisplayPipe;
}());
EndOfWeekDisplayPipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'endofweekdisplay' },] },
];
/** @nocollapse */
EndOfWeekDisplayPipe.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.LOCALE_ID,] },] },
]; };
exports.EndOfWeekDisplayPipe = EndOfWeekDisplayPipe;
//# sourceMappingURL=EndOfWeekDisplayPipe.pipe.js.map