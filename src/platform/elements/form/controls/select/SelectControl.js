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
var SelectControl = (function (_super) {
    __extends(SelectControl, _super);
    function SelectControl(config) {
        var _this = _super.call(this, 'SelectControl', config) || this;
        _this.controlType = 'select';
        _this.options = [];
        _this.options = config.options || [];
        _this.placeholder = config.placeholder || '';
        return _this;
    }
    return SelectControl;
}(BaseControl_1.BaseControl));
exports.SelectControl = SelectControl;
//# sourceMappingURL=SelectControl.js.map