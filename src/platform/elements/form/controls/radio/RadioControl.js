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
var RadioControl = (function (_super) {
    __extends(RadioControl, _super);
    function RadioControl(config) {
        var _this = _super.call(this, 'RadioControl', config) || this;
        _this.controlType = 'radio';
        _this.options = [];
        _this.options = config.options || [];
        return _this;
    }
    return RadioControl;
}(BaseControl_1.BaseControl));
exports.RadioControl = RadioControl;
//# sourceMappingURL=RadioControl.js.map