"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
// APP
var Button_module_1 = require("./../button/Button.module");
var Header_1 = require("./Header");
var NovoHeaderModule = (function () {
    function NovoHeaderModule() {
    }
    return NovoHeaderModule;
}());
NovoHeaderModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, Button_module_1.NovoButtonModule],
                declarations: [Header_1.NovoHeaderElement, Header_1.UtilActionElement, Header_1.UtilsElement],
                exports: [Header_1.NovoHeaderElement, Header_1.UtilActionElement, Header_1.UtilsElement]
            },] },
];
/** @nocollapse */
NovoHeaderModule.ctorParameters = function () { return []; };
exports.NovoHeaderModule = NovoHeaderModule;
//# sourceMappingURL=Header.module.js.map