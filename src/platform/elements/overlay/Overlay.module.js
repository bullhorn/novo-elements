"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var overlay_1 = require("@angular/cdk/overlay");
// APP
var Overlay_1 = require("./Overlay");
var NovoOverlayModule = (function () {
    function NovoOverlayModule() {
    }
    return NovoOverlayModule;
}());
NovoOverlayModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule, overlay_1.OverlayModule],
                declarations: [Overlay_1.NovoOverlayTemplate],
                exports: [Overlay_1.NovoOverlayTemplate],
                providers: [Overlay_1.DEFAULT_OVERLAY_SCROLL_STRATEGY_PROVIDER]
            },] },
];
/** @nocollapse */
NovoOverlayModule.ctorParameters = function () { return []; };
exports.NovoOverlayModule = NovoOverlayModule;
//# sourceMappingURL=Overlay.module.js.map