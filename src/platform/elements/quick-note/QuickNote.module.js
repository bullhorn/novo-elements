"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
// APP
var Loading_module_1 = require("./../loading/Loading.module");
var List_module_1 = require("./../list/List.module");
var QuickNote_1 = require("./QuickNote");
var QuickNoteResults_1 = require("./extras/quick-note-results/QuickNoteResults");
var NovoQuickNoteModule = (function () {
    function NovoQuickNoteModule() {
    }
    return NovoQuickNoteModule;
}());
NovoQuickNoteModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule, Loading_module_1.NovoLoadingModule, List_module_1.NovoListModule],
                declarations: [QuickNote_1.QuickNoteElement, QuickNoteResults_1.QuickNoteResults],
                exports: [QuickNote_1.QuickNoteElement, QuickNoteResults_1.QuickNoteResults],
                entryComponents: [QuickNoteResults_1.QuickNoteResults]
            },] },
];
/** @nocollapse */
NovoQuickNoteModule.ctorParameters = function () { return []; };
exports.NovoQuickNoteModule = NovoQuickNoteModule;
//# sourceMappingURL=QuickNote.module.js.map