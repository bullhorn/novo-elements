// Vendor
import { Component, EventEmitter } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgModel } from '@angular/common';
import { isFunction, isString } from '@angular/core/src/facade/lang';
// App
import { NOVO_BUTTON_ELEMENTS } from '../button';
import { NOVO_TOOLTIP_ELEMENTS } from '../tooltip';
import { NOVO_DROPDOWN_ELEMENTS } from '../dropdown';
import { NOVO_TABLE_EXTRA_ELEMENTS } from './extras/TableExtras';
import { CheckBox } from '../form/extras/FormExtras';
import { NovoLabelService } from './../../novo-elements';

@Component({
    selector: 'novo-table-actions',
    template: '<ng-content></ng-content>'
})
export class NovoTableActions {
}

@Component({
    selector: 'novo-table-header',
    template: '<ng-content></ng-content>'
})
export class NovoTableHeader {
}

@Component({
    selector: 'novo-table, [novoTable]',
    inputs: [
        'rows',
        'columns',
        'config',
        'theme'
    ],
    outputs: [
        'onRowClick',
        'onRowSelect',
        'onTableChange'
    ],
    directives: [
        NOVO_TABLE_EXTRA_ELEMENTS,
        NgModel,
        CORE_DIRECTIVES,
        FORM_DIRECTIVES,
        NOVO_BUTTON_ELEMENTS,
        NOVO_DROPDOWN_ELEMENTS,
        NOVO_TOOLTIP_ELEMENTS,
        CheckBox
    ],
    host: {
        '[attr.theme]': 'theme'
    },
    template: `
        <header>
            <ng-content select="novo-table-header"></ng-content>
            <div class="header-actions">
                <novo-pagination *ngIf="config.paging"
                                 [page]="config.paging.current"
                                 [rowOptions]="config.customRowOptions"
                                 [totalItems]="rows.length"
                                 [itemsPerPage]="config.paging.itemsPerPage"
                                 (onPageChange)="onPageChange($event)">
                </novo-pagination>
                <ng-content select="novo-table-actions"></ng-content>
            </div>
        </header>
        <div class="table-container">
            <table class="table table-striped dataTable" [class.table-details]="config.hasDetails" role="grid">
            <thead>
                <tr role="row">
                    <!-- DETAILS -->
                    <th class="row-actions" *ngIf="config.hasDetails"></th>
                    <!-- CHECKBOX -->
                    <th class="row-actions checkbox" *ngIf="config.rowSelectionStyle === 'checkbox'">
                        <check-box [(value)]="master" [indeterminate]="pageSelected.length > 0 && pageSelected.length < pagedData.length" (valueChange)="selectPage($event)" data-automation-id="select-all-checkbox" [tooltip]="master ? labels.deselectAll : labels.selectAllOnPage" tooltipPosition="right"></check-box>
                    </th>
                    <!-- TABLE HEADERS -->
                    <th *ngFor="let column of columns" [novoThOrderable]="column" (onOrderChange)="onOrderChange($event)">
                        <div class="th-group" [attr.data-automation-id]="column.name" *ngIf="!column.hideHeader">
                            <!-- LABEL & SORT ARROWS -->
                            <div class="th-title" [novoThSortable]="config" [column]="column" (onSortChange)="onSortChange($event)">
                                <label>{{ column.title }}</label>
                                <div class="table-sort-icons" [ngClass]="column.sort || ''" *ngIf="config.sorting || column.sorting">
                                    <i class="bhi-arrow-down"></i>
                                    <i class="bhi-arrow-up"></i>
                                </div>
                            </div>
                            <!-- FILTER DROP-DOWN -->
                            <novo-dropdown side="right" *ngIf="column.filtering" class="column-filters">
                                <button type="button" theme="icon" icon="filter" [class.filtered]="column.filter" (click)="focusInput(column.name)"></button>
                                <!-- FILTER OPTIONS LIST -->
                                <list *ngIf="column?.options?.length">
                                    <item class="filter-search">
                                        <div class="header">
                                            <span>{{ labels.filters }}</span>
                                            <button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)" *ngIf="column.filter">{{ labels.clear }}</button>
                                        </div>
                                    </item>
                                    <item [ngClass]="{ active: isFilterActive(column, option) }" *ngFor="let option of column.options" (click)="onFilterClick(column, option)" [attr.data-automation-id]="option">
                                        {{ option?.label || option }} <i class="bhi-check" *ngIf="isFilterActive(column, option)"></i>
                                    </item>
                                </list>
                                <!-- FILTER SEARCH INPUT -->
                                <list *ngIf="!column?.options?.length">
                                    <item class="filter-search">
                                        <div class="header">
                                            <span>{{ labels.filters }}</span>
                                            <button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)" *ngIf="column.filter">{{ labels.clear }}</button>
                                        </div>
                                        <input type="text" [attr.id]="column.name + '-input'" [novoTableFilter]="column" (onFilterChange)="onFilterChange($event)" [(ngModel)]="column.filter"/>
                                    </item>
                                </list>
                            </novo-dropdown>
                        </div>
                    </th>
                </tr>
            </thead>
            <!-- TABLE DATA -->
            <tbody *ngIf="rows.length > 0">
                <tr class="table-selection-row" *ngIf="config.rowSelectionStyle === 'checkbox' && showSelectAllMessage">
                    <td colspan="100%">
                        {{labels.selectedRecords(selected.length)}} <a (click)="selectAll(true)">{{labels.totalRecords(rows.length)}}</a>
                    </td>
                </tr>
                <template ngFor let-row="$implicit" [ngForOf]="rows | slice:getPageStart():getPageEnd()">
                    <tr class="table-row" [ngClass]="row.customClass || ''" [attr.data-automation-id]="row.id" (click)="rowClickHandler(row)" [class.active]="row.id === activeId">
                        <td class="row-actions" *ngIf="config.hasDetails">
                            <button theme="icon" icon="next" (click)="row._expanded=!row._expanded" *ngIf="!row._expanded"></button>
                            <button theme="icon" icon="sort-desc" (click)="row._expanded=!row._expanded" *ngIf="row._expanded"></button>
                        </td>
                        <td class="row-actions checkbox" *ngIf="config.rowSelectionStyle === 'checkbox'">
                            <check-box [(value)]="row._selected" (valueChange)="rowSelectHandler(row)" data-automation-id="select-row-checkbox"></check-box>
                        </td>
                        <td *ngFor="let column of columns" [attr.data-automation-id]="column.name">
                            <novo-table-cell [column]="column" [row]="row"></novo-table-cell>
                        </td>
                    </tr>
                    <tr class="details-row" *ngIf="config.hasDetails" [hidden]="!row._expanded" [attr.data-automation-id]="'details-row-'+row.id">
                        <td class="row-actions"></td>
                        <td [attr.colspan]="columns.length">
                            <novo-row-details [data]="row" [renderer]="config.detailsRenderer"></novo-row-details>
                        </td>
                    </tr>
                </template>
            </tbody>
            <!-- NO TABLE DATA PLACEHOLDER -->
            <tbody *ngIf="rows.length === 0" data-automation-id="empty-table">
                <tr>
                    <td colspan="100%">
                        <div class="no-matching-records">
                            <h4><i class="bhi-search-question"></i> {{ labels.emptyTableMessage }}</h4>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    `
})
export class NovoTable {
    constructor(labels:NovoLabelService) {
        // NG2 (outputs)
        this.onRowClick = new EventEmitter();
        this.onRowSelect = new EventEmitter();
        this.onTableChange = new EventEmitter();
        // App
        this.labels = labels;
        // Vars
        this.originalRows = [];
        this.selected = [];
        this.activeId = 0;
        this.master = false;
        this.indeterminate = false;
        this.lastPage = 0;
        this.selectedPageCount = 0;
        this.showSelectAllMessage = false;
    }

