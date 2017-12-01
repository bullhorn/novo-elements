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
var DateCell = (function (_super) {
    __extends(DateCell, _super);
    function DateCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DateCell;
}(BaseRenderer_1.BaseRenderer));
DateCell.decorators = [
    { type: core_1.Component, args: [{
                selector: 'date-cell',
                template: "\n        <div class=\"date-cell\">\n            <label>{{ value | date }}</label>\n        </div>\n    "
            },] },
];
/** @nocollapse */
DateCell.ctorParameters = function () { return []; };
DateCell.propDecorators = {
    'value': [{ type: core_1.Input },],
};
exports.DateCell = DateCell;
//# sourceMappingURL=DateCell.js.map