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
var GlobalRef = (function () {
    function GlobalRef() {
    }
    return GlobalRef;
}());
exports.GlobalRef = GlobalRef;
var BrowserGlobalRef = (function (_super) {
    __extends(BrowserGlobalRef, _super);
    function BrowserGlobalRef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BrowserGlobalRef.prototype, "nativeGlobal", {
        get: function () {
            return window;
        },
        enumerable: true,
        configurable: true
    });
    return BrowserGlobalRef;
}(GlobalRef));
exports.BrowserGlobalRef = BrowserGlobalRef;
var NodeGlobalRef = (function (_super) {
    __extends(NodeGlobalRef, _super);
    function NodeGlobalRef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NodeGlobalRef.prototype, "nativeGlobal", {
        get: function () {
            throw new Error('global doesn\'t compile for some reason');
            //return global as Global;
        },
        enumerable: true,
        configurable: true
    });
    return NodeGlobalRef;
}(GlobalRef));
exports.NodeGlobalRef = NodeGlobalRef;
//# sourceMappingURL=global.service.js.map