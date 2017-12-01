"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
// APP
var Loading_1 = require("./Loading");
var NovoLoadingModule = (function () {
    function NovoLoadingModule() {
    }
    return NovoLoadingModule;
}());
NovoLoadingModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                declarations: [Loading_1.NovoLoadingElement, Loading_1.NovoSpinnerElement],
                exports: [Loading_1.NovoLoadingElement, Loading_1.NovoSpinnerElement]
            },] },
];
/** @nocollapse */
NovoLoadingModule.ctorParameters = function () { return []; };
exports.NovoLoadingModule = NovoLoadingModule;
//# sourceMappingURL=Loading.module.js.map