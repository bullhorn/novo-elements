"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var BaseRenderer_1 = require("../base-renderer/BaseRenderer");
var PercentageCell = (function (_super) {
    __extends(PercentageCell, _super);
    function PercentageCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PercentageCell;
}(BaseRenderer_1.BaseRenderer));
PercentageCell.decorators = [
    { type: core_1.Component, args: [{
                selector: 'percentage-cell',
                template: "\n        <div class=\"percentage\" *ngIf=\"value || value === 0\">{{ value | percent:'1.0-2' }}</div>\n    "
            },] },
];
/** @nocollapse */
PercentageCell.ctorParameters = function () { return []; };
exports.PercentageCell = PercentageCell;
//# sourceMappingURL=PercentageCell.js.map