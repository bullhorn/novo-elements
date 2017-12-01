"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
// APP
var Picker_module_1 = require("./../picker/Picker.module");
var Chips_module_1 = require("./../chips/Chips.module");
var MultiPicker_1 = require("./MultiPicker");
var NovoMultiPickerModule = (function () {
    function NovoMultiPickerModule() {
    }
    return NovoMultiPickerModule;
}());
NovoMultiPickerModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule, Picker_module_1.NovoPickerModule, Chips_module_1.NovoChipsModule],
                declarations: [MultiPicker_1.NovoMultiPickerElement],
                exports: [MultiPicker_1.NovoMultiPickerElement]
            },] },
];
/** @nocollapse */
NovoMultiPickerModule.ctorParameters = function () { return []; };
exports.NovoMultiPickerModule = NovoMultiPickerModule;
//# sourceMappingURL=MultiPicker.module.js.map