    ngOnInit() {
        // Fail-safe inputs
        this.rows = this.rows || [];
        this.originalRows = this.rows;
        this.columns = this.columns || [];
        this.config = this.config || {};
        if (this.rows.length > 0) {
            this.setupColumnDefaults();
        }
    }

    ngOnChanges(changes) {
        this.originalRows = this.originalRows.length === 0 ? this.rows : this.originalRows;
        if (changes && changes.rows && (changes.rows.previousValue !== changes.rows.currentValue)) {
            this.setupColumnDefaults();
        }
    }

    onPageChange(event) {
        this.config.paging.onPageChange(event);

        // Remove all selection on sort change if selection is on
        if (this.config.rowSelectionStyle === 'checkbox') {
            this.pagedData = this.rows.slice(this.getPageStart(), this.getPageEnd());
            this.pageSelected = this.pagedData.filter(r => r._selected);
        }
    }

    /**
     * @name buildDateRange
     */
    setupColumnDefaults() {
        // Check columns for cell option types
        this.columns.forEach(column => {
            if (column && column.type) {
                switch (column.type) {
                    case 'date':
                        // Set options based on dates if there are none
                        column.options = (column.options || this.getDefaultOptions());
                        break;
                    default:
                        break;
                }
            }
        });
    }

    /**
     * @name ngDoCheck
     */
    ngDoCheck() {
        if (this.config.paging && this.config.paging.current !== this.lastPage) {
            this.rowSelectHandler();
            this.showSelectAllMessage = false;
        }
        this.lastPage = this.config.paging ? this.config.paging.current : 1;
    }

