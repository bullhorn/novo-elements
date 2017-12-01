"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
// APP
var Tabs_1 = require("./Tabs");
var NovoTabModule = (function () {
    function NovoTabModule() {
    }
    return NovoTabModule;
}());
NovoTabModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                declarations: [
                    Tabs_1.NovoNavElement,
                    Tabs_1.NovoTabElement,
                    Tabs_1.NovoTabButtonElement,
                    Tabs_1.NovoTabLinkElement,
                    Tabs_1.NovoNavOutletElement,
                    Tabs_1.NovoNavContentElement,
                    Tabs_1.NovoNavHeaderElement
                ],
                exports: [
                    Tabs_1.NovoNavElement,
                    Tabs_1.NovoTabElement,
                    Tabs_1.NovoTabButtonElement,
                    Tabs_1.NovoTabLinkElement,
                    Tabs_1.NovoNavOutletElement,
                    Tabs_1.NovoNavContentElement,
                    Tabs_1.NovoNavHeaderElement
                ]
            },] },
];
/** @nocollapse */
NovoTabModule.ctorParameters = function () { return []; };
exports.NovoTabModule = NovoTabModule;
//# sourceMappingURL=Tabs.module.js.map