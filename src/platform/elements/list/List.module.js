"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
// APP
var List_1 = require("./List");
var NovoListModule = (function () {
    function NovoListModule() {
    }
    return NovoListModule;
}());
NovoListModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                declarations: [List_1.NovoListElement, List_1.NovoListItemElement, List_1.NovoItemAvatarElement, List_1.NovoItemTitleElement, List_1.NovoItemContentElement, List_1.NovoItemEndElement, List_1.NovoItemHeaderElement, List_1.NovoItemDateElement],
                exports: [List_1.NovoListElement, List_1.NovoListItemElement, List_1.NovoItemAvatarElement, List_1.NovoItemTitleElement, List_1.NovoItemHeaderElement, List_1.NovoItemContentElement, List_1.NovoItemEndElement, List_1.NovoItemDateElement]
            },] },
];
/** @nocollapse */
NovoListModule.ctorParameters = function () { return []; };
exports.NovoListModule = NovoListModule;
//# sourceMappingURL=List.module.js.map