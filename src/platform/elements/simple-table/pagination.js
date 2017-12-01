"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var novo_label_service_1 = require("../../services/novo-label-service");
var state_1 = require("./state");
var DEFAULT_PAGE_SIZE = 50;
var NovoSimpleTablePagination = (function () {
    function NovoSimpleTablePagination(changeDetectorRef, labels, state) {
        var _this = this;
        this.changeDetectorRef = changeDetectorRef;
        this.labels = labels;
        this.state = state;
        this._page = 0;
        this._length = 0;
        this._pageSizeOptions = [];
        this.pageChange = new core_1.EventEmitter();
        if (state && state.onReset) {
            this.resetSubscription = this.state.onReset.subscribe(function (clear) {
                if (clear) {
                    _this.page = 0;
                    _this.changeDetectorRef.markForCheck();
                }
            });
        }
    }
    Object.defineProperty(NovoSimpleTablePagination.prototype, "page", {
        get: function () { return this._page; },
        set: function (page) {
            this._page = page;
            this.changeDetectorRef.markForCheck();
            this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
            this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
            this.state.page = this._page;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoSimpleTablePagination.prototype, "length", {
        get: function () { return this._length; },
        set: function (length) {
            this._length = length;
            this.changeDetectorRef.markForCheck();
            this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
            this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoSimpleTablePagination.prototype, "pageSize", {
        get: function () { return this._pageSize; },
        set: function (pageSize) {
            this._pageSize = pageSize;
            this.updateDisplayedPageSizeOptions();
            this.state.pageSize = this._pageSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoSimpleTablePagination.prototype, "pageSizeOptions", {
        get: function () { return this._pageSizeOptions; },
        set: function (pageSizeOptions) {
            this._pageSizeOptions = pageSizeOptions;
            this.updateDisplayedPageSizeOptions();
        },
        enumerable: true,
        configurable: true
    });
    NovoSimpleTablePagination.prototype.ngOnInit = function () {
        this._initialized = true;
        this.updateDisplayedPageSizeOptions();
    };
    NovoSimpleTablePagination.prototype.ngOnDestroy = function () {
        this.resetSubscription.unsubscribe();
    };
    NovoSimpleTablePagination.prototype.nextPage = function () {
        if (!this.hasNextPage()) {
            return;
        }
        this.page++;
        this.emitPageEvent();
    };
    NovoSimpleTablePagination.prototype.previousPage = function () {
        if (!this.hasPreviousPage()) {
            return;
        }
        this.page--;
        this.emitPageEvent();
    };
    NovoSimpleTablePagination.prototype.hasPreviousPage = function () {
        return this.page >= 1 && this.pageSize !== 0;
    };
    NovoSimpleTablePagination.prototype.hasNextPage = function () {
        var numberOfPages = Math.ceil(this.length / this.pageSize) - 1;
        return this.page < numberOfPages && this.pageSize !== 0;
    };
    NovoSimpleTablePagination.prototype.changePageSize = function (pageSize) {
        this.page = 0;
        this.pageSize = pageSize;
        this.emitPageEvent();
    };
    NovoSimpleTablePagination.prototype.updateDisplayedPageSizeOptions = function () {
        if (!this._initialized) {
            return;
        }
        if (!this.pageSize) {
            this._pageSize = this.pageSizeOptions.length !== 0 ?
                this.pageSizeOptions[0] :
                DEFAULT_PAGE_SIZE;
        }
        this.displayedPageSizeOptions = this.pageSizeOptions.slice();
        if (this.displayedPageSizeOptions.indexOf(this.pageSize) === -1) {
            this.displayedPageSizeOptions.push(this.pageSize);
        }
        this.displayedPageSizeOptions.sort(function (a, b) { return a - b; });
        this.changeDetectorRef.markForCheck();
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
    };
    NovoSimpleTablePagination.prototype.emitPageEvent = function () {
        var event = {
            page: this.page,
            pageSize: this.pageSize,
            length: this.length
        };
        this.pageChange.next(event);
        this.state.page = this.page;
        this.state.pageSize = this.pageSize;
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
        this.state.updates.next(event);
    };
    return NovoSimpleTablePagination;
}());
NovoSimpleTablePagination.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-simple-table-pagination',
                template: "\n        <div class=\"novo-simple-table-pagination-size\">\n            <novo-tiles *ngIf=\"displayedPageSizeOptions.length > 1\"\n                        [(ngModel)]=\"pageSize\"\n                        [options]=\"displayedPageSizeOptions\"\n                        (onChange)=\"changePageSize($event)\"\n                        data-automation-id=\"novo-simple-table-pagination-tiles\">\n            </novo-tiles>\n            <div *ngIf=\"displayedPageSizeOptions.length <= 1\">{{ pageSize }}</div>\n        </div>\n\n        <div class=\"novo-simple-table-range-label-long\"data-automation-id=\"novo-simple-table-pagination-range-label-long\">\n            {{ longRangeLabel }}\n        </div>\n        <div class=\"novo-simple-table-range-label-short\"data-automation-id=\"novo-simple-table-pagination-range-label-short\">\n            {{ shortRangeLabel }}\n        </div>\n\n        <button theme=\"dialogue\" type=\"button\"\n                class=\"novo-simple-table-pagination-navigation-previous\"\n                (click)=\"previousPage()\"\n                icon=\"previous\"\n                side=\"left\"\n                [disabled]=\"!hasPreviousPage()\"\n                data-automation-id=\"novo-simple-table-pagination-previous\">\n            <span>{{ labels.previous }}</span>\n        </button>\n        <button theme=\"dialogue\" type=\"button\"\n                class=\"novo-simple-table-pagination-navigation-next\"\n                (click)=\"nextPage()\"\n                icon=\"next\"\n                side=\"right\"\n                [disabled]=\"!hasNextPage()\"\n                data-automation-id=\"novo-simple-table-pagination-next\">\n            <span>{{ labels.next }}</span>\n        </button>\n    ",
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
NovoSimpleTablePagination.ctorParameters = function () { return [
    { type: core_1.ChangeDetectorRef, },
    { type: novo_label_service_1.NovoLabelService, },
    { type: state_1.NovoActivityTableState, },
]; };
NovoSimpleTablePagination.propDecorators = {
    'page': [{ type: core_1.Input },],
    'length': [{ type: core_1.Input },],
    'pageSize': [{ type: core_1.Input },],
    'pageSizeOptions': [{ type: core_1.Input },],
    'pageChange': [{ type: core_1.Output },],
};
exports.NovoSimpleTablePagination = NovoSimpleTablePagination;
//# sourceMappingURL=pagination.js.map