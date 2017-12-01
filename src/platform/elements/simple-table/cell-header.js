"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var coercion_1 = require("@angular/cdk/coercion");
var table_1 = require("@angular/cdk/table");
var dateFns = require("date-fns");
var sort_1 = require("./sort");
var novo_label_service_1 = require("../../services/novo-label-service");
var state_1 = require("./state");
var NovoSimpleFilterFocus = (function () {
    function NovoSimpleFilterFocus(element) {
        this.element = element;
    }
    NovoSimpleFilterFocus.prototype.ngAfterViewInit = function () {
        this.element.nativeElement.focus();
    };
    return NovoSimpleFilterFocus;
}());
NovoSimpleFilterFocus.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[novoSimpleFilterFocus]'
            },] },
];
/** @nocollapse */
NovoSimpleFilterFocus.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
]; };
exports.NovoSimpleFilterFocus = NovoSimpleFilterFocus;
var NovoSimpleCellHeader = (function () {
    function NovoSimpleCellHeader(changeDetectorRef, labels, state, _sort, _cdkColumnDef) {
        var _this = this;
        this.changeDetectorRef = changeDetectorRef;
        this.labels = labels;
        this.state = state;
        this._sort = _sort;
        this._cdkColumnDef = _cdkColumnDef;
        this.icon = 'sortable';
        this.filterActive = false;
        this.sortActive = false;
        this.showCustomRange = false;
        this._rerenderSubscription = state.updates.subscribe(function (change) {
            if (change.sort && change.sort.id === _this.id) {
                _this.icon = "sort-" + change.sort.value;
                _this.sortActive = true;
            }
            else {
                _this.icon = 'sortable';
                _this.sortActive = false;
            }
            if (change.filter && change.filter.id === _this.id) {
                _this.filterActive = true;
                _this.filter = change.filter.value;
            }
            else {
                _this.filterActive = false;
                _this.filter = undefined;
            }
            changeDetectorRef.markForCheck();
        });
    }
    Object.defineProperty(NovoSimpleCellHeader.prototype, "config", {
        get: function () { return this._config; },
        set: function (v) {
            if (!v) {
                this._config = {
                    sortable: false,
                    filterable: false,
                    filterConfig: {
                        type: 'text'
                    }
                };
            }
            else {
                this._config = {
                    sortable: coercion_1.coerceBooleanProperty(v.sortable),
                    filterable: coercion_1.coerceBooleanProperty(v.filterable),
                    transforms: v.transforms || {},
                    filterConfig: v.filterConfig || {
                        type: 'text'
                    }
                };
                if (this._config.filterConfig.type === 'date' && !this._config.filterConfig.options) {
                    this._config.filterConfig.options = this.getDefaultDateFilterOptions();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    NovoSimpleCellHeader.prototype.ngOnInit = function () {
        if (this._cdkColumnDef) {
            this.id = this._cdkColumnDef.name;
        }
        if (this.defaultSort && this.id === this.defaultSort.id) {
            this.icon = "sort-" + this.defaultSort.value;
            this.sortActive = true;
            this.changeDetectorRef.markForCheck();
        }
    };
    NovoSimpleCellHeader.prototype.ngOnDestroy = function () {
        this._rerenderSubscription.unsubscribe();
    };
    NovoSimpleCellHeader.prototype.sort = function () {
        var _this = this;
        if (this.changeTimeout) {
            clearTimeout(this.changeTimeout);
        }
        this.changeTimeout = setTimeout(function () {
            _this.direction = _this.getNextSortDirection(_this.direction);
            _this._sort.sort(_this.id, _this.direction, _this._config.transforms.sort);
            _this.changeDetectorRef.markForCheck();
        }, 300);
    };
    NovoSimpleCellHeader.prototype.filterData = function (filter) {
        var _this = this;
        if (this.config.filterConfig.type === 'date' && filter) {
            this.activeDateFilter = filter.label || this.labels.customDateRange;
            if (filter.startDate && filter.endDate) {
                filter = {
                    min: dateFns.startOfDay(filter.startDate),
                    max: dateFns.endOfDay(filter.endDate),
                };
            }
            else {
                filter = {
                    min: dateFns.startOfDay(dateFns.addDays(dateFns.startOfToday(), filter.min)),
                    max: dateFns.endOfDay(dateFns.addDays(dateFns.startOfToday(), filter.max)),
                };
            }
        }
        if (filter) {
            this.filter = filter;
        }
        if (this.changeTimeout) {
            clearTimeout(this.changeTimeout);
        }
        this.changeTimeout = setTimeout(function () {
            if (_this.filter === '') {
                _this.filter = undefined;
            }
            _this._sort.filter(_this.id, _this.filter, _this._config.transforms.filter);
            _this.changeDetectorRef.markForCheck();
        }, 300);
    };
    NovoSimpleCellHeader.prototype.clearFilter = function () {
        this.filter = undefined;
        this.activeDateFilter = undefined;
        this.filterData();
    };
    NovoSimpleCellHeader.prototype.getNextSortDirection = function (direction) {
        if (!direction) {
            return 'asc';
        }
        if (direction === 'asc') {
            return 'desc';
        }
        return 'asc';
    };
    NovoSimpleCellHeader.prototype.getDefaultDateFilterOptions = function () {
        var opts = [
            { label: this.labels.past1Day, min: -1, max: 0 },
            { label: this.labels.past7Days, min: -7, max: 0 },
            { label: this.labels.past30Days, min: -30, max: 0 },
            { label: this.labels.past90Days, min: -90, max: 0 },
            { label: this.labels.past1Year, min: -366, max: 0 },
            { label: this.labels.next1Day, min: 0, max: 1 },
            { label: this.labels.next7Days, min: 0, max: 7 },
            { label: this.labels.next30Days, min: 0, max: 30 },
            { label: this.labels.next90Days, min: 0, max: 90 },
            { label: this.labels.next1Year, min: 0, max: 366 }
        ];
        return opts;
    };
    return NovoSimpleCellHeader;
}());
NovoSimpleCellHeader.decorators = [
    { type: core_1.Component, args: [{
                selector: '[novo-simple-cell-config]',
                template: "\n        <label (click)=\"sort()\" data-automation-id=\"novo-activity-table-label\" [class.sort-disabled]=\"!config.sortable\"><ng-content></ng-content></label>\n        <div>\n            <button *ngIf=\"config.sortable\" theme=\"icon\" [icon]=\"icon\" (click)=\"sort()\" [class.active]=\"sortActive\" data-automation-id=\"novo-activity-table-sort\"></button>\n            <novo-dropdown *ngIf=\"config.filterable\" side=\"right\" appendToBody=\"true\" parentScrollSelector=\".novo-simple-table\" containerClass=\"simple-table-dropdown\" data-automation-id=\"novo-activity-table-filter\">\n                <button type=\"button\" theme=\"icon\" icon=\"filter\" [class.active]=\"filterActive\"></button>\n                <div class=\"header\">\n                    <span>{{ labels.filters }}</span>\n                    <button theme=\"dialogue\" color=\"negative\" icon=\"times\" (click)=\"clearFilter()\" *ngIf=\"filter\" data-automation-id=\"novo-activity-table-filter-clear\">{{ labels.clear }}</button>\n                </div>\n                <ng-container [ngSwitch]=\"config.filterConfig.type\">\n                    <list *ngSwitchCase=\"'date'\">\n                        <ng-container *ngIf=\"!showCustomRange\">\n                            <item [class.active]=\"activeDateFilter === option.label\" *ngFor=\"let option of config.filterConfig.options\" (click)=\"filterData(option)\" [attr.data-automation-id]=\"'novo-activity-table-filter-' + option.label\">\n                                {{ option.label }} <i class=\"bhi-check\" *ngIf=\"activeDateFilter === option.label\"></i>\n                            </item>\n                        </ng-container>\n                        <item [class.active]=\"labels.customDateRange === activeDateFilter\" (click)=\"showCustomRange = true\" *ngIf=\"config.filterConfig.allowCustomRange && !showCustomRange\" [keepOpen]=\"true\">\n                            {{ labels.customDateRange }} <i class=\"bhi-check\" *ngIf=\"labels.customDateRange === activeDateFilter\"></i>\n                        </item>\n                        <div class=\"calender-container\" *ngIf=\"showCustomRange\">\n                            <div (click)=\"showCustomRange = false\"><i class=\"bhi-previous\"></i>{{ labels.backToPresetFilters }}</div>\n                            <novo-date-picker (onSelect)=\"filterData($event)\" [(ngModel)]=\"filter\" range=\"true\"></novo-date-picker>\n                        </div>\n                    </list>\n                    <list *ngSwitchCase=\"'select'\">\n                        <item [class.active]=\"filter === option\" *ngFor=\"let option of config.filterConfig.options\" (click)=\"filterData(option.value || option)\" [attr.data-automation-id]=\"'novo-activity-table-filter-' + (option?.label || option)\">\n                            <span>{{ option?.label || option }}</span> <i class=\"bhi-check\" *ngIf=\"filter === (option.value || option)\"></i>\n                        </item>\n                    </list>\n                    <list *ngSwitchDefault>\n                        <item class=\"filter-search\" keepOpen=\"true\">\n                            <input type=\"text\" [(ngModel)]=\"filter\" (ngModelChange)=\"filterData()\" novoSimpleFilterFocus data-automation-id=\"novo-activity-table-filter-input\"/>\n                        </item>\n                    </list>\n                </ng-container>\n            </novo-dropdown>\n        </div>\n    ",
                encapsulation: core_1.ViewEncapsulation.None,
                changeDetection: core_1.ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
NovoSimpleCellHeader.ctorParameters = function () { return [
    { type: core_1.ChangeDetectorRef, },
    { type: novo_label_service_1.NovoLabelService, },
    { type: state_1.NovoActivityTableState, },
    { type: sort_1.NovoSortFilter, decorators: [{ type: core_1.Optional },] },
    { type: table_1.CdkColumnDef, decorators: [{ type: core_1.Optional },] },
]; };
NovoSimpleCellHeader.propDecorators = {
    'defaultSort': [{ type: core_1.Input },],
    'config': [{ type: core_1.Input, args: ['novo-simple-cell-config',] },],
};
exports.NovoSimpleCellHeader = NovoSimpleCellHeader;
//# sourceMappingURL=cell-header.js.map