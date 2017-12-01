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
var table_1 = require("@angular/cdk/table");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
var Helpers_1 = require("../../utils/Helpers");
var RemoteActivityTableService = (function () {
    function RemoteActivityTableService() {
    }
    return RemoteActivityTableService;
}());
exports.RemoteActivityTableService = RemoteActivityTableService;
var StaticActivityTableService = (function () {
    function StaticActivityTableService(data) {
        if (data === void 0) { data = []; }
        this.data = data;
    }
    StaticActivityTableService.prototype.getTableResults = function (sort, filter, page, pageSize, globalSearch, outsideFilter) {
        if (page === void 0) { page = 0; }
        var ret = Helpers_1.Helpers.deepClone(this.data);
        if (ret.length !== 0) {
            if (globalSearch) {
                ret = ret.filter(function (item) { return Object.keys(item).some(function (key) { return ("" + item[key]).toLowerCase().includes(globalSearch.toLowerCase()); }); });
            }
            if (filter) {
                var value = Helpers_1.Helpers.isString(filter.value) ? filter.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : filter.value;
                ret = ret.filter(Helpers_1.Helpers.filterByField(filter.id, value));
            }
            if (sort) {
                ret = ret.sort(Helpers_1.Helpers.sortByField(sort.id, sort.value === 'desc'));
            }
            if (!Helpers_1.Helpers.isBlank(page) && !Helpers_1.Helpers.isBlank(pageSize)) {
                ret = ret.slice(page * pageSize, (page + 1) * pageSize);
            }
        }
        return Observable_1.Observable.of({ results: ret, total: this.data.length });
    };
    return StaticActivityTableService;
}());
exports.StaticActivityTableService = StaticActivityTableService;
var ActivityTableDataSource = (function (_super) {
    __extends(ActivityTableDataSource, _super);
    function ActivityTableDataSource(tableService, state, ref) {
        var _this = _super.call(this) || this;
        _this.tableService = tableService;
        _this.state = state;
        _this.ref = ref;
        _this.total = 0;
        _this.current = 0;
        _this.loading = false;
        _this.pristine = true;
        return _this;
    }
    Object.defineProperty(ActivityTableDataSource.prototype, "totallyEmpty", {
        get: function () {
            return this.total === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityTableDataSource.prototype, "currentlyEmpty", {
        get: function () {
            return this.current === 0;
        },
        enumerable: true,
        configurable: true
    });
    ActivityTableDataSource.prototype.connect = function () {
        var _this = this;
        var displayDataChanges = [
            this.state.updates
        ];
        return Observable_1.Observable.merge.apply(Observable_1.Observable, displayDataChanges).startWith(null)
            .switchMap(function () {
            _this.pristine = false;
            _this.loading = true;
            return _this.tableService.getTableResults(_this.state.sort, _this.state.filter, _this.state.page, _this.state.pageSize, _this.state.globalSearch, _this.state.outsideFilter);
        })
            .map(function (data) {
            _this.loading = false;
            _this.total = data.total;
            _this.current = data.results.length;
            setTimeout(function () {
                _this.ref.markForCheck();
            });
            return data.results;
        })
            .catch(function (error) {
            console.error(error); // tslint: disable-line
            _this.loading = false;
            return Observable_1.Observable.of(null);
        });
    };
    ActivityTableDataSource.prototype.disconnect = function () { };
    return ActivityTableDataSource;
}(table_1.DataSource));
exports.ActivityTableDataSource = ActivityTableDataSource;
//# sourceMappingURL=table-source.js.map