"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var BaseRenderer_1 = require("./../base-renderer/BaseRenderer");
var ComponentUtils_1 = require("./../../../../utils/component-utils/ComponentUtils");
var RowDetails = (function () {
    function RowDetails(element, componentUtils) {
        this.element = element;
        this.componentUtils = componentUtils;
        this.value = '';
    }
    RowDetails.prototype.ngOnInit = function () {
        if (this.renderer) {
            if (this.renderer.prototype instanceof BaseRenderer_1.BaseRenderer) {
                var componentRef = this.componentUtils.appendNextToLocation(this.renderer, this.container);
                componentRef.instance.data = this.data;
            }
            else {
                this.value = this.renderer(this.data);
            }
        }
        else {
            // this.value = this.row[this.column.name];
        }
    };
    return RowDetails;
}());
RowDetails.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-row-details',
                template: "\n        <span #container></span>\n        <span>{{value}}</span>\n    "
            },] },
];
/** @nocollapse */
RowDetails.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: ComponentUtils_1.ComponentUtils, },
]; };
RowDetails.propDecorators = {
    'container': [{ type: core_1.ViewChild, args: ['container', { read: core_1.ViewContainerRef },] },],
    'data': [{ type: core_1.Input },],
    'renderer': [{ type: core_1.Input },],
};
exports.RowDetails = RowDetails;
//# sourceMappingURL=RowDetails.js.map