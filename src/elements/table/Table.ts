// Vendor
import { Component, EventEmitter, Input, Output, DoCheck } from '@angular/core';
// APP
import { NovoLabelService } from './../../services/novo-label-service';
import { Helpers } from './../../utils/Helpers';

@Component({
    selector: 'novo-table-actions',
    template: '<ng-content></ng-content>'
})
export class NovoTableActionsElement {
}

@Component({
    selector: 'novo-table-header',
    template: '<ng-content></ng-content>'
})
export class NovoTableHeaderElement {
}

@Component({
    selector: 'novo-table',
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
                                 [totalItems]="modifiedRows.length"
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
                        <novo-checkbox [(ngModel)]="master" [indeterminate]="pageSelected.length > 0 && pageSelected.length < pagedData.length" (ngModelChange)="selectPage($event)" data-automation-id="select-all-checkbox" [tooltip]="master ? labels.deselectAll : labels.selectAllOnPage" tooltipPosition="right"></novo-checkbox>
                    </th>
                    <!-- TABLE HEADERS -->
                    <th *ngFor="let column of columns" [novoThOrderable]="column" (onOrderChange)="onOrderChange($event)">
                        <div class="th-group" [attr.data-automation-id]="column.id || column.name" *ngIf="!column.hideHeader">
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
                                <list *ngIf="column?.options?.length && column?.type!='date'">
                                    <item class="filter-search">
                                        <div class="header">
                                            <span>{{ labels.filters }}</span>
                                            <button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)" *ngIf="column.filter">{{ labels.clear }}</button>
                                        </div>
                                    </item>
                                    <item [ngClass]="{ active: isFilterActive(column, option) }" *ngFor="let option of column.options" (click)="onFilterClick(column, option)" [attr.data-automation-id]="getOptionDataAutomationId(option)">
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
                                <!-- FILTER DATE OPTIONS -->
                                <list *ngIf="column?.options?.length && column?.type=='date'">
                                    <item class="filter-search" *ngIf="!column.calenderShow">
                                        <div class="header">
                                            <span>{{ labels.filters }}</span>
                                            <button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)" *ngIf="column.filter">{{ labels.clear }}</button>
                                        </div>
                                    </item>
                                    <item [ngClass]="{ active: isFilterActive(column, option) }" *ngFor="let option of column.options" (click)="onFilterClick(column, option)" [showAfterSelect]="option.range" [hidden]="column.calenderShow" [attr.data-automation-id]="(option?.label || option)">
                                        {{ option?.label || option }} <i class="bhi-check" *ngIf="isFilterActive(column, option)"></i>
                                    </item>
                                    <div class="calender-container" [hidden]="!column.calenderShow">
                                        <div (click)="column.calenderShow=false"><i class="bhi-previous"></i>Back to Preset Filters</div>
                                        <novo-date-picker #rangePicker (onSelect)="onCalenderSelect(column, $event)" [(ngModel)]="column?.options[column.options.length-1].value" range="true"></novo-date-picker>
                                    </div>
                                </list>
                            </novo-dropdown>
                        </div>
                    </th>
                </tr>
            </thead>
            <!-- TABLE DATA -->
            <tbody *ngIf="modifiedRows.length > 0">
                <tr class="table-selection-row" *ngIf="config.rowSelectionStyle === 'checkbox' && showSelectAllMessage" data-automation-id="table-selection-row">
                    <td colspan="100%">
                        {{labels.selectedRecords(selected.length)}} <a (click)="selectAll(true)" data-automation-id="all-matching-records">{{labels.totalRecords(modifiedRows.length)}}</a>
                    </td>
                </tr>
                <template ngFor let-row="$implicit" [ngForOf]="modifiedRows | slice:getPageStart():getPageEnd()">
                    <tr class="table-row" [ngClass]="row.customClass || ''" [attr.data-automation-id]="row.id" (click)="rowClickHandler(row)" [class.active]="row.id === activeId">
                        <td class="row-actions" *ngIf="config.hasDetails">
                            <button theme="icon" icon="next" (click)="row._expanded=!row._expanded" *ngIf="!row._expanded"></button>
                            <button theme="icon" icon="sort-desc" (click)="row._expanded=!row._expanded" *ngIf="row._expanded"></button>
                        </td>
                        <td class="row-actions checkbox" *ngIf="config.rowSelectionStyle === 'checkbox'">
                            <novo-checkbox [(ngModel)]="row._selected" (ngModelChange)="rowSelectHandler(row)" data-automation-id="select-row-checkbox"></novo-checkbox>
                        </td>
                        <td *ngFor="let column of columns" [attr.data-automation-id]="column.id || column.name">
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
            <tbody *ngIf="modifiedRows.length === 0" data-automation-id="empty-table">
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
export class NovoTableElement implements DoCheck {
    @Input() config: any;
    @Input() columns: Array<any>;
    @Input() theme: string;
    @Input() skipSortAndFilterClear: boolean = false;

