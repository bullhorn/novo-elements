"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
// APP
var Button_module_1 = require("../button/Button.module");
var Radio_1 = require("./Radio");
var NovoRadioModule = (function () {
    function NovoRadioModule() {
    }
    return NovoRadioModule;
}());
NovoRadioModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, Button_module_1.NovoButtonModule],
                declarations: [Radio_1.NovoRadioElement, Radio_1.NovoRadioGroup],
                exports: [Radio_1.NovoRadioElement, Radio_1.NovoRadioGroup]
            },] },
];
/** @nocollapse */
NovoRadioModule.ctorParameters = function () { return []; };
exports.NovoRadioModule = NovoRadioModule;
//# sourceMappingURL=Radio.module.js.map