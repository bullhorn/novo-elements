"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var UtilsElement = (function () {
    function UtilsElement() {
    }
    return UtilsElement;
}());
UtilsElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'utils',
                template: "\n        <ng-content></ng-content>\n    "
            },] },
];
/** @nocollapse */
UtilsElement.ctorParameters = function () { return []; };
exports.UtilsElement = UtilsElement;
var UtilActionElement = (function () {
    function UtilActionElement() {
    }
    return UtilActionElement;
}());
UtilActionElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'util-action',
                template: "\n        <button theme=\"icon\" [icon]=\"icon\" [attr.inverse]=\"inverse\" [disabled]=\"disabled\"></button>\n    "
            },] },
];
/** @nocollapse */
UtilActionElement.ctorParameters = function () { return []; };
UtilActionElement.propDecorators = {
    'icon': [{ type: core_1.Input },],
    'inverse': [{ type: core_1.Input },],
    'disabled': [{ type: core_1.Input },],
};
exports.UtilActionElement = UtilActionElement;
var NovoHeaderElement = (function () {
    function NovoHeaderElement() {
        this.inverse = 'inverse';
    }
    NovoHeaderElement.prototype.ngOnInit = function () {
        this.iconClass = "bhi-" + this.icon;
        this.config = this.config || {};
        this.inverse = (this.theme === 'white' || this.theme === 'off-white' || this.theme === 'light') ? null : 'inverse';
    };
    return NovoHeaderElement;
}());
NovoHeaderElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'header[theme]',
                host: {
                    '[attr.theme]': 'theme'
                },
                template: "\n        <section>\n            <div>\n                <i *ngIf=\"icon\" class=\"header-icon\" [ngClass]=\"iconClass\"></i>\n                <div class=\"header-titles\">\n                    <h1>{{ title || config.title }}</h1>\n                    <small *ngIf=\"subTitle\">{{ subTitle || config.subTitle }}</small>\n                </div>\n            </div>\n            <ng-content select=\"section\"></ng-content>\n            <ng-content select=\"utils\"></ng-content>\n        </section>\n        <ng-content></ng-content>\n    "
            },] },
];
/** @nocollapse */
NovoHeaderElement.ctorParameters = function () { return []; };
NovoHeaderElement.propDecorators = {
    'title': [{ type: core_1.Input },],
    'subTitle': [{ type: core_1.Input },],
    'theme': [{ type: core_1.Input },],
    'icon': [{ type: core_1.Input },],
    'config': [{ type: core_1.Input },],
};
exports.NovoHeaderElement = NovoHeaderElement;
//# sourceMappingURL=Header.js.map