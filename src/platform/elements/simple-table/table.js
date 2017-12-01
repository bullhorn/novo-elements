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
var coercion_1 = require("@angular/cdk/coercion");
var table_source_1 = require("./table-source");
var novo_label_service_1 = require("../../services/novo-label-service");
var state_1 = require("./state");
/** Workaround for https://github.com/angular/angular/issues/17849 */
exports._NovoTable = table_1.CdkTable;
var NovoTable = (function (_super) {
    __extends(NovoTable, _super);
    function NovoTable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NovoTable;
}(exports._NovoTable));
NovoTable.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-simple-table',
                template: table_1.CDK_TABLE_TEMPLATE,
                encapsulation: core_1.ViewEncapsulation.None,
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
NovoTable.ctorParameters = function () { return []; };
exports.NovoTable = NovoTable;
var NovoActivityTableActions = (function () {
    function NovoActivityTableActions() {
    }
    return NovoActivityTableActions;
}());
NovoActivityTableActions.decorators = [
    { type: core_1.Directive, args: [{
                selector: 'novo-activity-table-actions'
            },] },
];
/** @nocollapse */
NovoActivityTableActions.ctorParameters = function () { return []; };
exports.NovoActivityTableActions = NovoActivityTableActions;
var NovoActivityTableCustomHeader = (function () {
    function NovoActivityTableCustomHeader() {
    }
    return NovoActivityTableCustomHeader;
}());
NovoActivityTableCustomHeader.decorators = [
    { type: core_1.Directive, args: [{
                selector: 'novo-activity-table-custom-header'
            },] },
];
/** @nocollapse */
NovoActivityTableCustomHeader.ctorParameters = function () { return []; };
exports.NovoActivityTableCustomHeader = NovoActivityTableCustomHeader;
var NovoActivityTableCustomFilter = (function () {
    function NovoActivityTableCustomFilter() {
    }
    return NovoActivityTableCustomFilter;
}());
NovoActivityTableCustomFilter.decorators = [
    { type: core_1.Directive, args: [{
                selector: 'novo-activity-table-custom-filter'
            },] },
];
/** @nocollapse */
NovoActivityTableCustomFilter.ctorParameters = function () { return []; };
exports.NovoActivityTableCustomFilter = NovoActivityTableCustomFilter;
var NovoActivityTableEmptyMessage = (function () {
    function NovoActivityTableEmptyMessage() {
    }
    return NovoActivityTableEmptyMessage;
}());
NovoActivityTableEmptyMessage.decorators = [
    { type: core_1.Directive, args: [{
                selector: 'novo-activity-table-empty-message'
            },] },
];
/** @nocollapse */
NovoActivityTableEmptyMessage.ctorParameters = function () { return []; };
exports.NovoActivityTableEmptyMessage = NovoActivityTableEmptyMessage;
var NovoActivityTableNoResultsMessage = (function () {
    function NovoActivityTableNoResultsMessage() {
    }
    return NovoActivityTableNoResultsMessage;
}());
NovoActivityTableNoResultsMessage.decorators = [
    { type: core_1.Directive, args: [{
                selector: 'novo-activity-table-no-results-message'
            },] },
];
/** @nocollapse */
NovoActivityTableNoResultsMessage.ctorParameters = function () { return []; };
exports.NovoActivityTableNoResultsMessage = NovoActivityTableNoResultsMessage;
var NovoActivityTable = (function () {
    function NovoActivityTable(labels, ref, state) {
        this.labels = labels;
        this.ref = ref;
        this.state = state;
        this.globalSearchHiddenClassToggle = false;
        this.loading = true;
    }
    Object.defineProperty(NovoActivityTable.prototype, "customFilter", {
        get: function () {
            return this._customFilter;
        },
        set: function (v) {
            this._customFilter = coercion_1.coerceBooleanProperty(v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoActivityTable.prototype, "forceShowHeader", {
        get: function () {
            return this._forceShowHeader;
        },
        set: function (v) {
            this._forceShowHeader = coercion_1.coerceBooleanProperty(v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoActivityTable.prototype, "hideGlobalSearch", {
        get: function () {
            return this._hideGlobalSearch;
        },
        set: function (v) {
            this._hideGlobalSearch = coercion_1.coerceBooleanProperty(v);
            this.globalSearchHiddenClassToggle = this._hideGlobalSearch;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoActivityTable.prototype, "debug", {
        get: function () {
            return this._debug;
        },
        set: function (v) {
            this._debug = coercion_1.coerceBooleanProperty(v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoActivityTable.prototype, "empty", {
        get: function () {
            return this.dataSource && this.dataSource.totallyEmpty;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoActivityTable.prototype, "loadingClass", {
        get: function () {
            return this.loading || (this.dataSource && this.dataSource.loading);
        },
        enumerable: true,
        configurable: true
    });
    NovoActivityTable.prototype.ngOnChanges = function (changes) {
        var _this = this;
        this.loading = changes['activityService'] && !changes['activityService'].currentValue;
        this.ref.detectChanges();
        if (changes['activityService'] && changes['activityService'].currentValue) {
            this.loading = false;
            this.dataSource = new table_source_1.ActivityTableDataSource(this.activityService, this.state, this.ref);
            this.ref.detectChanges();
        }
        if (changes['outsideFilter'] && changes['outsideFilter'].currentValue) {
            if (!this.outsideFilterSubscription) {
                this.outsideFilterSubscription = this.outsideFilter.subscribe(function (filter) {
                    _this.state.outsideFilter = filter;
                    _this.state.updates.next({ globalSearch: _this.state.globalSearch, filter: _this.state.filter, sort: _this.state.sort });
                    _this.ref.markForCheck();
                });
            }
        }
    };
    NovoActivityTable.prototype.ngOnDestroy = function () {
        if (this.outsideFilterSubscription) {
            this.outsideFilterSubscription.unsubscribe();
        }
    };
    NovoActivityTable.prototype.ngAfterContentInit = function () {
        if (this.paginationOptions && !this.paginationOptions.page) {
            this.paginationOptions.page = 0;
        }
        if (this.paginationOptions && !this.paginationOptions.pageSize) {
            this.paginationOptions.pageSize = 50;
        }
        if (this.paginationOptions && !this.paginationOptions.pageSizeOptions) {
            this.paginationOptions.pageSizeOptions = [10, 25, 50, 100];
        }
        this.state.page = this.paginationOptions ? this.paginationOptions.page : undefined;
        this.state.pageSize = this.paginationOptions ? this.paginationOptions.pageSize : undefined;
        this.ref.markForCheck();
    };
    NovoActivityTable.prototype.onSearchChange = function (term) {
        this.state.globalSearch = term;
        this.state.reset(false, true);
        this.state.updates.next({ globalSearch: term, filter: this.state.filter, sort: this.state.sort });
    };
    return NovoActivityTable;
}());
NovoActivityTable.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-activity-table',
                template: "\n        <div *ngIf=\"debug\">\n            <p>Total: {{ dataSource?.total }}</p>\n            <p>Current: {{ dataSource?.current }}</p>\n            <p>Totally Empty: {{ dataSource?.totallyEmpty }}</p>\n            <p>Currently Empty: {{ dataSource?.currentlyEmpty }}</p>\n            <p>Loading (DataSource): {{ dataSource?.loading }}</p>\n            <p>User Filtered: {{ state.userFiltered }}</p>\n            <p>Loading (Table): {{ loading }}</p>\n        </div>\n        <header *ngIf=\"(!(dataSource?.totallyEmpty && !state.userFiltered) && !loading) || forceShowHeader\">\n            <ng-content select=\"[novo-activity-table-custom-header]\"></ng-content>\n            <novo-search\n                alwaysOpen=\"true\"\n                (searchChanged)=\"onSearchChange($event)\"\n                [(ngModel)]=\"state.globalSearch\"\n                *ngIf=\"!hideGlobalSearch\"\n                [placeholder]=\"searchOptions?.placeholder\"\n                [hint]=\"searchOptions?.tooltip\">\n            </novo-search>\n            <novo-simple-table-pagination\n                *ngIf=\"paginationOptions\"\n                [length]=\"dataSource?.total\"\n                [page]=\"paginationOptions.page\"\n                [pageSize]=\"paginationOptions.pageSize\"\n                [pageSizeOptions]=\"paginationOptions.pageSizeOptions\">\n            </novo-simple-table-pagination>\n            <div class=\"novo-activity-table-actions\">\n                <ng-content select=\"[novo-activity-table-actions]\"></ng-content>\n            </div>\n        </header>\n        <div class=\"novo-activity-table-loading-mask\" *ngIf=\"dataSource?.loading || loading\" data-automation-id=\"novo-activity-table-loading\">\n            <novo-loading></novo-loading>\n        </div>\n        <div class=\"novo-activity-table-filter-container\">\n            <div class=\"novo-activity-table-custom-filter\" *ngIf=\"customFilter\">\n                <ng-content select=\"[novo-activity-table-custom-filter]\"></ng-content>\n            </div>\n            <div class=\"novo-activity-table-container\">\n                <novo-simple-table *ngIf=\"(columns?.length > 0)\" [dataSource]=\"dataSource\" novoSortFilter novoSelection [class.empty]=\"dataSource?.currentlyEmpty && state.userFiltered\" [hidden]=\"dataSource?.totallyEmpty && !userFiltered\">\n                    <ng-content></ng-content>\n                    <ng-container novoSimpleColumnDef=\"selection\">\n                        <novo-simple-checkbox-header-cell *novoSimpleHeaderCellDef></novo-simple-checkbox-header-cell>\n                        <novo-simple-checkbox-cell *novoSimpleCellDef=\"let row; let i = index\" [row]=\"row\" [index]=\"i\"></novo-simple-checkbox-cell>\n                    </ng-container>\n                    <ng-container *ngFor=\"let column of actionColumns\" [novoSimpleColumnDef]=\"column.id\">\n                        <novo-simple-empty-header-cell [class.button-header-cell]=\"!column.options\" [class.dropdown-header-cell]=\"column.options\" *novoSimpleHeaderCellDef></novo-simple-empty-header-cell>\n                        <novo-simple-action-cell *novoSimpleCellDef=\"let row; let i = index\" [row]=\"row\" [column]=\"column\"></novo-simple-action-cell>\n                    </ng-container>\n                    <ng-container *ngFor=\"let column of columns\" [novoSimpleColumnDef]=\"column.id\">\n                        <novo-simple-header-cell *novoSimpleHeaderCellDef [column]=\"column\" [novo-simple-cell-config]=\"column.config\" [defaultSort]=\"defaultSort\">{{ column.label }}</novo-simple-header-cell>\n                        <novo-simple-cell *novoSimpleCellDef=\"let row\" [column]=\"column\" [row]=\"row\"></novo-simple-cell>\n                    </ng-container>\n                    <novo-simple-header-row *novoSimpleHeaderRowDef=\"displayedColumns\"></novo-simple-header-row>\n                    <novo-simple-row *novoSimpleRowDef=\"let row; columns: displayedColumns;\"></novo-simple-row>\n                </novo-simple-table>\n                <div class=\"novo-activity-table-no-results-container\" *ngIf=\"dataSource?.currentlyEmpty && state.userFiltered && !dataSource?.loading && !loading && !dataSource.pristine\">\n                    <div #filtered><ng-content select=\"[novo-activity-table-no-results-message]\"></ng-content></div>\n                    <div class=\"novo-activity-table-empty-message\" *ngIf=\"filtered.childNodes.length == 0\">\n                        <h4><i class=\"bhi-search-question\"></i> {{ labels.noMatchingRecordsMessage }}</h4>\n                    </div>\n                </div>\n                <div class=\"novo-activity-table-empty-container\" *ngIf=\"dataSource?.totallyEmpty && !dataSource?.loading && !loading && !state.userFiltered && !dataSource.pristine\">\n                    <div #empty><ng-content select=\"[novo-activity-table-empty-message]\"></ng-content></div>\n                    <div class=\"novo-activity-table-empty-message\" *ngIf=\"empty.childNodes.length == 0\">\n                        <h4><i class=\"bhi-search-question\"></i> {{ labels.emptyTableMessage }}</h4>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                providers: [state_1.NovoActivityTableState]
            },] },
];
/** @nocollapse */
NovoActivityTable.ctorParameters = function () { return [
    { type: novo_label_service_1.NovoLabelService, },
    { type: core_1.ChangeDetectorRef, },
    { type: state_1.NovoActivityTableState, },
]; };
NovoActivityTable.propDecorators = {
    'globalSearchHiddenClassToggle': [{ type: core_1.HostBinding, args: ['class.global-search-hidden',] },],
    'activityService': [{ type: core_1.Input },],
    'columns': [{ type: core_1.Input },],
    'displayedColumns': [{ type: core_1.Input },],
    'actionColumns': [{ type: core_1.Input },],
    'paginationOptions': [{ type: core_1.Input },],
    'searchOptions': [{ type: core_1.Input },],
    'defaultSort': [{ type: core_1.Input },],
    'outsideFilter': [{ type: core_1.Input },],
    'customFilter': [{ type: core_1.Input },],
    'forceShowHeader': [{ type: core_1.Input },],
    'hideGlobalSearch': [{ type: core_1.Input },],
    'debug': [{ type: core_1.Input },],
    'empty': [{ type: core_1.HostBinding, args: ['class.empty',] },],
    'loadingClass': [{ type: core_1.HostBinding, args: ['class.loading',] },],
};
exports.NovoActivityTable = NovoActivityTable;
//# sourceMappingURL=table.js.map