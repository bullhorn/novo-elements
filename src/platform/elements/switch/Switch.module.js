"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
// APP
var Switch_1 = require("./Switch");
var NovoSwitchModule = (function () {
    function NovoSwitchModule() {
    }
    return NovoSwitchModule;
}());
NovoSwitchModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule],
                declarations: [Switch_1.NovoSwitchElement],
                exports: [Switch_1.NovoSwitchElement]
            },] },
];
/** @nocollapse */
NovoSwitchModule.ctorParameters = function () { return []; };
exports.NovoSwitchModule = NovoSwitchModule;
//# sourceMappingURL=Switch.module.js.map