    /**
     * @name getPageStart
     * @returns {number}
     */
    getPageStart() {
        return this.config.paging ? (this.config.paging.current - 1) * this.config.paging.itemsPerPage : 0;
    }

    /**
     * @name getPageEnd
     * @returns {*}
     */
    getPageEnd() {
        return this.config.paging && this.config.paging.itemsPerPage > -1 ? this.getPageStart() + this.config.paging.itemsPerPage : this.rows.length;
    }

    /**
     * @name focusInput
     * @param name
     */
    focusInput(name) {
        const element = document.getElementById(`${name}-input`);
        if (element) {
            setTimeout(() => {
                element.focus();
            });
        }
    }

    /**
     * @name onFilterClick
     * @param column
     * @param filter
     */
    onFilterClick(column, filter) {
        if (Array.isArray(column.filter) && column.multiple) {
            if (~column.filter.indexOf(filter)) {
                // Remove filter
                column.filter.splice(column.filter.indexOf(filter), 1);

                if (column.filter.length === 0) {
                    column.filter = null;
                }
            } else {
                // Add filter
                column.filter.push(filter);
            }
        } else {
            column.filter = [filter];
        }
        this.onFilterChange();
    }

    /**
     * @name onFilterClear
     * @param column
     */
    onFilterClear(column) {
        column.filter = null;
        this.onFilterChange();
    }

