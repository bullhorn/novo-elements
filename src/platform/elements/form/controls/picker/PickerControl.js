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
var PickerControl = (function (_super) {
    __extends(PickerControl, _super);
    function PickerControl(config) {
        var _this = _super.call(this, 'PickerControl', config) || this;
        _this.controlType = 'picker';
        _this.options = [];
        _this.options = config.options || [];
        return _this;
    }
    return PickerControl;
}(BaseControl_1.BaseControl));
exports.PickerControl = PickerControl;
var TablePickerControl = (function (_super) {
    __extends(TablePickerControl, _super);
    function TablePickerControl(config) {
        var _this = _super.call(this, Object.assign(config, { appendToBody: true, parentScrollSelector: '.table-container' })) || this;
        _this.__type = 'TablePickerControl';
        return _this;
    }
    return TablePickerControl;
}(PickerControl));
exports.TablePickerControl = TablePickerControl;
var AppendToBodyPickerControl = (function (_super) {
    __extends(AppendToBodyPickerControl, _super);
    function AppendToBodyPickerControl(config) {
        var _this = _super.call(this, Object.assign(config, { appendToBody: true, parentScrollSelector: '.table-container' })) || this;
        _this.__type = 'AppendToBodyPickerControl';
        return _this;
    }
    return AppendToBodyPickerControl;
}(PickerControl));
exports.AppendToBodyPickerControl = AppendToBodyPickerControl;
//# sourceMappingURL=PickerControl.js.map