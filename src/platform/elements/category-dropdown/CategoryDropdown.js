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
var OutsideClick_1 = require("../../utils/outside-click/OutsideClick");
var KeyCodes_1 = require("../../utils/key-codes/KeyCodes");
var Helpers_1 = require("../../utils/Helpers");
var novo_label_service_1 = require("../../services/novo-label-service");
var NovoCategoryDropdownElement = (function (_super) {
    __extends(NovoCategoryDropdownElement, _super);
    function NovoCategoryDropdownElement(element, labels) {
        var _this = _super.call(this, element) || this;
        _this.labels = labels;
        _this._query = '';
        _this._categoryMap = {};
        _this._categories = [];
        // Boolean to keep the selection persist when closing the dropdown
        _this.persistSelection = false;
        // Boolean to close the dropdown on selection
        _this.closeOnSelect = false;
        // Event that is emitted whenever an item is selected
        _this._select = new core_1.EventEmitter();
        // Event that is emitted whenever a category is selected
        _this.categorySelected = new core_1.EventEmitter();
        _this.clickHandler = _this.toggleActive.bind(_this);
        return _this;
    }
    Object.defineProperty(NovoCategoryDropdownElement.prototype, "categories", {
        set: function (categories) {
            this._masterCategoryMap = Object.assign({}, categories);
            this._categoryMap = Object.assign({}, categories);
            this._categories = Object.keys(categories);
        },
        enumerable: true,
        configurable: true
    });
    NovoCategoryDropdownElement.prototype.ngOnInit = function () {
        var button = this.element.nativeElement.querySelector('button');
        button.addEventListener('click', this.clickHandler);
    };
    NovoCategoryDropdownElement.prototype.ngOnDestroy = function () {
        var button = this.element.nativeElement.querySelector('button');
        if (button) {
            button.removeEventListener('click', this.clickHandler);
        }
    };
    NovoCategoryDropdownElement.prototype.onKeyDown = function (event) {
        if (this.active && (event.keyCode === KeyCodes_1.KeyCodes.ESC || event.keyCode === KeyCodes_1.KeyCodes.ENTER)) {
            this.toggleActive();
        }
    };
    NovoCategoryDropdownElement.prototype.clearSelection = function () {
        var _this = this;
        this._categories.forEach(function (category) {
            _this._categoryMap[category].forEach(function (item) {
                item.selected = false;
            });
        });
    };
    NovoCategoryDropdownElement.prototype.select = function (event, item) {
        Helpers_1.Helpers.swallowEvent(event);
        // If we persist the selection, clear and show a check
        if (this.persistSelection) {
            this.clearSelection();
            item.selected = true;
        }
        // Emit the item
        this._select.emit(item);
        // Close, if input is set
        if (this.closeOnSelect) {
            this.toggleActive();
        }
    };
    NovoCategoryDropdownElement.prototype.onCategorySelected = function (category) {
        this.categorySelected.emit(category);
    };
    NovoCategoryDropdownElement.prototype.clearQuery = function (event) {
        var _this = this;
        Helpers_1.Helpers.swallowEvent(event);
        this._query = '';
        // Reset the categories
        this._categories.forEach(function (category) {
            _this._categoryMap[category] = _this._masterCategoryMap[category];
        });
    };
    NovoCategoryDropdownElement.prototype.queryCategories = function (query) {
        var _this = this;
        // Save the query
        this._query = query;
        // Check timeout
        if (this._queryTimeout) {
            clearTimeout(this._queryTimeout);
        }
        // Store a timeout, to debounce user input
        this._queryTimeout = setTimeout(function () {
            _this._categories.forEach(function (category) {
                if (_this.search.compare) {
                    _this._categoryMap[category] = _this._masterCategoryMap[category].filter(function (item) { return _this.search.compare(query, item); });
                }
                else {
                    _this._categoryMap[category] = _this._masterCategoryMap[category].filter(function (item) { return ~item.label.toLowerCase().indexOf(query.toLowerCase()); });
                }
            });
        }, this.search.debounce || 300);
    };
    NovoCategoryDropdownElement.prototype.executeClickCallback = function (event, link) {
        link.callback(event);
        // Close, if input is set
        if (this.closeOnSelect) {
            this.toggleActive();
        }
    };
    return NovoCategoryDropdownElement;
}(OutsideClick_1.OutsideClick));
NovoCategoryDropdownElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-category-dropdown',
                template: "\n        <ng-content select=\"button\"></ng-content>\n        <div class=\"dropdown-container\" *ngIf=\"active\">\n            <div class=\"novo-category-dropdown-search\" *ngIf=\"search\" data-automation-id=\"novo-category-dropdown-search\">\n                <input type=\"text\" [placeholder]=\"search.placeholder || labels.search\" [value]=\"_query\" (input)=\"queryCategories($event.target.value)\"/>\n                <i class=\"bhi-search\" *ngIf=\"!_query\"></i>\n                <i class=\"bhi-times\" *ngIf=\"_query\" (click)=\"clearQuery($event)\"></i>\n            </div>\n            <novo-nav theme=\"white\" [outlet]=\"novoCategoryDropdownOutlet\" direction=\"vertical\">\n                <novo-tab *ngFor=\"let category of _categories\" [attr.data-automation-id]=\"category\" (activeChange)=\"onCategorySelected(category)\">\n                    <span>{{ category }} ({{ _categoryMap[category].length }})</span>\n                </novo-tab>\n            </novo-nav>\n            <novo-nav-outlet #novoCategoryDropdownOutlet>\n                <novo-nav-content *ngFor=\"let category of _categories\">\n                    <novo-list direction=\"vertical\">\n                        <novo-list-item *ngFor=\"let item of _categoryMap[category]\" (click)=\"select($event, item)\" [attr.data-automation-id]=\"item.label\">\n                            <item-content>{{ item.label }}</item-content>\n                            <item-end class=\"novo-category-dropdown-hover\" *ngIf=\"item.hoverText && !item.selected\">{{ item.hoverText }}</item-end>\n                            <item-end class=\"novo-category-dropdown-hover\" *ngIf=\"item.hoverIcon && !item.selected\"><i class=\"bhi-{{ item.hoverIcon }}\"></i></item-end>\n                            <item-end *ngIf=\"item.selected\"><i class=\"bhi-check\"></i></item-end>\n                        </novo-list-item>\n                        <novo-list-item *ngIf=\"_categoryMap[category].length === 0 && search\" class=\"novo-category-dropdown-empty-item\">\n                            <item-content>{{ search.emptyMessage || labels.noItems }}</item-content>\n                        </novo-list-item>\n                    </novo-list>\n                </novo-nav-content>\n            </novo-nav-outlet>\n            <footer *ngIf=\"footer\" class=\"novo-category-dropdown-footer-align-{{ footer.align || 'right' }}\">\n                <a *ngFor=\"let link of footer.links\" (click)=\"executeClickCallback($event, link)\">{{ link.label }}</a>\n            </footer>\n        </div>\n    ",
                host: {
                    '(keydown)': 'onKeyDown($event)',
                    '[class.active]': 'active'
                }
            },] },
];
/** @nocollapse */
NovoCategoryDropdownElement.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: novo_label_service_1.NovoLabelService, },
]; };
NovoCategoryDropdownElement.propDecorators = {
    'persistSelection': [{ type: core_1.Input },],
    'closeOnSelect': [{ type: core_1.Input },],
    'search': [{ type: core_1.Input },],
    'footer': [{ type: core_1.Input },],
    '_select': [{ type: core_1.Output, args: ['itemSelected',] },],
    'categorySelected': [{ type: core_1.Output },],
    'categories': [{ type: core_1.Input },],
};
exports.NovoCategoryDropdownElement = NovoCategoryDropdownElement;
//# sourceMappingURL=CategoryDropdown.js.map