    /**
     * @name onFilterChange
     *
     * @description This method updates the row data to reflect the active filters.
     */
    onFilterChange() {
        if (this.config.filtering) {
            // Array of filters
            const filters = this.columns.filter(col => col.filter && col.filter.length);
            // debugger;
            if (filters.length) {
                if (isFunction(this.config.filtering)) {
                    // Custom filter function on the table config
                    this.rows = this.config.filtering(filters, this.originalRows);
                } else {
                    this.rows = this.originalRows.filter(row => {
                        let matched;
                        for (const column of filters) {
                            if (column.match && isFunction(column.match)) {
                                // Custom match function on the column
                                matched = column.match(row[column.name], column.filter);
                            } else if (Array.isArray(column.filter)) {
                                // The filters are an array (multi-select), check value
                                if (column.type && column.type === 'date') {
                                    // It's a date, use the date difference
                                    matched = column.filter.some(value => {
                                        let min = value.min;
                                        let max = value.max;
                                        let isMatch = false;
                                        let oneDay = 24 * 60 * 60 * 1000;
                                        // Assumes row data contains a JS date object
                                        let firstDate = row[column.name] instanceof Date ? row[column.name].getTime() : row[column.name];
                                        let secondDate = new Date();
                                        let difference = 0;
                                        try {
                                            difference = Math.round((firstDate - secondDate.getTime()) / oneDay);
                                        } catch (error) {
                                            throw new Error('Row data of type \'date\' must contain a JS date object or a timestamp as its value.', error);
                                        }
                                        if (typeof(min) !== 'undefined' && typeof(max) !== 'undefined') {
                                            isMatch = (difference >= min && difference <= max);
                                        } else if (typeof(min) !== 'undefined') {
                                            isMatch = difference >= min;
                                        } else if (typeof(max) !== 'undefined') {
                                            isMatch = difference <= max;
                                        }
                                        return isMatch;
                                    });
                                } else {
                                    // It's a list of options
                                    matched = column.filter.includes(row[column.name]);
                                }
                            } else if (Array.isArray(row[column.name])) {
                                // Value is an array
                                for (const value of row[column.name]) {
                                    matched = value.match(new RegExp(column.filter, 'gi'));
                                    if (!matched) break;
                                }
                            } else {
                                // Basic, value is just a string
                                matched = JSON.stringify((row[column.name] || '')).match(new RegExp(column.filter, 'gi'));
                            }
                            if (!matched) break;
                        }
                        return matched;
                    });
                }
            } else {
                this.rows = this.originalRows;
            }
            // Trickle down to keep sort
            this.onSortChange(this.currentSortColumn);
            // If paging, reset page
            if (this.config.paging) {
                this.config.paging.current = 1;
            }
            // Remove all selection on sort change if selection is on
            if (this.config.rowSelectionStyle === 'checkbox') {
                this.selectAll(false);
            }
        }
    }

    /**
     * @name isFilterActive
     * @param columnFilters
     * @param filter
     * @returns {boolean}
     *
     * @description
     */
    isFilterActive(columnFilters, filter) {
        let isActive = false;
        if (columnFilters && columnFilters.filter && filter) {
            if (typeof(filter) !== 'string') {
                isActive = columnFilters.filter.some(columnFilter => {
                    return columnFilter.label === filter.label;
                });
            } else {
                isActive = ~columnFilters.filter.indexOf(filter);
            }
        }
        return isActive;
    }

    /**
     * @name onSortChange
     * @param newSortColumn
     */
    onSortChange(newSortColumn) {
        this.currentSortColumn = newSortColumn;

        if (newSortColumn) {
            this.columns.map(column => {
                if (column.name !== newSortColumn.name) {
                    delete column.sort;
                }
                return false;
            });

            if (isFunction(this.config.sorting)) {
                // Custom sort function on the table config
                this.rows = this.config.sorting(newSortColumn, this.rows);
            } else {
                this.rows.sort((previous, current) => {
                    const columnName = newSortColumn.name;
                    let first = previous[columnName],
                        second = current[columnName];

                    // Custom compare function on the column
                    if (newSortColumn.compare && isFunction(newSortColumn.compare)) {
                        return newSortColumn.compare(newSortColumn.sort, first, second);
                    }

                    if (isString(first) && isString(second)) {
                        // Basic strings
                        first = first.toLowerCase();
                        second = second.toLowerCase();
                    } else {
                        // Numbers
                        first = isNaN(Number(first)) ? first : Number(first);
                        second = isNaN(Number(second)) ? second : Number(second);
                    }

                    if (first > second) {
                        return newSortColumn.sort === 'desc' ? -1 : 1;
                    }
                    if (first < second) {
                        return newSortColumn.sort === 'asc' ? -1 : 1;
                    }
                    return 0;
                });
            }
        }

        // Fire table change event
        this.fireTableChangeEvent();

        // If paging, reset page
        if (this.config.paging) {
            this.config.paging.current = 1;
        }

        // Remove all selection on sort change if selection is on
        if (this.config.rowSelectionStyle === 'checkbox') {
            this.selectAll(false);
        }
    }

    /**
     * @name fireTableChangeEvent
     */
    fireTableChangeEvent() {
        // Construct a table change object
        const onTableChange = {};
        const filters = this.columns.filter((col) => col.filter && col.filter.length);

        onTableChange.filter = filters.length ? filters : false;
        onTableChange.sort = this.currentSortColumn ? this.currentSortColumn : false;
        onTableChange.rows = this.rows;

        // Emit event
        this.onTableChange.emit(onTableChange);
    }

