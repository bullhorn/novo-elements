"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
// Vendor
var angular2_text_mask_1 = require("angular2-text-mask");
// APP
var Radio_module_1 = require("./../radio/Radio.module");
var Button_module_1 = require("./../button/Button.module");
var Tiles_module_1 = require("./../tiles/Tiles.module");
var Select_module_1 = require("./../select/Select.module");
var Picker_module_1 = require("./../picker/Picker.module");
var Chips_module_1 = require("./../chips/Chips.module");
var DatePicker_module_1 = require("./../date-picker/DatePicker.module");
var TimePicker_module_1 = require("./../time-picker/TimePicker.module");
var DateTimePicker_module_1 = require("./../date-time-picker/DateTimePicker.module");
var CKEditor_module_1 = require("./../ckeditor/CKEditor.module");
var QuickNote_module_1 = require("./../quick-note/QuickNote.module");
var DynamicForm_1 = require("./DynamicForm");
var Form_1 = require("./Form");
var Control_1 = require("./Control");
var FormExtras_module_1 = require("./extras/FormExtras.module");
var Header_module_1 = require("./../header/Header.module");
var Tooltip_module_1 = require("./../tooltip/Tooltip.module");
var Dragula_module_1 = require("./../dragula/Dragula.module");
var TipWell_module_1 = require("./../tip-well/TipWell.module");
var Modal_module_1 = require("./../modal/Modal.module");
var FieldInteractionModals_1 = require("./FieldInteractionModals");
var ControlGroup_1 = require("./ControlGroup");
var NovoFormModule = (function () {
    function NovoFormModule() {
    }
    return NovoFormModule;
}());
NovoFormModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule,
                    forms_1.ReactiveFormsModule,
                    Radio_module_1.NovoRadioModule,
                    Tiles_module_1.NovoTilesModule,
                    Select_module_1.NovoSelectModule,
                    Picker_module_1.NovoPickerModule,
                    Chips_module_1.NovoChipsModule,
                    DatePicker_module_1.NovoDatePickerModule,
                    TimePicker_module_1.NovoTimePickerModule,
                    CKEditor_module_1.NovoNovoCKEditorModule,
                    FormExtras_module_1.NovoFormExtrasModule,
                    QuickNote_module_1.NovoQuickNoteModule,
                    DateTimePicker_module_1.NovoDateTimePickerModule,
                    Header_module_1.NovoHeaderModule,
                    Tooltip_module_1.NovoTooltipModule,
                    Dragula_module_1.NovoDragulaModule,
                    angular2_text_mask_1.TextMaskModule,
                    TipWell_module_1.NovoTipWellModule,
                    Modal_module_1.NovoModalModule,
                    Button_module_1.NovoButtonModule
                ],
                declarations: [
                    Control_1.NovoAutoSize, Control_1.NovoControlElement, DynamicForm_1.NovoDynamicFormElement, Form_1.NovoFormElement,
                    DynamicForm_1.NovoFieldsetElement, DynamicForm_1.NovoFieldsetHeaderElement, DynamicForm_1.NovoControlCustom,
                    Control_1.NovoCustomControlContainerElement, FieldInteractionModals_1.ControlConfirmModal, FieldInteractionModals_1.ControlPromptModal, ControlGroup_1.NovoControlGroup
                ],
                exports: [
                    Control_1.NovoAutoSize, DynamicForm_1.NovoDynamicFormElement, Control_1.NovoControlElement, Form_1.NovoFormElement,
                    DynamicForm_1.NovoFieldsetHeaderElement, DynamicForm_1.NovoControlCustom, Control_1.NovoCustomControlContainerElement,
                    ControlGroup_1.NovoControlGroup
                ],
                entryComponents: [FieldInteractionModals_1.ControlConfirmModal, FieldInteractionModals_1.ControlPromptModal]
            },] },
];
/** @nocollapse */
NovoFormModule.ctorParameters = function () { return []; };
exports.NovoFormModule = NovoFormModule;
//# sourceMappingURL=Form.module.js.map