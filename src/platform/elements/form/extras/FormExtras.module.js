"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
// APP
var Button_module_1 = require("./../../button/Button.module");
var Select_module_1 = require("./../../select/Select.module");
var Loading_module_1 = require("./../../loading/Loading.module");
var Pipes_module_1 = require("./../../../pipes/Pipes.module");
var Dragula_module_1 = require("./../../dragula/Dragula.module");
var Address_1 = require("./address/Address");
var Checkbox_1 = require("./checkbox/Checkbox");
var CheckList_1 = require("./checkbox/CheckList");
var FileInput_1 = require("./file/FileInput");
var NovoFormExtrasModule = (function () {
    function NovoFormExtrasModule() {
    }
    return NovoFormExtrasModule;
}());
NovoFormExtrasModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule, Pipes_module_1.NovoPipesModule, Button_module_1.NovoButtonModule, Select_module_1.NovoSelectModule, Loading_module_1.NovoLoadingModule, Dragula_module_1.NovoDragulaModule],
                declarations: [Address_1.NovoAddressElement, Checkbox_1.NovoCheckboxElement, CheckList_1.NovoCheckListElement, FileInput_1.NovoFileInputElement],
                exports: [Address_1.NovoAddressElement, Checkbox_1.NovoCheckboxElement, CheckList_1.NovoCheckListElement, FileInput_1.NovoFileInputElement]
            },] },
];
/** @nocollapse */
NovoFormExtrasModule.ctorParameters = function () { return []; };
exports.NovoFormExtrasModule = NovoFormExtrasModule;
//# sourceMappingURL=FormExtras.module.js.map