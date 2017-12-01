"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var state_1 = require("./state");
var NovoSortFilter = (function () {
    function NovoSortFilter(state) {
        this.state = state;
    }
    NovoSortFilter.prototype.filter = function (id, value, transform) {
        var filter;
        if (value) {
            filter = { id: id, value: value, transform: transform };
        }
        else {
            filter = undefined;
        }
        this.state.filter = filter;
        this.state.reset(false, true);
        this.state.updates.next({ filter: filter, sort: this.state.sort });
    };
    NovoSortFilter.prototype.sort = function (id, value, transform) {
        var sort = { id: id, value: value, transform: transform };
        this.state.sort = sort;
        this.state.reset(false, true);
        this.state.updates.next({ sort: sort, filter: this.state.filter });
    };
    return NovoSortFilter;
}());
NovoSortFilter.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[novoSortFilter]',
            },] },
];
/** @nocollapse */
NovoSortFilter.ctorParameters = function () { return [
    { type: state_1.NovoActivityTableState, },
]; };
exports.NovoSortFilter = NovoSortFilter;
var NovoSelection = (function () {
    function NovoSelection(state) {
        this.state = state;
        this.novoSelectAllToggle = new core_1.EventEmitter();
        this.allRows = new Map();
    }
    NovoSelection.prototype.register = function (id, row) {
        this.allRows.set(id, row);
    };
    NovoSelection.prototype.deregister = function (id) {
        var _this = this;
        this.allRows.delete(id);
        this.state.selectedRows.delete(id);
        clearTimeout(this.throttleTimeout);
        this.throttleTimeout = setTimeout(function () {
            if (_this.state.selectedRows.size === 0) {
                _this.novoSelectAllToggle.emit(false);
            }
        });
    };
    NovoSelection.prototype.ngOnDestroy = function () {
        this.allRows.clear();
        this.state.selectedRows.clear();
    };
    NovoSelection.prototype.toggle = function (id, selected, row) {
        if (selected) {
            this.state.selectedRows.set(id, row);
        }
        else {
            this.state.selectedRows.delete(id);
        }
    };
    NovoSelection.prototype.selectAll = function (value) {
        if (value) {
            this.state.selectedRows = new Map(this.allRows);
        }
        else {
            this.state.selectedRows.clear();
        }
        this.novoSelectAllToggle.emit(value);
    };
    return NovoSelection;
}());
NovoSelection.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[novoSelection]',
            },] },
];
/** @nocollapse */
NovoSelection.ctorParameters = function () { return [
    { type: state_1.NovoActivityTableState, },
]; };
NovoSelection.propDecorators = {
    'novoSelectAllToggle': [{ type: core_1.Output },],
};
exports.NovoSelection = NovoSelection;
//# sourceMappingURL=sort.js.map