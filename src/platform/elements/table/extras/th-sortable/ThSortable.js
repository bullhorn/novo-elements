"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var ThSortable = (function () {
    function ThSortable() {
        this.onSortChange = new core_1.EventEmitter();
    }
    ThSortable.prototype.onToggleSort = function (event) {
        if (event) {
            event.preventDefault();
        }
        if (this.config && this.column && this.config.sorting !== false && this.column.sorting !== false) {
            switch (this.column.sort) {
                case 'asc':
                    this.column.sort = 'desc';
                    break;
                default:
                    this.column.sort = 'asc';
                    break;
            }
            this.onSortChange.emit(this.column);
        }
    };
    return ThSortable;
}());
ThSortable.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[novoThSortable]',
                host: {
                    '(click)': 'onToggleSort($event)'
                }
            },] },
];
/** @nocollapse */
ThSortable.ctorParameters = function () { return []; };
ThSortable.propDecorators = {
    'config': [{ type: core_1.Input, args: ['novoThSortable',] },],
    'column': [{ type: core_1.Input },],
    'onSortChange': [{ type: core_1.Output },],
};
exports.ThSortable = ThSortable;
//# sourceMappingURL=ThSortable.js.map