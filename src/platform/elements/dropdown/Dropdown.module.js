"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var Dropdown_1 = require("./Dropdown");
var NovoDropdownModule = (function () {
    function NovoDropdownModule() {
    }
    return NovoDropdownModule;
}());
NovoDropdownModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [Dropdown_1.NovoDropdownElement, Dropdown_1.NovoItemElement, Dropdown_1.NovoListElement, Dropdown_1.NovoDropdownContainer, Dropdown_1.NovoItemHeaderElement],
                exports: [Dropdown_1.NovoDropdownElement, Dropdown_1.NovoItemElement, Dropdown_1.NovoListElement, Dropdown_1.NovoDropdownContainer, Dropdown_1.NovoItemHeaderElement]
            },] },
];
/** @nocollapse */
NovoDropdownModule.ctorParameters = function () { return []; };
exports.NovoDropdownModule = NovoDropdownModule;
//# sourceMappingURL=Dropdown.module.js.map