"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
// APP
var Button_module_1 = require("./../button/Button.module");
var Slider_1 = require("./Slider");
var NovoSliderModule = (function () {
    function NovoSliderModule() {
    }
    return NovoSliderModule;
}());
NovoSliderModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, Button_module_1.NovoButtonModule],
                declarations: [Slider_1.NovoSliderElement],
                exports: [Slider_1.NovoSliderElement]
            },] },
];
/** @nocollapse */
NovoSliderModule.ctorParameters = function () { return []; };
exports.NovoSliderModule = NovoSliderModule;
//# sourceMappingURL=Slider.module.js.map