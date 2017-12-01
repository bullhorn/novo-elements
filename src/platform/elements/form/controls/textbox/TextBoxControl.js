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
var FormValidators_1 = require("./../../FormValidators");
var TextBoxControl = (function (_super) {
    __extends(TextBoxControl, _super);
    function TextBoxControl(config) {
        var _this = _super.call(this, 'TextBoxControl', config) || this;
        _this.controlType = 'textbox';
        _this.type = _this.getTextboxType(config.type) || '';
        _this.subType = config.type || '';
        _this.setValidators(_this.subType);
        return _this;
    }
    TextBoxControl.prototype.setValidators = function (type) {
        switch (type) {
            case 'email':
                this.validators.push(FormValidators_1.FormValidators.isEmail);
                break;
            case 'number':
            case 'currency':
                this.validators.push(FormValidators_1.FormValidators.maxInteger);
                break;
            case 'float':
            case 'percentage':
                this.validators.push(FormValidators_1.FormValidators.maxDouble);
                break;
            case 'year':
                this.validators.push(FormValidators_1.FormValidators.minYear);
                break;
            default:
                break;
        }
    };
    TextBoxControl.prototype.getTextboxType = function (type) {
        switch (type) {
            case 'percentage':
            case 'currency':
            case 'float':
            case 'year':
                return 'number';
            default:
                return type;
        }
    };
    return TextBoxControl;
}(BaseControl_1.BaseControl));
exports.TextBoxControl = TextBoxControl;
//# sourceMappingURL=TextBoxControl.js.map