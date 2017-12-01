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
// APP
var BaseControl_1 = require("./../BaseControl");
var DateControl = (function (_super) {
    __extends(DateControl, _super);
    function DateControl(config) {
        var _this = _super.call(this, 'DateControl', config) || this;
        _this.controlType = 'date';
        return _this;
    }
    return DateControl;
}(BaseControl_1.BaseControl));
exports.DateControl = DateControl;
//# sourceMappingURL=DateControl.js.map