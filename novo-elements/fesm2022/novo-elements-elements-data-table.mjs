import * as i1 from '@angular/cdk/table';
import { CdkHeaderCell, CdkCell, DataSource, CdkHeaderRow, CDK_ROW_TEMPLATE, CdkRow, CdkTableModule } from '@angular/cdk/table';
import * as i0 from '@angular/core';
import { InjectionToken, Input, HostBinding, Inject, ChangeDetectionStrategy, Component, EventEmitter, Injectable, Output, Directive, HostListener, ViewChild, Optional, Pipe, ViewChildren, ContentChildren, ViewEncapsulation, NgModule } from '@angular/core';
import * as i2 from 'novo-elements/elements/toast';
import { Subject, fromEvent, merge, of } from 'rxjs';
import * as i1$1 from 'novo-elements/services';
import { DateUtil, Helpers, BooleanInput, notify } from 'novo-elements/utils';
import * as i5$1 from 'novo-elements/elements/dropdown';
import { NovoDropdownElement, NovoDropdownModule } from 'novo-elements/elements/dropdown';
import { endOfToday, startOfToday } from 'date-fns';
import { trigger, state, transition, style, animate } from '@angular/animations';
import * as i3 from 'novo-elements/elements/icon';
import { NovoIconModule } from 'novo-elements/elements/icon';
import * as i5 from 'novo-elements/elements/date-picker';
import { NovoDatePickerModule } from 'novo-elements/elements/date-picker';
import * as i6 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i7 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i3$1 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';
import * as i11 from 'novo-elements/elements/common';
import { NovoTemplate, NovoOptionModule, NovoCommonModule } from 'novo-elements/elements/common';
import * as i12 from 'novo-elements/elements/tooltip';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
import * as i13 from 'novo-elements/elements/flex';
import { NovoFlexModule } from 'novo-elements/elements/flex';
import * as i14 from 'novo-elements/elements/field';
import { NovoFieldModule } from 'novo-elements/elements/field';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import * as i9$1 from 'novo-elements/elements/drag-drop';
import { NovoDragDropModule } from 'novo-elements/elements/drag-drop';
import * as i6$1 from 'novo-elements/elements/loading';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import * as i11$1 from 'novo-elements/elements/search';
import { NovoSearchBoxModule } from 'novo-elements/elements/search';
import * as i14$1 from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import * as i7$1 from 'novo-elements/elements/tiles';
import { NovoTilesModule } from 'novo-elements/elements/tiles';
import * as i9 from 'novo-elements/elements/select';
import { NovoSelectModule } from 'novo-elements/elements/select';
import { NovoCheckboxModule } from 'novo-elements/elements/checkbox';
import { NovoFormExtrasModule } from 'novo-elements/elements/form';

/**
 * Injection token used to provide the parent component to options.
 */
const NOVO_DATA_TABLE_REF = new InjectionToken('NOVO_DATA_TABLE_REF');

class NovoDataTableCheckboxHeaderCell extends CdkHeaderCell {
    get isAtLimit() {
        return (this.maxSelected && this.dataTable.state.selectedRows.size + this.dataTable.dataSource.data.length > this.maxSelected && !this.checked);
    }
    constructor(columnDef, elementRef, renderer, dataTable, ref, toaster) {
        super(columnDef, elementRef);
        this.dataTable = dataTable;
        this.ref = ref;
        this.toaster = toaster;
        this.role = 'columnheader';
        this.maxSelected = undefined;
        this.checked = false;
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-checkbox-column-header-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-data-table-checkbox-header-cell');
        this.selectionSubscription = this.dataTable.state.selectionSource.subscribe(() => {
            this.checked = this.dataTable.allCurrentRowsSelected() || (this.dataTable?.canSelectAll && this.dataTable?.allMatchingSelected);
            if (this.dataTable?.canSelectAll) {
                this.selectAllChanged();
            }
            this.ref.markForCheck();
        });
        this.paginationSubscription = this.dataTable.state.paginationSource.subscribe((event) => {
            if (event.isPageSizeChange) {
                this.checked = false;
                if (this.dataTable?.canSelectAll) {
                    this.selectAllChanged();
                }
                this.dataTable.selectRows(false);
                this.dataTable.state.checkRetainment('pageSize');
                this.dataTable.state.reset(false, true);
            }
            else {
                this.checked = this.dataTable.allCurrentRowsSelected() || (this.dataTable?.canSelectAll && this.dataTable?.allMatchingSelected);
                if (this.dataTable?.canSelectAll) {
                    this.selectAllChanged();
                }
            }
            this.ref.markForCheck();
        });
        this.resetSubscription = this.dataTable.state.resetSource.subscribe(() => {
            this.checked = false;
            if (this.dataTable?.canSelectAll) {
                this.resetAllMatchingSelected();
            }
            this.ref.markForCheck();
        });
    }
    ngOnDestroy() {
        if (this.selectionSubscription) {
            this.selectionSubscription.unsubscribe();
        }
        if (this.paginationSubscription) {
            this.paginationSubscription.unsubscribe();
        }
        if (this.resetSubscription) {
            this.resetSubscription.unsubscribe();
        }
    }
    onClick() {
        if (this.isAtLimit) {
            this.toaster.alert({
                theme: 'danger',
                position: 'fixedTop',
                message: 'Error, more than 500 items are not able to be selected at one time',
                icon: 'caution',
            });
        }
        else {
            this.dataTable.selectRows(!this.checked);
        }
        if (this.dataTable?.canSelectAll) {
            if (this.checked) {
                this.resetAllMatchingSelected();
            }
            else {
                this.selectAllChanged();
            }
        }
    }
    resetAllMatchingSelected() {
        this.dataTable.state?.allMatchingSelectedSource?.next(false);
        this.dataTable.state?.onSelectionChange();
    }
    selectAllChanged() {
        const allSelectedEvent = {
            allSelected: this.checked,
            selectedCount: this.dataTable?.state?.selected?.length,
            allMatchingSelected: this.dataTable?.allMatchingSelected,
        };
        this.dataTable.allSelected.emit(allSelectedEvent);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableCheckboxHeaderCell, deps: [{ token: i1.CdkColumnDef }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: NOVO_DATA_TABLE_REF }, { token: i0.ChangeDetectorRef }, { token: i2.NovoToastService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoDataTableCheckboxHeaderCell, isStandalone: false, selector: "novo-data-table-checkbox-header-cell", inputs: { maxSelected: "maxSelected" }, host: { properties: { "attr.role": "this.role" } }, usesInheritance: true, ngImport: i0, template: `
    <div class="data-table-checkbox" (click)="onClick()">
      <input type="checkbox" [checked]="checked" />
      <label>
        <i [class.bhi-checkbox-empty]="!checked" [class.bhi-checkbox-filled]="checked"></i>
      </label>
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableCheckboxHeaderCell, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-data-table-checkbox-header-cell',
                    template: `
    <div class="data-table-checkbox" (click)="onClick()">
      <input type="checkbox" [checked]="checked" />
      <label>
        <i [class.bhi-checkbox-empty]="!checked" [class.bhi-checkbox-filled]="checked"></i>
      </label>
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1.CdkColumnDef }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NOVO_DATA_TABLE_REF]
                }] }, { type: i0.ChangeDetectorRef }, { type: i2.NovoToastService }], propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], maxSelected: [{
                type: Input
            }] } });

