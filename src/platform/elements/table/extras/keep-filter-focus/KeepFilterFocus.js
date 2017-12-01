"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var NovoTableKeepFilterFocus = (function () {
    function NovoTableKeepFilterFocus(element) {
        this.element = element;
    }
    NovoTableKeepFilterFocus.prototype.ngAfterViewInit = function () {
        this.element.nativeElement.focus();
    };
    return NovoTableKeepFilterFocus;
}());
NovoTableKeepFilterFocus.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[keepFilterFocused]'
            },] },
];
/** @nocollapse */
NovoTableKeepFilterFocus.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
]; };
exports.NovoTableKeepFilterFocus = NovoTableKeepFilterFocus;
//# sourceMappingURL=KeepFilterFocus.js.map