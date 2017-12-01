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
var FileControl = (function (_super) {
    __extends(FileControl, _super);
    function FileControl(config) {
        var _this = _super.call(this, 'FileControl', config) || this;
        _this.controlType = 'file';
        // TODO - translate
        _this.placeholder = config.placeholder;
        _this.multiple = config.multiple;
        return _this;
    }
    return FileControl;
}(BaseControl_1.BaseControl));
exports.FileControl = FileControl;
//# sourceMappingURL=FileControl.js.map