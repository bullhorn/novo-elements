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
var DateTimePicker_1 = require("./DateTimePicker");
var DateTimePickerInput_1 = require("./DateTimePickerInput");
var DatePicker_module_1 = require("../date-picker/DatePicker.module");
var TimePicker_module_1 = require("../time-picker/TimePicker.module");
var NovoDateTimePickerModule = (function () {
    function NovoDateTimePickerModule() {
    }
    return NovoDateTimePickerModule;
}());
NovoDateTimePickerModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule, DatePicker_module_1.NovoDatePickerModule, TimePicker_module_1.NovoTimePickerModule, angular2_text_mask_1.TextMaskModule, Overlay_module_1.NovoOverlayModule],
                declarations: [DateTimePicker_1.NovoDateTimePickerElement, DateTimePickerInput_1.NovoDateTimePickerInputElement],
                exports: [DateTimePicker_1.NovoDateTimePickerElement, DateTimePickerInput_1.NovoDateTimePickerInputElement]
            },] },
];
/** @nocollapse */
NovoDateTimePickerModule.ctorParameters = function () { return []; };
exports.NovoDateTimePickerModule = NovoDateTimePickerModule;
//# sourceMappingURL=DateTimePicker.module.js.map