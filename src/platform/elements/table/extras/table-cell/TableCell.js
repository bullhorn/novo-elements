"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// Vendor
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
// APP
var BaseRenderer_1 = require("./../base-renderer/BaseRenderer");
var ComponentUtils_1 = require("./../../../../utils/component-utils/ComponentUtils");
var TableCell = (function () {
    function TableCell(element, componentUtils) {
        this.element = element;
        this.componentUtils = componentUtils;
        this.value = '';
        this.element = element;
        this.componentUtils = componentUtils;
    }
    TableCell.prototype.ngOnInit = function () {
        var _this = this;
        this.column._type = this.column.type || 'text';
        if (this.column.renderer) {
            if (this.column.renderer.prototype instanceof BaseRenderer_1.BaseRenderer) {
                this.column._type = 'custom';
                var componentRef = this.componentUtils.appendNextToLocation(this.column.renderer, this.container);
                componentRef.instance.meta = this.column;
                componentRef.instance.data = this.row;
                componentRef.instance.value = this.form && this.hasEditor ? this.form.value[this.column.name] : this.row[this.column.name];
                // TODO - save ref to this and update in the valueChanges below!!
            }
            else {
                // TODO - wtf to do here?
                this.value = this.column.renderer(this.row);
            }
        }
        else {
            this.value = this.form && this.hasEditor ? this.form.value[this.column.name] : this.row[this.column.name];
        }
        if (this.form && this.hasEditor) {
            this.valueChangeSubscription = this.form.valueChanges
                .debounceTime(300)
                .distinctUntilChanged()
                .subscribe(function (value) {
                _this.value = value[_this.column.name];
            });
        }
    };
    TableCell.prototype.ngOnDestroy = function () {
        if (this.valueChangeSubscription) {
            this.valueChangeSubscription.unsubscribe();
        }
    };
    TableCell.prototype.onClick = function (event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (this.column.onClick) {
            this.column.onClick(this.row);
        }
    };
    return TableCell;
}());
TableCell.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-table-cell',
                template: "\n        <div [ngSwitch]=\"column._type\">\n            <span #container></span>\n            <date-cell *ngSwitchCase=\"'date'\" [value]=\"value\"></date-cell>\n            <a *ngSwitchCase=\"'link'\" (click)=\"onClick($event);\">{{ value }}</a>\n            <span *ngSwitchDefault>{{ value }}</span>\n        </div>\n    "
            },] },
];
/** @nocollapse */
TableCell.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: ComponentUtils_1.ComponentUtils, },
]; };
TableCell.propDecorators = {
    'container': [{ type: core_1.ViewChild, args: ['container', { read: core_1.ViewContainerRef },] },],
    'column': [{ type: core_1.Input },],
    'row': [{ type: core_1.Input },],
    'form': [{ type: core_1.Input },],
    'hasEditor': [{ type: core_1.Input },],
};
exports.TableCell = TableCell;
//# sourceMappingURL=TableCell.js.map