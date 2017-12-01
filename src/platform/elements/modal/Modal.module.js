"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
// APP
var Button_module_1 = require("./../button/Button.module");
var Modal_1 = require("./Modal");
var NovoModalModule = (function () {
    function NovoModalModule() {
    }
    return NovoModalModule;
}());
NovoModalModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, Button_module_1.NovoButtonModule],
                declarations: [Modal_1.NovoModalContainerElement, Modal_1.NovoModalElement, Modal_1.NovoModalNotificationElement],
                exports: [Modal_1.NovoModalElement, Modal_1.NovoModalNotificationElement],
                entryComponents: [Modal_1.NovoModalContainerElement]
            },] },
];
/** @nocollapse */
NovoModalModule.ctorParameters = function () { return []; };
exports.NovoModalModule = NovoModalModule;
//# sourceMappingURL=Modal.module.js.map