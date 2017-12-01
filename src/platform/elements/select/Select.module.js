"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var overlay_1 = require("@angular/cdk/overlay");
// APP
var Overlay_module_1 = require("../overlay/Overlay.module");
var Select_1 = require("./Select");
var NovoSelectModule = (function () {
    function NovoSelectModule() {
    }
    return NovoSelectModule;
}());
NovoSelectModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule, overlay_1.OverlayModule, Overlay_module_1.NovoOverlayModule],
                declarations: [Select_1.NovoSelectElement],
                exports: [Select_1.NovoSelectElement]
            },] },
];
/** @nocollapse */
NovoSelectModule.ctorParameters = function () { return []; };
exports.NovoSelectModule = NovoSelectModule;
//# sourceMappingURL=Select.module.js.map