    /**
     * @name findColumnIndex
     * @param value
     * @returns {*}
     */
    findColumnIndex(value) {
        for (let i = 0; i < this.columns.length; i += 1) {
            if (this.columns[i].name === value) {
                return i;
            }
        }
        return null;
    }

    /**
     * @name onOrderChange
     * @param event
     */
    onOrderChange(event) {
        const oldIndex = this.findColumnIndex(event.first.name);
        const newIndex = this.findColumnIndex(event.second.name);
        this.columns.splice(newIndex, 0, this.columns.splice(oldIndex, 1)[0]);
        this.onSortChange(this.currentSortColumn);
    }

    /**
     * @name selectPage
     */
    selectPage() {
        if (!this.master) {
            this.selectAll(false);
            // Only show the select all message when there is only one new page selected at a time
            this.selectedPageCount = this.selectedPageCount > 0 ? this.selectedPageCount - 1 : 0;
            this.showSelectAllMessage = false;
        } else {
            this.indeterminate = false;
            this.pagedData = this.rows.slice(this.getPageStart(), this.getPageEnd());
            for (let row of this.pagedData) {
                row._selected = this.master;
            }
            this.selected = this.rows.filter(r => r._selected);
            this.pageSelected = this.pagedData.filter(r => r._selected);
            this.emitSelected(this.selected);
            // Only show the select all message when there is only one new page selected at a time
            this.selectedPageCount++;
            this.showSelectAllMessage = this.selectedPageCount === 1 && this.selected.length !== this.rows.length;
        }
    }

    /**
     * @name selectAll
     */
    selectAll(value) {
        this.master = value;
        this.indeterminate = false;
        for (let row of this.rows) {
            row._selected = value;
        }
        this.selected = value ? this.rows : 0;
        this.showSelectAllMessage = false;
        this.emitSelected(this.selected);
    }

    /**
     * @name rowSelectHandler
     */
    rowSelectHandler() {
        this.pagedData = this.rows.slice(this.getPageStart(), this.getPageEnd());
        this.pageSelected = this.pagedData.filter(r => r._selected);
        this.selected = this.rows.filter(r => r._selected);
        if (this.pageSelected.length === 0) {
            this.master = false;
            this.indeterminate = false;
        } else if (this.pageSelected.length === this.pagedData.length) {
            this.master = true;
            this.indeterminate = false;
        } else {
            this.master = false;
            this.indeterminate = true;

            // Breaking the selected page count
            this.showSelectAllMessage = false;
            this.selectedPageCount = this.selectedPageCount > 0 ? this.selectedPageCount - 1 : 0;
        }
        this.emitSelected(this.selected);
    }

    /**
     * @name emitSelected
     * @param selected
     */
    emitSelected(selected) {
        this.onRowSelect.emit(selected.length, selected);
    }

    /**
     * @name rowClickHandler
     * @param row
     */
    rowClickHandler(row) {
        if (this.config.rowSelect) {
            this.activeId = row.id || 0;
            this.onRowClick.emit(row);
        }
    }

    /**
     * @name setDateOptions
     * @returns {Array}
     */
    getDefaultOptions() {
        // TODO - needs to come from label service - https://github.com/bullhorn/novo-elements/issues/116
        return [
            { label: 'Beyond 90 Days', min: 90 },
            { label: 'Next 90 Days', min: 0, max: 90 },
            { label: 'Next 30 Days', min: 0, max: 30 },
            { label: 'Next 7 Days', min: 0, max: 7 },
            { label: 'Past 7 Days', min: -7, max: 0 },
            { label: 'Past 30 Days', min: -30, max: 0 },
            { label: 'Past 90 Days', min: -90, max: 0 },
            { label: 'Older than 90 Days', max: -90 }
        ];
    }
}

export const NOVO_TABLE_ELEMENTS = [NovoTable, NovoTableActions, NovoTableHeader];
