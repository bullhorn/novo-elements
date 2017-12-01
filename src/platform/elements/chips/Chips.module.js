"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
// APP
var Picker_module_1 = require("./../picker/Picker.module");
var Chips_1 = require("./Chips");
var NovoChipsModule = (function () {
    function NovoChipsModule() {
    }
    return NovoChipsModule;
}());
NovoChipsModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule, Picker_module_1.NovoPickerModule],
                declarations: [Chips_1.NovoChipElement, Chips_1.NovoChipsElement],
                exports: [Chips_1.NovoChipElement, Chips_1.NovoChipsElement]
            },] },
];
/** @nocollapse */
NovoChipsModule.ctorParameters = function () { return []; };
exports.NovoChipsModule = NovoChipsModule;
//# sourceMappingURL=Chips.module.js.map