"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
// Vendor
var angular2_text_mask_1 = require("angular2-text-mask");
// APP
var Overlay_module_1 = require("../overlay/Overlay.module");
var DatePicker_1 = require("./DatePicker");
var DatePickerInput_1 = require("./DatePickerInput");
var NovoDatePickerModule = (function () {
    function NovoDatePickerModule() {
    }
    return NovoDatePickerModule;
}());
NovoDatePickerModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule, Overlay_module_1.NovoOverlayModule, angular2_text_mask_1.TextMaskModule],
                declarations: [DatePicker_1.NovoDatePickerElement, DatePickerInput_1.NovoDatePickerInputElement],
                exports: [DatePicker_1.NovoDatePickerElement, DatePickerInput_1.NovoDatePickerInputElement]
            },] },
];
/** @nocollapse */
NovoDatePickerModule.ctorParameters = function () { return []; };
exports.NovoDatePickerModule = NovoDatePickerModule;
//# sourceMappingURL=DatePicker.module.js.map