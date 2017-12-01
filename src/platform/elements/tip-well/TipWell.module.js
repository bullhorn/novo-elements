"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
// APP
var Button_module_1 = require("./../button/Button.module");
var TipWell_1 = require("./TipWell");
var NovoTipWellModule = (function () {
    function NovoTipWellModule() {
    }
    return NovoTipWellModule;
}());
NovoTipWellModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, Button_module_1.NovoButtonModule],
                declarations: [TipWell_1.NovoTipWellElement],
                exports: [TipWell_1.NovoTipWellElement]
            },] },
];
/** @nocollapse */
NovoTipWellModule.ctorParameters = function () { return []; };
exports.NovoTipWellModule = NovoTipWellModule;
//# sourceMappingURL=TipWell.module.js.map