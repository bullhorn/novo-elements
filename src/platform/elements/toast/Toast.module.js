"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
// APP
var Toast_1 = require("./Toast");
var NovoToastModule = (function () {
    function NovoToastModule() {
    }
    return NovoToastModule;
}());
NovoToastModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                declarations: [Toast_1.NovoToastElement],
                exports: [Toast_1.NovoToastElement],
                entryComponents: [Toast_1.NovoToastElement]
            },] },
];
/** @nocollapse */
NovoToastModule.ctorParameters = function () { return []; };
exports.NovoToastModule = NovoToastModule;
//# sourceMappingURL=Toast.module.js.map