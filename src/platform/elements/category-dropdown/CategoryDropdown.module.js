"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
// APP
var CategoryDropdown_1 = require("./CategoryDropdown");
var Tabs_module_1 = require("./../tabs/Tabs.module");
var List_module_1 = require("./../list/List.module");
var NovoCategoryDropdownModule = (function () {
    function NovoCategoryDropdownModule() {
    }
    return NovoCategoryDropdownModule;
}());
NovoCategoryDropdownModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, Tabs_module_1.NovoTabModule, List_module_1.NovoListModule],
                declarations: [CategoryDropdown_1.NovoCategoryDropdownElement],
                exports: [CategoryDropdown_1.NovoCategoryDropdownElement]
            },] },
];
/** @nocollapse */
NovoCategoryDropdownModule.ctorParameters = function () { return []; };
exports.NovoCategoryDropdownModule = NovoCategoryDropdownModule;
//# sourceMappingURL=CategoryDropdown.module.js.map