class NovoDataTableExpandHeaderCell extends CdkHeaderCell {
    constructor(columnDef, elementRef, renderer, dataTable, ref) {
        super(columnDef, elementRef);
        this.dataTable = dataTable;
        this.ref = ref;
        this.role = 'columnheader';
        this.expanded = false;
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-expand-column-header-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-expand-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-data-table-expand-header-cell');
        this.expandSubscription = this.dataTable.state.expandSource.subscribe(() => {
            this.expanded = this.dataTable.allCurrentRowsExpanded();
            this.ref.markForCheck();
        });
    }
    ngOnDestroy() {
        if (this.expandSubscription) {
            this.expandSubscription.unsubscribe();
        }
    }
    expandAll() {
        this.dataTable.expandRows(!this.expanded);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableExpandHeaderCell, deps: [{ token: i1.CdkColumnDef }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: NOVO_DATA_TABLE_REF }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoDataTableExpandHeaderCell, isStandalone: false, selector: "novo-data-table-expand-header-cell", host: { properties: { "attr.role": "this.role" } }, usesInheritance: true, ngImport: i0, template: ` <i class="bhi-next data-table-icon" novo-data-table-expander="true" (click)="expandAll()" [class.expanded]="expanded"></i> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableExpandHeaderCell, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-data-table-expand-header-cell',
                    template: ` <i class="bhi-next data-table-icon" novo-data-table-expander="true" (click)="expandAll()" [class.expanded]="expanded"></i> `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1.CdkColumnDef }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NOVO_DATA_TABLE_REF]
                }] }, { type: i0.ChangeDetectorRef }], propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }] } });

class NovoDataTableFilterUtils {
    static constructFilter(filter, type, multiSelect) {
        let actualFilter = filter;
        if (filter) {
            if (type && type === 'date') {
                if (filter.startDate && filter.endDate) {
                    actualFilter = {
                        min: DateUtil.startOfDay(filter.startDate.date),
                        max: DateUtil.startOfDay(DateUtil.addDays(DateUtil.startOfDay(filter.endDate.date), 1)),
                    };
                }
                else {
                    actualFilter = {
                        min: filter.min ? DateUtil.addDays(startOfToday(), filter.min) : startOfToday(),
                        max: filter.max ? DateUtil.addDays(endOfToday(), filter.max) : endOfToday(),
                    };
                }
            }
            if (multiSelect && Array.isArray(filter)) {
                actualFilter = filter.map((filterItem) => {
                    if (filterItem && filterItem.hasOwnProperty('value')) {
                        return filterItem.value;
                    }
                    return filterItem;
                });
            }
            else if (actualFilter && actualFilter.hasOwnProperty('value')) {
                actualFilter = filter.value;
            }
        }
        return actualFilter;
    }
}

class DataTableState {
    constructor() {
        this.selectionSource = new Subject();
        this.paginationSource = new Subject();
        this.sortFilterSource = new Subject();
        this.resetSource = new Subject();
        this.expandSource = new Subject();
        this.allMatchingSelectedSource = new Subject();
        this.dataLoaded = new Subject();
        this.dataLoadingSource = new Subject();
        this.sort = undefined;
        this.filter = undefined;
        this.where = undefined;
        this.page = 0;
        this.pageSize = undefined;
        this.globalSearch = undefined;
        this.selectedRows = new Map();
        this.expandedRows = new Set();
        this.isForceRefresh = false;
        this.updates = new EventEmitter();
        this.retainSelected = false;
        this.savedSearchName = undefined;
        this.displayedColumns = undefined;
    }
    get userFiltered() {
        return !!(this.filter || this.sort || this.globalSearch || this.outsideFilter || this.where);
    }
    get userFilteredInternal() {
        return !!(this.filter || this.sort || this.globalSearch || this.where);
    }
    get selected() {
        return Array.from(this.selectedRows.values());
    }
    reset(fireUpdate = true, persistUserFilters) {
        this.setState({}, fireUpdate, persistUserFilters);
    }
    clearSort(fireUpdate = true) {
        this.sort = undefined;
        this.page = 0;
        this.checkRetainment('sort');
        this.reset(fireUpdate, true);
        this.onSortFilterChange();
        if (fireUpdate) {
            this.updates.emit({
                sort: this.sort,
                filter: this.filter,
                globalSearch: this.globalSearch,
                where: this.where,
            });
        }
    }
    clearFilter(fireUpdate = true) {
        this.filter = undefined;
        this.globalSearch = undefined;
        this.page = 0;
        this.checkRetainment('filter');
        this.reset(fireUpdate, true);
        this.onSortFilterChange();
        if (fireUpdate) {
            this.updates.emit({
                sort: this.sort,
                filter: this.filter,
                globalSearch: this.globalSearch,
                where: this.where,
            });
        }
    }
    clearQuery(fireUpdate = true) {
        this.where = undefined;
        this.page = 0;
        this.checkRetainment('where');
        this.reset(fireUpdate, true);
        this.onSortFilterChange();
        if (fireUpdate) {
            this.updates.emit({
                sort: this.sort,
                filter: this.filter,
                globalSearch: this.globalSearch,
                where: this.where,
            });
        }
    }
    clearSelected(fireUpdate = true) {
        this.allMatchingSelectedSource.next(false);
        this.globalSearch = undefined;
        this.page = 0;
        this.reset(fireUpdate, true);
        this.onSelectionChange();
        if (fireUpdate) {
            this.updates.emit({
                sort: this.sort,
                filter: this.filter,
                globalSearch: this.globalSearch,
                where: this.where,
            });
        }
    }
    onSelectionChange() {
        this.selectionSource.next();
    }
    onExpandChange(targetId) {
        this.expandSource.next(targetId);
    }
    onPaginationChange(isPageSizeChange, pageSize) {
        this.checkRetainment('page');
        this.paginationSource.next({ isPageSizeChange, pageSize });
    }
    onSortFilterChange() {
        this.checkRetainment('sort');
        this.checkRetainment('filter');
        this.checkRetainment('where');
        this.sortFilterSource.next({
            sort: this.sort,
            filter: this.filter,
            globalSearch: this.globalSearch,
            where: this.where,
            savedSearchName: this.savedSearchName,
            appliedSearchType: this.appliedSearchType,
        });
    }
    setInitialSortFilter(preferences) {
        if (preferences) {
            if (preferences.where) {
                this.where = preferences.where;
            }
            if (preferences.sort) {
                this.sort = preferences.sort;
            }
            if (preferences.filter) {
                this.filter = this.transformFilters(preferences.filter);
            }
            if (preferences.globalSearch) {
                this.globalSearch = preferences.globalSearch;
            }
            if (preferences.savedSearchName) {
                this.savedSearchName = preferences.savedSearchName;
            }
            if (preferences.appliedSearchType) {
                this.appliedSearchType = preferences.appliedSearchType;
            }
        }
    }
    setState(preferences, fireUpdate = true, persistUserFilters = false) {
        if (!persistUserFilters) {
            this.where = preferences.where;
            this.sort = preferences.sort;
            this.filter = preferences.filter ? this.transformFilters(preferences.filter) : undefined;
            this.globalSearch = preferences.globalSearch;
            this.savedSearchName = preferences.savedSearchName;
            if (preferences.displayedColumns?.length) {
                this.displayedColumns = preferences.displayedColumns;
            }
            this.appliedSearchType = preferences.appliedSearchType;
        }
        this.page = 0;
        if (!this.retainSelected) {
            this.selectedRows.clear();
            this.resetSource.next();
        }
        this.onSortFilterChange();
        this.retainSelected = false;
        if (fireUpdate) {
            this.updates.emit({
                sort: this.sort,
                filter: this.filter,
                globalSearch: this.globalSearch,
                where: this.where,
                savedSearchName: this.savedSearchName,
                displayedColumns: this.displayedColumns,
                appliedSearchType: this.appliedSearchType,
            });
        }
    }
    checkRetainment(caller, allMatchingSelected = false) {
        this.retainSelected = this.selectionOptions?.some((option) => option.label === caller) || this.retainSelected || allMatchingSelected;
    }
    transformFilters(filters) {
        const filterArray = Helpers.convertToArray(filters);
        filterArray.forEach((filter) => {
            filter.value =
                filter.selectedOption && filter.type
                    ? NovoDataTableFilterUtils.constructFilter(filter.selectedOption, filter.type)
                    : filter.value;
        });
        return filterArray;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DataTableState, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DataTableState }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DataTableState, decorators: [{
            type: Injectable
        }] });

var SortDirection;
(function (SortDirection) {
    SortDirection["ASC"] = "ascending";
    SortDirection["DESC"] = "descending";
    SortDirection["NONE"] = "none";
})(SortDirection || (SortDirection = {}));

const activeStyle = { opacity: 1, top: 0 };
const inactiveStyle = { opacity: 0 };
/** Animation that moves the sort indicator. */
const sortAscAnim = trigger('sortAsc', [
    // ...
    state(SortDirection.ASC, style(activeStyle)),
    state(SortDirection.DESC, style(inactiveStyle)),
    state(SortDirection.NONE, style(inactiveStyle)),
    transition('* => ascending', [animate('1s')]),
    transition('ascending => *', [animate('0.5s')]),
]);
const sortDescAnim = trigger('sortDesc', [
    // ...
    state(SortDirection.ASC, style(inactiveStyle)),
    state(SortDirection.DESC, style(activeStyle)),
    state(SortDirection.NONE, style(inactiveStyle)),
    transition('* => descending', [animate('1s')]),
    transition('descending => *', [animate('0.5s')]),
]);
const sortNoneAnim = trigger('sortNone', [
    // ...
    state(SortDirection.ASC, style(inactiveStyle)),
    state(SortDirection.DESC, style(inactiveStyle)),
    state(SortDirection.NONE, style(activeStyle)),
    transition('* => none', [animate('1s')]),
    transition('none => *', [animate('0.5s')]),
]);

class NovoDataTableSortButton {
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    get isActive() {
        return this.value !== SortDirection.NONE;
    }
    constructor(state, ref, labels) {
        this.state = state;
        this.ref = ref;
        this.labels = labels;
        this.sortChange = new EventEmitter();
        this.SortDirection = SortDirection;
        this._value = SortDirection.NONE;
    }
    changeSort(dir) {
        this.value = dir;
        this.sortChange.emit(dir);
    }
    clearSort() {
        this.state.clearSort();
        this.sortChange.emit(SortDirection.NONE);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableSortButton, deps: [{ token: DataTableState }, { token: i0.ChangeDetectorRef }, { token: i1$1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoDataTableSortButton, isStandalone: false, selector: "novo-sort-button", inputs: { value: "value" }, outputs: { sortChange: "sortChange" }, ngImport: i0, template: "<novo-icon\n  class=\"novo-sort-asc-icon\"\n  [class.sort-active]=\"isActive\"\n  [class.sort-hidden]=\"value !== SortDirection.ASC\"\n  [@sortAsc]=\"value\"\n  (click)=\"changeSort(SortDirection.DESC)\">arrow-up</novo-icon>\n<novo-icon\n  class=\"novo-sort-desc-icon\"\n  [class.sort-active]=\"isActive\"\n  [class.sort-hidden]=\"value !== SortDirection.DESC\"\n  [@sortDesc]=\"value\"\n  (click)=\"changeSort(SortDirection.NONE)\">arrow-down</novo-icon>\n<novo-icon\n  class=\"novo-sortable-icon\"\n  [class.sort-active]=\"isActive\"\n  [class.sort-hidden]=\"value !== SortDirection.NONE\"\n  [@sortNone]=\"value\"\n  (click)=\"changeSort(SortDirection.ASC)\">sortable</novo-icon>", styles: [":host{display:inline-flex;position:relative;width:1.6rem;height:1.6rem;cursor:pointer}:host novo-icon{position:absolute;opacity:0;color:var(--text-muted)}:host novo-icon:hover{color:var(--selection)}:host novo-icon.sort-hidden{pointer-events:none}:host .novo-sort-asc-icon{top:10px;color:var(--selection)}:host .novo-sort-desc-icon{top:-10px;color:var(--selection)}\n"], dependencies: [{ kind: "component", type: i3.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }], animations: [sortAscAnim, sortDescAnim, sortNoneAnim], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableSortButton, decorators: [{
            type: Component,
            args: [{ selector: 'novo-sort-button', changeDetection: ChangeDetectionStrategy.OnPush, animations: [sortAscAnim, sortDescAnim, sortNoneAnim], standalone: false, template: "<novo-icon\n  class=\"novo-sort-asc-icon\"\n  [class.sort-active]=\"isActive\"\n  [class.sort-hidden]=\"value !== SortDirection.ASC\"\n  [@sortAsc]=\"value\"\n  (click)=\"changeSort(SortDirection.DESC)\">arrow-up</novo-icon>\n<novo-icon\n  class=\"novo-sort-desc-icon\"\n  [class.sort-active]=\"isActive\"\n  [class.sort-hidden]=\"value !== SortDirection.DESC\"\n  [@sortDesc]=\"value\"\n  (click)=\"changeSort(SortDirection.NONE)\">arrow-down</novo-icon>\n<novo-icon\n  class=\"novo-sortable-icon\"\n  [class.sort-active]=\"isActive\"\n  [class.sort-hidden]=\"value !== SortDirection.NONE\"\n  [@sortNone]=\"value\"\n  (click)=\"changeSort(SortDirection.ASC)\">sortable</novo-icon>", styles: [":host{display:inline-flex;position:relative;width:1.6rem;height:1.6rem;cursor:pointer}:host novo-icon{position:absolute;opacity:0;color:var(--text-muted)}:host novo-icon:hover{color:var(--selection)}:host novo-icon.sort-hidden{pointer-events:none}:host .novo-sort-asc-icon{top:10px;color:var(--selection)}:host .novo-sort-desc-icon{top:-10px;color:var(--selection)}\n"] }]
        }], ctorParameters: () => [{ type: DataTableState }, { type: i0.ChangeDetectorRef }, { type: i1$1.NovoLabelService }], propDecorators: { sortChange: [{
                type: Output
            }], value: [{
                type: Input
            }] } });

class NovoDataTableSortFilter {
    constructor(state) {
        this.state = state;
    }
    filter(id, type, value, transform, allowMultipleFilters = false, selectedOption) {
        let filter;
        if (allowMultipleFilters) {
            filter = this.resolveMultiFilter(id, type, value, transform, selectedOption);
        }
        else {
            if (!Helpers.isBlank(value)) {
                filter = { id, type, value, transform, ...(selectedOption && { selectedOption }) };
            }
            else {
                filter = undefined;
            }
        }
        this.state.filter = filter;
        this.state.checkRetainment('filter');
        this.state.reset(false, true);
        this.state.updates.next({ filter, sort: this.state.sort });
        this.state.onSortFilterChange();
    }
    sort(id, value, transform) {
        const sort = { id, value, transform };
        this.state.sort = sort;
        this.state.checkRetainment('sort');
        this.state.reset(false, true);
        this.state.updates.next({ sort, filter: this.state.filter });
        this.state.onSortFilterChange();
    }
    resolveMultiFilter(id, type, value, transform, selectedOption) {
        let filter;
        filter = Helpers.convertToArray(this.state.filter);
        const filterIndex = filter.findIndex((aFilter) => aFilter && aFilter.id === id);
        if (filterIndex > -1) {
            filter.splice(filterIndex, 1);
        }
        if (!Helpers.isBlank(value)) {
            filter = [...filter, { id, type, value, transform, ...(selectedOption && { selectedOption }) }];
        }
        if (filter.length < 1) {
            filter = undefined;
        }
        return filter;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableSortFilter, deps: [{ token: DataTableState }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoDataTableSortFilter, isStandalone: false, selector: "[novoDataTableSortFilter]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableSortFilter, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoDataTableSortFilter]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: DataTableState }] });

class NovoDataTableCellFilterHeader {
    set filter(filter) {
        this._filter = filter;
        this.hasFilter = !Helpers.isEmpty(filter);
    }
    get filter() {
        return this._filter;
    }
    constructor(changeDetectorRef, labels) {
        this.changeDetectorRef = changeDetectorRef;
        this.labels = labels;
        this.hasFilter = false;
        this.clearFilter = new EventEmitter();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableCellFilterHeader, deps: [{ token: i0.ChangeDetectorRef }, { token: i1$1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoDataTableCellFilterHeader, isStandalone: false, selector: "novo-data-table-cell-filter-header", inputs: { label: "label", filter: "filter" }, outputs: { clearFilter: "clearFilter" }, ngImport: i0, template: `
    <div class="header">
      <novo-label>{{ label || labels.filters }}</novo-label>
      <novo-button
        theme="dialogue"
        color="negative"
        size="small"
        icon="times"
        (click)="clearFilter.emit()"
        *ngIf="hasFilter"
        data-automation-id="novo-data-table-filter-clear">
        {{ labels.clear }}
      </novo-button>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3$1.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "secondIcon", "disabled"] }, { kind: "component", type: i11.NovoLabel, selector: "novo-label,[novo-label]", inputs: ["id"] }, { kind: "directive", type: i11.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableCellFilterHeader, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-data-table-cell-filter-header',
                    template: `
    <div class="header">
      <novo-label>{{ label || labels.filters }}</novo-label>
      <novo-button
        theme="dialogue"
        color="negative"
        size="small"
        icon="times"
        (click)="clearFilter.emit()"
        *ngIf="hasFilter"
        data-automation-id="novo-data-table-filter-clear">
        {{ labels.clear }}
      </novo-button>
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i1$1.NovoLabelService }], propDecorators: { label: [{
                type: Input
            }], filter: [{
                type: Input
            }], clearFilter: [{
                type: Output
            }] } });

class NovoDataTableCellHeader {
    set column(column) {
        this._column = column;
        this.label = column.type === 'action' ? '' : column.label;
        this.labelIcon = column.labelIcon;
        this.config = {
            sortable: !!column.sortable,
            filterable: !!column.filterable,
            resizable: !!column.resizable,
        };
        this.resizable = this.config.resizable;
        const transforms = {};
        if (column.filterable && Helpers.isObject(column.filterable)) {
            this.config.filterConfig = column.filterable;
            if (!this.config.filterConfig.type) {
                this.config.filterConfig = { type: 'text' };
            }
            if (column.filterable.transform) {
                transforms.filter = column.filterable.transform;
            }
        }
        else {
            this.config.filterConfig = { type: 'text' };
        }
        if (column.sortable && Helpers.isObject(column.sortable)) {
            if (column.sortable.transform) {
                transforms.sort = column.sortable.transform;
            }
        }
        if (this.config.filterConfig.type === 'date' && !this.config.filterConfig.options) {
            this.config.filterConfig.options = this.getDefaultDateFilterOptions();
        }
        this.config.transforms = transforms;
    }
    get column() {
        return this._column;
    }
    constructor(changeDetectorRef, labels, state, renderer, elementRef, _sort, _cdkColumnDef) {
        this.changeDetectorRef = changeDetectorRef;
        this.labels = labels;
        this.state = state;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this._sort = _sort;
        this._cdkColumnDef = _cdkColumnDef;
        this.allowMultipleFilters = false;
        this.toggledFilter = new EventEmitter();
        this.icon = 'sortable';
        this.filterActive = false;
        this.sortActive = false;
        this.sortValue = SortDirection.NONE;
        this.showCustomRange = false;
        this.multiSelect = false;
        this.multiSelectedOptions = [];
        this.multiSelectedOptionIsHidden = [];
        this.optionFilter = '';
        this.error = false;
        this.subscriptions = [];
        this._rerenderSubscription = state.updates.subscribe((change) => this.checkSortFilterState(change));
    }
    ngOnInit() {
        if (this._cdkColumnDef) {
            this.id = this._cdkColumnDef.name;
        }
        this.setupFilterOptions();
        this.changeDetectorRef.markForCheck();
    }
    setupFilterOptions() {
        this.checkSortFilterState({ filter: this.state.filter, sort: this.state.sort }, true);
        this.multiSelect = this.config.filterConfig && this.config.filterConfig.type ? this.config.filterConfig.type === 'multi-select' : false;
        if (this.multiSelect) {
            this.multiSelectedOptions = this.filter ? [...this.filter] : [];
        }
    }
    ngOnDestroy() {
        this._rerenderSubscription.unsubscribe();
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }
    checkSortFilterState(sortFilterState, initialConfig = false) {
        if (sortFilterState.sort && sortFilterState.sort.id === this.id) {
            this.icon = `sort-${sortFilterState.sort.value}`;
            this.sortValue = sortFilterState.sort.value === 'asc' ? SortDirection.ASC : SortDirection.DESC;
            this.sortActive = true;
        }
        else {
            this.icon = 'sortable';
            this.sortValue = SortDirection.NONE;
            this.sortActive = false;
        }
        const tableFilter = Helpers.convertToArray(sortFilterState.filter);
        const thisFilter = tableFilter.find((filter) => filter && filter.id === this.id);
        if (thisFilter) {
            this.filterActive = true;
            if (initialConfig && thisFilter.type === 'date' && thisFilter.selectedOption) {
                this.activeDateFilter = thisFilter.selectedOption.label || this.labels.customDateRange;
            }
            this.filter = thisFilter.value;
        }
        else {
            this.filterActive = false;
            this.filter = undefined;
            this.activeDateFilter = undefined;
            this.multiSelectedOptions = [];
        }
        if (this.defaultSort && this.id === this.defaultSort.id) {
            this.icon = `sort-${this.defaultSort.value}`;
            this.sortActive = true;
        }
        this.multiSelect = this.config.filterConfig && this.config.filterConfig.type ? this.config.filterConfig.type === 'multi-select' : false;
        if (this.multiSelect) {
            this.multiSelectedOptions = this.filter ? [...this.filter] : [];
            if (this.config.filterConfig.options) {
                if (typeof this.config.filterConfig.options[0] === 'string') {
                    this.multiSelectedOptionIsHidden = this.config.filterConfig.options.map((option) => ({ option, hidden: false }));
                }
                else {
                    this.multiSelectedOptionIsHidden = this.config.filterConfig.options.map((option) => ({
                        option,
                        hidden: false,
                    }));
                }
            }
        }
        this.changeDetectorRef.markForCheck();
    }
    isSelected(option, optionsList) {
        if (optionsList) {
            const optionValue = option.hasOwnProperty('value') ? option.value : option;
            const found = optionsList.find((item) => this.optionPresentCheck(item, optionValue));
            return found !== undefined;
        }
        return false;
    }
    toggleSelection(option) {
        const optionValue = option.hasOwnProperty('value') ? option.value : option;
        const optionIndex = this.multiSelectedOptions.findIndex((item) => this.optionPresentCheck(item, optionValue));
        this.error = false;
        if (optionIndex > -1) {
            this.multiSelectedOptions.splice(optionIndex, 1);
            if (this.optionFilter && !this.getOptionText(option).toLowerCase().startsWith(this.optionFilter.toLowerCase())) {
                this.multiSelectedOptionIsHidden[this.multiSelectedOptionIsHidden.findIndex((record) => record.option === option)].hidden = true;
            }
        }
        else {
            this.multiSelectedOptions.push(optionValue);
        }
    }
    optionPresentCheck(item, optionValue) {
        if (item.hasOwnProperty('value')) {
            return item.value === optionValue;
        }
        else {
            return item === optionValue;
        }
    }
    cancel() {
        this.multiSelectedOptions = this.filter ? [...this.filter] : [];
        this.dropdown.closePanel();
        this.clearOptionFilter();
    }
    filterMultiSelect() {
        if (this.multiSelectedOptions.length === 0 && !this.filter) {
            this.multiSelectHasVisibleOptions() && this.dropdown ? (this.error = true) : null;
        }
        else {
            this.clearOptionFilter();
            const actualFilter = this.multiSelectedOptions.length > 0 ? [...this.multiSelectedOptions] : undefined;
            this.filterData(actualFilter);
            this.dropdown.closePanel();
        }
    }
    multiSelectOptionFilter(optionFilter) {
        this.multiSelectedOptionIsHidden.forEach((record) => {
            if (record.option) {
                record.hidden = !(this.getOptionText(record.option).toLowerCase().startsWith(optionFilter.toLowerCase()) ||
                    this.isSelected(record.option, this.multiSelectedOptions));
            }
        });
    }
    multiSelectOptionIsHidden(option) {
        return this.multiSelectedOptionIsHidden.find((record) => record.option === option).hidden;
    }
    multiSelectHasVisibleOptions() {
        return this.multiSelectedOptionIsHidden.some((record) => !record.hidden);
    }
    getOptionText(option) {
        if (typeof option !== 'object') {
            return option.toString();
        }
        else {
            const opt = option;
            return (opt.label.length > 0 ? opt.label : opt.value).toString();
        }
    }
    multiSelectOptionFilterHandleKeydown(event) {
        if (this.multiSelect) {
            this.error = false;
            if (this.dropdown.panelOpen && event.key === "Escape" /* Key.Escape */) {
                // escape should clear text box and close
                Helpers.swallowEvent(event);
                this.clearOptionFilter();
                this.dropdown.closePanel();
            }
            else if (event.key === "Enter" /* Key.Enter */) {
                Helpers.swallowEvent(event);
                this.filterMultiSelect();
            }
            else if ((event.keyCode >= 65 && event.keyCode <= 90) ||
                (event.keyCode >= 96 && event.keyCode <= 105) ||
                (event.keyCode >= 48 && event.keyCode <= 57)) {
                this.optionFilterInput.nativeElement.focus();
            }
        }
    }
    handleEscapeKeydown(event) {
        if (!this.multiSelect) {
            this.error = false;
            this.dropdown.closePanel();
        }
    }
    clearOptionFilter() {
        this.error = false;
        if (this.optionFilter.length > 0) {
            this.optionFilter = '';
            this.multiSelectedOptionIsHidden.forEach((record) => {
                record.hidden = false;
            });
        }
    }
    startResize(mouseDownEvent) {
        mouseDownEvent.preventDefault();
        const minimumWidth = 60 + (this.config.filterable ? 30 : 0) + (this.config.sortable ? 30 : 0);
        const startingWidth = this.elementRef.nativeElement.getBoundingClientRect().width;
        const mouseMoveSubscription = fromEvent(window.document, 'mousemove').subscribe((middleMouseEvent) => {
            const differenceWidth = middleMouseEvent.clientX - mouseDownEvent.clientX;
            let width = startingWidth + differenceWidth;
            if (width < minimumWidth) {
                width = minimumWidth;
            }
            this.setWidth(width);
        });
        const mouseUpSubscription = fromEvent(window.document, 'mouseup').subscribe(() => {
            mouseUpSubscription.unsubscribe();
            mouseMoveSubscription.unsubscribe();
            this.changeDetectorRef.markForCheck();
        });
        this.subscriptions.push(mouseMoveSubscription);
        this.subscriptions.push(mouseUpSubscription);
    }
    setWidth(width) {
        this._column.width = width;
        this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', `${width}px`);
        this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', `${width}px`);
        this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${width}px`);
        this.changeDetectorRef.markForCheck();
        this.resized.next(this._column);
    }
    toggleCustomRange(event, value) {
        Helpers.swallowEvent(event);
        this.showCustomRange = value;
        this.changeDetectorRef.markForCheck();
        this.dropdown.openPanel(); // Ensures that the panel correctly updates to the dynamic size of the dropdown
    }
    clickedFilter(clickEvt) {
        if ((typeof this.config.filterConfig === 'object') && this.config.filterConfig.type === 'custom' && !this.filterTemplate) {
            this.toggledFilter.next(this.id);
            clickEvt.stopImmediatePropagation();
            return;
        }
        this.focusInput();
        if (this.multiSelect && this.dropdown) {
            this.dropdown._handleKeydown = (event) => {
                this.multiSelectOptionFilterHandleKeydown(event);
            };
            this.changeDetectorRef.markForCheck();
        }
    }
    focusInput() {
        if (this.filterInput?.nativeElement) {
            setTimeout(() => this.filterInput.nativeElement.focus());
        }
    }
    sort() {
        if (this.changeTimeout) {
            clearTimeout(this.changeTimeout);
        }
        this.changeTimeout = setTimeout(() => {
            this.direction = this.getNextSortDirection(this.direction);
            this._sort.sort(this.id, this.direction, this.config.transforms.sort);
            this.changeDetectorRef.markForCheck();
        }, 300);
    }
    filterData(filter) {
        let actualFilter = NovoDataTableFilterUtils.constructFilter(filter, this.config.filterConfig.type, this.multiSelect);
        const selectedOption = this.config.filterConfig.type === 'date' && filter ? filter : undefined;
        this.activeDateFilter = selectedOption ? selectedOption.label : undefined;
        if (this.changeTimeout) {
            clearTimeout(this.changeTimeout);
        }
        this.changeTimeout = setTimeout(() => {
            if (actualFilter === '') {
                actualFilter = undefined;
            }
            this._sort.filter(this.id, this.config.filterConfig.type, actualFilter, this.config.transforms.filter, this.allowMultipleFilters, selectedOption);
            this.changeDetectorRef.markForCheck();
        }, 300);
    }
    clearFilter() {
        this.filter = undefined;
        this.multiSelectedOptions = [];
        this.activeDateFilter = undefined;
        this.filterData(undefined);
        this.clearOptionFilter();
        this.dropdown.closePanel();
    }
    getNextSortDirection(direction) {
        if (!direction) {
            return 'asc';
        }
        if (direction === 'asc') {
            return 'desc';
        }
        return 'asc';
    }
    getDefaultDateFilterOptions() {
        const opts = [
            { label: this.labels.past1Day, min: -1, max: 0 },
            { label: this.labels.past7Days, min: -7, max: 0 },
            { label: this.labels.past30Days, min: -30, max: 0 },
            { label: this.labels.past90Days, min: -90, max: 0 },
            { label: this.labels.past1Year, min: -366, max: 0 },
            { label: this.labels.next1Day, min: 0, max: 1 },
            { label: this.labels.next7Days, min: 0, max: 7 },
            { label: this.labels.next30Days, min: 0, max: 30 },
            { label: this.labels.next90Days, min: 0, max: 90 },
            { label: this.labels.next1Year, min: 0, max: 366 },
        ];
        return opts;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableCellHeader, deps: [{ token: i0.ChangeDetectorRef }, { token: i1$1.NovoLabelService }, { token: DataTableState }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: NovoDataTableSortFilter, optional: true }, { token: i1.CdkColumnDef, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoDataTableCellHeader, isStandalone: false, selector: "[novo-data-table-cell-config]", inputs: { defaultSort: "defaultSort", allowMultipleFilters: "allowMultipleFilters", resized: "resized", filterTemplate: "filterTemplate", column: ["novo-data-table-cell-config", "column"] }, outputs: { toggledFilter: "toggledFilter" }, host: { listeners: { "keydown": "multiSelectOptionFilterHandleKeydown($event)", "keydown.escape": "handleEscapeKeydown($event)" }, properties: { "class.resizable": "this.resizable" } }, viewQueries: [{ propertyName: "filterInput", first: true, predicate: ["filterInput"], descendants: true }, { propertyName: "dropdown", first: true, predicate: NovoDropdownElement, descendants: true }, { propertyName: "optionFilterInput", first: true, predicate: ["optionFilterInput"], descendants: true }], ngImport: i0, template: `
    <i class="bhi-{{ labelIcon }} label-icon" *ngIf="labelIcon" data-automation-id="novo-data-table-header-icon"></i>
    <label data-automation-id="novo-data-table-label">{{ label }}</label>
    <div>
      <novo-sort-button
        *ngIf="config.sortable"
        data-automation-id="novo-data-table-sort"
        tooltipPosition="left"
        [tooltip]="labels.sort"
        [attr.data-feature-id]="'novo-data-table-sort-' + this.id"
        (sortChange)="sort()"
        [value]="sortValue"></novo-sort-button>
      <novo-dropdown
        *ngIf="config.filterable"
        side="left"
        parentScrollSelector=".novo-data-table-container"
        containerClass="data-table-dropdown"
        data-automation-id="novo-data-table-filter"
        [multiple]="multiSelect">
        <novo-icon
          dropdownTrigger
          class="filter-button"
          [class.filter-active]="filterActive"
          [tooltip]="labels.filters"
          tooltipPosition="right"
          [attr.data-feature-id]="'novo-data-table-filter-' + this.id"
          (click)="clickedFilter($event)">filter</novo-icon>
        <ng-container [ngSwitch]="config.filterConfig.type">
          <ng-container *ngSwitchCase="'date'" (keydown.escape)="handleEscapeKeydown($event)">
            <novo-data-table-cell-filter-header [filter]="filter" (clearFilter)="clearFilter()"></novo-data-table-cell-filter-header>
            <div class="optgroup-container">
              <novo-optgroup>
                <ng-container *ngIf="!showCustomRange">
                  <novo-option
                    [class.active]="activeDateFilter === option.label"
                    *ngFor="let option of config.filterConfig.options"
                    (click)="filterData(option)"
                    [attr.data-automation-id]="'novo-data-table-filter-' + option.label">
                    <span>{{ option.label }}</span>
                    <novo-icon novoSuffix color="positive" *ngIf="activeDateFilter === option.label">check</novo-icon>
                  </novo-option>
                </ng-container>
                <novo-option
                  [class.active]="labels.customDateRange === activeDateFilter"
                  (click)="toggleCustomRange($event, true)"
                  *ngIf="config.filterConfig.allowCustomRange && !showCustomRange">
                  <span>{{ labels.customDateRange }}</span>
                  <novo-icon novoSuffix color="positive" *ngIf="labels.customDateRange === activeDateFilter">check</novo-icon>
                </novo-option>
                <novo-option class="calendar-container" *ngIf="showCustomRange" keepOpen>
                  <novo-stack>
                    <div class="back-link" (click)="toggleCustomRange($event, false)">
                      <i class="bhi-previous"></i>
                      {{ labels.backToPresetFilters }}
                    </div>
                    <novo-date-picker
                      (onSelect)="filterData($event)"
                      [(ngModel)]="filter"
                      range="true"
                      (keydown.escape)="handleEscapeKeydown($event)"></novo-date-picker>
                  </novo-stack>
                </novo-option>
              </novo-optgroup>
            </div>
          </ng-container>
          <ng-container *ngSwitchCase="'select'">
            <novo-data-table-cell-filter-header [filter]="filter" (clearFilter)="clearFilter()"></novo-data-table-cell-filter-header>
            <div class="optgroup-container">
              <novo-optgroup>
                <novo-option
                  [class.active]="filter === option"
                  *ngFor="let option of config.filterConfig.options"
                  (click)="filterData(option)"
                  [attr.data-automation-id]="'novo-data-table-filter-' + (option?.label || option)">
                  <span>{{ option?.label || option }}</span>
                  <novo-icon novoSuffix color="positive" *ngIf="option.hasOwnProperty('value') ? filter === option.value : filter === option">
                    check</novo-icon>
                </novo-option>
              </novo-optgroup>
            </div>
          </ng-container>
          <ng-container *ngSwitchCase="'multi-select'">
            <novo-data-table-cell-filter-header [filter]="filter" (clearFilter)="clearFilter()"></novo-data-table-cell-filter-header>
            <div class="optgroup-container">
              <novo-optgroup class="dropdown-list-filter" (keydown)="multiSelectOptionFilterHandleKeydown($event)">
                <novo-option class="filter-search" novoInert>
                  <novo-field flex>
                    <input
                      novoInput
                      [(ngModel)]="optionFilter"
                      (ngModelChange)="multiSelectOptionFilter($event)"
                      #optionFilterInput
                      data-automation-id="novo-data-table-multi-select-option-filter-input"
                      (keydown.enter)="multiSelectOptionFilterHandleKeydown($event)" />
                    <novo-icon novoSuffix>search</novo-icon>
                    <novo-error class="error-text" [hidden]="!error || !multiSelectHasVisibleOptions()">
                      {{ labels.selectFilterOptions }}
                    </novo-error>
                  </novo-field>
                </novo-option>
              </novo-optgroup>
              <novo-optgroup class="dropdown-list-options" (keydown.escape)="handleEscapeKeydown($event)">
                <novo-option
                  *ngFor="let option of config.filterConfig.options"
                  [hidden]="multiSelectOptionIsHidden(option)"
                  (click)="toggleSelection(option)"
                  [attr.data-automation-id]="'novo-data-table-filter-' + (option?.label || option)">
                  <span>{{ option?.label || option }}</span>
                  <novo-icon novoSuffix color="positive">
                    {{ isSelected(option, multiSelectedOptions) ? 'checkbox-filled' : 'checkbox-empty' }}
                  </novo-icon>
                </novo-option>
              </novo-optgroup>
              <novo-option class="filter-null-results" [hidden]="multiSelectHasVisibleOptions()">{{ labels.pickerEmpty }}</novo-option>
            </div>
          </ng-container>
          <ng-container *ngSwitchCase="'custom'">
            <ng-container *ngIf="dropdown">
              <novo-data-table-cell-filter-header *ngIf="!config.filterConfig?.useCustomHeader" [filter]="filter" (clearFilter)="clearFilter()"></novo-data-table-cell-filter-header>
              <div class="optgroup-container">
                <ng-container *ngTemplateOutlet="filterTemplate; context: { $implicit: config, column, dropdown, filter }"></ng-container>
              </div>
            </ng-container>
          </ng-container>
          <ng-container *ngSwitchDefault (keydown.escape)="handleEscapeKeydown($event)">
            <novo-data-table-cell-filter-header [filter]="filter" (clearFilter)="clearFilter()"></novo-data-table-cell-filter-header>
            <div class="optgroup-container">
              <novo-optgroup>
                <novo-option class="filter-search" novoInert>
                  <novo-field flex fullWidth>
                    <input
                      novoInput
                      [type]="config.filterConfig.type"
                      [(ngModel)]="filter"
                      (ngModelChange)="filterData($event)"
                      #filterInput
                      data-automation-id="novo-data-table-filter-input"
                      (keydown.escape)="handleEscapeKeydown($event)" />
                    <novo-icon novoSuffix>search</novo-icon>
                  </novo-field>
                </novo-option>
              </novo-optgroup>
            </div>
          </ng-container>
        </ng-container>
        <div class="footer" *ngIf="multiSelect">
          <novo-button theme="dialogue" color="dark" (click)="cancel()" data-automation-id="novo-data-table-multi-select-cancel">
            {{ labels.cancel }}
          </novo-button>
          <novo-button
            theme="dialogue"
            color="positive"
            (click)="filterMultiSelect()"
            data-automation-id="novo-data-table-multi-select-filter">
            {{ labels.filters }}
          </novo-button>
        </div>
      </novo-dropdown>
    </div>
    <div class="spacer"></div>
    <div class="data-table-header-resizable" *ngIf="config.resizable"><span (mousedown)="startResize($event)">&nbsp;</span></div>
  `, isInline: true, dependencies: [{ kind: "component", type: i5.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "hideToday", "disabledDateMessage", "dateForInitialView", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }, { kind: "directive", type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i6.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i6.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i6.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i6.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "directive", type: i7.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i3.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: i3$1.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "secondIcon", "disabled"] }, { kind: "component", type: i5$1.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple", "scrollToActiveItemOnOpen"], outputs: ["toggled"] }, { kind: "directive", type: i5$1.NovoDropDownTrigger, selector: "[dropdownTrigger]" }, { kind: "component", type: i11.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i11.NovoOptgroup, selector: "novo-optgroup", inputs: ["disabled", "label"], exportAs: ["novoOptgroup"] }, { kind: "directive", type: i11.FlexDirective, selector: "[flex]", inputs: ["flex"] }, { kind: "directive", type: i11.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "directive", type: i12.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML", "tooltipCloseOnClick", "tooltipOnOverflow", "tooltipActive"] }, { kind: "component", type: i13.NovoStackElement, selector: "novo-stack,novo-column", inputs: ["direction", "align"] }, { kind: "component", type: i14.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "component", type: i14.NovoErrorElement, selector: "novo-error" }, { kind: "directive", type: i14.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"], outputs: ["onSelect"] }, { kind: "directive", type: i14.NovoFieldSuffixDirective, selector: "[novoSuffix]" }, { kind: "component", type: NovoDataTableCellFilterHeader, selector: "novo-data-table-cell-filter-header", inputs: ["label", "filter"], outputs: ["clearFilter"] }, { kind: "component", type: NovoDataTableSortButton, selector: "novo-sort-button", inputs: ["value"], outputs: ["sortChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableCellHeader, decorators: [{
            type: Component,
            args: [{
                    selector: '[novo-data-table-cell-config]',
                    template: `
    <i class="bhi-{{ labelIcon }} label-icon" *ngIf="labelIcon" data-automation-id="novo-data-table-header-icon"></i>
    <label data-automation-id="novo-data-table-label">{{ label }}</label>
    <div>
      <novo-sort-button
        *ngIf="config.sortable"
        data-automation-id="novo-data-table-sort"
        tooltipPosition="left"
        [tooltip]="labels.sort"
        [attr.data-feature-id]="'novo-data-table-sort-' + this.id"
        (sortChange)="sort()"
        [value]="sortValue"></novo-sort-button>
      <novo-dropdown
        *ngIf="config.filterable"
        side="left"
        parentScrollSelector=".novo-data-table-container"
        containerClass="data-table-dropdown"
        data-automation-id="novo-data-table-filter"
        [multiple]="multiSelect">
        <novo-icon
          dropdownTrigger
          class="filter-button"
          [class.filter-active]="filterActive"
          [tooltip]="labels.filters"
          tooltipPosition="right"
          [attr.data-feature-id]="'novo-data-table-filter-' + this.id"
          (click)="clickedFilter($event)">filter</novo-icon>
        <ng-container [ngSwitch]="config.filterConfig.type">
          <ng-container *ngSwitchCase="'date'" (keydown.escape)="handleEscapeKeydown($event)">
            <novo-data-table-cell-filter-header [filter]="filter" (clearFilter)="clearFilter()"></novo-data-table-cell-filter-header>
            <div class="optgroup-container">
              <novo-optgroup>
                <ng-container *ngIf="!showCustomRange">
                  <novo-option
                    [class.active]="activeDateFilter === option.label"
                    *ngFor="let option of config.filterConfig.options"
                    (click)="filterData(option)"
                    [attr.data-automation-id]="'novo-data-table-filter-' + option.label">
                    <span>{{ option.label }}</span>
                    <novo-icon novoSuffix color="positive" *ngIf="activeDateFilter === option.label">check</novo-icon>
                  </novo-option>
                </ng-container>
                <novo-option
                  [class.active]="labels.customDateRange === activeDateFilter"
                  (click)="toggleCustomRange($event, true)"
                  *ngIf="config.filterConfig.allowCustomRange && !showCustomRange">
                  <span>{{ labels.customDateRange }}</span>
                  <novo-icon novoSuffix color="positive" *ngIf="labels.customDateRange === activeDateFilter">check</novo-icon>
                </novo-option>
                <novo-option class="calendar-container" *ngIf="showCustomRange" keepOpen>
                  <novo-stack>
                    <div class="back-link" (click)="toggleCustomRange($event, false)">
                      <i class="bhi-previous"></i>
                      {{ labels.backToPresetFilters }}
                    </div>
                    <novo-date-picker
                      (onSelect)="filterData($event)"
                      [(ngModel)]="filter"
                      range="true"
                      (keydown.escape)="handleEscapeKeydown($event)"></novo-date-picker>
                  </novo-stack>
                </novo-option>
              </novo-optgroup>
            </div>
          </ng-container>
          <ng-container *ngSwitchCase="'select'">
            <novo-data-table-cell-filter-header [filter]="filter" (clearFilter)="clearFilter()"></novo-data-table-cell-filter-header>
            <div class="optgroup-container">
              <novo-optgroup>
                <novo-option
                  [class.active]="filter === option"
                  *ngFor="let option of config.filterConfig.options"
                  (click)="filterData(option)"
                  [attr.data-automation-id]="'novo-data-table-filter-' + (option?.label || option)">
                  <span>{{ option?.label || option }}</span>
                  <novo-icon novoSuffix color="positive" *ngIf="option.hasOwnProperty('value') ? filter === option.value : filter === option">
                    check</novo-icon>
                </novo-option>
              </novo-optgroup>
            </div>
          </ng-container>
          <ng-container *ngSwitchCase="'multi-select'">
            <novo-data-table-cell-filter-header [filter]="filter" (clearFilter)="clearFilter()"></novo-data-table-cell-filter-header>
            <div class="optgroup-container">
              <novo-optgroup class="dropdown-list-filter" (keydown)="multiSelectOptionFilterHandleKeydown($event)">
                <novo-option class="filter-search" novoInert>
                  <novo-field flex>
                    <input
                      novoInput
                      [(ngModel)]="optionFilter"
                      (ngModelChange)="multiSelectOptionFilter($event)"
                      #optionFilterInput
                      data-automation-id="novo-data-table-multi-select-option-filter-input"
                      (keydown.enter)="multiSelectOptionFilterHandleKeydown($event)" />
                    <novo-icon novoSuffix>search</novo-icon>
                    <novo-error class="error-text" [hidden]="!error || !multiSelectHasVisibleOptions()">
                      {{ labels.selectFilterOptions }}
                    </novo-error>
                  </novo-field>
                </novo-option>
              </novo-optgroup>
              <novo-optgroup class="dropdown-list-options" (keydown.escape)="handleEscapeKeydown($event)">
                <novo-option
                  *ngFor="let option of config.filterConfig.options"
                  [hidden]="multiSelectOptionIsHidden(option)"
                  (click)="toggleSelection(option)"
                  [attr.data-automation-id]="'novo-data-table-filter-' + (option?.label || option)">
                  <span>{{ option?.label || option }}</span>
                  <novo-icon novoSuffix color="positive">
                    {{ isSelected(option, multiSelectedOptions) ? 'checkbox-filled' : 'checkbox-empty' }}
                  </novo-icon>
                </novo-option>
              </novo-optgroup>
              <novo-option class="filter-null-results" [hidden]="multiSelectHasVisibleOptions()">{{ labels.pickerEmpty }}</novo-option>
            </div>
          </ng-container>
          <ng-container *ngSwitchCase="'custom'">
            <ng-container *ngIf="dropdown">
              <novo-data-table-cell-filter-header *ngIf="!config.filterConfig?.useCustomHeader" [filter]="filter" (clearFilter)="clearFilter()"></novo-data-table-cell-filter-header>
              <div class="optgroup-container">
                <ng-container *ngTemplateOutlet="filterTemplate; context: { $implicit: config, column, dropdown, filter }"></ng-container>
              </div>
            </ng-container>
          </ng-container>
          <ng-container *ngSwitchDefault (keydown.escape)="handleEscapeKeydown($event)">
            <novo-data-table-cell-filter-header [filter]="filter" (clearFilter)="clearFilter()"></novo-data-table-cell-filter-header>
            <div class="optgroup-container">
              <novo-optgroup>
                <novo-option class="filter-search" novoInert>
                  <novo-field flex fullWidth>
                    <input
                      novoInput
                      [type]="config.filterConfig.type"
                      [(ngModel)]="filter"
                      (ngModelChange)="filterData($event)"
                      #filterInput
                      data-automation-id="novo-data-table-filter-input"
                      (keydown.escape)="handleEscapeKeydown($event)" />
                    <novo-icon novoSuffix>search</novo-icon>
                  </novo-field>
                </novo-option>
              </novo-optgroup>
            </div>
          </ng-container>
        </ng-container>
        <div class="footer" *ngIf="multiSelect">
          <novo-button theme="dialogue" color="dark" (click)="cancel()" data-automation-id="novo-data-table-multi-select-cancel">
            {{ labels.cancel }}
          </novo-button>
          <novo-button
            theme="dialogue"
            color="positive"
            (click)="filterMultiSelect()"
            data-automation-id="novo-data-table-multi-select-filter">
            {{ labels.filters }}
          </novo-button>
        </div>
      </novo-dropdown>
    </div>
    <div class="spacer"></div>
    <div class="data-table-header-resizable" *ngIf="config.resizable"><span (mousedown)="startResize($event)">&nbsp;</span></div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i1$1.NovoLabelService }, { type: DataTableState }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: NovoDataTableSortFilter, decorators: [{
                    type: Optional
                }] }, { type: i1.CdkColumnDef, decorators: [{
                    type: Optional
                }] }], propDecorators: { filterInput: [{
                type: ViewChild,
                args: ['filterInput']
            }], dropdown: [{
                type: ViewChild,
                args: [NovoDropdownElement]
            }], optionFilterInput: [{
                type: ViewChild,
                args: ['optionFilterInput']
            }], defaultSort: [{
                type: Input
            }], allowMultipleFilters: [{
                type: Input
            }], resized: [{
                type: Input
            }], filterTemplate: [{
                type: Input
            }], toggledFilter: [{
                type: Output
            }], resizable: [{
                type: HostBinding,
                args: ['class.resizable']
            }], column: [{
                type: Input,
                args: ['novo-data-table-cell-config']
            }], multiSelectOptionFilterHandleKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], handleEscapeKeydown: [{
                type: HostListener,
                args: ['keydown.escape', ['$event']]
            }] } });

class NovoDataTableHeaderCell extends CdkHeaderCell {
    constructor(columnDef, elementRef, renderer) {
        super(columnDef, elementRef);
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.role = 'columnheader';
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-column-header-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-data-table-header-cell');
    }
    ngOnInit() {
        if (this.column.width) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', `${this.column.width}px`);
            this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', `${this.column.width}px`);
            this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${this.column.width}px`);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableHeaderCell, deps: [{ token: i1.CdkColumnDef }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoDataTableHeaderCell, isStandalone: false, selector: "novo-data-table-header-cell", inputs: { column: "column" }, host: { properties: { "attr.role": "this.role" } }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableHeaderCell, decorators: [{
            type: Directive,
            args: [{
                    selector: 'novo-data-table-header-cell',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1.CdkColumnDef }, { type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], column: [{
                type: Input
            }] } });

class NovoDataTableCell extends CdkCell {
    constructor(columnDef, elementRef, renderer) {
        super(columnDef, elementRef);
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.role = 'gridcell';
        this.subscriptions = [];
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-data-table-cell');
    }
    ngOnInit() {
        if (this.column.cellClass) {
            this.renderer.addClass(this.elementRef.nativeElement, this.column.cellClass(this.row));
        }
        if (this.column.rightAlignCellContent) {
            this.renderer.addClass(this.elementRef.nativeElement, 'novo-data-table-cell-align-right');
        }
        this.calculateWidths();
        this.subscriptions.push(this.resized.subscribe((column) => {
            if (column === this.column) {
                this.calculateWidths();
            }
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }
    calculateWidths() {
        if (this.column.width) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', `${this.column.width}px`);
            this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', `${this.column.width}px`);
            this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${this.column.width}px`);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableCell, deps: [{ token: i1.CdkColumnDef }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoDataTableCell, isStandalone: false, selector: "novo-data-table-cell", inputs: { row: "row", template: "template", column: "column", resized: "resized" }, host: { properties: { "attr.role": "this.role" } }, usesInheritance: true, ngImport: i0, template: ` <ng-container *ngTemplateOutlet="template; context: { $implicit: row, col: column }"></ng-container> `, isInline: true, dependencies: [{ kind: "directive", type: i6.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableCell, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-data-table-cell',
                    template: ` <ng-container *ngTemplateOutlet="template; context: { $implicit: row, col: column }"></ng-container> `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1.CdkColumnDef }, { type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], row: [{
                type: Input
            }], template: [{
                type: Input
            }], column: [{
                type: Input
            }], resized: [{
                type: Input
            }] } });

class NovoDataTableCheckboxCell extends CdkCell {
    get isAtLimit() {
        return this.maxSelected && this.dataTable.state.selectedRows.size >= this.maxSelected && !this.checked;
    }
    constructor(columnDef, elementRef, renderer, dataTable, ref) {
        super(columnDef, elementRef);
        this.columnDef = columnDef;
        this.dataTable = dataTable;
        this.ref = ref;
        this.role = 'gridcell';
        this.maxSelected = undefined;
        this.checked = false;
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-data-table-checkbox-cell');
        this.selectionSubscription = this.dataTable.state.selectionSource.subscribe(() => {
            this.checked = this.dataTable.isSelected(this.row) || (this.dataTable?.canSelectAll && this.dataTable?.allMatchingSelected);
            this.ref.markForCheck();
        });
        this.resetSubscription = this.dataTable.state.resetSource.subscribe(() => {
            this.checked = false;
            this.ref.markForCheck();
        });
    }
    ngOnInit() {
        this.checked = this.dataTable.isSelected(this.row) || (this.dataTable?.canSelectAll && this.dataTable?.allMatchingSelected);
    }
    onClick() {
        if (!this.isAtLimit) {
            this.dataTable.selectRow(this.row, 'onClick');
        }
    }
    getTooltip() {
        return this.isAtLimit ? 'More than ' + this.maxSelected + ' items are not able to be selected at one time' : '';
    }
    ngOnDestroy() {
        if (this.selectionSubscription) {
            this.selectionSubscription.unsubscribe();
        }
        if (this.resetSubscription) {
            this.resetSubscription.unsubscribe();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableCheckboxCell, deps: [{ token: i1.CdkColumnDef }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: NOVO_DATA_TABLE_REF }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoDataTableCheckboxCell, isStandalone: false, selector: "novo-data-table-checkbox-cell", inputs: { row: "row", maxSelected: "maxSelected" }, host: { properties: { "attr.role": "this.role" } }, usesInheritance: true, ngImport: i0, template: `
    <div class="data-table-checkbox" (click)="onClick()" [tooltip]="getTooltip()" tooltipPosition="right">
      <input type="checkbox" [checked]="checked" />
      <label>
        <i [class.bhi-checkbox-disabled]="isAtLimit" [class.bhi-checkbox-empty]="!checked" [class.bhi-checkbox-filled]="checked"></i>
      </label>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i12.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML", "tooltipCloseOnClick", "tooltipOnOverflow", "tooltipActive"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableCheckboxCell, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-data-table-checkbox-cell',
                    template: `
    <div class="data-table-checkbox" (click)="onClick()" [tooltip]="getTooltip()" tooltipPosition="right">
      <input type="checkbox" [checked]="checked" />
      <label>
        <i [class.bhi-checkbox-disabled]="isAtLimit" [class.bhi-checkbox-empty]="!checked" [class.bhi-checkbox-filled]="checked"></i>
      </label>
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1.CdkColumnDef }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NOVO_DATA_TABLE_REF]
                }] }, { type: i0.ChangeDetectorRef }], propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], row: [{
                type: Input
            }], maxSelected: [{
                type: Input
            }] } });

class NovoDataTableExpandCell extends CdkCell {
    constructor(columnDef, elementRef, renderer, dataTable, ref) {
        super(columnDef, elementRef);
        this.columnDef = columnDef;
        this.dataTable = dataTable;
        this.ref = ref;
        this.role = 'gridcell';
        this.expanded = false;
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-expand-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-expand-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-data-table-expand-cell');
        this.expandSubscription = this.dataTable.state.expandSource.subscribe(() => {
            this.expanded = this.dataTable.isExpanded(this.row);
            this.ref.markForCheck();
        });
    }
    ngOnInit() {
        this.expanded = this.dataTable.isExpanded(this.row);
    }
    onClick() {
        this.dataTable.expandRow(this.row);
    }
    ngOnDestroy() {
        if (this.expandSubscription) {
            this.expandSubscription.unsubscribe();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableExpandCell, deps: [{ token: i1.CdkColumnDef }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: NOVO_DATA_TABLE_REF }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoDataTableExpandCell, isStandalone: false, selector: "novo-data-table-expand-cell", inputs: { row: "row" }, host: { properties: { "attr.role": "this.role" } }, usesInheritance: true, ngImport: i0, template: ` <i class="bhi-next data-table-icon" novo-data-table-expander="true" [class.expanded]="expanded"></i> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableExpandCell, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-data-table-expand-cell',
                    template: ` <i class="bhi-next data-table-icon" novo-data-table-expander="true" [class.expanded]="expanded"></i> `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1.CdkColumnDef }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NOVO_DATA_TABLE_REF]
                }] }, { type: i0.ChangeDetectorRef }], propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], row: [{
                type: Input
            }] } });

var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class NovoDataTableClearButton {
    constructor(state, ref, labels) {
        this.state = state;
        this.ref = ref;
        this.labels = labels;
        this.selectedClear = new EventEmitter();
        this.sortClear = new EventEmitter();
        this.filterClear = new EventEmitter();
        this.queryClear = new EventEmitter();
        this.allClear = new EventEmitter();
        this.emitOnly = false;
    }
    clearSort() {
        if (!this.emitOnly) {
            this.state.clearSort();
        }
        this.sortClear.emit(true);
    }
    clearFilter() {
        if (!this.emitOnly) {
            this.state.clearFilter();
        }
        this.filterClear.emit(true);
    }
    clearSearch() {
        if (!this.emitOnly) {
            this.state.clearQuery();
        }
        this.queryClear.emit(true);
    }
    clearSelected() {
        if (!this.emitOnly) {
            this.state.clearSelected();
        }
        this.selectedClear.emit(true);
    }
    clearAll() {
        if (!this.emitOnly) {
            this.state.reset();
        }
        this.allClear.emit(true);
        this.selectedClear.emit(true);
        this.sortClear.emit(true);
        this.filterClear.emit(true);
        this.queryClear.emit(true);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableClearButton, deps: [{ token: DataTableState }, { token: i0.ChangeDetectorRef }, { token: i1$1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoDataTableClearButton, isStandalone: false, selector: "novo-data-table-clear-button", outputs: { selectedClear: "selectedClear", sortClear: "sortClear", filterClear: "filterClear", queryClear: "queryClear", allClear: "allClear" }, ngImport: i0, template: `
    <novo-dropdown side="bottom-right" class="novo-data-table-clear-button" data-automation-id="novo-data-table-clear-dropdown">
      <novo-button type="button" theme="primary" color="negative" icon="collapse" data-automation-id="novo-data-table-clear-dropdown-btn">
        {{ labels.clear }}
      </novo-button>
      <list>
        <item
          *ngIf="state.selected.length > 0"
          (click)="clearSelected()"
          data-automation-id="novo-data-table-clear-dropdown-clear-selected"
          >{{ labels.clearSelected }}</item>
        <item *ngIf="state.sort" (click)="clearSort()" data-automation-id="novo-data-table-clear-dropdown-clear-sort">{{
          labels.clearSort
        }}</item>
        <item *ngIf="state.filter || state.globalSearch" (click)="clearFilter()" data-automation-id="novo-data-table-clear-dropdown-clear-filter">{{
          labels.clearFilter
        }}</item>
        <item *ngIf="state.where" (click)="clearSearch()" data-automation-id="novo-data-table-clear-dropdown-clear-search">{{
          labels.clearSearch
        }}</item>
        <item *ngIf="(state.sort && (state.filter || state.globalSearch)) || (state.sort && state.where) || (state.where && (state.filter || state.globalSearch))"
          (click)="clearAll()" data-automation-id="novo-data-table-clear-dropdown-clear-all"><b>{{
          labels.clearAllNormalCase
        }}</b></item>
      </list>
    </novo-dropdown>
  `, isInline: true, dependencies: [{ kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3$1.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "secondIcon", "disabled"] }, { kind: "component", type: i5$1.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple", "scrollToActiveItemOnOpen"], outputs: ["toggled"] }, { kind: "component", type: i5$1.NovoItemElement, selector: "item", inputs: ["disabled", "keepOpen"], outputs: ["action"] }, { kind: "component", type: i5$1.NovoDropdownListElement, selector: "list" }, { kind: "directive", type: i11.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoDataTableClearButton.prototype, "emitOnly", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableClearButton, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-data-table-clear-button',
                    template: `
    <novo-dropdown side="bottom-right" class="novo-data-table-clear-button" data-automation-id="novo-data-table-clear-dropdown">
      <novo-button type="button" theme="primary" color="negative" icon="collapse" data-automation-id="novo-data-table-clear-dropdown-btn">
        {{ labels.clear }}
      </novo-button>
      <list>
        <item
          *ngIf="state.selected.length > 0"
          (click)="clearSelected()"
          data-automation-id="novo-data-table-clear-dropdown-clear-selected"
          >{{ labels.clearSelected }}</item>
        <item *ngIf="state.sort" (click)="clearSort()" data-automation-id="novo-data-table-clear-dropdown-clear-sort">{{
          labels.clearSort
        }}</item>
        <item *ngIf="state.filter || state.globalSearch" (click)="clearFilter()" data-automation-id="novo-data-table-clear-dropdown-clear-filter">{{
          labels.clearFilter
        }}</item>
        <item *ngIf="state.where" (click)="clearSearch()" data-automation-id="novo-data-table-clear-dropdown-clear-search">{{
          labels.clearSearch
        }}</item>
        <item *ngIf="(state.sort && (state.filter || state.globalSearch)) || (state.sort && state.where) || (state.where && (state.filter || state.globalSearch))"
          (click)="clearAll()" data-automation-id="novo-data-table-clear-dropdown-clear-all"><b>{{
          labels.clearAllNormalCase
        }}</b></item>
      </list>
    </novo-dropdown>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: DataTableState }, { type: i0.ChangeDetectorRef }, { type: i1$1.NovoLabelService }], propDecorators: { selectedClear: [{
                type: Output
            }], sortClear: [{
                type: Output
            }], filterClear: [{
                type: Output
            }], queryClear: [{
                type: Output
            }], allClear: [{
                type: Output
            }], emitOnly: [] } });

class NovoDataTableExpandDirective {
    constructor(vcRef, state, dataTable) {
        this.vcRef = vcRef;
        this.state = state;
        this.dataTable = dataTable;
        this.shouldExpandAllRows = (targetId) => targetId === undefined;
        this.shouldExpandOneRow = (targetId) => targetId === this.row.id;
        this.subscription = this.state.expandSource.subscribe((targetId) => {
            if (this.shouldExpandAllRows(targetId) || this.shouldExpandOneRow(targetId)) {
                if (dataTable.isExpanded(this.row)) {
                    this.render();
                }
                else {
                    this.clear();
                }
            }
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    onClick(event) {
        if (event.target.hasAttribute('novo-data-table-expander')) {
            Helpers.swallowEvent(event);
            this.dataTable.expandRow(this.row);
        }
    }
    clear() {
        this.vcRef.clear();
    }
    render() {
        this.vcRef.clear();
        if (this.template && this.row) {
            this.vcRef.createEmbeddedView(this.template, { $implicit: this.row });
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableExpandDirective, deps: [{ token: i0.ViewContainerRef }, { token: DataTableState }, { token: NOVO_DATA_TABLE_REF }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoDataTableExpandDirective, isStandalone: false, selector: "[novoDataTableExpand]", inputs: { row: "row", template: ["novoDataTableExpand", "template"] }, host: { listeners: { "click": "onClick($event)" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableExpandDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoDataTableExpand]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ViewContainerRef }, { type: DataTableState }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NOVO_DATA_TABLE_REF]
                }] }], propDecorators: { row: [{
                type: Input
            }], template: [{
                type: Input,
                args: ['novoDataTableExpand']
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

class DataTableSource extends DataSource {
    get totallyEmpty() {
        return this.total === 0;
    }
    get currentlyEmpty() {
        return this.current === 0;
    }
    constructor(tableService, state, ref) {
        super();
        this.tableService = tableService;
        this.state = state;
        this.ref = ref;
        this.total = 0;
        this.currentTotal = 0;
        this.current = 0;
        this.loading = false;
        this.pristine = true;
        this.totalSet = false;
    }
    connect() {
        const displayDataChanges = [this.state.updates];
        return merge(...displayDataChanges).pipe(startWith(null), switchMap(() => {
            this.pristine = false;
            this.loading = true;
            this.state.dataLoadingSource.next(this.loading);
            return this.tableService.getTableResults(this.state.sort, this.state.filter, this.state.page, this.state.pageSize, this.state.globalSearch, this.state.outsideFilter, this.state.where);
        }), map((data) => {
            if (!this.totalSet || this.state.isForceRefresh) {
                this.total = data.total;
                this.totalSet = true;
                this.state.isForceRefresh = false;
            }
            else if (data.total > this.total) {
                this.total = data.total;
            }
            this.currentTotal = data.total;
            this.current = data.results.length;
            this.data = data.results;
            // Clear selection
            if (!this.state.retainSelected) {
                this.state.selectedRows.clear();
            }
            this.state.retainSelected = false;
            this.state.onSelectionChange();
            // Mark changes
            setTimeout(() => {
                this.ref.markForCheck();
                setTimeout(() => {
                    this.loading = false;
                    this.state.dataLoadingSource.next(this.loading);
                    this.state.dataLoaded.next();
                    this.ref.markForCheck();
                });
            });
            return data.results;
        }), catchError((err, caught) => {
            console.error(err, caught); // tslint: disable-line
            this.loading = false;
            return of(null);
        }));
    }
    disconnect() { }
}

class StaticDataTableService {
    constructor(currentData = []) {
        this.currentData = currentData;
        this.originalData = [...currentData];
    }
    getTableResults(sort, filter, page = 0, pageSize, globalSearch, outsideFilter, where) {
        this.currentData = [...this.originalData];
        let total = this.originalData.length;
        if (this.currentData.length !== 0) {
            if (globalSearch) {
                this.currentData = this.currentData.filter((item) => Object.keys(item).some((key) => `${item[key]}`.toLowerCase().includes(globalSearch.toLowerCase())));
                total = this.currentData.length;
            }
            if (filter) {
                this.currentData = this.filterData(this.currentData, filter);
                total = this.currentData.length;
            }
            if (sort) {
                this.currentData = this.currentData.sort(Helpers.sortByField(sort.id, sort.value === 'desc'));
                total = this.currentData.length;
            }
            if (!sort && !filter && !globalSearch && !outsideFilter) {
                this.currentData = [...this.originalData];
            }
            if (!Helpers.isBlank(page) && !Helpers.isBlank(pageSize)) {
                this.currentData = this.currentData.slice(page * pageSize, (page + 1) * pageSize);
            }
        }
        return of({ results: this.currentData, total });
    }
    filterData(currentData, filter) {
        const filters = Helpers.convertToArray(filter);
        filters.forEach((aFilter) => {
            if (Array.isArray(aFilter.value)) {
                const values = Helpers.convertToArray(aFilter.value).map(Helpers.escapeString);
                currentData = currentData.filter(Helpers.filterByField(aFilter.id, values));
            }
            else {
                const value = Helpers.escapeString(aFilter.value);
                currentData = currentData.filter(Helpers.filterByField(aFilter.id, value));
            }
        });
        return currentData;
    }
}

class NovoDataTableHeaderRow extends CdkHeaderRow {
    constructor() {
        super(...arguments);
        this.rowClass = 'novo-data-table-header-row';
        this.fixedHeader = false;
        this.role = 'row';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableHeaderRow, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoDataTableHeaderRow, isStandalone: false, selector: "novo-data-table-header-row", inputs: { fixedHeader: "fixedHeader" }, host: { properties: { "class": "this.rowClass", "class.fixed-header": "this.fixedHeader", "attr.role": "this.role" } }, usesInheritance: true, ngImport: i0, template: "<ng-container cdkCellOutlet></ng-container>", isInline: true, dependencies: [{ kind: "directive", type: i1.CdkCellOutlet, selector: "[cdkCellOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableHeaderRow, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-data-table-header-row',
                    template: CDK_ROW_TEMPLATE,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    standalone: false
                }]
        }], propDecorators: { rowClass: [{
                type: HostBinding,
                args: ['class']
            }], fixedHeader: [{
                type: HostBinding,
                args: ['class.fixed-header']
            }, {
                type: Input
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }] } });

class NovoDataTableRow extends CdkRow {
    constructor() {
        super(...arguments);
        this.rowClass = 'novo-data-table-row';
        this.role = 'row';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableRow, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoDataTableRow, isStandalone: false, selector: "novo-data-table-row", inputs: { id: "id", dataAutomationId: "dataAutomationId" }, host: { properties: { "class": "this.rowClass", "attr.role": "this.role", "attr.id": "this.id", "attr.data-automation-id": "this.dataAutomationId" } }, usesInheritance: true, ngImport: i0, template: "<ng-container cdkCellOutlet></ng-container>", isInline: true, dependencies: [{ kind: "directive", type: i1.CdkCellOutlet, selector: "[cdkCellOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableRow, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-data-table-row',
                    template: CDK_ROW_TEMPLATE,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    standalone: false
                }]
        }], propDecorators: { rowClass: [{
                type: HostBinding,
                args: ['class']
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }], id: [{
                type: HostBinding,
                args: ['attr.id']
            }, {
                type: Input
            }], dataAutomationId: [{
                type: HostBinding,
                args: ['attr.data-automation-id']
            }, {
                type: Input
            }] } });

const MAX_PAGES_DISPLAYED = 5;
class NovoDataTablePagination {
    get page() {
        return this._page;
    }
    set page(page) {
        this._page = page;
        this.changeDetectorRef.markForCheck();
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
        this.state.page = this._page;
        this.updateDisplayedPageSizeOptions();
    }
    get pageSize() {
        return this._pageSize;
    }
    set pageSize(pageSize) {
        this._pageSize = pageSize;
        this.updateDisplayedPageSizeOptions();
        this.state.pageSize = this._pageSize;
    }
    get pageSizeOptions() {
        return this._pageSizeOptions;
    }
    set pageSizeOptions(pageSizeOptions) {
        this._pageSizeOptions = pageSizeOptions;
        this.updateDisplayedPageSizeOptions();
    }
    get length() {
        return this._length;
    }
    set length(length) {
        this._length = length;
        this.changeDetectorRef.markForCheck();
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
    }
    constructor(changeDetectorRef, labels, state) {
        this.changeDetectorRef = changeDetectorRef;
        this.labels = labels;
        this.state = state;
        this.theme = 'standard';
        this._page = 0;
        this._pageSizeOptions = [];
        this.canSelectAll = false;
        this.allMatchingSelected = false;
        this.loading = false;
        this.errorLoading = false;
        this.paginationRefreshSubject = new Subject();
        this.showPaginationTotalRecordCount = false;
        this._length = 0;
        this.pageChange = new EventEmitter();
        this.resetSubscription = this.state.resetSource.subscribe(() => {
            this.page = 0;
            this.changeDetectorRef.markForCheck();
        });
    }
    ngOnInit() {
        this._initialized = true;
        this.updateDisplayedPageSizeOptions();
    }
    ngOnDestroy() {
        this.resetSubscription.unsubscribe();
    }
    selectPage(page) {
        this.state.checkRetainment('page', this.canSelectAll && this.allMatchingSelected);
        this.page = page;
        this.emitPageEvent();
    }
    nextPage() {
        this.state.checkRetainment('page', this.canSelectAll && this.allMatchingSelected);
        if (!this.hasNextPage()) {
            return;
        }
        this.page++;
        this.pages = this.getPages(this.page, this.totalPages);
        this.emitPageEvent();
    }
    previousPage() {
        this.state.checkRetainment('page', this.canSelectAll && this.allMatchingSelected);
        if (!this.hasPreviousPage()) {
            return;
        }
        this.page--;
        this.pages = this.getPages(this.page, this.totalPages);
        this.emitPageEvent();
    }
    hasPreviousPage() {
        return this.page >= 1 && this.pageSize !== 0;
    }
    hasNextPage() {
        const numberOfPages = Math.ceil(this.length / this.pageSize) - 1;
        return this.page < numberOfPages && this.pageSize !== 0;
    }
    changePageSize(pageSize) {
        this.page = 0;
        this.pageSize = pageSize;
        this.emitPageEvent(true);
    }
    updateDisplayedPageSizeOptions() {
        if (!this._initialized) {
            return;
        }
        if (!this.displayedPageSizeOptions) {
            this.displayedPageSizeOptions = [];
            this.pageSizeOptions.forEach((option) => {
                if (option.hasOwnProperty('value')) {
                    this.displayedPageSizeOptions.push(option);
                }
                else {
                    this.displayedPageSizeOptions.push({
                        value: option,
                        label: option,
                    });
                }
            });
        }
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
        this.changeDetectorRef.detectChanges();
    }
    emitPageEvent(isPageSizeChange = false) {
        const event = {
            page: this.page,
            pageSize: this.pageSize,
            length: this.length,
            filter: this.state.filter,
            sort: this.state.sort,
        };
        this.pageChange.next(event);
        this.state.page = this.page;
        this.state.pageSize = this.pageSize;
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
        this.state.updates.next(event);
        this.state.onPaginationChange(isPageSizeChange, this.pageSize);
    }
    calculateTotalPages() {
        const totalPages = this.pageSize < 1 ? 1 : Math.ceil(this.length / this.pageSize);
        return Math.max(totalPages || 0, 1);
    }
    makePage(number, text, isActive) {
        return {
            number,
            text,
            active: isActive,
        };
    }
    getPages(currentPage, totalPages) {
        const pages = [];
        // Default page limits
        let startPage = 1;
        let endPage = totalPages;
        const isMaxSized = MAX_PAGES_DISPLAYED < totalPages;
        // Recompute if maxPagesDisplayed
        if (isMaxSized) {
            // Current page is displayed in the middle of the visible ones
            startPage = Math.max(currentPage - Math.floor(MAX_PAGES_DISPLAYED / 2), 1);
            endPage = startPage + MAX_PAGES_DISPLAYED - 1;
            // Adjust if limit is exceeded
            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = endPage - MAX_PAGES_DISPLAYED + 1;
            }
        }
        // Add page number links
        for (let number = startPage; number <= endPage; number++) {
            const page = this.makePage(number, number.toString(), number === currentPage);
            pages.push(page);
        }
        return pages;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTablePagination, deps: [{ token: i0.ChangeDetectorRef }, { token: i1$1.NovoLabelService }, { token: DataTableState }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoDataTablePagination, isStandalone: false, selector: "novo-data-table-pagination", inputs: { theme: "theme", page: "page", pageSize: "pageSize", dataFeatureId: "dataFeatureId", pageSizeOptions: "pageSizeOptions", canSelectAll: "canSelectAll", allMatchingSelected: "allMatchingSelected", loading: "loading", errorLoading: "errorLoading", paginationRefreshSubject: "paginationRefreshSubject", showPaginationTotalRecordCount: "showPaginationTotalRecordCount", length: "length" }, outputs: { pageChange: "pageChange" }, host: { properties: { "class": "this.theme" } }, ngImport: i0, template: `
    <ng-container *ngIf="theme === 'basic' || theme === 'basic-wide'">
      <div class="novo-data-table-pagination-size">
        <novo-tiles
          class="pagination-tiles"
          *ngIf="displayedPageSizeOptions.length > 1"
          [(ngModel)]="pageSize"
          [options]="displayedPageSizeOptions"
          (onChange)="changePageSize($event)"
          data-automation-id="novo-data-table-pagination-tiles"
        >
        </novo-tiles>
        <div *ngIf="displayedPageSizeOptions.length <= 1">{{ pageSize }}</div>
      </div>

      <div class="novo-data-table-range-label-long" data-automation-id="novo-data-table-pagination-range-label-long">
        {{ longRangeLabel }}
      </div>
      <div class="novo-data-table-range-label-short" data-automation-id="novo-data-table-pagination-range-label-short">
        {{ shortRangeLabel }}
      </div>
      <span class="spacer novo-data-table-spacer" *ngIf="theme === 'basic-wide'"></span>
      <novo-button
        theme="dialogue"
        type="button"
        class="novo-data-table-pagination-navigation-previous"
        (click)="previousPage()"
        icon="previous"
        side="left"
        [disabled]="!hasPreviousPage()"
        data-automation-id="novo-data-table-pagination-previous"
      >
        <span>{{ labels.previous }}</span>
      </novo-button>
      <novo-button
        theme="dialogue"
        type="button"
        class="novo-data-table-pagination-navigation-next"
        (click)="nextPage()"
        icon="next"
        side="right"
        [disabled]="!hasNextPage()"
        data-automation-id="novo-data-table-pagination-next"
      >
        <span>{{ labels.next }}</span>
      </novo-button>
    </ng-container>
    <ng-container *ngIf="theme === 'standard'">
      <h5 class="rows">{{ labels.itemsPerPage }}</h5>
      <novo-select
        [options]="displayedPageSizeOptions"
        [placeholder]="labels.select"
        [(ngModel)]="pageSize"
        (onSelect)="changePageSize($event.selected)"
        data-automation-id="pager-select"
        [attr.data-feature-id]="dataFeatureId"
      >
      </novo-select>
      <div *ngIf="showPaginationTotalRecordCount && !loading && !errorLoading" class="novo-data-table-of-total-amount" data-automation-id="novo-data-table-of-total-amount">
        {{ labels.ofXAmount(length) }}
      </div>
      <span class="spacer"></span>
      <ul *ngIf="!loading && !errorLoading" class="pager" data-automation-id="pager">
        <li class="page" (click)="selectPage(page - 1)" [ngClass]="{ disabled: page === 0 }">
          <i class="bhi-previous" data-automation-id="pager-previous"></i>
        </li>
        <li class="page" [ngClass]="{ active: p.number === page + 1 }" *ngFor="let p of pages" (click)="selectPage(p.number - 1)">
          {{ p.text }}
        </li>
        <li class="page" (click)="selectPage(page + 1)" [ngClass]="{ disabled: page + 1 === totalPages }">
          <i class="bhi-next" data-automation-id="pager-next"></i>
        </li>
      </ul>
      <novo-spinner *ngIf="loading"></novo-spinner>
      <button *ngIf="errorLoading"
              theme="primary"
              color="negative"
              icon="refresh"
              (click)="paginationRefreshSubject.next()">{{ labels.refreshPagination }}</button>
    </ng-container>
  `, isInline: true, styles: [":host.basic,:host.basic-wide{display:flex;align-items:center;flex:1}:host.basic ::ng-deep novo-tiles.pagination-tiles>.tile-container .tile,:host.basic-wide ::ng-deep novo-tiles.pagination-tiles>.tile-container .tile{padding:7px 10px}:host.basic>.novo-data-table-pagination-size,:host.basic-wide>.novo-data-table-pagination-size{padding-right:10px}:host.basic>.novo-data-table-range-label-long,:host.basic>.novo-data-table-range-label-short,:host.basic-wide>.novo-data-table-range-label-long,:host.basic-wide>.novo-data-table-range-label-short{padding-right:10px;white-space:nowrap}:host.basic>.novo-data-table-range-label-long,:host.basic-wide>.novo-data-table-range-label-long{display:none}@media (min-width: 1000px){:host.basic>.novo-data-table-range-label-long,:host.basic-wide>.novo-data-table-range-label-long{display:block}}:host.basic>.novo-data-table-spacer,:host.basic-wide>.novo-data-table-spacer{width:100%}:host.basic>.novo-data-table-range-label-short,:host.basic-wide>.novo-data-table-range-label-short{display:block}@media (min-width: 1000px){:host.basic>.novo-data-table-range-label-short,:host.basic-wide>.novo-data-table-range-label-short{display:none}}:host.basic>button:first-of-type,:host.basic-wide>button:first-of-type{margin-right:5px}:host.basic>button span,:host.basic-wide>button span{display:none}@media (min-width: 1000px){:host.basic>button span,:host.basic-wide>button span{display:block}}:host.basic>button[theme][theme=dialogue][icon][side=left],:host.basic-wide>button[theme][theme=dialogue][icon][side=left]{padding:5px}@media (min-width: 1000px){:host.basic>button[theme][theme=dialogue][icon][side=left],:host.basic-wide>button[theme][theme=dialogue][icon][side=left]{padding:5px 15px 5px 5px}}:host.basic>button[theme][theme=dialogue][icon][side=right],:host.basic-wide>button[theme][theme=dialogue][icon][side=right]{padding:5px}@media (min-width: 1000px){:host.basic>button[theme][theme=dialogue][icon][side=right],:host.basic-wide>button[theme][theme=dialogue][icon][side=right]{padding:5px 5px 5px 15px}}:host.standard{display:flex;flex-flow:row nowrap;flex:1}:host.standard>*{margin:auto 5px}:host.standard h5.rows{padding:0;font-size:12px;opacity:.75;letter-spacing:.1px}:host.standard span.spacer{flex:1}:host.standard novo-select{max-width:100px;min-width:100px}:host.standard novo-select div[type=button]:hover i{opacity:.75}:host.standard novo-select div[type=button]:active i,:host.standard novo-select div[type=button]:focus i{opacity:1}:host.standard novo-select div[type=button] i{opacity:.45}:host.standard .pager{list-style-type:none;-webkit-user-select:none;user-select:none;display:flex}:host.standard .pager .page{display:flex;justify-content:center;align-items:center;width:2.4rem;height:2.4rem;font-size:var(--font-size-text);border-radius:2px;list-style-type:none;cursor:pointer;color:#39d}:host.standard .pager .page.disabled{opacity:.3;pointer-events:none}:host.standard .pager .page.active{color:#39d;background-color:#0000001a;opacity:1}:host.standard .novo-data-table-of-total-amount{color:#707070;font-size:12px}\n"], dependencies: [{ kind: "directive", type: i6.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i3$1.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "secondIcon", "disabled"] }, { kind: "component", type: i6$1.NovoSpinnerElement, selector: "novo-spinner", inputs: ["theme", "color", "size", "inverse"] }, { kind: "component", type: i7$1.NovoTilesElement, selector: "novo-tiles", inputs: ["name", "options", "required", "controlDisabled"], outputs: ["onChange", "onSelectedOptionClick", "onDisabledOptionClick"] }, { kind: "directive", type: i11.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "component", type: i9.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayIcon", "displayWith", "compareWith", "hideLegacyOptions", "value", "multiple", "options"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTablePagination, decorators: [{
            type: Component,
            args: [{ selector: 'novo-data-table-pagination', template: `
    <ng-container *ngIf="theme === 'basic' || theme === 'basic-wide'">
      <div class="novo-data-table-pagination-size">
        <novo-tiles
          class="pagination-tiles"
          *ngIf="displayedPageSizeOptions.length > 1"
          [(ngModel)]="pageSize"
          [options]="displayedPageSizeOptions"
          (onChange)="changePageSize($event)"
          data-automation-id="novo-data-table-pagination-tiles"
        >
        </novo-tiles>
        <div *ngIf="displayedPageSizeOptions.length <= 1">{{ pageSize }}</div>
      </div>

      <div class="novo-data-table-range-label-long" data-automation-id="novo-data-table-pagination-range-label-long">
        {{ longRangeLabel }}
      </div>
      <div class="novo-data-table-range-label-short" data-automation-id="novo-data-table-pagination-range-label-short">
        {{ shortRangeLabel }}
      </div>
      <span class="spacer novo-data-table-spacer" *ngIf="theme === 'basic-wide'"></span>
      <novo-button
        theme="dialogue"
        type="button"
        class="novo-data-table-pagination-navigation-previous"
        (click)="previousPage()"
        icon="previous"
        side="left"
        [disabled]="!hasPreviousPage()"
        data-automation-id="novo-data-table-pagination-previous"
      >
        <span>{{ labels.previous }}</span>
      </novo-button>
      <novo-button
        theme="dialogue"
        type="button"
        class="novo-data-table-pagination-navigation-next"
        (click)="nextPage()"
        icon="next"
        side="right"
        [disabled]="!hasNextPage()"
        data-automation-id="novo-data-table-pagination-next"
      >
        <span>{{ labels.next }}</span>
      </novo-button>
    </ng-container>
    <ng-container *ngIf="theme === 'standard'">
      <h5 class="rows">{{ labels.itemsPerPage }}</h5>
      <novo-select
        [options]="displayedPageSizeOptions"
        [placeholder]="labels.select"
        [(ngModel)]="pageSize"
        (onSelect)="changePageSize($event.selected)"
        data-automation-id="pager-select"
        [attr.data-feature-id]="dataFeatureId"
      >
      </novo-select>
      <div *ngIf="showPaginationTotalRecordCount && !loading && !errorLoading" class="novo-data-table-of-total-amount" data-automation-id="novo-data-table-of-total-amount">
        {{ labels.ofXAmount(length) }}
      </div>
      <span class="spacer"></span>
      <ul *ngIf="!loading && !errorLoading" class="pager" data-automation-id="pager">
        <li class="page" (click)="selectPage(page - 1)" [ngClass]="{ disabled: page === 0 }">
          <i class="bhi-previous" data-automation-id="pager-previous"></i>
        </li>
        <li class="page" [ngClass]="{ active: p.number === page + 1 }" *ngFor="let p of pages" (click)="selectPage(p.number - 1)">
          {{ p.text }}
        </li>
        <li class="page" (click)="selectPage(page + 1)" [ngClass]="{ disabled: page + 1 === totalPages }">
          <i class="bhi-next" data-automation-id="pager-next"></i>
        </li>
      </ul>
      <novo-spinner *ngIf="loading"></novo-spinner>
      <button *ngIf="errorLoading"
              theme="primary"
              color="negative"
              icon="refresh"
              (click)="paginationRefreshSubject.next()">{{ labels.refreshPagination }}</button>
    </ng-container>
  `, changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, styles: [":host.basic,:host.basic-wide{display:flex;align-items:center;flex:1}:host.basic ::ng-deep novo-tiles.pagination-tiles>.tile-container .tile,:host.basic-wide ::ng-deep novo-tiles.pagination-tiles>.tile-container .tile{padding:7px 10px}:host.basic>.novo-data-table-pagination-size,:host.basic-wide>.novo-data-table-pagination-size{padding-right:10px}:host.basic>.novo-data-table-range-label-long,:host.basic>.novo-data-table-range-label-short,:host.basic-wide>.novo-data-table-range-label-long,:host.basic-wide>.novo-data-table-range-label-short{padding-right:10px;white-space:nowrap}:host.basic>.novo-data-table-range-label-long,:host.basic-wide>.novo-data-table-range-label-long{display:none}@media (min-width: 1000px){:host.basic>.novo-data-table-range-label-long,:host.basic-wide>.novo-data-table-range-label-long{display:block}}:host.basic>.novo-data-table-spacer,:host.basic-wide>.novo-data-table-spacer{width:100%}:host.basic>.novo-data-table-range-label-short,:host.basic-wide>.novo-data-table-range-label-short{display:block}@media (min-width: 1000px){:host.basic>.novo-data-table-range-label-short,:host.basic-wide>.novo-data-table-range-label-short{display:none}}:host.basic>button:first-of-type,:host.basic-wide>button:first-of-type{margin-right:5px}:host.basic>button span,:host.basic-wide>button span{display:none}@media (min-width: 1000px){:host.basic>button span,:host.basic-wide>button span{display:block}}:host.basic>button[theme][theme=dialogue][icon][side=left],:host.basic-wide>button[theme][theme=dialogue][icon][side=left]{padding:5px}@media (min-width: 1000px){:host.basic>button[theme][theme=dialogue][icon][side=left],:host.basic-wide>button[theme][theme=dialogue][icon][side=left]{padding:5px 15px 5px 5px}}:host.basic>button[theme][theme=dialogue][icon][side=right],:host.basic-wide>button[theme][theme=dialogue][icon][side=right]{padding:5px}@media (min-width: 1000px){:host.basic>button[theme][theme=dialogue][icon][side=right],:host.basic-wide>button[theme][theme=dialogue][icon][side=right]{padding:5px 5px 5px 15px}}:host.standard{display:flex;flex-flow:row nowrap;flex:1}:host.standard>*{margin:auto 5px}:host.standard h5.rows{padding:0;font-size:12px;opacity:.75;letter-spacing:.1px}:host.standard span.spacer{flex:1}:host.standard novo-select{max-width:100px;min-width:100px}:host.standard novo-select div[type=button]:hover i{opacity:.75}:host.standard novo-select div[type=button]:active i,:host.standard novo-select div[type=button]:focus i{opacity:1}:host.standard novo-select div[type=button] i{opacity:.45}:host.standard .pager{list-style-type:none;-webkit-user-select:none;user-select:none;display:flex}:host.standard .pager .page{display:flex;justify-content:center;align-items:center;width:2.4rem;height:2.4rem;font-size:var(--font-size-text);border-radius:2px;list-style-type:none;cursor:pointer;color:#39d}:host.standard .pager .page.disabled{opacity:.3;pointer-events:none}:host.standard .pager .page.active{color:#39d;background-color:#0000001a;opacity:1}:host.standard .novo-data-table-of-total-amount{color:#707070;font-size:12px}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i1$1.NovoLabelService }, { type: DataTableState }], propDecorators: { theme: [{
                type: HostBinding,
                args: ['class']
            }, {
                type: Input
            }], page: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], dataFeatureId: [{
                type: Input
            }], pageSizeOptions: [{
                type: Input
            }], canSelectAll: [{
                type: Input
            }], allMatchingSelected: [{
                type: Input
            }], loading: [{
                type: Input
            }], errorLoading: [{
                type: Input
            }], paginationRefreshSubject: [{
                type: Input
            }], showPaginationTotalRecordCount: [{
                type: Input
            }], length: [{
                type: Input
            }], pageChange: [{
                type: Output
            }] } });

function interpolateCell(value, col) {
    if (col.format) {
        return Helpers.interpolateWithFallback(col.format, value);
    }
    return value;
}
class DataTableInterpolatePipe {
    transform(value, column) {
        if (!Helpers.isEmpty(value)) {
            return interpolateCell(value, column);
        }
        return '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DataTableInterpolatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: DataTableInterpolatePipe, isStandalone: false, name: "dataTableInterpolate" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DataTableInterpolatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'dataTableInterpolate',
                    pure: true,
                    standalone: false
                }]
        }] });
class DateTableDateRendererPipe {
    constructor(labels) {
        this.labels = labels;
    }
    transform(value, column) {
        if (!Helpers.isEmpty(value)) {
            return column.format ? value : this.labels.formatDate(interpolateCell(value, column));
        }
        return '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DateTableDateRendererPipe, deps: [{ token: i1$1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: DateTableDateRendererPipe, isStandalone: false, name: "dataTableDateRenderer" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DateTableDateRendererPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'dataTableDateRenderer',
                    pure: true,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1$1.NovoLabelService }] });
class DateTableDateTimeRendererPipe {
    constructor(labels) {
        this.labels = labels;
    }
    transform(value, column) {
        if (!Helpers.isEmpty(value)) {
            return column.format ? value : this.labels.formatDateShort(interpolateCell(value, column));
        }
        return '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DateTableDateTimeRendererPipe, deps: [{ token: i1$1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: DateTableDateTimeRendererPipe, isStandalone: false, name: "dataTableDateTimeRenderer" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DateTableDateTimeRendererPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'dataTableDateTimeRenderer',
                    pure: true,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1$1.NovoLabelService }] });
class DateTableTimeRendererPipe {
    constructor(labels) {
        this.labels = labels;
    }
    transform(value, column) {
        if (!Helpers.isEmpty(value)) {
            return column.format ? value : this.labels.formatTime(interpolateCell(value, column));
        }
        return '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DateTableTimeRendererPipe, deps: [{ token: i1$1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: DateTableTimeRendererPipe, isStandalone: false, name: "dataTableTimeRenderer" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DateTableTimeRendererPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'dataTableTimeRenderer',
                    pure: true,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1$1.NovoLabelService }] });
class DateTableNumberRendererPipe {
    constructor(labels) {
        this.labels = labels;
    }
    transform(value, column, isPercent = false) {
        if (!Helpers.isEmpty(value)) {
            let val = interpolateCell(value, column);
            if (isPercent && Helpers.isNumber(val)) {
                val = `${Number(val) * 100}`;
            }
            return `${this.labels.formatNumber(val)}${isPercent ? '%' : ''}`;
        }
        return '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DateTableNumberRendererPipe, deps: [{ token: i1$1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: DateTableNumberRendererPipe, isStandalone: false, name: "dataTableNumberRenderer" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DateTableNumberRendererPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'dataTableNumberRenderer',
                    pure: true,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1$1.NovoLabelService }] });
class DataTableBigDecimalRendererPipe {
    constructor(labels) {
        this.labels = labels;
    }
    transform(value, column) {
        if (!Helpers.isEmpty(value)) {
            const val = interpolateCell(value, column);
            return this.labels.formatBigDecimal(Number(val), column.configuration);
        }
        return '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DataTableBigDecimalRendererPipe, deps: [{ token: i1$1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: DataTableBigDecimalRendererPipe, isStandalone: false, name: "dataTableBigDecimalRenderer" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DataTableBigDecimalRendererPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'dataTableBigDecimalRenderer',
                    pure: true,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1$1.NovoLabelService }] });
class DateTableCurrencyRendererPipe {
    constructor(labels) {
        this.labels = labels;
    }
    transform(value, column) {
        if (!Helpers.isEmpty(value)) {
            const val = interpolateCell(value, column);
            return this.labels.formatCurrency(Number(val));
        }
        return '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DateTableCurrencyRendererPipe, deps: [{ token: i1$1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: DateTableCurrencyRendererPipe, isStandalone: false, name: "dataTableCurrencyRenderer" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DateTableCurrencyRendererPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'dataTableCurrencyRenderer',
                    pure: true,
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1$1.NovoLabelService }] });

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class NovoDataTable {
    set displayedColumns(displayedColumns) {
        this.updateDisplayedColumns(displayedColumns, 'input');
    }
    get displayedColumns() {
        return this._disabledColumns;
    }
    set dataTableService(service) {
        this.loading = false;
        if (!service) {
            service = new StaticDataTableService([]);
        }
        this.dataSource = new DataTableSource(service, this.state, this.ref);
        this.ref.detectChanges();
    }
    set rows(rows) {
        this.loading = false;
        const service = new StaticDataTableService(rows);
        this.dataSource = new DataTableSource(service, this.state, this.ref);
        this.ref.detectChanges();
    }
    set outsideFilter(outsideFilter) {
        // Unsubscribe
        if (this.outsideFilterSubscription) {
            this.outsideFilterSubscription.unsubscribe();
        }
        if (outsideFilter) {
            // Re-subscribe
            this.outsideFilterSubscription = outsideFilter.subscribe((filter) => {
                this.state.outsideFilter = filter;
                this.state.updates.next({ globalSearch: this.state.globalSearch, filter: this.state.filter, sort: this.state.sort, where: this.state.where });
                this.ref.markForCheck();
            });
        }
    }
    set refreshSubject(refreshSubject) {
        // Unsubscribe
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
        if (refreshSubject) {
            // Re-subscribe
            this.refreshSubscription = refreshSubject.subscribe(() => {
                this.state.isForceRefresh = true;
                this.state.updates.next({ globalSearch: this.state.globalSearch, filter: this.state.filter, sort: this.state.sort, where: this.state.where });
                this.ref.markForCheck();
            });
        }
    }
    set columns(columns) {
        this._columns = columns;
        this.configureColumns();
        this.performInteractions('init');
    }
    get columns() {
        return this._columns;
    }
    set customFilter(v) {
        this._customFilter = coerceBooleanProperty(v);
    }
    get customFilter() {
        return this._customFilter;
    }
    set hasExandedRows(v) {
        this._hasExandedRows = coerceBooleanProperty(v);
    }
    get hasExandedRows() {
        return this._hasExandedRows;
    }
    set forceShowHeader(v) {
        this._forceShowHeader = coerceBooleanProperty(v);
    }
    get forceShowHeader() {
        return this._forceShowHeader;
    }
    set hideGlobalSearch(v) {
        this._hideGlobalSearch = coerceBooleanProperty(v);
        this.globalSearchHiddenClassToggle = this._hideGlobalSearch;
    }
    get hideGlobalSearch() {
        return this._hideGlobalSearch;
    }
    get empty() {
        return this.useOverrideTotal ? this.overrideTotal === 0 : this.dataSource?.totallyEmpty;
    }
    get loadingClass() {
        return this.loading || (this.dataSource && this.dataSource.loading);
    }
    get useOverrideTotal() {
        return !Helpers.isBlank(this.overrideTotal);
    }
    constructor(labels, ref, state) {
        this.labels = labels;
        this.ref = ref;
        this.state = state;
        this.globalSearchHiddenClassToggle = false;
        this.resized = new EventEmitter();
        this.name = 'novo-data-table';
        this.allowMultipleFilters = false;
        this.rowIdentifier = 'id';
        this.activeRowIdentifier = '';
        // prettier-ignore
        this.trackByFn = (index, item) => item.id;
        this.templates = {};
        this.fixedHeader = false;
        this.maxSelected = undefined;
        this.canSelectAll = false;
        this.allMatchingSelected = false;
        this.enableColumnDragging = false;
        this._hideGlobalSearch = true;
        this.preferencesChanged = new EventEmitter();
        this.allSelected = new EventEmitter();
        this.toggledFilter = new EventEmitter();
        this.loading = true;
        this.columnToTemplate = {};
        this.columnsLoaded = false;
        this.selection = new Set();
        this.scrollLeft = 0;
        this.expandable = false;
        this.initialized = false;
        this.columnDragFilter = (columnName) => {
            if (['selection', 'expand'].includes(columnName)) {
                return false;
            }
            return this.dragEnabledByColumn.get(columnName) ?? false;
        };
        this.scrollListenerHandler = this.scrollListener.bind(this);
        this.sortFilterSubscription = this.state.sortFilterSource.subscribe((event) => {
            if (this.name !== 'novo-data-table') {
                this.preferencesChanged.emit({
                    name: this.name,
                    sort: event.sort,
                    filter: event.filter,
                    globalSearch: event.globalSearch,
                    where: event.where,
                    savedSearchName: event.savedSearchName,
                    appliedSearchType: event.appliedSearchType,
                    eventSrc: 'statesortchange'
                });
                this.performInteractions('change');
            }
            else {
                notify('Must have [name] set on data-table to use preferences!');
            }
        });
        this.paginationSubscription = this.state.paginationSource.subscribe((event) => {
            if (this.name !== 'novo-data-table') {
                if (event.isPageSizeChange) {
                    this.preferencesChanged.emit({ name: this.name, pageSize: event.pageSize, eventSrc: 'pagination' });
                }
            }
            else {
                notify('Must have [name] set on data-table to use preferences!');
            }
        });
        this.resetSubscription = this.state.resetSource.subscribe(() => {
            setTimeout(() => {
                this.ref.detectChanges();
            }, 300);
        });
        this.allMatchingSelectedSubscription = this.state.allMatchingSelectedSource.subscribe((event) => {
            this.allMatchingSelected = event;
        });
    }
    modifyCellHeaderMultiSelectFilterOptions(column, newOptions) {
        const header = this.cellHeaders.find((cellHeader) => cellHeader.id === column);
        if (header) {
            if (header.config && header.config.filterConfig && header.config.filterConfig.options) {
                const filterOptions = header.config.filterConfig.options;
                const optionsToKeep = filterOptions.filter((opt) => header.isSelected(opt, header.multiSelectedOptions) &&
                    !newOptions.find((newOpt) => opt.value && newOpt.value && newOpt.value === opt.value));
                header.config.filterConfig.options = [...optionsToKeep, ...newOptions];
            }
            else {
                header.config.filterConfig.options = newOptions;
            }
            header.setupFilterOptions();
            header.changeDetectorRef.markForCheck();
        }
    }
    ngOnDestroy() {
        this.outsideFilterSubscription?.unsubscribe();
        this.refreshSubscription?.unsubscribe();
        this.resetSubscription?.unsubscribe();
        this.sortFilterSubscription?.unsubscribe();
        this.allMatchingSelectedSubscription?.unsubscribe();
        if (this.novoDataTableContainer) {
            this.novoDataTableContainer.nativeElement.removeEventListener('scroll', this.scrollListenerHandler);
        }
    }
    ngAfterContentInit() {
        if (this.displayedColumns && this.displayedColumns.length) {
            this.expandable = this.displayedColumns.includes('expand');
        }
        // Default templates defined here
        this.defaultTemplates.forEach((item) => {
            // Only override if it doesn't already exist
            if (!this.templates[item.getType()]) {
                this.templates[item.getType()] = item.template;
            }
        });
        // Custom templates passed in
        this.customTemplates.forEach((item) => {
            // Override anything that is custom and in HTML
            this.templates[item.getType()] = item.template;
        });
        // Load columns
        this.configureColumns();
        // State
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
        this.state.selectionOptions = this.selectionOptions ?? undefined;
        // Scrolling inside table
        this.novoDataTableContainer.nativeElement.addEventListener('scroll', this.scrollListenerHandler);
        this.initialized = true;
        this.ref.markForCheck();
    }
    onSearchChange(term) {
        this.state.globalSearch = term;
        this.state.reset(false, true);
        this.state.updates.next({ globalSearch: term, filter: this.state.filter, sort: this.state.sort, where: this.state.where });
    }
    trackColumnsBy(index, item) {
        return item.id;
    }
    isDisabled(check, row) {
        if (check.disabled === true) {
            return true;
        }
        if (check.disabledFunc) {
            return check.disabledFunc(row);
        }
        return false;
    }
    isExpanded(row) {
        if (!row) {
            return false;
        }
        return this.state.expandedRows.has(`${row[this.rowIdentifier]}`);
    }
    expandRow(row) {
        const expanded = this.isExpanded(row);
        if (expanded) {
            this.state.expandedRows.delete(`${row[this.rowIdentifier]}`);
        }
        else {
            this.state.expandedRows.add(`${row[this.rowIdentifier]}`);
        }
        this.state.onExpandChange(row.id);
    }
    expandRows(expand) {
        (this.dataSource.data || []).forEach((row) => {
            if (!expand) {
                this.state.expandedRows.delete(`${row[this.rowIdentifier]}`);
            }
            else {
                this.state.expandedRows.add(`${row[this.rowIdentifier]}`);
            }
        });
        this.state.onExpandChange();
    }
    allCurrentRowsExpanded() {
        for (let i = 0; i < (this.dataSource.data || []).length; i++) {
            if (!this.isExpanded((this.dataSource.data || [])[i])) {
                return false;
            }
        }
        return true;
    }
    isSelected(row) {
        if (!row) {
            return false;
        }
        return this.state.selectedRows.has(`${row[this.rowIdentifier]}`);
    }
    selectRow(row, origin) {
        const selected = this.isSelected(row);
        if (selected) {
            this.state.selectedRows.delete(`${row[this.rowIdentifier]}`);
        }
        else {
            if (this.canSelectAll && this.allMatchingSelected && ['onClick'].includes(origin)) {
                // When all matching records are selected the user could be on another page where all rows only appear selected
                // Need to reset the rows that are actually selected, select rows on the current page and deselect the chosen record
                this.state.selectedRows.clear();
                this.selectRows(true);
                this.state.selectedRows.delete(`${row[this.rowIdentifier]}`);
            }
            else {
                this.state.selectedRows.set(`${row[this.rowIdentifier]}`, row);
            }
        }
        this.state.allMatchingSelectedSource.next(false);
        this.state.onSelectionChange();
    }
    selectRows(selected) {
        (this.dataSource.data || []).forEach((row) => {
            if (!selected) {
                this.state.selectedRows.delete(`${row[this.rowIdentifier]}`);
            }
            else {
                this.state.selectedRows.set(`${row[this.rowIdentifier]}`, row);
            }
        });
        this.state.onSelectionChange();
    }
    allCurrentRowsSelected() {
        if (this.allMatchingSelected) {
            return true;
        }
        if (!this.dataSource?.data?.length) {
            return false;
        }
        for (let i = 0; i < (this.dataSource.data || []).length; i++) {
            if (!this.isSelected((this.dataSource.data || [])[i])) {
                return false;
            }
        }
        return true;
    }
    columnDragged(event) {
        this.updateDisplayedColumns(event.allItems, 'columndrag');
    }
    configureLastDisplayedColumn() {
        if (this.columns && this.displayedColumns && 0 !== this.columns.length && 0 !== this.displayedColumns.length) {
            this.columns.forEach((column) => {
                if (column.initialResizable) {
                    column.resizable = column.initialResizable.resizable;
                    column.width = column.initialResizable.width;
                    column.initialResizable = undefined;
                }
            });
            const resizableColumns = this.displayedColumns.filter((name) => {
                return (this.columns.findIndex((column) => {
                    return column.resizable && column.id === name;
                }) !== -1);
            });
            if (resizableColumns && resizableColumns.length > 0) {
                const lastResizableColumn = this.columns.find((column) => {
                    return column.id === resizableColumns[resizableColumns.length - 1];
                });
                lastResizableColumn.initialResizable = {
                    resizable: lastResizableColumn.resizable,
                    width: lastResizableColumn.width,
                };
                lastResizableColumn.width = undefined;
                lastResizableColumn.resizable = false;
            }
        }
    }
    configureColumns() {
        if (this.columns && this.columns.length !== 0 && Object.keys(this.templates).length !== 0) {
            // Figure the column templates
            if (this.enableColumnDragging) {
                this.dragEnabledByColumn = new Map();
            }
            this.columns.forEach((column) => {
                // Figure the template
                let templateName;
                if (column.template) {
                    // Pass it in as template
                    templateName = column.template;
                }
                else if (!!this.templates[column.id]) {
                    // Custom template for the column id
                    templateName = column.id;
                }
                else {
                    // Default to the defaulCellTemplate
                    if (column.type === 'action') {
                        if (column.action && column.action.options) {
                            if (!column.action.icon) {
                                column.action.icon = 'collapse';
                            }
                            templateName = 'dropdownCellTemplate';
                        }
                        else {
                            templateName = 'buttonCellTemplate';
                        }
                    }
                    else {
                        if (column.type === 'link:tel' || column.type === 'link:mailto') {
                            templateName = `${column.type.split(':')[1]}CellTemplate`;
                        }
                        else {
                            templateName = `${column.type}CellTemplate`;
                        }
                    }
                }
                this.columnToTemplate[column.id] = this.templates[templateName];
                if (this.enableColumnDragging) {
                    const draggable = column.draggable != null ? column.draggable : true;
                    this.dragEnabledByColumn.set(column.id, draggable);
                }
            });
            this.configureLastDisplayedColumn();
            this.columnsLoaded = true;
        }
    }
    updateDisplayedColumns(displayedColumns, updateSrc) {
        if (this.displayedColumns && this.displayedColumns.length !== 0) {
            if (this.name !== 'novo-data-table') {
                this.preferencesChanged.emit({
                    name: this.name,
                    displayedColumns,
                    eventSrc: updateSrc,
                });
            }
            else {
                notify('Must have [name] set on data-table to use preferences!');
            }
        }
        this._disabledColumns = displayedColumns;
        this.configureLastDisplayedColumn();
        if (this.initialized) {
            setTimeout(() => {
                this.scrollListener();
            });
        }
    }
    scrollListener() {
        const target = this.novoDataTableContainer.nativeElement;
        const left = target.scrollLeft;
        if (left !== this.scrollLeft) {
            this.scrollLeft = target.scrollLeft;
        }
        this.ref.markForCheck();
    }
    performInteractions(event) {
        if (this.listInteractions) {
            for (const column of this.columns) {
                const allListColumnInteractions = this.listInteractions[column.id];
                const listColumnInteraction = allListColumnInteractions && allListColumnInteractions.find((int) => int.event.includes(event));
                if (listColumnInteraction) {
                    listColumnInteraction.script(this, column.id);
                }
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTable, deps: [{ token: i1$1.NovoLabelService }, { token: i0.ChangeDetectorRef }, { token: DataTableState }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoDataTable, isStandalone: false, selector: "novo-data-table", inputs: { displayedColumns: "displayedColumns", paginationOptions: "paginationOptions", searchOptions: "searchOptions", selectionOptions: "selectionOptions", defaultSort: "defaultSort", name: "name", allowMultipleFilters: "allowMultipleFilters", rowIdentifier: "rowIdentifier", activeRowIdentifier: "activeRowIdentifier", trackByFn: "trackByFn", templates: "templates", fixedHeader: "fixedHeader", paginatorDataFeatureId: "paginatorDataFeatureId", maxSelected: "maxSelected", canSelectAll: "canSelectAll", allMatchingSelected: "allMatchingSelected", overrideTotal: "overrideTotal", paginationRefreshSubject: "paginationRefreshSubject", enableColumnDragging: "enableColumnDragging", dataTableService: "dataTableService", rows: "rows", outsideFilter: "outsideFilter", refreshSubject: "refreshSubject", columns: "columns", customFilter: "customFilter", hasExandedRows: "hasExandedRows", forceShowHeader: "forceShowHeader", hideGlobalSearch: "hideGlobalSearch", listInteractions: "listInteractions" }, outputs: { resized: "resized", preferencesChanged: "preferencesChanged", allSelected: "allSelected", toggledFilter: "toggledFilter" }, host: { properties: { "class.global-search-hidden": "this.globalSearchHiddenClassToggle", "class.empty": "this.empty", "class.loading": "this.loadingClass" } }, providers: [DataTableState, { provide: NOVO_DATA_TABLE_REF, useExisting: NovoDataTable }], queries: [{ propertyName: "customTemplates", predicate: NovoTemplate }], viewQueries: [{ propertyName: "novoDataTableContainer", first: true, predicate: ["novoDataTableContainer"], descendants: true }, { propertyName: "defaultTemplates", predicate: NovoTemplate, descendants: true }, { propertyName: "cellHeaders", predicate: NovoDataTableCellHeader, descendants: true }], ngImport: i0, template: "<header\n  *ngIf=\"(!(empty && !state.userFiltered) && !loading) || forceShowHeader\"\n  [class.empty]=\"hideGlobalSearch && !paginationOptions && !templates['customActions']\"\n  [ngClass]=\"{ 'pagination-footer': paginationOptions?.onFooter }\"\n>\n  <ng-container *ngTemplateOutlet=\"templates['customHeader']\"></ng-container>\n  <novo-search\n    alwaysOpen=\"true\"\n    (searchChanged)=\"onSearchChange($event)\"\n    [(ngModel)]=\"state.globalSearch\"\n    *ngIf=\"!hideGlobalSearch\"\n    [placeholder]=\"searchOptions?.placeholder\"\n    [hint]=\"searchOptions?.tooltip\"\n  >\n  </novo-search>\n  <!-- Updates to novo-data-table-pagination here need to be applied to the footer as well -->\n  <novo-data-table-pagination\n    *ngIf=\"paginationOptions && !paginationOptions.onFooter\"\n    [theme]=\"paginationOptions.theme\"\n    [length]=\"useOverrideTotal ? overrideTotal : dataSource?.currentTotal\"\n    [page]=\"paginationOptions.page\"\n    [pageSize]=\"paginationOptions.pageSize\"\n    [pageSizeOptions]=\"paginationOptions.pageSizeOptions\"\n    [dataFeatureId]=\"paginatorDataFeatureId\"\n    [canSelectAll]=\"canSelectAll\"\n    [allMatchingSelected]=\"allMatchingSelected\"\n    [loading]=\"paginationOptions.loading\"\n    [errorLoading]=\"paginationOptions.errorLoading\"\n    [paginationRefreshSubject]=\"paginationRefreshSubject\"\n  >\n  </novo-data-table-pagination>\n  <div class=\"novo-data-table-actions\" *ngIf=\"templates['customActions']\">\n    <ng-container *ngTemplateOutlet=\"templates['customActions']\"></ng-container>\n  </div>\n</header>\n<div class=\"novo-data-table-loading-mask\" *ngIf=\"dataSource?.loading || loading\" data-automation-id=\"novo-data-table-loading\">\n  <novo-loading></novo-loading>\n</div>\n<div class=\"novo-data-table-outside-container\" [ngClass]=\"{ 'novo-data-table-outside-container-fixed': fixedHeader }\">\n  <div class=\"novo-data-table-custom-filter\" *ngIf=\"customFilter\">\n    <ng-container *ngTemplateOutlet=\"templates['customFilter']\"></ng-container>\n  </div>\n  <div\n    #novoDataTableContainer\n    cdkScrollable\n    class=\"novo-data-table-container\"\n    [ngClass]=\"{ 'novo-data-table-container-fixed': fixedHeader }\"\n    [class.empty-user-filtered]=\"dataSource?.currentlyEmpty && state.userFiltered\"\n    [class.empty]=\"empty && !dataSource?.loading && !loading && !state.userFiltered && !dataSource.pristine\"\n  >\n    <cdk-table\n      *ngIf=\"columns?.length > 0 && columnsLoaded && dataSource\"\n      [dataSource]=\"dataSource\"\n      [trackBy]=\"trackByFn\"\n      novoDataTableSortFilter\n      [class.expandable]=\"expandable\"\n      [class.empty]=\"dataSource?.currentlyEmpty && state.userFiltered\"\n      [hidden]=\"empty && !state.userFiltered\"\n    >\n      <ng-container cdkColumnDef=\"selection\">\n        <novo-data-table-checkbox-header-cell *cdkHeaderCellDef [maxSelected]=\"maxSelected\"></novo-data-table-checkbox-header-cell>\n        <novo-data-table-checkbox-cell\n          *cdkCellDef=\"let row; let i = index\"\n          [row]=\"row\"\n          [maxSelected]=\"maxSelected\"\n        ></novo-data-table-checkbox-cell>\n      </ng-container>\n      <ng-container cdkColumnDef=\"expand\">\n        <novo-data-table-expand-header-cell *cdkHeaderCellDef></novo-data-table-expand-header-cell>\n        <novo-data-table-expand-cell *cdkCellDef=\"let row; let i = index\" [row]=\"row\"></novo-data-table-expand-cell>\n      </ng-container>\n      <ng-container *ngFor=\"let column of columns; trackBy: trackColumnsBy\" [cdkColumnDef]=\"column.id\">\n        <novo-data-table-header-cell\n          *cdkHeaderCellDef\n          [column]=\"column\"\n          [filterTemplate]=\"templates['column-filter-' + (column.filterable?.customTemplate || column.id)]\"\n          (toggledFilter)=\"toggledFilter.next($event)\"\n          [novo-data-table-cell-config]=\"column\"\n          [resized]=\"resized\"\n          [defaultSort]=\"defaultSort\"\n          [allowMultipleFilters]=\"allowMultipleFilters\"\n          [class.empty]=\"column?.type === 'action' && !column?.label\"\n          [class.button-header-cell]=\"column?.type === 'expand' || (column?.type === 'action' && !column?.action?.options)\"\n          [class.dropdown-header-cell]=\"column?.type === 'action' && column?.action?.options\"\n          [class.fixed-header]=\"fixedHeader\"\n        ></novo-data-table-header-cell>\n        <novo-data-table-cell\n          *cdkCellDef=\"let row\"\n          [resized]=\"resized\"\n          [column]=\"column\"\n          [row]=\"row\"\n          [template]=\"columnToTemplate[column.id]\"\n          [class.empty]=\"column?.type === 'action' && !column?.label\"\n          [class.button-cell]=\"column?.type === 'expand' || (column?.type === 'action' && !column?.action?.options)\"\n          [class.dropdown-cell]=\"column?.type === 'action' && column?.action?.options\"\n        ></novo-data-table-cell>\n      </ng-container>\n      <novo-data-table-header-row\n        *cdkHeaderRowDef=\"displayedColumns\"\n        [novoDragDrop]=\"enableColumnDragging ? displayedColumns : undefined\"\n        [novoDragDropFilter]=\"columnDragFilter\"\n        (novoDragDropFinish)=\"columnDragged($event)\"\n        [fixedHeader]=\"fixedHeader\"\n        data-automation-id=\"novo-data-table-header-row\"\n      ></novo-data-table-header-row>\n      <novo-data-table-row\n        *cdkRowDef=\"let row; columns: displayedColumns\"\n        [ngClass]=\"{ active: row[rowIdentifier] == activeRowIdentifier }\"\n        [novoDataTableExpand]=\"detailRowTemplate\"\n        [row]=\"row\"\n        [id]=\"name + '-' + row[rowIdentifier]\"\n        [dataAutomationId]=\"row[rowIdentifier]\"\n      ></novo-data-table-row>\n    </cdk-table>\n    <div class=\"novo-data-table-footer\" *ngIf=\"templates['footer']\">\n      <ng-container *ngTemplateOutlet=\"templates['footer']; context: { $implicit: columns, data: dataSource.data }\"></ng-container>\n    </div>\n    <div\n      class=\"novo-data-table-no-results-container\"\n      [style.left.px]=\"scrollLeft\"\n      *ngIf=\"dataSource?.currentlyEmpty && state.userFiltered && !dataSource?.loading && !loading && !dataSource.pristine\"\n    >\n      <div class=\"novo-data-table-empty-message\">\n        <ng-container *ngTemplateOutlet=\"templates['noResultsMessage'] || templates['defaultNoResultsMessage']\"></ng-container>\n      </div>\n    </div>\n    <div\n      class=\"novo-data-table-no-more-results-container\"\n      [style.left.px]=\"scrollLeft\"\n      *ngIf=\"!empty && dataSource?.currentlyEmpty && !state.userFiltered && !dataSource?.loading && !loading && !dataSource.pristine\"\n    >\n      <div class=\"novo-data-table-empty-message\">\n        <ng-container *ngTemplateOutlet=\"templates['noMoreResultsMessage'] || templates['defaultNoMoreResultsMessage']\"></ng-container>\n      </div>\n    </div>\n  </div>\n  <div\n    class=\"novo-data-table-empty-container\"\n    *ngIf=\"empty && !dataSource?.loading && !loading && !state.userFiltered && !dataSource.pristine\"\n  >\n    <div class=\"novo-data-table-empty-message\">\n      <ng-container *ngTemplateOutlet=\"templates['emptyMessage'] || templates['defaultNoResultsMessage']\"></ng-container>\n    </div>\n  </div>\n</div>\n<!-- DEFAULT CELL TEMPLATE -->\n<ng-template novoTemplate=\"textCellTemplate\" let-row let-col=\"col\">\n  <span [style.width.px]=\"col?.width\" [style.min-width.px]=\"col?.width\" [style.max-width.px]=\"col?.width\">{{\n    row[col.id] | dataTableInterpolate: col\n  }}</span>\n</ng-template>\n<ng-template novoTemplate=\"dateCellTemplate\" let-row let-col=\"col\">\n  <span>{{ row[col.id] | dataTableInterpolate: col | dataTableDateRenderer: col }}</span>\n</ng-template>\n<ng-template novoTemplate=\"datetimeCellTemplate\" let-row let-col=\"col\">\n  <span>{{ row[col.id] | dataTableInterpolate: col | dataTableDateTimeRenderer: col }}</span>\n</ng-template>\n<ng-template novoTemplate=\"timeCellTemplate\" let-row let-col=\"col\">\n  <span>{{ row[col.id] | dataTableInterpolate: col | dataTableTimeRenderer: col }}</span>\n</ng-template>\n<ng-template novoTemplate=\"currencyCellTemplate\" let-row let-col=\"col\">\n  <span>{{ row[col.id] | dataTableInterpolate: col | dataTableCurrencyRenderer: col }}</span>\n</ng-template>\n<ng-template novoTemplate=\"bigdecimalCellTemplate\" let-row let-col=\"col\">\n  <span>{{ row[col.id] | dataTableInterpolate: col | dataTableBigDecimalRenderer: col }}</span>\n</ng-template>\n<ng-template novoTemplate=\"numberCellTemplate\" let-row let-col=\"col\">\n  <span>{{ row[col.id] | dataTableInterpolate: col | dataTableNumberRenderer: col }}</span>\n</ng-template>\n<ng-template novoTemplate=\"percentCellTemplate\" let-row let-col=\"col\">\n  <span>{{ row[col.id] | dataTableInterpolate: col | dataTableNumberRenderer: col:true }}</span>\n</ng-template>\n<ng-template novoTemplate=\"linkCellTemplate\" let-row let-col=\"col\">\n  <a\n    [attr.data-feature-id]=\"col?.attributes?.dataFeatureId\"\n    (click)=\"col.handlers?.click({ originalEvent: $event, row: row })\"\n    [style.width.px]=\"col?.width\"\n    [style.min-width.px]=\"col?.width\"\n    [style.max-width.px]=\"col?.width\"\n    >{{ row[col.id] | dataTableInterpolate: col }}</a\n  >\n</ng-template>\n<ng-template novoTemplate=\"telCellTemplate\" let-row let-col=\"col\">\n  <a href=\"tel:{{ row[col.id] | dataTableInterpolate: col }}\" [target]=\"col?.attributes?.target\">{{\n    row[col.id] | dataTableInterpolate: col\n  }}</a>\n</ng-template>\n<ng-template novoTemplate=\"mailtoCellTemplate\" let-row let-col=\"col\">\n  <a href=\"mailto:{{ row[col.id] | dataTableInterpolate: col }}\" [target]=\"col?.attributes?.target\">{{\n    row[col.id] | dataTableInterpolate: col\n  }}</a>\n</ng-template>\n<ng-template novoTemplate=\"buttonCellTemplate\" let-row let-col=\"col\">\n  <novo-button\n    size=\"small\"\n    theme=\"icon\"\n    [tooltip]=\"col?.action?.tooltip\"\n    tooltipPosition=\"right\"\n    [attr.data-feature-id]=\"col?.attributes?.dataFeatureId\"\n    [disabled]=\"isDisabled(col, row)\"\n    (click)=\"col.handlers?.click({ originalEvent: $event, row: row })\"\n  >\n    <novo-icon>{{ col?.action?.icon }}</novo-icon>\n  </novo-button>\n</ng-template>\n<ng-template novoTemplate=\"dropdownCellTemplate\" let-row let-col=\"col\">\n  <novo-dropdown parentScrollSelector=\".novo-data-table-container\" containerClass=\"novo-data-table-dropdown\">\n    <novo-button type=\"button\" theme=\"dialogue\" [icon]=\"col.action.icon\" inverse>{{ col.label }}</novo-button>\n    <novo-optgroup>\n      <novo-option\n        *ngFor=\"let option of col?.action?.options\"\n        (click)=\"option.handlers.click({ originalEvent: $event?.originalEvent, row: row })\"\n        [disabled]=\"isDisabled(option, row)\"\n      >\n        <span [attr.data-automation-id]=\"option.label\">{{ option.label }}</span>\n      </novo-option>\n    </novo-optgroup>\n  </novo-dropdown>\n</ng-template>\n<ng-template novoTemplate=\"defaultNoResultsMessage\">\n  <h4><i class=\"bhi-search-question\"></i> {{ labels.noMatchingRecordsMessage }}</h4>\n</ng-template>\n<ng-template novoTemplate=\"defaultNoMoreResultsMessage\">\n  <h4><i class=\"bhi-search-question\"></i> {{ labels.noMoreRecordsMessage }}</h4>\n</ng-template>\n<ng-template novoTemplate=\"defaultEmptyMessage\">\n  <h4><i class=\"bhi-search-question\"></i> {{ labels.emptyTableMessage }}</h4>\n</ng-template>\n<ng-template novoTemplate=\"expandedRow\"> You did not provide an \"expandedRow\" template! </ng-template>\n<ng-template #detailRowTemplate let-row>\n  <div class=\"novo-data-table-detail-row\" [@expand] style=\"overflow: hidden\">\n    <ng-container *ngTemplateOutlet=\"templates['expandedRow']; context: { $implicit: row }\"></ng-container>\n  </div>\n</ng-template>\n<!-- CUSTOM CELLS PASSED IN -->\n<footer\n  *ngIf=\"paginationOptions?.onFooter && ((!(empty && !state.userFiltered) && !loading) || forceShowHeader)\"\n  [class.empty]=\"!paginationOptions\"\n>\n  <!-- Updates to novo-data-table-pagination here need to be applied to the header as well -->\n  <novo-data-table-pagination\n    *ngIf=\"paginationOptions?.onFooter\"\n    [theme]=\"paginationOptions.theme\"\n    [length]=\"useOverrideTotal ? overrideTotal : dataSource?.currentTotal\"\n    [page]=\"paginationOptions.page\"\n    [pageSize]=\"paginationOptions.pageSize\"\n    [pageSizeOptions]=\"paginationOptions.pageSizeOptions\"\n    [dataFeatureId]=\"paginatorDataFeatureId\"\n    [canSelectAll]=\"canSelectAll\"\n    [allMatchingSelected]=\"allMatchingSelected\"\n    [loading]=\"paginationOptions.loading\"\n    [errorLoading]=\"paginationOptions.errorLoading\"\n    [paginationRefreshSubject]=\"paginationRefreshSubject\"\n    [showPaginationTotalRecordCount]=\"true\"\n  >\n  </novo-data-table-pagination>\n</footer>\n<ng-content></ng-content>", styles: ["html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:var(--font-family-mono, \"monospace\");font-size:1em}a,novo-data-table .clickable{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:var(--font-family-mono, \"monospace\");font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none!important}cdk-table{display:block;flex:1}cdk-table.expandable{width:fit-content;min-width:100%}cdk-table.empty{min-height:62px;max-height:62px}cdk-table>.novo-data-table-row:nth-of-type(odd) .novo-data-table-cell,cdk-table>.novo-data-table-row:nth-of-type(odd) .novo-data-table-button-cell,cdk-table>.novo-data-table-row:nth-of-type(odd) .novo-data-table-dropdown-cell,cdk-table>.novo-data-table-row:nth-of-type(odd) .novo-data-table-expand-cell,cdk-table>.novo-data-table-row:nth-of-type(odd) .novo-data-table-checkbox-cell{background-color:var(--background-muted, #f4f4f4)}cdk-table>.novo-data-table-row:nth-of-type(odd).active .novo-data-table-cell,cdk-table>.novo-data-table-row:nth-of-type(odd).active .novo-data-table-button-cell,cdk-table>.novo-data-table-row:nth-of-type(odd).active .novo-data-table-dropdown-cell,cdk-table>.novo-data-table-row:nth-of-type(odd).active .novo-data-table-expand-cell,cdk-table>.novo-data-table-row:nth-of-type(odd).active .novo-data-table-checkbox-cell{background-color:#4a89dc26}cdk-table>.novo-data-table-row:nth-of-type(odd).active+.novo-data-table-detail-row{background-color:#4a89dc26}cdk-table>.novo-data-table-row:nth-of-type(odd)+.novo-data-table-detail-row{background-color:var(--background-muted, #f4f4f4)}cdk-table>.novo-data-table-row:nth-of-type(2n) .novo-data-table-cell,cdk-table>.novo-data-table-row:nth-of-type(2n) .novo-data-table-button-cell,cdk-table>.novo-data-table-row:nth-of-type(2n) .novo-data-table-dropdown-cell,cdk-table>.novo-data-table-row:nth-of-type(2n) .novo-data-table-expand-cell,cdk-table>.novo-data-table-row:nth-of-type(2n) .novo-data-table-checkbox-cell{background-color:var(--background-body, #ffffff)}cdk-table>.novo-data-table-row:nth-of-type(2n).active .novo-data-table-cell,cdk-table>.novo-data-table-row:nth-of-type(2n).active .novo-data-table-button-cell,cdk-table>.novo-data-table-row:nth-of-type(2n).active .novo-data-table-dropdown-cell,cdk-table>.novo-data-table-row:nth-of-type(2n).active .novo-data-table-expand-cell,cdk-table>.novo-data-table-row:nth-of-type(2n).active .novo-data-table-checkbox-cell{background-color:#4a89dc26}cdk-table>.novo-data-table-row:nth-of-type(2n).active+.novo-data-table-detail-row{background-color:#4a89dc26}cdk-table>.novo-data-table-row:nth-of-type(2n)+.novo-data-table-detail-row{background-color:var(--background-body, #ffffff)}.novo-data-table-cell-align-right{text-align:right;justify-content:flex-end;overflow:hidden;text-overflow:clip}.novo-data-table-header-row,.novo-data-table-header-cell{position:relative;z-index:1}.novo-data-table-header-row.fixed-header,.novo-data-table-header-cell.fixed-header{position:sticky;top:0}.novo-data-table-row,.novo-data-table-header-row{display:flex;flex-direction:row;flex-wrap:nowrap;background-color:var(--background-body, #ffffff)}.novo-data-table-row .novo-data-table-header-cell,.novo-data-table-row .novo-data-table-checkbox-header-cell,.novo-data-table-header-row .novo-data-table-header-cell,.novo-data-table-header-row .novo-data-table-checkbox-header-cell{background-color:var(--background-body, #ffffff)}.novo-data-table-row.expanded i.bhi-next.data-table-icon,.novo-data-table-header-row.expanded i.bhi-next.data-table-icon{cursor:pointer;transition:all .1s}.novo-data-table-row.expanded i.bhi-next.data-table-icon.expanded,.novo-data-table-header-row.expanded i.bhi-next.data-table-icon.expanded{transform:rotate(90deg)}.novo-data-table-header-cell.resizable{padding-right:0}.novo-data-table-header-cell.resizable:hover{background-color:var(--background-muted, #4f5361)}.novo-data-table-header-cell.resizable .data-table-header-resizable{height:100%}.novo-data-table-header-cell.resizable .data-table-header-resizable span{cursor:ew-resize;background-color:var(--border, #4f5361);width:1px;margin:0 4px;display:block}.novo-data-table-header-cell>div>button{margin-right:2px}.novo-data-table-header-cell>div.spacer{flex-grow:100}.novo-data-table-header-cell[draggable=true] label{cursor:grab;-webkit-user-select:none;user-select:none}.novo-data-table-clear-button button{min-width:80px!important}.novo-data-table-cell,.novo-data-table-header-cell{min-width:200px;padding:9px;flex:1;line-height:1.1em}.novo-data-table-cell>i.label-icon,.novo-data-table-header-cell>i.label-icon{margin-right:.5em}.novo-data-table-cell>span,.novo-data-table-header-cell>span{display:block;min-width:180px;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.novo-data-table-cell novo-dropdown,.novo-data-table-header-cell novo-dropdown{display:inline-block}.novo-data-table-cell .filter-button,.novo-data-table-header-cell .filter-button{color:var(--text-muted);background:transparent;pointer-events:all;margin-left:.5rem;line-height:1em;outline:none}.novo-data-table-cell .filter-button:hover,.novo-data-table-header-cell .filter-button:hover{color:var(--text-main)}.novo-data-table-cell .filter-button.filter-active,.novo-data-table-header-cell .filter-button.filter-active{color:var(--selection)}.novo-data-table-cell button.active,.novo-data-table-header-cell button.active{color:#fff;background:#4a89dc}.novo-data-table-cell button.active:hover,.novo-data-table-cell button.active:active,.novo-data-table-cell button.active:focus,.novo-data-table-cell button.active:visited,.novo-data-table-header-cell button.active:hover,.novo-data-table-header-cell button.active:active,.novo-data-table-header-cell button.active:focus,.novo-data-table-header-cell button.active:visited{background:#4a89dc!important}.novo-data-table-cell.clickable,.novo-data-table-header-cell.clickable{cursor:pointer;color:#39d;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.novo-data-table-cell{display:flex;flex-direction:row;align-items:center}.novo-data-table-cell.dropdown-cell,.novo-data-table-cell.button-cell{display:flex;align-items:flex-start;justify-content:center;flex-direction:column;padding:0 5px}.novo-data-table-cell.dropdown-cell novo-dropdown button,.novo-data-table-cell.button-cell novo-dropdown button{padding:0 0 0 5px}.novo-data-table-cell.dropdown-cell novo-dropdown button:hover,.novo-data-table-cell.dropdown-cell novo-dropdown button:active,.novo-data-table-cell.dropdown-cell novo-dropdown button:focus,.novo-data-table-cell.button-cell novo-dropdown button:hover,.novo-data-table-cell.button-cell novo-dropdown button:active,.novo-data-table-cell.button-cell novo-dropdown button:focus{background:#0000001a!important}.novo-data-table-cell.button-cell{min-width:40px;max-width:40px}.novo-data-table-cell.dropdown-cell{min-width:98px;max-width:98px}.novo-data-table-cell.dropdown-cell.empty{min-width:39px;max-width:39px}.novo-data-table-cell i.data-table-icon{cursor:pointer;font-size:1.2em;padding:.5em;border-radius:3px}.novo-data-table-cell i.data-table-icon.disabled{pointer-events:none;opacity:.7}.novo-data-table-cell i.data-table-icon:hover{background:#0000001a}.novo-data-table-cell i.data-table-icon:active{background:#00000040}.novo-data-table-header-cell{white-space:normal;overflow-wrap:break-word;display:flex;align-items:center}.novo-data-table-header-cell+.button-header-cell,.novo-data-table-header-cell+.dropdown-header-cell{border-left:none}.novo-data-table-header-cell>label{display:inline-block;padding-right:10px;overflow:hidden;text-overflow:ellipsis}.novo-data-table-header-cell>label.sort-disabled{cursor:default}.novo-data-table-header-cell>div{width:55px;display:flex;align-items:center;flex:0}.novo-data-table-header-cell novo-dropdown[side=right]{display:inline-block}.novo-data-table-header-cell novo-dropdown[side=right]:focus{outline:none}.novo-data-table-header-cell.button-header-cell{min-width:40px;max-width:40px}.novo-data-table-header-cell.dropdown-header-cell{min-width:98px;max-width:98px}.novo-data-table-header-cell.dropdown-header-cell.empty{min-width:39px;max-width:39px}.novo-data-table-expand-header-cell,.novo-data-table-expand-cell{display:flex;align-items:center;justify-content:center;width:30px}.novo-data-table-expand-header-cell i,.novo-data-table-expand-cell i{cursor:pointer;transition:all .1s}.novo-data-table-expand-header-cell i.expanded,.novo-data-table-expand-cell i.expanded{transform:rotate(90deg)}.novo-data-table-checkbox-header-cell,.novo-data-table-checkbox-cell{display:flex;align-items:flex-start;justify-content:center;flex-direction:column;max-width:40px;padding:0 10px}.novo-data-table-checkbox-header-cell div.data-table-checkbox,.novo-data-table-checkbox-cell div.data-table-checkbox{display:flex;cursor:pointer}.novo-data-table-checkbox-header-cell div.data-table-checkbox i,.novo-data-table-checkbox-cell div.data-table-checkbox i{cursor:pointer}.novo-data-table-checkbox-header-cell div.data-table-checkbox i.bhi-box-empty,.novo-data-table-checkbox-header-cell div.data-table-checkbox i.bhi-checkbox-disabled,.novo-data-table-checkbox-cell div.data-table-checkbox i.bhi-box-empty,.novo-data-table-checkbox-cell div.data-table-checkbox i.bhi-checkbox-disabled{cursor:not-allowed!important}.novo-data-table-checkbox-header-cell div.data-table-checkbox i.bhi-checkbox-empty,.novo-data-table-checkbox-cell div.data-table-checkbox i.bhi-checkbox-empty{color:#d2d2d2}.novo-data-table-checkbox-header-cell div.data-table-checkbox i.bhi-box-yes,.novo-data-table-checkbox-header-cell div.data-table-checkbox i.bhi-checkbox-filled,.novo-data-table-checkbox-cell div.data-table-checkbox i.bhi-box-yes,.novo-data-table-checkbox-cell div.data-table-checkbox i.bhi-checkbox-filled{color:#4a89dc}.novo-data-table-checkbox-header-cell input,.novo-data-table-checkbox-cell input{appearance:none!important;height:0!important;border:none!important}novo-data-table{position:relative;width:100%;display:flex;flex-direction:column;flex:1}novo-data-table.loading{min-height:300px}novo-data-table header{padding:5px;display:flex;align-items:center;flex-shrink:0;border-bottom:1px solid var(--border, #f7f7f7)}novo-data-table header.pagination-footer{justify-content:space-between}novo-data-table header.empty{padding:0}novo-data-table header>[novo-data-table-custom-header]{flex:1}novo-data-table header>novo-search{padding-right:10px;display:none}@media (min-width: 1000px){novo-data-table header>novo-search{display:flex}}novo-data-table header>novo-search>input{padding:8.5px;font-size:1.1em;height:35px}novo-data-table header>novo-search.active>button[theme=fab]{height:35px;min-height:35px}novo-data-table header>div.novo-data-table-actions{display:flex;align-items:center;justify-content:flex-end}novo-data-table header>div.novo-data-table-actions>*{margin-right:.2em}novo-data-table header>div.novo-data-table-actions>*:last-child{margin-right:0}novo-data-table header>div.novo-data-table-actions>div,novo-data-table header>div.novo-data-table-actions>section{display:flex;align-items:center}novo-data-table header>div.novo-data-table-actions>div button,novo-data-table header>div.novo-data-table-actions>section button{margin-left:3px;margin-bottom:0}novo-data-table header>div.novo-data-table-actions>div button[theme][theme=icon],novo-data-table header>div.novo-data-table-actions>section button[theme][theme=icon]{height:35px;width:35px;font-size:1.4em}novo-data-table header>div.novo-data-table-actions>div novo-dropdown button[theme],novo-data-table header>div.novo-data-table-actions>section novo-dropdown button[theme]{white-space:nowrap;padding:6px 5px 6px 15px!important}novo-data-table button[theme][theme=icon]{height:30px;width:30px;padding:5px}novo-data-table .novo-data-table-loading-mask{position:absolute;display:flex;padding-top:10%;justify-content:center;inset:0;background:#00000012;z-index:10}novo-data-table .novo-data-table-detail-row{padding:1em}novo-data-table .novo-data-table-empty-container{padding-top:0}novo-data-table .novo-data-table-no-results-container,novo-data-table .novo-data-table-no-more-results-container{position:absolute;top:48%;left:0;right:0;width:100%}novo-data-table .novo-data-table-empty-container,novo-data-table .novo-data-table-no-results-container,novo-data-table .novo-data-table-no-more-results-container{padding:2em;flex:1;display:flex;align-items:center;justify-content:center;color:#9e9e9e;z-index:5}novo-data-table .novo-data-table-outside-container{display:flex;flex:1}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter{border-right:1px solid var(--border, #f7f7f7)}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter novo-date-picker .calendar{box-shadow:none}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter novo-date-picker .calendar .date-range-tabs{height:51px}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter novo-date-picker .calendar .calendar-footer{display:none}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter div.period-selector{padding:1em}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter div.period-selector .novo-form-control-label{display:block;max-width:100%;margin-bottom:1em}novo-data-table .novo-data-table-outside-container .novo-data-table-container{flex:1;overflow:auto;position:relative}novo-data-table .novo-data-table-outside-container .novo-data-table-container.empty{display:flex;flex:0}novo-data-table .novo-data-table-outside-container .novo-data-table-container.empty-user-filtered{display:flex;flex-flow:column nowrap;min-height:250px}novo-data-table .novo-data-table-outside-container-fixed{overflow:hidden;position:relative}novo-data-table .novo-data-table-outside-container-fixed .novo-data-table-container-fixed{position:absolute;width:100%;height:100%}novo-data-table .novo-data-table-footer{display:flex;align-items:center}novo-data-table .novo-data-table-footer>div,novo-data-table .novo-data-table-footer div.novo-data-table-footer-cell{border-top:1px solid var(--border, #f7f7f7);flex:1;min-width:200px;display:flex;align-items:center}novo-data-table .novo-data-table-footer>div:not(.button-cell):not(.dropdown-cell),novo-data-table .novo-data-table-footer div.novo-data-table-footer-cell:not(.button-cell):not(.dropdown-cell){padding:10px}.dropdown-container.data-table-dropdown{min-width:220px;max-width:280px;max-height:500px;overflow-x:hidden;overflow-y:hidden}.dropdown-container.data-table-dropdown.right{margin-left:-150px!important}.dropdown-container.data-table-dropdown .header{padding:5px 10px;display:flex;justify-content:space-between;align-items:center}.dropdown-container.data-table-dropdown .optgroup-container,.dropdown-container.data-table-dropdown .dropdown-list-options{max-height:346px;overflow-y:auto;overflow-x:hidden}.dropdown-container.data-table-dropdown .footer{border-top:1px solid var(--border, #f7f7f7);padding:5px 10px;display:flex;justify-content:flex-end;align-items:center}.dropdown-container.data-table-dropdown .footer button icon{font-size:.8em}.dropdown-container.data-table-dropdown list item.active{background:transparent;font-weight:500}.dropdown-container.data-table-dropdown button[theme][theme=dialogue][icon] i{padding:inherit;padding-left:5px;height:inherit;width:inherit;display:inline-block;line-height:inherit}.dropdown-container.data-table-dropdown .calendar-container{height:100%;min-height:200px;width:100%;background:#fff;padding:0!important}.dropdown-container.data-table-dropdown .calendar-container .back-link{color:#4a89dc;line-height:3em;font-size:.9em;padding-left:5px;cursor:pointer}.dropdown-container.data-table-dropdown .calendar-container novo-date-picker .calendar{width:100%;height:100%;box-shadow:none;padding:0 5px 10px}.dropdown-container.data-table-dropdown .calendar-container novo-date-picker .calendar .calendar-top{display:none}.dropdown-container.data-table-dropdown span.error-text{color:#da4453;position:relative;left:10px;top:-17px;font-size:x-small}.dropdown-container.data-table-dropdown .filter-null-results{background-color:#fff;text-align:center;color:#b5b5b5;background:transparent;font-weight:500}\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n"], dependencies: [{ kind: "component", type: i1.CdkTable, selector: "cdk-table, table[cdk-table]", inputs: ["trackBy", "dataSource", "multiTemplateDataRows", "fixedLayout"], outputs: ["contentChanged"], exportAs: ["cdkTable"] }, { kind: "directive", type: i1.CdkRowDef, selector: "[cdkRowDef]", inputs: ["cdkRowDefColumns", "cdkRowDefWhen"] }, { kind: "directive", type: i1.CdkCellDef, selector: "[cdkCellDef]" }, { kind: "directive", type: i1.CdkHeaderCellDef, selector: "[cdkHeaderCellDef]" }, { kind: "directive", type: i1.CdkColumnDef, selector: "[cdkColumnDef]", inputs: ["cdkColumnDef", "sticky", "stickyEnd"] }, { kind: "directive", type: i1.CdkHeaderRowDef, selector: "[cdkHeaderRowDef]", inputs: ["cdkHeaderRowDef", "cdkHeaderRowDefSticky"] }, { kind: "directive", type: i6.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i6.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i3.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: i3$1.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "secondIcon", "disabled"] }, { kind: "component", type: i5$1.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple", "scrollToActiveItemOnOpen"], outputs: ["toggled"] }, { kind: "directive", type: i9$1.NovoDragBoxParent, selector: "[novoDragDrop]", inputs: ["novoDragDrop", "novoDragDropFilter", "novoDragDropDisableScroll"], outputs: ["novoDragDropFinish"] }, { kind: "component", type: i6$1.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { kind: "component", type: i11$1.NovoSearchBoxElement, selector: "novo-search", inputs: ["name", "icon", "position", "placeholder", "alwaysOpen", "theme", "color", "closeOnSelect", "displayField", "displayValue", "hint", "keepOpen", "hasBackdrop", "allowPropagation", "overrideElement"], outputs: ["searchChanged", "applySearch"] }, { kind: "component", type: i11.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i11.NovoOptgroup, selector: "novo-optgroup", inputs: ["disabled", "label"], exportAs: ["novoOptgroup"] }, { kind: "directive", type: i11.NovoTemplate, selector: "[novoTemplate]", inputs: ["type", "novoTemplate"] }, { kind: "directive", type: i11.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "directive", type: i12.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML", "tooltipCloseOnClick", "tooltipOnOverflow", "tooltipActive"] }, { kind: "directive", type: i14$1.CdkScrollable, selector: "[cdk-scrollable], [cdkScrollable]" }, { kind: "component", type: NovoDataTableCellHeader, selector: "[novo-data-table-cell-config]", inputs: ["defaultSort", "allowMultipleFilters", "resized", "filterTemplate", "novo-data-table-cell-config"], outputs: ["toggledFilter"] }, { kind: "directive", type: NovoDataTableSortFilter, selector: "[novoDataTableSortFilter]" }, { kind: "directive", type: NovoDataTableHeaderCell, selector: "novo-data-table-header-cell", inputs: ["column"] }, { kind: "component", type: NovoDataTableCell, selector: "novo-data-table-cell", inputs: ["row", "template", "column", "resized"] }, { kind: "component", type: NovoDataTableHeaderRow, selector: "novo-data-table-header-row", inputs: ["fixedHeader"] }, { kind: "component", type: NovoDataTableRow, selector: "novo-data-table-row", inputs: ["id", "dataAutomationId"] }, { kind: "component", type: NovoDataTablePagination, selector: "novo-data-table-pagination", inputs: ["theme", "page", "pageSize", "dataFeatureId", "pageSizeOptions", "canSelectAll", "allMatchingSelected", "loading", "errorLoading", "paginationRefreshSubject", "showPaginationTotalRecordCount", "length"], outputs: ["pageChange"] }, { kind: "component", type: NovoDataTableCheckboxCell, selector: "novo-data-table-checkbox-cell", inputs: ["row", "maxSelected"] }, { kind: "component", type: NovoDataTableCheckboxHeaderCell, selector: "novo-data-table-checkbox-header-cell", inputs: ["maxSelected"] }, { kind: "component", type: NovoDataTableExpandCell, selector: "novo-data-table-expand-cell", inputs: ["row"] }, { kind: "component", type: NovoDataTableExpandHeaderCell, selector: "novo-data-table-expand-header-cell" }, { kind: "directive", type: NovoDataTableExpandDirective, selector: "[novoDataTableExpand]", inputs: ["row", "novoDataTableExpand"] }, { kind: "pipe", type: DataTableInterpolatePipe, name: "dataTableInterpolate" }, { kind: "pipe", type: DateTableDateRendererPipe, name: "dataTableDateRenderer" }, { kind: "pipe", type: DateTableCurrencyRendererPipe, name: "dataTableCurrencyRenderer" }, { kind: "pipe", type: DateTableDateTimeRendererPipe, name: "dataTableDateTimeRenderer" }, { kind: "pipe", type: DateTableNumberRendererPipe, name: "dataTableNumberRenderer" }, { kind: "pipe", type: DateTableTimeRendererPipe, name: "dataTableTimeRenderer" }, { kind: "pipe", type: DataTableBigDecimalRendererPipe, name: "dataTableBigDecimalRenderer" }], animations: [
            trigger('expand', [
                state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
                state('*', style({ height: '*', visibility: 'visible' })),
                transition('void <=> *', animate('70ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            ]),
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
__decorate([
    BooleanInput(),
    __metadata("design:type", Object)
], NovoDataTable.prototype, "enableColumnDragging", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTable, decorators: [{
            type: Component,
            args: [{ selector: 'novo-data-table', animations: [
                        trigger('expand', [
                            state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
                            state('*', style({ height: '*', visibility: 'visible' })),
                            transition('void <=> *', animate('70ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                        ]),
                    ], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [DataTableState, { provide: NOVO_DATA_TABLE_REF, useExisting: NovoDataTable }], standalone: false, template: "<header\n  *ngIf=\"(!(empty && !state.userFiltered) && !loading) || forceShowHeader\"\n  [class.empty]=\"hideGlobalSearch && !paginationOptions && !templates['customActions']\"\n  [ngClass]=\"{ 'pagination-footer': paginationOptions?.onFooter }\"\n>\n  <ng-container *ngTemplateOutlet=\"templates['customHeader']\"></ng-container>\n  <novo-search\n    alwaysOpen=\"true\"\n    (searchChanged)=\"onSearchChange($event)\"\n    [(ngModel)]=\"state.globalSearch\"\n    *ngIf=\"!hideGlobalSearch\"\n    [placeholder]=\"searchOptions?.placeholder\"\n    [hint]=\"searchOptions?.tooltip\"\n  >\n  </novo-search>\n  <!-- Updates to novo-data-table-pagination here need to be applied to the footer as well -->\n  <novo-data-table-pagination\n    *ngIf=\"paginationOptions && !paginationOptions.onFooter\"\n    [theme]=\"paginationOptions.theme\"\n    [length]=\"useOverrideTotal ? overrideTotal : dataSource?.currentTotal\"\n    [page]=\"paginationOptions.page\"\n    [pageSize]=\"paginationOptions.pageSize\"\n    [pageSizeOptions]=\"paginationOptions.pageSizeOptions\"\n    [dataFeatureId]=\"paginatorDataFeatureId\"\n    [canSelectAll]=\"canSelectAll\"\n    [allMatchingSelected]=\"allMatchingSelected\"\n    [loading]=\"paginationOptions.loading\"\n    [errorLoading]=\"paginationOptions.errorLoading\"\n    [paginationRefreshSubject]=\"paginationRefreshSubject\"\n  >\n  </novo-data-table-pagination>\n  <div class=\"novo-data-table-actions\" *ngIf=\"templates['customActions']\">\n    <ng-container *ngTemplateOutlet=\"templates['customActions']\"></ng-container>\n  </div>\n</header>\n<div class=\"novo-data-table-loading-mask\" *ngIf=\"dataSource?.loading || loading\" data-automation-id=\"novo-data-table-loading\">\n  <novo-loading></novo-loading>\n</div>\n<div class=\"novo-data-table-outside-container\" [ngClass]=\"{ 'novo-data-table-outside-container-fixed': fixedHeader }\">\n  <div class=\"novo-data-table-custom-filter\" *ngIf=\"customFilter\">\n    <ng-container *ngTemplateOutlet=\"templates['customFilter']\"></ng-container>\n  </div>\n  <div\n    #novoDataTableContainer\n    cdkScrollable\n    class=\"novo-data-table-container\"\n    [ngClass]=\"{ 'novo-data-table-container-fixed': fixedHeader }\"\n    [class.empty-user-filtered]=\"dataSource?.currentlyEmpty && state.userFiltered\"\n    [class.empty]=\"empty && !dataSource?.loading && !loading && !state.userFiltered && !dataSource.pristine\"\n  >\n    <cdk-table\n      *ngIf=\"columns?.length > 0 && columnsLoaded && dataSource\"\n      [dataSource]=\"dataSource\"\n      [trackBy]=\"trackByFn\"\n      novoDataTableSortFilter\n      [class.expandable]=\"expandable\"\n      [class.empty]=\"dataSource?.currentlyEmpty && state.userFiltered\"\n      [hidden]=\"empty && !state.userFiltered\"\n    >\n      <ng-container cdkColumnDef=\"selection\">\n        <novo-data-table-checkbox-header-cell *cdkHeaderCellDef [maxSelected]=\"maxSelected\"></novo-data-table-checkbox-header-cell>\n        <novo-data-table-checkbox-cell\n          *cdkCellDef=\"let row; let i = index\"\n          [row]=\"row\"\n          [maxSelected]=\"maxSelected\"\n        ></novo-data-table-checkbox-cell>\n      </ng-container>\n      <ng-container cdkColumnDef=\"expand\">\n        <novo-data-table-expand-header-cell *cdkHeaderCellDef></novo-data-table-expand-header-cell>\n        <novo-data-table-expand-cell *cdkCellDef=\"let row; let i = index\" [row]=\"row\"></novo-data-table-expand-cell>\n      </ng-container>\n      <ng-container *ngFor=\"let column of columns; trackBy: trackColumnsBy\" [cdkColumnDef]=\"column.id\">\n        <novo-data-table-header-cell\n          *cdkHeaderCellDef\n          [column]=\"column\"\n          [filterTemplate]=\"templates['column-filter-' + (column.filterable?.customTemplate || column.id)]\"\n          (toggledFilter)=\"toggledFilter.next($event)\"\n          [novo-data-table-cell-config]=\"column\"\n          [resized]=\"resized\"\n          [defaultSort]=\"defaultSort\"\n          [allowMultipleFilters]=\"allowMultipleFilters\"\n          [class.empty]=\"column?.type === 'action' && !column?.label\"\n          [class.button-header-cell]=\"column?.type === 'expand' || (column?.type === 'action' && !column?.action?.options)\"\n          [class.dropdown-header-cell]=\"column?.type === 'action' && column?.action?.options\"\n          [class.fixed-header]=\"fixedHeader\"\n        ></novo-data-table-header-cell>\n        <novo-data-table-cell\n          *cdkCellDef=\"let row\"\n          [resized]=\"resized\"\n          [column]=\"column\"\n          [row]=\"row\"\n          [template]=\"columnToTemplate[column.id]\"\n          [class.empty]=\"column?.type === 'action' && !column?.label\"\n          [class.button-cell]=\"column?.type === 'expand' || (column?.type === 'action' && !column?.action?.options)\"\n          [class.dropdown-cell]=\"column?.type === 'action' && column?.action?.options\"\n        ></novo-data-table-cell>\n      </ng-container>\n      <novo-data-table-header-row\n        *cdkHeaderRowDef=\"displayedColumns\"\n        [novoDragDrop]=\"enableColumnDragging ? displayedColumns : undefined\"\n        [novoDragDropFilter]=\"columnDragFilter\"\n        (novoDragDropFinish)=\"columnDragged($event)\"\n        [fixedHeader]=\"fixedHeader\"\n        data-automation-id=\"novo-data-table-header-row\"\n      ></novo-data-table-header-row>\n      <novo-data-table-row\n        *cdkRowDef=\"let row; columns: displayedColumns\"\n        [ngClass]=\"{ active: row[rowIdentifier] == activeRowIdentifier }\"\n        [novoDataTableExpand]=\"detailRowTemplate\"\n        [row]=\"row\"\n        [id]=\"name + '-' + row[rowIdentifier]\"\n        [dataAutomationId]=\"row[rowIdentifier]\"\n      ></novo-data-table-row>\n    </cdk-table>\n    <div class=\"novo-data-table-footer\" *ngIf=\"templates['footer']\">\n      <ng-container *ngTemplateOutlet=\"templates['footer']; context: { $implicit: columns, data: dataSource.data }\"></ng-container>\n    </div>\n    <div\n      class=\"novo-data-table-no-results-container\"\n      [style.left.px]=\"scrollLeft\"\n      *ngIf=\"dataSource?.currentlyEmpty && state.userFiltered && !dataSource?.loading && !loading && !dataSource.pristine\"\n    >\n      <div class=\"novo-data-table-empty-message\">\n        <ng-container *ngTemplateOutlet=\"templates['noResultsMessage'] || templates['defaultNoResultsMessage']\"></ng-container>\n      </div>\n    </div>\n    <div\n      class=\"novo-data-table-no-more-results-container\"\n      [style.left.px]=\"scrollLeft\"\n      *ngIf=\"!empty && dataSource?.currentlyEmpty && !state.userFiltered && !dataSource?.loading && !loading && !dataSource.pristine\"\n    >\n      <div class=\"novo-data-table-empty-message\">\n        <ng-container *ngTemplateOutlet=\"templates['noMoreResultsMessage'] || templates['defaultNoMoreResultsMessage']\"></ng-container>\n      </div>\n    </div>\n  </div>\n  <div\n    class=\"novo-data-table-empty-container\"\n    *ngIf=\"empty && !dataSource?.loading && !loading && !state.userFiltered && !dataSource.pristine\"\n  >\n    <div class=\"novo-data-table-empty-message\">\n      <ng-container *ngTemplateOutlet=\"templates['emptyMessage'] || templates['defaultNoResultsMessage']\"></ng-container>\n    </div>\n  </div>\n</div>\n<!-- DEFAULT CELL TEMPLATE -->\n<ng-template novoTemplate=\"textCellTemplate\" let-row let-col=\"col\">\n  <span [style.width.px]=\"col?.width\" [style.min-width.px]=\"col?.width\" [style.max-width.px]=\"col?.width\">{{\n    row[col.id] | dataTableInterpolate: col\n  }}</span>\n</ng-template>\n<ng-template novoTemplate=\"dateCellTemplate\" let-row let-col=\"col\">\n  <span>{{ row[col.id] | dataTableInterpolate: col | dataTableDateRenderer: col }}</span>\n</ng-template>\n<ng-template novoTemplate=\"datetimeCellTemplate\" let-row let-col=\"col\">\n  <span>{{ row[col.id] | dataTableInterpolate: col | dataTableDateTimeRenderer: col }}</span>\n</ng-template>\n<ng-template novoTemplate=\"timeCellTemplate\" let-row let-col=\"col\">\n  <span>{{ row[col.id] | dataTableInterpolate: col | dataTableTimeRenderer: col }}</span>\n</ng-template>\n<ng-template novoTemplate=\"currencyCellTemplate\" let-row let-col=\"col\">\n  <span>{{ row[col.id] | dataTableInterpolate: col | dataTableCurrencyRenderer: col }}</span>\n</ng-template>\n<ng-template novoTemplate=\"bigdecimalCellTemplate\" let-row let-col=\"col\">\n  <span>{{ row[col.id] | dataTableInterpolate: col | dataTableBigDecimalRenderer: col }}</span>\n</ng-template>\n<ng-template novoTemplate=\"numberCellTemplate\" let-row let-col=\"col\">\n  <span>{{ row[col.id] | dataTableInterpolate: col | dataTableNumberRenderer: col }}</span>\n</ng-template>\n<ng-template novoTemplate=\"percentCellTemplate\" let-row let-col=\"col\">\n  <span>{{ row[col.id] | dataTableInterpolate: col | dataTableNumberRenderer: col:true }}</span>\n</ng-template>\n<ng-template novoTemplate=\"linkCellTemplate\" let-row let-col=\"col\">\n  <a\n    [attr.data-feature-id]=\"col?.attributes?.dataFeatureId\"\n    (click)=\"col.handlers?.click({ originalEvent: $event, row: row })\"\n    [style.width.px]=\"col?.width\"\n    [style.min-width.px]=\"col?.width\"\n    [style.max-width.px]=\"col?.width\"\n    >{{ row[col.id] | dataTableInterpolate: col }}</a\n  >\n</ng-template>\n<ng-template novoTemplate=\"telCellTemplate\" let-row let-col=\"col\">\n  <a href=\"tel:{{ row[col.id] | dataTableInterpolate: col }}\" [target]=\"col?.attributes?.target\">{{\n    row[col.id] | dataTableInterpolate: col\n  }}</a>\n</ng-template>\n<ng-template novoTemplate=\"mailtoCellTemplate\" let-row let-col=\"col\">\n  <a href=\"mailto:{{ row[col.id] | dataTableInterpolate: col }}\" [target]=\"col?.attributes?.target\">{{\n    row[col.id] | dataTableInterpolate: col\n  }}</a>\n</ng-template>\n<ng-template novoTemplate=\"buttonCellTemplate\" let-row let-col=\"col\">\n  <novo-button\n    size=\"small\"\n    theme=\"icon\"\n    [tooltip]=\"col?.action?.tooltip\"\n    tooltipPosition=\"right\"\n    [attr.data-feature-id]=\"col?.attributes?.dataFeatureId\"\n    [disabled]=\"isDisabled(col, row)\"\n    (click)=\"col.handlers?.click({ originalEvent: $event, row: row })\"\n  >\n    <novo-icon>{{ col?.action?.icon }}</novo-icon>\n  </novo-button>\n</ng-template>\n<ng-template novoTemplate=\"dropdownCellTemplate\" let-row let-col=\"col\">\n  <novo-dropdown parentScrollSelector=\".novo-data-table-container\" containerClass=\"novo-data-table-dropdown\">\n    <novo-button type=\"button\" theme=\"dialogue\" [icon]=\"col.action.icon\" inverse>{{ col.label }}</novo-button>\n    <novo-optgroup>\n      <novo-option\n        *ngFor=\"let option of col?.action?.options\"\n        (click)=\"option.handlers.click({ originalEvent: $event?.originalEvent, row: row })\"\n        [disabled]=\"isDisabled(option, row)\"\n      >\n        <span [attr.data-automation-id]=\"option.label\">{{ option.label }}</span>\n      </novo-option>\n    </novo-optgroup>\n  </novo-dropdown>\n</ng-template>\n<ng-template novoTemplate=\"defaultNoResultsMessage\">\n  <h4><i class=\"bhi-search-question\"></i> {{ labels.noMatchingRecordsMessage }}</h4>\n</ng-template>\n<ng-template novoTemplate=\"defaultNoMoreResultsMessage\">\n  <h4><i class=\"bhi-search-question\"></i> {{ labels.noMoreRecordsMessage }}</h4>\n</ng-template>\n<ng-template novoTemplate=\"defaultEmptyMessage\">\n  <h4><i class=\"bhi-search-question\"></i> {{ labels.emptyTableMessage }}</h4>\n</ng-template>\n<ng-template novoTemplate=\"expandedRow\"> You did not provide an \"expandedRow\" template! </ng-template>\n<ng-template #detailRowTemplate let-row>\n  <div class=\"novo-data-table-detail-row\" [@expand] style=\"overflow: hidden\">\n    <ng-container *ngTemplateOutlet=\"templates['expandedRow']; context: { $implicit: row }\"></ng-container>\n  </div>\n</ng-template>\n<!-- CUSTOM CELLS PASSED IN -->\n<footer\n  *ngIf=\"paginationOptions?.onFooter && ((!(empty && !state.userFiltered) && !loading) || forceShowHeader)\"\n  [class.empty]=\"!paginationOptions\"\n>\n  <!-- Updates to novo-data-table-pagination here need to be applied to the header as well -->\n  <novo-data-table-pagination\n    *ngIf=\"paginationOptions?.onFooter\"\n    [theme]=\"paginationOptions.theme\"\n    [length]=\"useOverrideTotal ? overrideTotal : dataSource?.currentTotal\"\n    [page]=\"paginationOptions.page\"\n    [pageSize]=\"paginationOptions.pageSize\"\n    [pageSizeOptions]=\"paginationOptions.pageSizeOptions\"\n    [dataFeatureId]=\"paginatorDataFeatureId\"\n    [canSelectAll]=\"canSelectAll\"\n    [allMatchingSelected]=\"allMatchingSelected\"\n    [loading]=\"paginationOptions.loading\"\n    [errorLoading]=\"paginationOptions.errorLoading\"\n    [paginationRefreshSubject]=\"paginationRefreshSubject\"\n    [showPaginationTotalRecordCount]=\"true\"\n  >\n  </novo-data-table-pagination>\n</footer>\n<ng-content></ng-content>", styles: ["html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:var(--font-family-mono, \"monospace\");font-size:1em}a,novo-data-table .clickable{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:var(--font-family-mono, \"monospace\");font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none!important}cdk-table{display:block;flex:1}cdk-table.expandable{width:fit-content;min-width:100%}cdk-table.empty{min-height:62px;max-height:62px}cdk-table>.novo-data-table-row:nth-of-type(odd) .novo-data-table-cell,cdk-table>.novo-data-table-row:nth-of-type(odd) .novo-data-table-button-cell,cdk-table>.novo-data-table-row:nth-of-type(odd) .novo-data-table-dropdown-cell,cdk-table>.novo-data-table-row:nth-of-type(odd) .novo-data-table-expand-cell,cdk-table>.novo-data-table-row:nth-of-type(odd) .novo-data-table-checkbox-cell{background-color:var(--background-muted, #f4f4f4)}cdk-table>.novo-data-table-row:nth-of-type(odd).active .novo-data-table-cell,cdk-table>.novo-data-table-row:nth-of-type(odd).active .novo-data-table-button-cell,cdk-table>.novo-data-table-row:nth-of-type(odd).active .novo-data-table-dropdown-cell,cdk-table>.novo-data-table-row:nth-of-type(odd).active .novo-data-table-expand-cell,cdk-table>.novo-data-table-row:nth-of-type(odd).active .novo-data-table-checkbox-cell{background-color:#4a89dc26}cdk-table>.novo-data-table-row:nth-of-type(odd).active+.novo-data-table-detail-row{background-color:#4a89dc26}cdk-table>.novo-data-table-row:nth-of-type(odd)+.novo-data-table-detail-row{background-color:var(--background-muted, #f4f4f4)}cdk-table>.novo-data-table-row:nth-of-type(2n) .novo-data-table-cell,cdk-table>.novo-data-table-row:nth-of-type(2n) .novo-data-table-button-cell,cdk-table>.novo-data-table-row:nth-of-type(2n) .novo-data-table-dropdown-cell,cdk-table>.novo-data-table-row:nth-of-type(2n) .novo-data-table-expand-cell,cdk-table>.novo-data-table-row:nth-of-type(2n) .novo-data-table-checkbox-cell{background-color:var(--background-body, #ffffff)}cdk-table>.novo-data-table-row:nth-of-type(2n).active .novo-data-table-cell,cdk-table>.novo-data-table-row:nth-of-type(2n).active .novo-data-table-button-cell,cdk-table>.novo-data-table-row:nth-of-type(2n).active .novo-data-table-dropdown-cell,cdk-table>.novo-data-table-row:nth-of-type(2n).active .novo-data-table-expand-cell,cdk-table>.novo-data-table-row:nth-of-type(2n).active .novo-data-table-checkbox-cell{background-color:#4a89dc26}cdk-table>.novo-data-table-row:nth-of-type(2n).active+.novo-data-table-detail-row{background-color:#4a89dc26}cdk-table>.novo-data-table-row:nth-of-type(2n)+.novo-data-table-detail-row{background-color:var(--background-body, #ffffff)}.novo-data-table-cell-align-right{text-align:right;justify-content:flex-end;overflow:hidden;text-overflow:clip}.novo-data-table-header-row,.novo-data-table-header-cell{position:relative;z-index:1}.novo-data-table-header-row.fixed-header,.novo-data-table-header-cell.fixed-header{position:sticky;top:0}.novo-data-table-row,.novo-data-table-header-row{display:flex;flex-direction:row;flex-wrap:nowrap;background-color:var(--background-body, #ffffff)}.novo-data-table-row .novo-data-table-header-cell,.novo-data-table-row .novo-data-table-checkbox-header-cell,.novo-data-table-header-row .novo-data-table-header-cell,.novo-data-table-header-row .novo-data-table-checkbox-header-cell{background-color:var(--background-body, #ffffff)}.novo-data-table-row.expanded i.bhi-next.data-table-icon,.novo-data-table-header-row.expanded i.bhi-next.data-table-icon{cursor:pointer;transition:all .1s}.novo-data-table-row.expanded i.bhi-next.data-table-icon.expanded,.novo-data-table-header-row.expanded i.bhi-next.data-table-icon.expanded{transform:rotate(90deg)}.novo-data-table-header-cell.resizable{padding-right:0}.novo-data-table-header-cell.resizable:hover{background-color:var(--background-muted, #4f5361)}.novo-data-table-header-cell.resizable .data-table-header-resizable{height:100%}.novo-data-table-header-cell.resizable .data-table-header-resizable span{cursor:ew-resize;background-color:var(--border, #4f5361);width:1px;margin:0 4px;display:block}.novo-data-table-header-cell>div>button{margin-right:2px}.novo-data-table-header-cell>div.spacer{flex-grow:100}.novo-data-table-header-cell[draggable=true] label{cursor:grab;-webkit-user-select:none;user-select:none}.novo-data-table-clear-button button{min-width:80px!important}.novo-data-table-cell,.novo-data-table-header-cell{min-width:200px;padding:9px;flex:1;line-height:1.1em}.novo-data-table-cell>i.label-icon,.novo-data-table-header-cell>i.label-icon{margin-right:.5em}.novo-data-table-cell>span,.novo-data-table-header-cell>span{display:block;min-width:180px;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.novo-data-table-cell novo-dropdown,.novo-data-table-header-cell novo-dropdown{display:inline-block}.novo-data-table-cell .filter-button,.novo-data-table-header-cell .filter-button{color:var(--text-muted);background:transparent;pointer-events:all;margin-left:.5rem;line-height:1em;outline:none}.novo-data-table-cell .filter-button:hover,.novo-data-table-header-cell .filter-button:hover{color:var(--text-main)}.novo-data-table-cell .filter-button.filter-active,.novo-data-table-header-cell .filter-button.filter-active{color:var(--selection)}.novo-data-table-cell button.active,.novo-data-table-header-cell button.active{color:#fff;background:#4a89dc}.novo-data-table-cell button.active:hover,.novo-data-table-cell button.active:active,.novo-data-table-cell button.active:focus,.novo-data-table-cell button.active:visited,.novo-data-table-header-cell button.active:hover,.novo-data-table-header-cell button.active:active,.novo-data-table-header-cell button.active:focus,.novo-data-table-header-cell button.active:visited{background:#4a89dc!important}.novo-data-table-cell.clickable,.novo-data-table-header-cell.clickable{cursor:pointer;color:#39d;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.novo-data-table-cell{display:flex;flex-direction:row;align-items:center}.novo-data-table-cell.dropdown-cell,.novo-data-table-cell.button-cell{display:flex;align-items:flex-start;justify-content:center;flex-direction:column;padding:0 5px}.novo-data-table-cell.dropdown-cell novo-dropdown button,.novo-data-table-cell.button-cell novo-dropdown button{padding:0 0 0 5px}.novo-data-table-cell.dropdown-cell novo-dropdown button:hover,.novo-data-table-cell.dropdown-cell novo-dropdown button:active,.novo-data-table-cell.dropdown-cell novo-dropdown button:focus,.novo-data-table-cell.button-cell novo-dropdown button:hover,.novo-data-table-cell.button-cell novo-dropdown button:active,.novo-data-table-cell.button-cell novo-dropdown button:focus{background:#0000001a!important}.novo-data-table-cell.button-cell{min-width:40px;max-width:40px}.novo-data-table-cell.dropdown-cell{min-width:98px;max-width:98px}.novo-data-table-cell.dropdown-cell.empty{min-width:39px;max-width:39px}.novo-data-table-cell i.data-table-icon{cursor:pointer;font-size:1.2em;padding:.5em;border-radius:3px}.novo-data-table-cell i.data-table-icon.disabled{pointer-events:none;opacity:.7}.novo-data-table-cell i.data-table-icon:hover{background:#0000001a}.novo-data-table-cell i.data-table-icon:active{background:#00000040}.novo-data-table-header-cell{white-space:normal;overflow-wrap:break-word;display:flex;align-items:center}.novo-data-table-header-cell+.button-header-cell,.novo-data-table-header-cell+.dropdown-header-cell{border-left:none}.novo-data-table-header-cell>label{display:inline-block;padding-right:10px;overflow:hidden;text-overflow:ellipsis}.novo-data-table-header-cell>label.sort-disabled{cursor:default}.novo-data-table-header-cell>div{width:55px;display:flex;align-items:center;flex:0}.novo-data-table-header-cell novo-dropdown[side=right]{display:inline-block}.novo-data-table-header-cell novo-dropdown[side=right]:focus{outline:none}.novo-data-table-header-cell.button-header-cell{min-width:40px;max-width:40px}.novo-data-table-header-cell.dropdown-header-cell{min-width:98px;max-width:98px}.novo-data-table-header-cell.dropdown-header-cell.empty{min-width:39px;max-width:39px}.novo-data-table-expand-header-cell,.novo-data-table-expand-cell{display:flex;align-items:center;justify-content:center;width:30px}.novo-data-table-expand-header-cell i,.novo-data-table-expand-cell i{cursor:pointer;transition:all .1s}.novo-data-table-expand-header-cell i.expanded,.novo-data-table-expand-cell i.expanded{transform:rotate(90deg)}.novo-data-table-checkbox-header-cell,.novo-data-table-checkbox-cell{display:flex;align-items:flex-start;justify-content:center;flex-direction:column;max-width:40px;padding:0 10px}.novo-data-table-checkbox-header-cell div.data-table-checkbox,.novo-data-table-checkbox-cell div.data-table-checkbox{display:flex;cursor:pointer}.novo-data-table-checkbox-header-cell div.data-table-checkbox i,.novo-data-table-checkbox-cell div.data-table-checkbox i{cursor:pointer}.novo-data-table-checkbox-header-cell div.data-table-checkbox i.bhi-box-empty,.novo-data-table-checkbox-header-cell div.data-table-checkbox i.bhi-checkbox-disabled,.novo-data-table-checkbox-cell div.data-table-checkbox i.bhi-box-empty,.novo-data-table-checkbox-cell div.data-table-checkbox i.bhi-checkbox-disabled{cursor:not-allowed!important}.novo-data-table-checkbox-header-cell div.data-table-checkbox i.bhi-checkbox-empty,.novo-data-table-checkbox-cell div.data-table-checkbox i.bhi-checkbox-empty{color:#d2d2d2}.novo-data-table-checkbox-header-cell div.data-table-checkbox i.bhi-box-yes,.novo-data-table-checkbox-header-cell div.data-table-checkbox i.bhi-checkbox-filled,.novo-data-table-checkbox-cell div.data-table-checkbox i.bhi-box-yes,.novo-data-table-checkbox-cell div.data-table-checkbox i.bhi-checkbox-filled{color:#4a89dc}.novo-data-table-checkbox-header-cell input,.novo-data-table-checkbox-cell input{appearance:none!important;height:0!important;border:none!important}novo-data-table{position:relative;width:100%;display:flex;flex-direction:column;flex:1}novo-data-table.loading{min-height:300px}novo-data-table header{padding:5px;display:flex;align-items:center;flex-shrink:0;border-bottom:1px solid var(--border, #f7f7f7)}novo-data-table header.pagination-footer{justify-content:space-between}novo-data-table header.empty{padding:0}novo-data-table header>[novo-data-table-custom-header]{flex:1}novo-data-table header>novo-search{padding-right:10px;display:none}@media (min-width: 1000px){novo-data-table header>novo-search{display:flex}}novo-data-table header>novo-search>input{padding:8.5px;font-size:1.1em;height:35px}novo-data-table header>novo-search.active>button[theme=fab]{height:35px;min-height:35px}novo-data-table header>div.novo-data-table-actions{display:flex;align-items:center;justify-content:flex-end}novo-data-table header>div.novo-data-table-actions>*{margin-right:.2em}novo-data-table header>div.novo-data-table-actions>*:last-child{margin-right:0}novo-data-table header>div.novo-data-table-actions>div,novo-data-table header>div.novo-data-table-actions>section{display:flex;align-items:center}novo-data-table header>div.novo-data-table-actions>div button,novo-data-table header>div.novo-data-table-actions>section button{margin-left:3px;margin-bottom:0}novo-data-table header>div.novo-data-table-actions>div button[theme][theme=icon],novo-data-table header>div.novo-data-table-actions>section button[theme][theme=icon]{height:35px;width:35px;font-size:1.4em}novo-data-table header>div.novo-data-table-actions>div novo-dropdown button[theme],novo-data-table header>div.novo-data-table-actions>section novo-dropdown button[theme]{white-space:nowrap;padding:6px 5px 6px 15px!important}novo-data-table button[theme][theme=icon]{height:30px;width:30px;padding:5px}novo-data-table .novo-data-table-loading-mask{position:absolute;display:flex;padding-top:10%;justify-content:center;inset:0;background:#00000012;z-index:10}novo-data-table .novo-data-table-detail-row{padding:1em}novo-data-table .novo-data-table-empty-container{padding-top:0}novo-data-table .novo-data-table-no-results-container,novo-data-table .novo-data-table-no-more-results-container{position:absolute;top:48%;left:0;right:0;width:100%}novo-data-table .novo-data-table-empty-container,novo-data-table .novo-data-table-no-results-container,novo-data-table .novo-data-table-no-more-results-container{padding:2em;flex:1;display:flex;align-items:center;justify-content:center;color:#9e9e9e;z-index:5}novo-data-table .novo-data-table-outside-container{display:flex;flex:1}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter{border-right:1px solid var(--border, #f7f7f7)}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter novo-date-picker .calendar{box-shadow:none}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter novo-date-picker .calendar .date-range-tabs{height:51px}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter novo-date-picker .calendar .calendar-footer{display:none}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter div.period-selector{padding:1em}novo-data-table .novo-data-table-outside-container .novo-data-table-custom-filter div.period-selector .novo-form-control-label{display:block;max-width:100%;margin-bottom:1em}novo-data-table .novo-data-table-outside-container .novo-data-table-container{flex:1;overflow:auto;position:relative}novo-data-table .novo-data-table-outside-container .novo-data-table-container.empty{display:flex;flex:0}novo-data-table .novo-data-table-outside-container .novo-data-table-container.empty-user-filtered{display:flex;flex-flow:column nowrap;min-height:250px}novo-data-table .novo-data-table-outside-container-fixed{overflow:hidden;position:relative}novo-data-table .novo-data-table-outside-container-fixed .novo-data-table-container-fixed{position:absolute;width:100%;height:100%}novo-data-table .novo-data-table-footer{display:flex;align-items:center}novo-data-table .novo-data-table-footer>div,novo-data-table .novo-data-table-footer div.novo-data-table-footer-cell{border-top:1px solid var(--border, #f7f7f7);flex:1;min-width:200px;display:flex;align-items:center}novo-data-table .novo-data-table-footer>div:not(.button-cell):not(.dropdown-cell),novo-data-table .novo-data-table-footer div.novo-data-table-footer-cell:not(.button-cell):not(.dropdown-cell){padding:10px}.dropdown-container.data-table-dropdown{min-width:220px;max-width:280px;max-height:500px;overflow-x:hidden;overflow-y:hidden}.dropdown-container.data-table-dropdown.right{margin-left:-150px!important}.dropdown-container.data-table-dropdown .header{padding:5px 10px;display:flex;justify-content:space-between;align-items:center}.dropdown-container.data-table-dropdown .optgroup-container,.dropdown-container.data-table-dropdown .dropdown-list-options{max-height:346px;overflow-y:auto;overflow-x:hidden}.dropdown-container.data-table-dropdown .footer{border-top:1px solid var(--border, #f7f7f7);padding:5px 10px;display:flex;justify-content:flex-end;align-items:center}.dropdown-container.data-table-dropdown .footer button icon{font-size:.8em}.dropdown-container.data-table-dropdown list item.active{background:transparent;font-weight:500}.dropdown-container.data-table-dropdown button[theme][theme=dialogue][icon] i{padding:inherit;padding-left:5px;height:inherit;width:inherit;display:inline-block;line-height:inherit}.dropdown-container.data-table-dropdown .calendar-container{height:100%;min-height:200px;width:100%;background:#fff;padding:0!important}.dropdown-container.data-table-dropdown .calendar-container .back-link{color:#4a89dc;line-height:3em;font-size:.9em;padding-left:5px;cursor:pointer}.dropdown-container.data-table-dropdown .calendar-container novo-date-picker .calendar{width:100%;height:100%;box-shadow:none;padding:0 5px 10px}.dropdown-container.data-table-dropdown .calendar-container novo-date-picker .calendar .calendar-top{display:none}.dropdown-container.data-table-dropdown span.error-text{color:#da4453;position:relative;left:10px;top:-17px;font-size:x-small}.dropdown-container.data-table-dropdown .filter-null-results{background-color:#fff;text-align:center;color:#b5b5b5;background:transparent;font-weight:500}\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n"] }]
        }], ctorParameters: () => [{ type: i1$1.NovoLabelService }, { type: i0.ChangeDetectorRef }, { type: DataTableState }], propDecorators: { globalSearchHiddenClassToggle: [{
                type: HostBinding,
                args: ['class.global-search-hidden']
            }], customTemplates: [{
                type: ContentChildren,
                args: [NovoTemplate]
            }], defaultTemplates: [{
                type: ViewChildren,
                args: [NovoTemplate]
            }], cellHeaders: [{
                type: ViewChildren,
                args: [NovoDataTableCellHeader]
            }], novoDataTableContainer: [{
                type: ViewChild,
                args: ['novoDataTableContainer']
            }], resized: [{
                type: Output
            }], displayedColumns: [{
                type: Input
            }], paginationOptions: [{
                type: Input
            }], searchOptions: [{
                type: Input
            }], selectionOptions: [{
                type: Input
            }], defaultSort: [{
                type: Input
            }], name: [{
                type: Input
            }], allowMultipleFilters: [{
                type: Input
            }], rowIdentifier: [{
                type: Input
            }], activeRowIdentifier: [{
                type: Input
            }], trackByFn: [{
                type: Input
            }], templates: [{
                type: Input
            }], fixedHeader: [{
                type: Input
            }], paginatorDataFeatureId: [{
                type: Input
            }], maxSelected: [{
                type: Input
            }], canSelectAll: [{
                type: Input
            }], allMatchingSelected: [{
                type: Input
            }], overrideTotal: [{
                type: Input
            }], paginationRefreshSubject: [{
                type: Input
            }], enableColumnDragging: [{
                type: Input
            }], dataTableService: [{
                type: Input
            }], rows: [{
                type: Input
            }], outsideFilter: [{
                type: Input
            }], refreshSubject: [{
                type: Input
            }], columns: [{
                type: Input
            }], customFilter: [{
                type: Input
            }], hasExandedRows: [{
                type: Input
            }], forceShowHeader: [{
                type: Input
            }], hideGlobalSearch: [{
                type: Input
            }], preferencesChanged: [{
                type: Output
            }], allSelected: [{
                type: Output
            }], toggledFilter: [{
                type: Output
            }], empty: [{
                type: HostBinding,
                args: ['class.empty']
            }], loadingClass: [{
                type: HostBinding,
                args: ['class.loading']
            }], listInteractions: [{
                type: Input
            }] } });

class NovoDataTableModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableModule, declarations: [DataTableInterpolatePipe,
            DateTableDateRendererPipe,
            DateTableCurrencyRendererPipe,
            DateTableDateTimeRendererPipe,
            DateTableNumberRendererPipe,
            DateTableTimeRendererPipe,
            DataTableBigDecimalRendererPipe,
            NovoDataTableCellHeader,
            NovoDataTableSortFilter,
            NovoDataTableHeaderCell,
            NovoDataTableCellFilterHeader,
            NovoDataTableCell,
            NovoDataTableHeaderRow,
            NovoDataTableRow,
            NovoDataTablePagination,
            NovoDataTableCheckboxCell,
            NovoDataTableCheckboxHeaderCell,
            NovoDataTableExpandCell,
            NovoDataTableExpandHeaderCell,
            NovoDataTable,
            NovoDataTableExpandDirective,
            NovoDataTableClearButton,
            NovoDataTableSortButton], imports: [NovoDatePickerModule,
            CdkTableModule,
            CommonModule,
            FormsModule,
            NovoIconModule,
            NovoButtonModule,
            NovoDropdownModule,
            NovoDragDropModule,
            NovoFormExtrasModule,
            NovoLoadingModule,
            NovoTilesModule,
            NovoSearchBoxModule,
            NovoOptionModule,
            NovoCommonModule,
            NovoSelectModule,
            NovoTooltipModule,
            NovoCheckboxModule,
            NovoFlexModule,
            NovoFieldModule,
            ScrollingModule], exports: [NovoDataTable,
            DataTableInterpolatePipe,
            DateTableDateRendererPipe,
            DateTableCurrencyRendererPipe,
            DateTableDateTimeRendererPipe,
            DateTableNumberRendererPipe,
            DateTableTimeRendererPipe,
            DataTableBigDecimalRendererPipe,
            NovoDataTableCellFilterHeader,
            NovoDataTableClearButton,
            NovoDataTableSortButton] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableModule, providers: [DataTableState], imports: [NovoDatePickerModule,
            CdkTableModule,
            CommonModule,
            FormsModule,
            NovoIconModule,
            NovoButtonModule,
            NovoDropdownModule,
            NovoDragDropModule,
            NovoFormExtrasModule,
            NovoLoadingModule,
            NovoTilesModule,
            NovoSearchBoxModule,
            NovoOptionModule,
            NovoCommonModule,
            NovoSelectModule,
            NovoTooltipModule,
            NovoCheckboxModule,
            NovoFlexModule,
            NovoFieldModule,
            ScrollingModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDataTableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NovoDatePickerModule,
                        CdkTableModule,
                        CommonModule,
                        FormsModule,
                        NovoIconModule,
                        NovoButtonModule,
                        NovoDropdownModule,
                        NovoDragDropModule,
                        NovoFormExtrasModule,
                        NovoLoadingModule,
                        NovoTilesModule,
                        NovoSearchBoxModule,
                        NovoOptionModule,
                        NovoCommonModule,
                        NovoSelectModule,
                        NovoTooltipModule,
                        NovoCheckboxModule,
                        NovoFlexModule,
                        NovoFieldModule,
                        ScrollingModule,
                    ],
                    declarations: [
                        DataTableInterpolatePipe,
                        DateTableDateRendererPipe,
                        DateTableCurrencyRendererPipe,
                        DateTableDateTimeRendererPipe,
                        DateTableNumberRendererPipe,
                        DateTableTimeRendererPipe,
                        DataTableBigDecimalRendererPipe,
                        NovoDataTableCellHeader,
                        NovoDataTableSortFilter,
                        NovoDataTableHeaderCell,
                        NovoDataTableCellFilterHeader,
                        NovoDataTableCell,
                        NovoDataTableHeaderRow,
                        NovoDataTableRow,
                        NovoDataTablePagination,
                        NovoDataTableCheckboxCell,
                        NovoDataTableCheckboxHeaderCell,
                        NovoDataTableExpandCell,
                        NovoDataTableExpandHeaderCell,
                        NovoDataTable,
                        NovoDataTableExpandDirective,
                        NovoDataTableClearButton,
                        NovoDataTableSortButton,
                    ],
                    providers: [DataTableState],
                    exports: [
                        NovoDataTable,
                        DataTableInterpolatePipe,
                        DateTableDateRendererPipe,
                        DateTableCurrencyRendererPipe,
                        DateTableDateTimeRendererPipe,
                        DateTableNumberRendererPipe,
                        DateTableTimeRendererPipe,
                        DataTableBigDecimalRendererPipe,
                        NovoDataTableCellFilterHeader,
                        NovoDataTableClearButton,
                        NovoDataTableSortButton,
                    ],
                }]
        }] });

var AppliedSearchType;
(function (AppliedSearchType) {
    AppliedSearchType["Saved"] = "saved";
    AppliedSearchType["Recent"] = "recent";
    AppliedSearchType["None"] = "none";
})(AppliedSearchType || (AppliedSearchType = {}));
var AdaptiveConjunctionNames;
(function (AdaptiveConjunctionNames) {
    AdaptiveConjunctionNames["AND"] = "and";
    AdaptiveConjunctionNames["OR"] = "or";
    AdaptiveConjunctionNames["NOT"] = "not";
})(AdaptiveConjunctionNames || (AdaptiveConjunctionNames = {}));
var AdaptiveOperator;
(function (AdaptiveOperator) {
    AdaptiveOperator["BeginsWith"] = "beginsWith";
    AdaptiveOperator["EqualTo"] = "equalTo";
    AdaptiveOperator["In"] = "in";
    AdaptiveOperator["IncludeAny"] = "includeAny";
    AdaptiveOperator["IncludeAll"] = "includeAll";
    AdaptiveOperator["Is"] = "is";
    AdaptiveOperator["LessThan"] = "lt";
    AdaptiveOperator["LessThanEquals"] = "lte";
    AdaptiveOperator["GreaterThan"] = "gt";
    AdaptiveOperator["GreaterThanEquals"] = "gte";
    AdaptiveOperator["Like"] = "like";
    AdaptiveOperator["StartsWith"] = "startsWith";
    AdaptiveOperator["EndsWith"] = "endsWith";
    AdaptiveOperator["Radius"] = "radius";
})(AdaptiveOperator || (AdaptiveOperator = {}));

class RemoteDataTableService {
}

/**
 * Generated bundle index. Do not edit.
 */

export { AdaptiveConjunctionNames, AdaptiveOperator, AppliedSearchType, DataTableBigDecimalRendererPipe, DataTableInterpolatePipe, DataTableSource, DataTableState, DateTableCurrencyRendererPipe, DateTableDateRendererPipe, DateTableDateTimeRendererPipe, DateTableNumberRendererPipe, DateTableTimeRendererPipe, NOVO_DATA_TABLE_REF, NovoDataTable, NovoDataTableCell, NovoDataTableCellFilterHeader, NovoDataTableCellHeader, NovoDataTableCheckboxCell, NovoDataTableCheckboxHeaderCell, NovoDataTableClearButton, NovoDataTableExpandCell, NovoDataTableExpandDirective, NovoDataTableExpandHeaderCell, NovoDataTableFilterUtils, NovoDataTableHeaderCell, NovoDataTableHeaderRow, NovoDataTableModule, NovoDataTablePagination, NovoDataTableRow, NovoDataTableSortButton, NovoDataTableSortFilter, RemoteDataTableService, SortDirection, StaticDataTableService, interpolateCell };
//# sourceMappingURL=novo-elements-elements-data-table.mjs.map
