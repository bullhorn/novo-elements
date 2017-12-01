"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var PopOverContent_1 = require("./PopOverContent");
var PopOver_1 = require("./PopOver");
var NovoPopOverModule = (function () {
    function NovoPopOverModule() {
    }
    return NovoPopOverModule;
}());
NovoPopOverModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [PopOverContent_1.PopOverContent, PopOver_1.PopOverDirective],
                exports: [PopOverContent_1.PopOverContent, PopOver_1.PopOverDirective],
                entryComponents: [PopOverContent_1.PopOverContent]
            },] },
];
/** @nocollapse */
NovoPopOverModule.ctorParameters = function () { return []; };
exports.NovoPopOverModule = NovoPopOverModule;
//# sourceMappingURL=PopOver.module.js.map