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
var TimePicker_1 = require("./TimePicker");
var TimePickerInput_1 = require("./TimePickerInput");
var NovoTimePickerModule = (function () {
    function NovoTimePickerModule() {
    }
    return NovoTimePickerModule;
}());
NovoTimePickerModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule, angular2_text_mask_1.TextMaskModule, Overlay_module_1.NovoOverlayModule],
                declarations: [TimePicker_1.NovoTimePickerElement, TimePickerInput_1.NovoTimePickerInputElement],
                exports: [TimePicker_1.NovoTimePickerElement, TimePickerInput_1.NovoTimePickerInputElement]
            },] },
];
/** @nocollapse */
NovoTimePickerModule.ctorParameters = function () { return []; };
exports.NovoTimePickerModule = NovoTimePickerModule;
//# sourceMappingURL=TimePicker.module.js.map