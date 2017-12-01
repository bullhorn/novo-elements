"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var Dragula_1 = require("./Dragula");
var NovoDragulaModule = (function () {
    function NovoDragulaModule() {
    }
    return NovoDragulaModule;
}());
NovoDragulaModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [Dragula_1.NovoDragulaElement],
                exports: [Dragula_1.NovoDragulaElement]
            },] },
];
/** @nocollapse */
NovoDragulaModule.ctorParameters = function () { return []; };
exports.NovoDragulaModule = NovoDragulaModule;
//# sourceMappingURL=Dragula.module.js.map