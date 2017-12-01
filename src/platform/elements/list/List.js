"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var NovoListElement = (function () {
    function NovoListElement(element) {
        this.element = element;
    }
    return NovoListElement;
}());
NovoListElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-list',
                host: {
                    '[class.vertical-list]': 'direction === "vertical"',
                    '[class.horizontal-list]': 'direction === "horizontal"',
                    '[attr.theme]': 'theme'
                },
                template: "\n        <ng-content></ng-content>\n    "
            },] },
];
/** @nocollapse */
NovoListElement.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
]; };
NovoListElement.propDecorators = {
    'theme': [{ type: core_1.Input },],
    'direction': [{ type: core_1.Input },],
};
exports.NovoListElement = NovoListElement;
var NovoListItemElement = (function () {
    function NovoListItemElement(element) {
        this.element = element;
        this.avatar = false;
    }
    NovoListItemElement.prototype.ngOnInit = function () {
        this.avatar = !!this.element.nativeElement.querySelector('item-avatar');
    };
    return NovoListItemElement;
}());
NovoListItemElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-list-item',
                template: "\n        <div class=\"list-item\" [ngClass]=\"{'avatar': avatar}\">\n            <ng-content select=\"item-header\"></ng-content>\n            <ng-content select=\"item-content\"></ng-content>\n        </div>\n        <ng-content select=\"item-end\"></ng-content>\n    "
            },] },
];
/** @nocollapse */
NovoListItemElement.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
]; };
exports.NovoListItemElement = NovoListItemElement;
var NovoItemAvatarElement = (function () {
    function NovoItemAvatarElement() {
    }
    NovoItemAvatarElement.prototype.ngOnChanges = function (changes) {
        this.iconClass = (this.icon) ? "bhi-" + this.icon : null;
        this.classMap = [this.iconClass, this.icon];
    };
    NovoItemAvatarElement.prototype.ngOnInit = function () {
        this.ngOnChanges();
    };
    return NovoItemAvatarElement;
}());
NovoItemAvatarElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'item-avatar',
                template: "\n        <i *ngIf=\"iconClass\" [ngClass]=\"classMap\" theme=\"contained\"></i>\n    "
            },] },
];
/** @nocollapse */
NovoItemAvatarElement.ctorParameters = function () { return []; };
NovoItemAvatarElement.propDecorators = {
    'icon': [{ type: core_1.Input },],
};
exports.NovoItemAvatarElement = NovoItemAvatarElement;
var NovoItemTitleElement = (function () {
    function NovoItemTitleElement() {
    }
    return NovoItemTitleElement;
}());
NovoItemTitleElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'item-title',
                template: "\n        <h6><ng-content></ng-content></h6>\n    "
            },] },
];
/** @nocollapse */
NovoItemTitleElement.ctorParameters = function () { return []; };
exports.NovoItemTitleElement = NovoItemTitleElement;
var NovoItemHeaderElement = (function () {
    function NovoItemHeaderElement() {
    }
    return NovoItemHeaderElement;
}());
NovoItemHeaderElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'item-header',
                template: "\n        <ng-content select=\"item-avatar\"></ng-content>\n        <ng-content select=\"item-title\"></ng-content>\n        <ng-content select=\"item-header-end\"></ng-content>\n    "
            },] },
];
/** @nocollapse */
NovoItemHeaderElement.ctorParameters = function () { return []; };
exports.NovoItemHeaderElement = NovoItemHeaderElement;
var NovoItemDateElement = (function () {
    function NovoItemDateElement() {
    }
    return NovoItemDateElement;
}());
NovoItemDateElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'item-header-end',
                template: "\n        <ng-content></ng-content>\n    "
            },] },
];
/** @nocollapse */
NovoItemDateElement.ctorParameters = function () { return []; };
exports.NovoItemDateElement = NovoItemDateElement;
var NovoItemContentElement = (function () {
    function NovoItemContentElement() {
    }
    return NovoItemContentElement;
}());
NovoItemContentElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'item-content',
                host: {
                    '[class.vertical-list]': 'direction === "vertical"',
                    '[class.horizontal-list]': 'direction === "horizontal"'
                },
                template: "\n        <ng-content></ng-content>\n    "
            },] },
];
/** @nocollapse */
NovoItemContentElement.ctorParameters = function () { return []; };
NovoItemContentElement.propDecorators = {
    'direction': [{ type: core_1.Input },],
};
exports.NovoItemContentElement = NovoItemContentElement;
var NovoItemEndElement = (function () {
    function NovoItemEndElement() {
    }
    return NovoItemEndElement;
}());
NovoItemEndElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'item-end',
                template: "\n        <ng-content></ng-content>\n    "
            },] },
];
/** @nocollapse */
NovoItemEndElement.ctorParameters = function () { return []; };
exports.NovoItemEndElement = NovoItemEndElement;
//# sourceMappingURL=List.js.map