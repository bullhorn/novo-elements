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
var core_1 = require("@angular/core");
var table_1 = require("@angular/cdk/table");
var sort_1 = require("./sort");
var Helpers_1 = require("../../utils/Helpers");
var novo_label_service_1 = require("../../services/novo-label-service");
/** Workaround for https://github.com/angular/angular/issues/17849 */
exports._NovoCellDef = table_1.CdkCellDef;
exports._NovoHeaderCellDef = table_1.CdkHeaderCellDef;
exports._NovoColumnDef = table_1.CdkColumnDef;
exports._NovoHeaderCell = table_1.CdkHeaderCell;
exports._NovoCell = table_1.CdkCell;
var NovoSimpleCellDef = (function (_super) {
    __extends(NovoSimpleCellDef, _super);
    function NovoSimpleCellDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NovoSimpleCellDef;
}(exports._NovoCellDef));
NovoSimpleCellDef.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[novoSimpleCellDef]',
                providers: [{ provide: table_1.CdkCellDef, useExisting: NovoSimpleCellDef }]
            },] },
];
/** @nocollapse */
NovoSimpleCellDef.ctorParameters = function () { return []; };
exports.NovoSimpleCellDef = NovoSimpleCellDef;
var NovoSimpleHeaderCellDef = (function (_super) {
    __extends(NovoSimpleHeaderCellDef, _super);
    function NovoSimpleHeaderCellDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NovoSimpleHeaderCellDef;
}(exports._NovoHeaderCellDef));
NovoSimpleHeaderCellDef.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[novoSimpleHeaderCellDef]',
                providers: [{ provide: table_1.CdkHeaderCellDef, useExisting: NovoSimpleHeaderCellDef }]
            },] },
];
/** @nocollapse */
NovoSimpleHeaderCellDef.ctorParameters = function () { return []; };
exports.NovoSimpleHeaderCellDef = NovoSimpleHeaderCellDef;
var NovoSimpleColumnDef = (function (_super) {
    __extends(NovoSimpleColumnDef, _super);
    function NovoSimpleColumnDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NovoSimpleColumnDef;
}(exports._NovoColumnDef));
NovoSimpleColumnDef.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[novoSimpleColumnDef]',
                providers: [{ provide: table_1.CdkColumnDef, useExisting: NovoSimpleColumnDef }],
            },] },
];
/** @nocollapse */
NovoSimpleColumnDef.ctorParameters = function () { return []; };
NovoSimpleColumnDef.propDecorators = {
    'name': [{ type: core_1.Input, args: ['novoSimpleColumnDef',] },],
};
exports.NovoSimpleColumnDef = NovoSimpleColumnDef;
var NovoSimpleHeaderCell = (function (_super) {
    __extends(NovoSimpleHeaderCell, _super);
    function NovoSimpleHeaderCell(columnDef, elementRef, renderer) {
        var _this = _super.call(this, columnDef, elementRef, renderer) || this;
        _this.elementRef = elementRef;
        _this.renderer = renderer;
        _this.role = 'columnheader';
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', "novo-column-header-" + columnDef.cssClassFriendlyName);
        renderer.addClass(elementRef.nativeElement, "novo-column-" + columnDef.cssClassFriendlyName);
        renderer.addClass(elementRef.nativeElement, 'novo-simple-header-cell');
        return _this;
    }
    NovoSimpleHeaderCell.prototype.ngOnInit = function () {
        if (this.column.width) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', this.column.width + "px");
            this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', this.column.width + "px");
            this.renderer.setStyle(this.elementRef.nativeElement, 'width', this.column.width + "px");
        }
    };
    return NovoSimpleHeaderCell;
}(exports._NovoHeaderCell));
NovoSimpleHeaderCell.decorators = [
    { type: core_1.Directive, args: [{
                selector: 'novo-simple-header-cell'
            },] },
];
/** @nocollapse */
NovoSimpleHeaderCell.ctorParameters = function () { return [
    { type: table_1.CdkColumnDef, },
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
]; };
NovoSimpleHeaderCell.propDecorators = {
    'role': [{ type: core_1.HostBinding, args: ['attr.role',] },],
    'column': [{ type: core_1.Input },],
};
exports.NovoSimpleHeaderCell = NovoSimpleHeaderCell;
var NovoSimpleEmptyHeaderCell = (function (_super) {
    __extends(NovoSimpleEmptyHeaderCell, _super);
    function NovoSimpleEmptyHeaderCell(columnDef, elementRef, renderer) {
        var _this = _super.call(this, columnDef, elementRef, renderer) || this;
        _this.role = 'columnheader';
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', "novo-column-header-" + columnDef.cssClassFriendlyName);
        renderer.addClass(elementRef.nativeElement, "novo-column-" + columnDef.cssClassFriendlyName);
        renderer.addClass(elementRef.nativeElement, 'novo-simple-empty-header-cell');
        return _this;
    }
    return NovoSimpleEmptyHeaderCell;
}(exports._NovoHeaderCell));
NovoSimpleEmptyHeaderCell.decorators = [
    { type: core_1.Directive, args: [{
                selector: 'novo-simple-empty-header-cell'
            },] },
];
/** @nocollapse */
NovoSimpleEmptyHeaderCell.ctorParameters = function () { return [
    { type: table_1.CdkColumnDef, },
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
]; };
NovoSimpleEmptyHeaderCell.propDecorators = {
    'role': [{ type: core_1.HostBinding, args: ['attr.role',] },],
};
exports.NovoSimpleEmptyHeaderCell = NovoSimpleEmptyHeaderCell;
var NovoSimpleCheckboxHeaderCell = (function (_super) {
    __extends(NovoSimpleCheckboxHeaderCell, _super);
    function NovoSimpleCheckboxHeaderCell(columnDef, elementRef, renderer, ref, _selection) {
        var _this = _super.call(this, columnDef, elementRef, renderer) || this;
        _this._selection = _selection;
        _this.role = 'columnheader';
        _this.selectAll = false;
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', "novo-checkbox-column-header-" + columnDef.cssClassFriendlyName);
        renderer.addClass(elementRef.nativeElement, "novo-checkbox-column-" + columnDef.cssClassFriendlyName);
        renderer.addClass(elementRef.nativeElement, 'novo-simple-checkbox-header-cell');
        _this.selectAllSubscription = _selection.novoSelectAllToggle.subscribe(function (value) {
            _this.selectAll = value;
            ref.markForCheck();
        });
        return _this;
    }
    NovoSimpleCheckboxHeaderCell.prototype.ngOnDestroy = function () {
        this.selectAllSubscription.unsubscribe();
    };
    NovoSimpleCheckboxHeaderCell.prototype.toggle = function (value) {
        this._selection.selectAll(value);
    };
    return NovoSimpleCheckboxHeaderCell;
}(exports._NovoHeaderCell));
NovoSimpleCheckboxHeaderCell.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-simple-checkbox-header-cell',
                template: "<novo-checkbox [(ngModel)]=\"selectAll\" (ngModelChange)=\"toggle($event)\"></novo-checkbox>"
            },] },
];
/** @nocollapse */
NovoSimpleCheckboxHeaderCell.ctorParameters = function () { return [
    { type: table_1.CdkColumnDef, },
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
    { type: core_1.ChangeDetectorRef, },
    { type: sort_1.NovoSelection, decorators: [{ type: core_1.Optional },] },
]; };
NovoSimpleCheckboxHeaderCell.propDecorators = {
    'role': [{ type: core_1.HostBinding, args: ['attr.role',] },],
};
exports.NovoSimpleCheckboxHeaderCell = NovoSimpleCheckboxHeaderCell;
var NovoSimpleCell = (function (_super) {
    __extends(NovoSimpleCell, _super);
    function NovoSimpleCell(columnDef, elementRef, renderer) {
        var _this = _super.call(this, columnDef, elementRef, renderer) || this;
        _this.elementRef = elementRef;
        _this.renderer = renderer;
        _this.role = 'gridcell';
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', "novo-column-" + columnDef.cssClassFriendlyName);
        renderer.addClass(elementRef.nativeElement, "novo-column-" + columnDef.cssClassFriendlyName);
        renderer.addClass(elementRef.nativeElement, 'novo-simple-cell');
        return _this;
    }
    NovoSimpleCell.prototype.ngOnInit = function () {
        if (this.column.customClass) {
            this.renderer.addClass(this.elementRef.nativeElement, this.column.customClass(this.row));
        }
        if (this.column.width) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', this.column.width + "px");
            this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', this.column.width + "px");
            this.renderer.setStyle(this.elementRef.nativeElement, 'width', this.column.width + "px");
            // TODO - this inhibits resizing the page after the initial load -- but do we care?!?!
            // this.renderer.setStyle(this.spanElement.nativeElement, 'min-width', `${this.column.width - 20}px`);
            // this.renderer.setStyle(this.spanElement.nativeElement, 'max-width', `${this.column.width - 20}px`);
            // this.renderer.setStyle(this.spanElement.nativeElement, 'width', `${this.column.width - 20}px`);
        }
        // else {
        //     // TODO - this inhibits resizing the page after the initial load -- but do we care?!?!
        //     this.renderer.setStyle(this.spanElement.nativeElement, 'min-width', `${this.elementRef.nativeElement.offsetWidth - 20}px`);
        //     this.renderer.setStyle(this.spanElement.nativeElement, 'max-width', `${this.elementRef.nativeElement.offsetWidth - 20}px`);
        //     this.renderer.setStyle(this.spanElement.nativeElement, 'width', `${this.elementRef.nativeElement.offsetWidth - 20}px`);
        // }
    };
    NovoSimpleCell.prototype.onClick = function (event) {
        Helpers_1.Helpers.swallowEvent(event);
        if (this.column.onClick) {
            this.column.onClick(this.row);
        }
        return;
    };
    return NovoSimpleCell;
}(exports._NovoCell));
NovoSimpleCell.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-simple-cell',
                template: "\n        <span [class.clickable]=\"!!column.onClick\" (click)=\"onClick($event)\" #span>{{ column.renderer(row) }}</span>\n    ",
                changeDetection: core_1.ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
