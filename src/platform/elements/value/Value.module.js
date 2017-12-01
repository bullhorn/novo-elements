"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
// APP
var Value_1 = require("./Value");
var Render_1 = require("./Render");
var NovoValueModule = (function () {
    function NovoValueModule() {
    }
    return NovoValueModule;
}());
NovoValueModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                declarations: [Value_1.NovoValueElement, Value_1.NovoValueEmail, Value_1.NovoValuePhone, Render_1.RenderPipe],
                exports: [Value_1.NovoValueElement, Value_1.NovoValueEmail, Value_1.NovoValuePhone, Render_1.RenderPipe]
            },] },
];
/** @nocollapse */
NovoValueModule.ctorParameters = function () { return []; };
exports.NovoValueModule = NovoValueModule;
//# sourceMappingURL=Value.module.js.map