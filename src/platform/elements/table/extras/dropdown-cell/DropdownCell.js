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
// NG2
var core_1 = require("@angular/core");
// APP
var BaseRenderer_1 = require("../base-renderer/BaseRenderer");
var NovoDropdownCell = (function (_super) {
    __extends(NovoDropdownCell, _super);
    function NovoDropdownCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NovoDropdownCell.prototype.ngOnInit = function () {
        // Check for and fix bad config
        if (!this.meta.dropdownCellConfig) {
            throw new Error('Missing "dropdownCellConfig" on the column setup');
        }
    };
    NovoDropdownCell.prototype.onClick = function (config, option, value) {
        var callback = option.callback || config.callback;
        callback(this.data, value || option);
    };
    return NovoDropdownCell;
}(BaseRenderer_1.BaseRenderer));
NovoDropdownCell.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-dropdown-cell',
                template: "\n        <novo-dropdown appendToBody=\"true\" parentScrollSelector=\".table-container\" containerClass=\"novo-table-dropdown-cell\">\n            <button type=\"button\" theme=\"secondary\" icon=\"collapse\" inverse>\n                <span data-automation-id=\"novo-dropdown-cell-value\">{{ value }}</span>\n            </button>\n            <list>\n                <ng-container *ngFor=\"let config of meta.dropdownCellConfig; let i = index\">\n                    <dropdown-item-header *ngIf=\"config.category\">{{ config.category }}</dropdown-item-header>\n                    <item *ngFor=\"let option of config.options\" (action)=\"onClick(config, option, option.value)\" [class.active]=\"(option || option.value) === value\">\n                        <span [attr.data-automation-id]=\"option.label || option\">{{ option.label || option }}</span> <i *ngIf=\"(option || option.value) === value\" class=\"bhi-check\"></i>\n                    </item>\n                    <hr *ngIf=\"i < meta.dropdownCellConfig.length - 1\"/>\n                </ng-container>\n            </list>\n        </novo-dropdown>\n    "
            },] },
];
/** @nocollapse */
NovoDropdownCell.ctorParameters = function () { return []; };
NovoDropdownCell.propDecorators = {
    'meta': [{ type: core_1.Input },],
    'value': [{ type: core_1.Input },],
};
exports.NovoDropdownCell = NovoDropdownCell;
//# sourceMappingURL=DropdownCell.js.map