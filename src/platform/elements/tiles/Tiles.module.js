"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
// APP
var Tiles_1 = require("./Tiles");
var NovoTilesModule = (function () {
    function NovoTilesModule() {
    }
    return NovoTilesModule;
}());
NovoTilesModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.ReactiveFormsModule],
                declarations: [Tiles_1.NovoTilesElement],
                exports: [Tiles_1.NovoTilesElement]
            },] },
];
/** @nocollapse */
NovoTilesModule.ctorParameters = function () { return []; };
exports.NovoTilesModule = NovoTilesModule;
//# sourceMappingURL=Tiles.module.js.map