NovoSimpleCell.ctorParameters = function () { return [
    { type: table_1.CdkColumnDef, },
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
]; };
NovoSimpleCell.propDecorators = {
    'role': [{ type: core_1.HostBinding, args: ['attr.role',] },],
    'row': [{ type: core_1.Input },],
    'column': [{ type: core_1.Input },],
    'spanElement': [{ type: core_1.ViewChild, args: ['span',] },],
};
exports.NovoSimpleCell = NovoSimpleCell;
var NovoSimpleCheckboxCell = (function (_super) {
    __extends(NovoSimpleCheckboxCell, _super);
    function NovoSimpleCheckboxCell(columnDef, elementRef, renderer, _selection) {
        var _this = _super.call(this, columnDef, elementRef, renderer) || this;
        _this.columnDef = columnDef;
        _this._selection = _selection;
        _this.role = 'gridcell';
        _this.selected = false;
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', "novo-checkbox-column-" + columnDef.cssClassFriendlyName);
        renderer.addClass(elementRef.nativeElement, "novo-checkbox-column-" + columnDef.cssClassFriendlyName);
        renderer.addClass(elementRef.nativeElement, 'novo-simple-checkbox-cell');
        _this.selectAllSubscription = _selection.novoSelectAllToggle.subscribe(function (value) {
            _this.selected = value;
        });
        return _this;
    }
    NovoSimpleCheckboxCell.prototype.ngOnInit = function () {
        this._selection.register(this.row.id || this.index, this.row);
        this.selected = this._selection.state.selectedRows.has(this.row.id || this.index);
    };
    NovoSimpleCheckboxCell.prototype.ngOnDestroy = function () {
        this._selection.deregister(this.row.id || this.index);
        this.selectAllSubscription.unsubscribe();
    };
    NovoSimpleCheckboxCell.prototype.toggle = function (value) {
        this._selection.toggle(this.row.id || this.index, value, this.row);
    };
    return NovoSimpleCheckboxCell;
}(exports._NovoCell));
NovoSimpleCheckboxCell.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-simple-checkbox-cell',
                template: "\n        <novo-checkbox [ngModel]=\"selected\" (ngModelChange)=\"toggle($event)\"></novo-checkbox>\n    "
            },] },
];
/** @nocollapse */
NovoSimpleCheckboxCell.ctorParameters = function () { return [
    { type: table_1.CdkColumnDef, },
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
    { type: sort_1.NovoSelection, decorators: [{ type: core_1.Optional },] },
]; };
NovoSimpleCheckboxCell.propDecorators = {
    'role': [{ type: core_1.HostBinding, args: ['attr.role',] },],
    'row': [{ type: core_1.Input },],
    'index': [{ type: core_1.Input },],
};
exports.NovoSimpleCheckboxCell = NovoSimpleCheckboxCell;
var NovoSimpleActionCell = (function (_super) {
    __extends(NovoSimpleActionCell, _super);
    function NovoSimpleActionCell(columnDef, elementRef, renderer, labels) {
        var _this = _super.call(this, columnDef, elementRef, renderer) || this;
        _this.elementRef = elementRef;
        _this.renderer = renderer;
        _this.labels = labels;
        _this.role = 'gridcell';
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', "novo-action-column-" + columnDef.cssClassFriendlyName);
        return _this;
    }
    NovoSimpleActionCell.prototype.ngOnInit = function () {
        if (this.column.options) {
            this.renderer.addClass(this.elementRef.nativeElement, 'novo-simple-dropdown-cell');
        }
        else {
            this.renderer.addClass(this.elementRef.nativeElement, 'novo-simple-button-cell');
        }
    };
    NovoSimpleActionCell.prototype.isDisabled = function (check, row) {
        if (check.disabled === true) {
            return true;
        }
        if (check.disabledCheck) {
            return check.disabledCheck(row);
        }
        return false;
    };
    return NovoSimpleActionCell;
}(exports._NovoCell));
NovoSimpleActionCell.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-simple-action-cell',
                template: "\n        <ng-container *ngIf=\"!column.options\">\n            <button theme=\"icon\" [icon]=\"column.icon\" (click)=\"column.onClick(row)\" [disabled]=\"isDisabled(column, row)\"></button>\n        </ng-container>\n        <ng-container *ngIf=\"column.options\">\n            <novo-dropdown appendToBody=\"true\" parentScrollSelector=\".novo-simple-table\" containerClass=\"novo-table-dropdown-cell\">\n                <button type=\"button\" theme=\"dialogue\" icon=\"collapse\" inverse>{{ column.label || labels.actions }}</button>\n                <list>\n                    <item *ngFor=\"let option of column.options\" (action)=\"option.onClick(row)\" [disabled]=\"isDisabled(option, row)\">\n                        <span [attr.data-automation-id]=\"option.label\">{{ option.label }}</span>\n                    </item>\n                </list>\n            </novo-dropdown>\n        </ng-container>\n    ",
                changeDetection: core_1.ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
NovoSimpleActionCell.ctorParameters = function () { return [
    { type: table_1.CdkColumnDef, },
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
    { type: novo_label_service_1.NovoLabelService, },
]; };
NovoSimpleActionCell.propDecorators = {
    'role': [{ type: core_1.HostBinding, args: ['attr.role',] },],
    'row': [{ type: core_1.Input },],
    'column': [{ type: core_1.Input },],
};
exports.NovoSimpleActionCell = NovoSimpleActionCell;
//# sourceMappingURL=cell.js.map