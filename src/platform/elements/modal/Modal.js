"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var Deferred_1 = require("./../../utils/deferred/Deferred");
var ComponentUtils_1 = require("../../utils/component-utils/ComponentUtils");
var NovoModalParams = (function () {
    function NovoModalParams() {
    }
    return NovoModalParams;
}());
exports.NovoModalParams = NovoModalParams;
/**
 * Reference to an opened dialog.
 */
var NovoModalRef = (function () {
    function NovoModalRef() {
        this.component = null;
        this.contentRef = null;
        this.containerRef = null;
        this.isClosed = false;
        this._onClosed = Deferred_1.Deferred();
    }
    Object.defineProperty(NovoModalRef.prototype, "onClosed", {
        // Gets a promise that is resolved when the dialog is closed.
        get: function () {
            return this._onClosed;
        },
        enumerable: true,
        configurable: true
    });
    NovoModalRef.prototype.open = function () {
        document.body.classList.add('modal-open');
    };
    NovoModalRef.prototype.close = function (result) {
        document.body.classList.remove('modal-open');
        if (this.contentRef) {
            this.contentRef.destroy();
        }
        if (this.containerRef) {
            this.containerRef.destroy();
        }
        this._onClosed.resolve(result);
    };
    return NovoModalRef;
}());
NovoModalRef.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
NovoModalRef.ctorParameters = function () { return []; };
exports.NovoModalRef = NovoModalRef;
var NovoModalContainerElement = (function () {
    function NovoModalContainerElement(modalRef, componentUtils) {
        this.modalRef = modalRef;
        this.componentUtils = componentUtils;
    }
    NovoModalContainerElement.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.modalRef.contentRef = _this.componentUtils.appendNextToLocation(_this.modalRef.component, _this.container);
        });
    };
    return NovoModalContainerElement;
}());
NovoModalContainerElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-modal-container',
                template: '<span #container></span>'
            },] },
];
/** @nocollapse */
NovoModalContainerElement.ctorParameters = function () { return [
    { type: NovoModalRef, },
    { type: ComponentUtils_1.ComponentUtils, },
]; };
NovoModalContainerElement.propDecorators = {
    'container': [{ type: core_1.ViewChild, args: ['container', { read: core_1.ViewContainerRef },] },],
};
exports.NovoModalContainerElement = NovoModalContainerElement;
var NovoModalElement = (function () {
    function NovoModalElement(modalRef) {
        this.modalRef = modalRef;
    }
    NovoModalElement.prototype.close = function () {
        this.modalRef.close();
    };
    return NovoModalElement;
}());
NovoModalElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-modal',
                template: "\n        <ng-content select=\"header\"></ng-content>\n        <ng-content select=\"section\"></ng-content>\n        <footer>\n            <ng-content select=\"button\"></ng-content>\n        </footer>\n    "
            },] },
];
/** @nocollapse */
NovoModalElement.ctorParameters = function () { return [
    { type: NovoModalRef, },
]; };
exports.NovoModalElement = NovoModalElement;
var NovoModalNotificationElement = (function () {
    function NovoModalNotificationElement(modalRef) {
        this.modalRef = modalRef;
        this.cancel = new core_1.EventEmitter();
        this.modalRef = modalRef;
    }
    NovoModalNotificationElement.prototype.close = function () {
        this.cancel.emit();
        this.modalRef.close();
    };
    NovoModalNotificationElement.prototype.ngOnInit = function () {
        switch (this.type) {
            case 'success':
                this.iconType = 'bhi-check';
                break;
            case 'warning':
                this.iconType = 'bhi-caution-o';
                break;
            case 'error':
                this.iconType = 'bhi-caution-o';
                break;
            case 'custom':
                this.iconType = "bhi-" + this.icon;
                break;
            default:
                break;
        }
    };
    return NovoModalNotificationElement;
}());
NovoModalNotificationElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-notification',
                template: "\n        <button class=\"modal-close\" theme=\"icon\" icon=\"times\" (click)=\"close()\"></button>\n        <header>\n            <ng-content select=\"label\"></ng-content>\n        </header>\n        <section class=\"notification-body\">\n            <i class=\"indicator\" [ngClass]=\"iconType\" *ngIf=\"iconType\"></i>\n            <ng-content select=\"h1\"></ng-content>\n            <ng-content select=\"h2\"></ng-content>\n            <ng-content select=\"p\"></ng-content>\n        </section>\n        <footer>\n            <ng-content select=\"button\"></ng-content>\n        </footer>\n    "
            },] },
];
/** @nocollapse */
NovoModalNotificationElement.ctorParameters = function () { return [
    { type: NovoModalRef, },
]; };
NovoModalNotificationElement.propDecorators = {
    'type': [{ type: core_1.Input },],
    'icon': [{ type: core_1.Input },],
    'cancel': [{ type: core_1.Output },],
};
exports.NovoModalNotificationElement = NovoModalNotificationElement;
//# sourceMappingURL=Modal.js.map