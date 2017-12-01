"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var Tooltip_1 = require("./Tooltip");
var NovoTooltipModule = (function () {
    function NovoTooltipModule() {
    }
    return NovoTooltipModule;
}());
NovoTooltipModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [Tooltip_1.TooltipDirective],
                exports: [Tooltip_1.TooltipDirective]
            },] },
];
/** @nocollapse */
NovoTooltipModule.ctorParameters = function () { return []; };
exports.NovoTooltipModule = NovoTooltipModule;
//# sourceMappingURL=Tooltip.module.js.map