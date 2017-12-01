"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var Modal_1 = require("./Modal");
var ComponentUtils_1 = require("./../../utils/component-utils/ComponentUtils");
var NovoModalService = (function () {
    function NovoModalService(componentUtils) {
        this.componentUtils = componentUtils;
        this._parentViewContainer = null;
    }
    Object.defineProperty(NovoModalService.prototype, "parentViewContainer", {
        set: function (view) {
            this._parentViewContainer = view;
        },
        enumerable: true,
        configurable: true
    });
    NovoModalService.prototype.open = function (component, scope) {
        if (scope === void 0) { scope = {}; }
        if (!this._parentViewContainer) {
            console.error('No parent view container specified for the ModalService. Set it inside your main application. \nthis.modalService.parentViewContainer = view (ViewContainerRef)');
            return null;
        }
        var modal = new Modal_1.NovoModalRef();
        modal.component = component;
        modal.open();
        var bindings = core_1.ReflectiveInjector.resolve([
            { provide: Modal_1.NovoModalRef, useValue: modal },
            { provide: Modal_1.NovoModalParams, useValue: scope }
        ]);
        modal.containerRef = this.componentUtils.appendNextToLocation(Modal_1.NovoModalContainerElement, this._parentViewContainer, bindings);
        return modal;
    };
    return NovoModalService;
}());
NovoModalService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
NovoModalService.ctorParameters = function () { return [
    { type: ComponentUtils_1.ComponentUtils, },
]; };
exports.NovoModalService = NovoModalService;
//# sourceMappingURL=ModalService.js.map