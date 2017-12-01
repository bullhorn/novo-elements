"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var coercion_1 = require("@angular/cdk/coercion");
// APP
var novo_label_service_1 = require("../../../../services/novo-label-service");
var Pagination = (function () {
    function Pagination(labels) {
        this.labels = labels;
        this.itemsPerPage = 10;
        this.pageChange = new core_1.EventEmitter();
        this.itemsPerPageChange = new core_1.EventEmitter();
        this.onPageChange = new core_1.EventEmitter();
        this.maxPagesDisplayed = 5;
    }
    Object.defineProperty(Pagination.prototype, "disablePageSelection", {
        get: function () { return this.pageSelectDisabled; },
        set: function (val) {
            this.pageSelectDisabled = coercion_1.coerceBooleanProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Pagination.prototype.ngOnInit = function () {
        this.label = this.label || this.labels.itemsPerPage;
        this.rowOptions = this.rowOptions || this.getDefaultRowOptions();
    };
    Pagination.prototype.ngOnChanges = function (changes) {
        this.page = this.page || 1;
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
    };
    Pagination.prototype.getDefaultRowOptions = function () {
        return [
            { value: 10, label: '10' },
            { value: 25, label: '25' },
            { value: 50, label: '50' },
            { value: 100, label: '100' }
        ];
    };
    Pagination.prototype.onPageSizeChanged = function (event) {
        this.page = 1;
        this.itemsPerPage = event.selected;
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
        this.pageChange.emit(this.page);
        this.itemsPerPageChange.emit(this.itemsPerPage);
        this.onPageChange.emit({
            page: this.page,
            itemsPerPage: this.itemsPerPage
        });
    };
    Pagination.prototype.selectPage = function (page, event) {
        if (event) {
            event.preventDefault();
        }
        this.page = page;
        this.pages = this.getPages(this.page, this.totalPages);
        this.pageChange.emit(this.page);
        this.onPageChange.emit({
            page: this.page,
            itemsPerPage: this.itemsPerPage
        });
    };
    Pagination.prototype.noPrevious = function () {
        return this.page === 1;
    };
    Pagination.prototype.noNext = function () {
        return this.page === this.totalPages;
    };
    // Create page object used in template
    Pagination.prototype.makePage = function (number, text, isActive) {
        return {
            number: number,
            text: text,
            active: isActive
        };
    };
    Pagination.prototype.getPages = function (currentPage, totalPages) {
        var pages = [];
        // Default page limits
        var startPage = 1;
        var endPage = totalPages;
        var isMaxSized = this.maxPagesDisplayed < totalPages;
        // recompute if maxPagesDisplayed
        if (isMaxSized) {
            // Current page is displayed in the middle of the visible ones
            startPage = Math.max(currentPage - Math.floor(this.maxPagesDisplayed / 2), 1);
            endPage = startPage + this.maxPagesDisplayed - 1;
            // Adjust if limit is exceeded
            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = endPage - this.maxPagesDisplayed + 1;
            }
        }
        // Add page number links
        for (var number = startPage; number <= endPage; number++) {
            var page = this.makePage(number, number.toString(), number === currentPage);
            pages.push(page);
        }
        return pages;
    };
    Pagination.prototype.calculateTotalPages = function () {
        var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    };
    return Pagination;
}());
Pagination.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-pagination',
                template: "\n        <h5 class=\"rows\">{{label}}</h5>\n        <novo-select [options]=\"rowOptions\" [placeholder]=\"labels.select\" [(ngModel)]=\"itemsPerPage\" (onSelect)=\"onPageSizeChanged($event)\" data-automation-id=\"pager-select\"></novo-select>\n        <span class=\"spacer\"></span>\n        <ul class=\"pager\" data-automation-id=\"pager\">\n            <li class=\"page\" (click)=\"selectPage(page-1)\" [ngClass]=\"{'disabled': noPrevious()}\"><i class=\"bhi-previous\" data-automation-id=\"pager-previous\"></i></li>\n            <li class=\"page\" [ngClass]=\"{active: p.number==page}\" [class.disabled]=\"disablePageSelection\" *ngFor=\"let p of pages\" (click)=\"selectPage(p.number)\">{{p.text}}</li>\n            <li class=\"page\" (click)=\"selectPage(page+1)\" [ngClass]=\"{'disabled': noNext()}\"><i class=\"bhi-next\" data-automation-id=\"pager-next\"></i></li>\n        </ul>\n  "
            },] },
];
/** @nocollapse */
Pagination.ctorParameters = function () { return [
    { type: novo_label_service_1.NovoLabelService, },
]; };
Pagination.propDecorators = {
    'page': [{ type: core_1.Input },],
    'totalItems': [{ type: core_1.Input },],
    'itemsPerPage': [{ type: core_1.Input },],
    'rowOptions': [{ type: core_1.Input },],
    'label': [{ type: core_1.Input },],
    'disablePageSelection': [{ type: core_1.Input },],
    'pageChange': [{ type: core_1.Output },],
    'itemsPerPageChange': [{ type: core_1.Output },],
    'onPageChange': [{ type: core_1.Output },],
};
exports.Pagination = Pagination;
//# sourceMappingURL=Pagination.js.map