    @Output() onRowClick: EventEmitter<any> = new EventEmitter();
    @Output() onRowSelect: EventEmitter<any> = new EventEmitter();
    @Output() onTableChange: EventEmitter<any> = new EventEmitter();

    _rows: Array<any> = [];
    modifiedRows: Array<any> = [];
    selected: Array<any> = [];
    activeId: number = 0;
    master: boolean = false;
    indeterminate: boolean = false;
    lastPage: number = 0;
    selectedPageCount: number = 0;
    showSelectAllMessage: boolean = false;
    currentSortColumn: any;
    pagedData: any;
    pageSelected: any;

    constructor(private labels: NovoLabelService) {
    }

    @Input()
    set rows(rows) {
        this._rows = Array.isArray(rows) ? rows.slice() : [];
        this.modifiedRows = Array.isArray(rows) ? rows.slice() : [];

        if (rows && rows.length > 0) {
            this.setupColumnDefaults();
        }
        // This is a temporary/hacky fix until async dataloading is handled within the table
        if (!this.skipSortAndFilterClear) {
            this.clearAllSortAndFilters();
        }
    }

    get rows() {
        return this._rows;
    }

    onPageChange(event) {
        this.config.paging.onPageChange(event);

        // Remove all selection on sort change if selection is on
        if (this.config.rowSelectionStyle === 'checkbox') {
            this.pagedData = this.modifiedRows.slice(this.getPageStart(), this.getPageEnd());
            this.pageSelected = this.pagedData.filter(r => r._selected);
        }
    }

