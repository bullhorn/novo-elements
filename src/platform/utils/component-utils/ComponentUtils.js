"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var ComponentUtils = (function () {
    function ComponentUtils(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    ComponentUtils.prototype.appendNextToLocation = function (ComponentClass, location, providers) {
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(ComponentClass);
        var parentInjector = location.parentInjector;
        var childInjector = parentInjector;
        if (providers && providers.length > 0) {
            childInjector = core_1.ReflectiveInjector.fromResolvedProviders(providers, parentInjector);
        }
        return location.createComponent(componentFactory, location.length, childInjector);
    };
    return ComponentUtils;
}());
ComponentUtils.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
ComponentUtils.ctorParameters = function () { return [
    { type: core_1.ComponentFactoryResolver, },
]; };
exports.ComponentUtils = ComponentUtils;
//# sourceMappingURL=ComponentUtils.js.map