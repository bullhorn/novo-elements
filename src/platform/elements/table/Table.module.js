"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
// Vendor
var angular2_text_mask_1 = require("angular2-text-mask");
// APP
var Button_module_1 = require("../button/Button.module");
var Toast_module_1 = require("../toast/Toast.module");
var Tooltip_module_1 = require("../tooltip/Tooltip.module");
var Dropdown_module_1 = require("../dropdown/Dropdown.module");
var Form_module_1 = require("../form/Form.module");
var Loading_module_1 = require("../loading/Loading.module");
var DatePicker_module_1 = require("../date-picker/DatePicker.module");
var TableExtras_module_1 = require("./extras/TableExtras.module");
var Table_1 = require("./Table");
var FormExtras_module_1 = require("../form/extras/FormExtras.module");
var NovoTableModule = (function () {
    function NovoTableModule() {
    }
    return NovoTableModule;
}());
NovoTableModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule,
                    forms_1.FormsModule,
                    Form_module_1.NovoFormModule,
                    TableExtras_module_1.NovoTableExtrasModule,
                    Toast_module_1.NovoToastModule,
                    Button_module_1.NovoButtonModule,
                    Tooltip_module_1.NovoTooltipModule,
                    Dropdown_module_1.NovoDropdownModule,
                    Loading_module_1.NovoLoadingModule,
                    DatePicker_module_1.NovoDatePickerModule,
                    FormExtras_module_1.NovoFormExtrasModule,
                    angular2_text_mask_1.TextMaskModule
                ],
                declarations: [Table_1.NovoTableElement],
                exports: [Table_1.NovoTableElement]
            },] },
];
/** @nocollapse */
NovoTableModule.ctorParameters = function () { return []; };
exports.NovoTableModule = NovoTableModule;
//# sourceMappingURL=Table.module.js.map