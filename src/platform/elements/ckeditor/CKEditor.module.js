"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
// APP
var CKEditor_1 = require("./CKEditor");
var NovoNovoCKEditorModule = (function () {
    function NovoNovoCKEditorModule() {
    }
    return NovoNovoCKEditorModule;
}());
NovoNovoCKEditorModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule],
                declarations: [CKEditor_1.NovoCKEditorElement],
                exports: [CKEditor_1.NovoCKEditorElement]
            },] },
];
/** @nocollapse */
NovoNovoCKEditorModule.ctorParameters = function () { return []; };
exports.NovoNovoCKEditorModule = NovoNovoCKEditorModule;
//# sourceMappingURL=CKEditor.module.js.map