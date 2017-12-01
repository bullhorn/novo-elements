"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var overlay_1 = require("@angular/cdk/overlay");
// APP
var Overlay_module_1 = require("../overlay/Overlay.module");
var Button_module_1 = require("./../button/Button.module");
var Picker_module_1 = require("./../picker/Picker.module");
var Tooltip_module_1 = require("./../tooltip/Tooltip.module");
var SearchBox_1 = require("./SearchBox");
var NovoSearchBoxModule = (function () {
    function NovoSearchBoxModule() {
    }
    return NovoSearchBoxModule;
}());
NovoSearchBoxModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, Button_module_1.NovoButtonModule, Picker_module_1.NovoPickerModule, Tooltip_module_1.NovoTooltipModule, overlay_1.OverlayModule, Overlay_module_1.NovoOverlayModule],
                declarations: [SearchBox_1.NovoSearchBoxElement],
                exports: [SearchBox_1.NovoSearchBoxElement]
            },] },
];
/** @nocollapse */
NovoSearchBoxModule.ctorParameters = function () { return []; };
exports.NovoSearchBoxModule = NovoSearchBoxModule;
//# sourceMappingURL=SearchBox.module.js.map