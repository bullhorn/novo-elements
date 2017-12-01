"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
// APP
var Button_1 = require("./Button");
var NovoButtonModule = (function () {
    function NovoButtonModule() {
    }
    return NovoButtonModule;
}());
NovoButtonModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                declarations: [Button_1.NovoButtonElement],
                exports: [Button_1.NovoButtonElement]
            },] },
];
/** @nocollapse */
NovoButtonModule.ctorParameters = function () { return []; };
exports.NovoButtonModule = NovoButtonModule;
//# sourceMappingURL=Button.module.js.map