    getOptionDataAutomationId(option) {
        if (!Helpers.isBlank(option.value)) {
            return option.value;
        }
        return option;
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
                        column.options = (column.options || this.getDefaultOptions(column));
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
        return this.config.paging && this.config.paging.itemsPerPage > -1 ? this.getPageStart() + this.config.paging.itemsPerPage : this.modifiedRows.length;
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
        if (filter.range) {
            column.calenderShow = true;
        }
        if (Array.isArray(column.filter) && column.multiple) {
            if (~column.filter.indexOf(filter)) {
                // Remove filter
                column.filter.splice(column.filter.indexOf(filter), 1);
                if (filter.range) {
                    column.calenderShow = false;
                }

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
        if (column.range) {
            for (let i in column.options) {
                if (column.options[i].range) {
                    column.options[i].value = { startDate: null, endDate: null };
                }
            }
        }

        column.filter = null;
        this.onFilterChange();
    }

    clearAllSortAndFilters() {
        if (this.config.filtering) {
            this.columns.forEach(column => {
                if (column.range) {
                    for (let i in column.options) {
                        if (column.options[i].range) {
                            column.options[i].value = { startDate: null, endDate: null };
                        }
                    }
                }
                column.filter = null;
                column.sort = null;
            });
        }
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

            if (filters.length) {
                if (Helpers.isFunction(this.config.filtering)) {
                    // Custom filter function on the table config
                    this.modifiedRows = this.config.filtering(filters, this._rows.slice());
                } else {
                    this.modifiedRows = this._rows.slice().filter(row => {
                        let matched;
                        for (const column of filters) {
                            if (column.match && Helpers.isFunction(column.match)) {
                                // Custom match function on the column
                                matched = column.match(row[column.name], column.filter);
                            } else if (Array.isArray(column.filter)) {
                                // The filters are an array (multi-select), check value
                                if (column.type && column.type === 'date' && column.filter.filter(fil => fil.range).length > 0) {
                                    matched = column.filter.some(obj => {
                                        let start = obj.value ? new Date(obj.value.startDate).getTime() : 0;
                                        let end = obj.value ? new Date(obj.value.endDate).getTime() : 0;
                                        let isMatch = false;
                                        // Assumes row data contains a JS date object
                                        let date = row[column.name] instanceof Date ? row[column.name].getTime() : row[column.name];
                                        if (start !== 0 && end !== 0) {
                                            isMatch = (date >= start && date <= end);
                                        } else {
                                            isMatch = true;
                                        }
                                        return isMatch;
                                    });
                                } else if (column.type && column.type === 'date') {
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
                                            throw new Error('Row data of type \'date\' must contain a JS date object or a timestamp as its value.');
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
                                    let options = column.filter;
                                    // We have an array of {value: '', labels: ''}
                                    if (options[0].value || options[0].label) {
                                        options = column.filter.map(opt => opt.value);
                                    }
                                    // It's a list of options
                                    matched = options.includes(row[column.name]);
                                }
                            } else if (Array.isArray(row[column.name])) {
                                // Value is an array
                                for (const value of row[column.name]) {
                                    matched = value.match(new RegExp(column.filter, 'gi'));
                                    if (!matched) {
                                        break;
                                    }
                                }
                            } else {
                                // Basic, value is just a string
                                matched = JSON.stringify((row[column.name] || '')).match(new RegExp(column.filter, 'gi'));
                            }
                            if (!matched) {
                                break;
                            }
                        }
                        return matched;
                    });
                }
            } else {
                this.modifiedRows = this._rows.slice();
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
                isActive = columnFilters.filter.indexOf(filter) !== -1;
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

            if (Helpers.isFunction(this.config.sorting)) {
                // Custom sort function on the table config
                this.modifiedRows = this.config.sorting(newSortColumn, this.modifiedRows);
            } else {
                this.modifiedRows.sort((previous, current) => {
                    const columnName = newSortColumn.name;
                    let first = previous[columnName] || '';
                    let second = current[columnName] || '';

                    // Custom compare function on the column
                    if (newSortColumn.compare && Helpers.isFunction(newSortColumn.compare)) {
                        return newSortColumn.compare(newSortColumn.sort, first, second);
                    }

                    if (Helpers.isString(first) && Helpers.isString(second)) {
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
        const onTableChange: any = {};
        const filters = this.columns.filter((col) => col.filter && col.filter.length);
        onTableChange.filter = filters.length ? filters : false;
        onTableChange.sort = this.currentSortColumn ? this.currentSortColumn : false;
        onTableChange.rows = this.modifiedRows;

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
            this.pagedData = this.modifiedRows.slice(this.getPageStart(), this.getPageEnd());
            for (let row of this.pagedData) {
                row._selected = this.master;
            }
            this.selected = this.modifiedRows.filter(r => r._selected);
            this.pageSelected = this.pagedData.filter(r => r._selected);
            this.emitSelected(this.selected);
            // Only show the select all message when there is only one new page selected at a time
            this.selectedPageCount++;
            this.showSelectAllMessage = this.selectedPageCount === 1 && this.selected.length !== this.modifiedRows.length;
        }
    }

    /**
     * @name selectAll
     */
    selectAll(value) {
        this.master = value;
        this.indeterminate = false;
        for (let row of this.modifiedRows) {
            row._selected = value;
        }
        this.selected = value ? this.modifiedRows : [];
        this.showSelectAllMessage = false;
        this.selectedPageCount = this.selectedPageCount > 0 ? this.selectedPageCount - 1 : 0;
        this.rowSelectHandler();
    }

    /**
     * @name rowSelectHandler
     */
    rowSelectHandler() {
        this.pagedData = this.modifiedRows.slice(this.getPageStart(), this.getPageEnd());
        this.pageSelected = this.pagedData.filter(r => r._selected);
        this.selected = this.modifiedRows.filter(r => r._selected);
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
        this.onRowSelect.emit({ length: selected.length, selected: selected });
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
    getDefaultOptions(column) {
        // TODO - needs to come from label service - https://github.com/bullhorn/novo-elements/issues/116
        let opts: Array<any> = [
            { label: 'Past 1 Day', min: -1, max: 0 },
            { label: 'Past 7 Days', min: -7, max: 0 },
            { label: 'Past 30 Days', min: -30, max: 0 },
            { label: 'Past 90 Days', min: -90, max: 0 },
            { label: 'Past 1 Year', min: -366, max: 0 },
            { label: 'Next 1 Day', min: 0, max: 1 },
            { label: 'Next 7 Days', min: 0, max: 7 },
            { label: 'Next 30 Days', min: 0, max: 30 },
            { label: 'Next 90 Days', min: 0, max: 90 },
            { label: 'Next 1 Year', min: 0, max: 366 }
        ];

        if (column && column.range) {
            opts.push({
                label: 'Custom Date Range',
                range: true
            });
        }
        return opts;
    }

    onCalenderSelect(column, event) {
        setTimeout(() => {
            if (event.startDate && event.endDate) {
                this.onFilterChange();
            }
        }, 10);
    }
}
