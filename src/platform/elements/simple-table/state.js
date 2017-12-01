"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NovoActivityTableState = (function () {
    function NovoActivityTableState() {
        this.id = Math.random();
        this.sort = undefined;
        this.filter = undefined;
        this.page = 0;
        this.pageSize = undefined;
        this.globalSearch = undefined;
        this.selectedRows = new Map();
        this.updates = new core_1.EventEmitter();
        this.onReset = new core_1.EventEmitter();
    }
    Object.defineProperty(NovoActivityTableState.prototype, "userFiltered", {
        get: function () {
            return !!(this.filter || this.sort || this.globalSearch || this.outsideFilter);
        },
        enumerable: true,
        configurable: true
    });
    NovoActivityTableState.prototype.reset = function (fireUpdate, persistUserFilters) {
        if (fireUpdate === void 0) { fireUpdate = true; }
        if (!persistUserFilters) {
            this.sort = undefined;
            this.globalSearch = undefined;
            this.filter = undefined;
        }
        this.page = 0;
        this.selectedRows.clear();
        this.onReset.emit(true);
        if (fireUpdate) {
            this.updates.emit({
                sort: this.sort,
                filter: this.filter,
                globalSearch: this.globalSearch
            });
        }
    };
    return NovoActivityTableState;
}());
exports.NovoActivityTableState = NovoActivityTableState;
//# sourceMappingURL=state.js.map