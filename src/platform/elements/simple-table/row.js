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
/** Workaround for https://github.com/angular/angular/issues/17849 */
exports._NovoHeaderRowDef = table_1.CdkHeaderRowDef;
exports._NovoCdkRowDef = table_1.CdkRowDef;
exports._NovoHeaderRow = table_1.CdkHeaderRow;
exports._NovoRow = table_1.CdkRow;
var NovoSimpleHeaderRowDef = (function (_super) {
    __extends(NovoSimpleHeaderRowDef, _super);
    function NovoSimpleHeaderRowDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NovoSimpleHeaderRowDef;
}(exports._NovoHeaderRowDef));
NovoSimpleHeaderRowDef.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[novoSimpleHeaderRowDef]',
                providers: [{ provide: table_1.CdkHeaderRowDef, useExisting: NovoSimpleHeaderRowDef }],
            },] },
];
/** @nocollapse */
NovoSimpleHeaderRowDef.ctorParameters = function () { return []; };
NovoSimpleHeaderRowDef.propDecorators = {
    'columns': [{ type: core_1.Input, args: ['novoSimpleHeaderRowDef',] },],
};
exports.NovoSimpleHeaderRowDef = NovoSimpleHeaderRowDef;
var NovoSimpleRowDef = (function (_super) {
    __extends(NovoSimpleRowDef, _super);
    function NovoSimpleRowDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NovoSimpleRowDef;
}(exports._NovoCdkRowDef));
NovoSimpleRowDef.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[novoSimpleRowDef]',
                providers: [{ provide: table_1.CdkRowDef, useExisting: NovoSimpleRowDef }]
            },] },
];
/** @nocollapse */
NovoSimpleRowDef.ctorParameters = function () { return []; };
NovoSimpleRowDef.propDecorators = {
    'columns': [{ type: core_1.Input, args: ['novoSimpleRowDefColumns',] },],
};
exports.NovoSimpleRowDef = NovoSimpleRowDef;
var NovoSimpleHeaderRow = (function (_super) {
    __extends(NovoSimpleHeaderRow, _super);
    function NovoSimpleHeaderRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rowClass = 'novo-simple-header-row';
        _this.role = 'row';
        return _this;
    }
    return NovoSimpleHeaderRow;
}(exports._NovoHeaderRow));
NovoSimpleHeaderRow.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-simple-header-row',
                template: table_1.CDK_ROW_TEMPLATE,
                changeDetection: core_1.ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
NovoSimpleHeaderRow.ctorParameters = function () { return []; };
NovoSimpleHeaderRow.propDecorators = {
    'rowClass': [{ type: core_1.HostBinding, args: ['class',] },],
    'role': [{ type: core_1.HostBinding, args: ['attr.role',] },],
};
exports.NovoSimpleHeaderRow = NovoSimpleHeaderRow;
var NovoSimpleRow = (function (_super) {
    __extends(NovoSimpleRow, _super);
    function NovoSimpleRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rowClass = 'novo-simple-row';
        _this.role = 'row';
        return _this;
    }
    return NovoSimpleRow;
}(exports._NovoRow));
NovoSimpleRow.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-simple-row',
                template: table_1.CDK_ROW_TEMPLATE,
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
NovoSimpleRow.ctorParameters = function () { return []; };
NovoSimpleRow.propDecorators = {
    'rowClass': [{ type: core_1.HostBinding, args: ['class',] },],
    'role': [{ type: core_1.HostBinding, args: ['attr.role',] },],
};
exports.NovoSimpleRow = NovoSimpleRow;
//# sourceMappingURL=row.js.map