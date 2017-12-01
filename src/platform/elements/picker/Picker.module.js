"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var overlay_1 = require("@angular/cdk/overlay");
// APP
var Overlay_module_1 = require("../overlay/Overlay.module");
var List_module_1 = require("../list/List.module");
var Loading_module_1 = require("../loading/Loading.module");
var Switch_module_1 = require("../switch/Switch.module");
var Picker_1 = require("./Picker");
var PickerResults_1 = require("./extras/picker-results/PickerResults");
var PickerContainer_1 = require("./extras/picker-container/PickerContainer");
var EntityPickerResults_1 = require("./extras/entity-picker-results/EntityPickerResults");
var ChecklistPickerResults_1 = require("./extras/checklist-picker-results/ChecklistPickerResults");
var GroupedMultiPickerResults_1 = require("./extras/grouped-multi-picker-results/GroupedMultiPickerResults");
var NovoPickerModule = (function () {
    function NovoPickerModule() {
    }
    return NovoPickerModule;
}());
NovoPickerModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule, Loading_module_1.NovoLoadingModule, List_module_1.NovoListModule, overlay_1.OverlayModule, Overlay_module_1.NovoOverlayModule, Switch_module_1.NovoSwitchModule],
                declarations: [Picker_1.NovoPickerElement, PickerContainer_1.NovoPickerContainer, PickerResults_1.PickerResults, EntityPickerResults_1.EntityPickerResult, EntityPickerResults_1.EntityPickerResults, ChecklistPickerResults_1.ChecklistPickerResults, GroupedMultiPickerResults_1.GroupedMultiPickerResults],
                exports: [Picker_1.NovoPickerElement, PickerContainer_1.NovoPickerContainer, PickerResults_1.PickerResults, EntityPickerResults_1.EntityPickerResult, EntityPickerResults_1.EntityPickerResults, ChecklistPickerResults_1.ChecklistPickerResults, GroupedMultiPickerResults_1.GroupedMultiPickerResults],
                entryComponents: [PickerResults_1.PickerResults, EntityPickerResults_1.EntityPickerResult, EntityPickerResults_1.EntityPickerResults, ChecklistPickerResults_1.ChecklistPickerResults, GroupedMultiPickerResults_1.GroupedMultiPickerResults]
            },] },
];
/** @nocollapse */
NovoPickerModule.ctorParameters = function () { return []; };
exports.NovoPickerModule = NovoPickerModule;
//# sourceMappingURL=Picker.module.js.map