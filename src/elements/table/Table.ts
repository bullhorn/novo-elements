// Vendor
import { Component, EventEmitter, Input, Output, DoCheck, ElementRef, Directive, AfterViewChecked } from '@angular/core';
// APP
import { NovoLabelService } from './../../services/novo-label-service';
import { Helpers } from './../../utils/Helpers';
import { CollectionEvent } from './../../services/data-provider/CollectionEvent';
import { PagedArrayCollection } from './../../services/data-provider/PagedArrayCollection';
import { PagedCollection } from './../../services/data-provider/PagedCollection';

@Directive({
    selector: '[keepFilterFocused]'
})
export class NovoTableKeepFilterFocus implements AfterViewChecked {
    constructor(private element: ElementRef) { }

    ngAfterViewChecked() {
        this.element.nativeElement.focus();
    }
}

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
        <header *ngIf="columns.length">
            <ng-content select="novo-table-header"></ng-content>
            <div class="header-actions">
                <novo-pagination *ngIf="config.paging"
                                 [rowOptions]="config.customRowOptions"
                                 [(page)]="dataProvider.page"
                                 [(itemsPerPage)]="dataProvider.pageSize"
                                 [totalItems]="dataProvider.total"
                                 (onPageChange)="onPageChange($event)">
                </novo-pagination>
                <ng-content select="novo-table-actions"></ng-content>
            </div>
        </header>
        <div class="table-container">
            <table class="table table-striped dataTable" [class.table-details]="config.hasDetails" role="grid">
            <!-- skipSortAndFilterClear is a hack right now, will be removed once Canvas is refactored -->
            <thead *ngIf="columns.length && (!dataProvider.isEmpty() || dataProvider.isFiltered() || skipSortAndFilterClear)">
                <tr role="row">
                    <!-- DETAILS -->
                    <th class="row-actions" *ngIf="config.hasDetails"></th>
                    <!-- CHECKBOX -->
                    <th class="row-actions checkbox mass-action" *ngIf="config.rowSelectionStyle === 'checkbox'">
                        <novo-checkbox [(ngModel)]="master" [indeterminate]="pageSelected.length > 0 && pageSelected.length < pagedData.length" (ngModelChange)="selectPage($event)" data-automation-id="select-all-checkbox" [tooltip]="master ? labels.deselectAll : labels.selectAllOnPage" tooltipPosition="right"></novo-checkbox>
                    </th>
                    <!-- TABLE HEADERS -->
                    <th *ngFor="let column of columns" [ngClass]="{ 'mass-action': config?.rowSelectionStyle === 'checkbox', 'actions': column?.actions?.items?.length > 0, 'preview': column?.name === 'preview' }" [novoThOrderable]="column" (onOrderChange)="onOrderChange($event)">
                        <div class="th-group" [attr.data-automation-id]="column.id || column.name" *ngIf="!column.hideHeader">
                            <!-- LABEL & SORT ARROWS -->
                            <div class="th-title" [ngClass]="(config.sorting !== false && column.sorting !== false) ? 'sortable' : ''" [novoThSortable]="config" [column]="column" (onSortChange)="onSortChange($event)">
                                <label>{{ column.title }}</label>
                                <div class="table-sort-icons" [ngClass]="column.sort || ''" *ngIf="config.sorting !== false && column.sorting !== false">
                                    <i class="bhi-arrow-up"></i>
                                    <i class="bhi-arrow-down"></i>
                                </div>
                            </div>
                            <!-- FILTER DROP-DOWN -->
                            <novo-dropdown side="right" *ngIf="column.filtering" class="column-filters" appendToBody="true" parentScrollSelector=".table-container" containerClass="table-dropdown">
                                <button type="button" theme="icon" icon="filter" [class.filtered]="column.filter"></button>
                                <!-- FILTER OPTIONS LIST -->
                                <list *ngIf="(column?.options?.length || column?.originalOptions?.length) && column?.type!='date'">
                                    <item class="filter-search">
                                        <div class="header">
                                            <span>{{ labels.filters }}</span>
                                            <button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)" *ngIf="column.filter">{{ labels.clear }}</button>
                                        </div>
                                        <input type="text" *ngIf="!!column.allowCustomTextOption" [attr.id]="column.name + '-input'" [novoTableFilter]="column" (onFilterChange)="onFilterKeywords($event)" [(ngModel)]="column.freetextFilter" keepFilterFocused/>
                                    </item>
                                    <item [ngClass]="{ active: isFilterActive(column, option) }" *ngFor="let option of column.options" (click)="onFilterClick(column, option)" [attr.data-automation-id]="getOptionDataAutomationId(option)">
                                        {{ option?.label || option }} <i class="bhi-check" *ngIf="isFilterActive(column, option)"></i>
                                    </item>
                                </list>
                                <!-- FILTER SEARCH INPUT -->
                                <list *ngIf="!(column?.options?.length || column?.originalOptions?.length)">
                                    <item class="filter-search">
                                        <div class="header">
                                            <span>{{ labels.filters }}</span>
                                            <button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)" *ngIf="column.filter">{{ labels.clear }}</button>
                                        </div>
                                        <input type="text" [attr.id]="column.name + '-input'" [novoTableFilter]="column" (onFilterChange)="onFilterChange($event)" [(ngModel)]="column.filter" keepFilterFocused/>
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
                                    <item [ngClass]="{ active: isFilterActive(column, option) }" *ngFor="let option of column.options" (click)="onFilterClick(column, option)" [keepOpen]="option.range" [hidden]="column.calenderShow" [attr.data-automation-id]="(option?.label || option)">
                                        {{ option?.label || option }} <i class="bhi-check" *ngIf="isFilterActive(column, option)"></i>
                                    </item>
                                    <div class="calender-container" [hidden]="!column.calenderShow">
                                        <div (click)="column.calenderShow=false"><i class="bhi-previous"></i>Back to Preset Filters</div>
                                        <novo-date-picker #rangePicker (onSelect)="onCalenderSelect(column, $event)" [(ngModel)]="column.filter" range="true"></novo-date-picker>
                                    </div>
                                </list>
                            </novo-dropdown>
                        </div>
                    </th>
                </tr>
            </thead>
            <!-- TABLE DATA -->
            <tbody *ngIf="!dataProvider.isEmpty()">
                <tr class="table-selection-row" *ngIf="config.rowSelectionStyle === 'checkbox' && showSelectAllMessage && config.selectAllEnabled" data-automation-id="table-selection-row">
                    <td colspan="100%">
                        {{labels.selectedRecords(selected.length)}} <a (click)="selectAll(true)" data-automation-id="all-matching-records">{{labels.totalRecords(dataProvider.total)}}</a>
                    </td>
                </tr>
                <template ngFor let-row="$implicit" [ngForOf]="rows">
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
            <tbody class="table-message" *ngIf="dataProvider.isEmpty() && !dataProvider.isFiltered()" data-automation-id="empty-table">
                <tr>
                    <td colspan="100%">
                        <div #emptymessage><ng-content select="[table-empty-message]"></ng-content></div>
                        <div class="table-empty-message" *ngIf="emptymessage.childNodes.length == 0">
                            <h4><i class="bhi-search-question"></i> {{ labels.emptyTableMessage }}</h4>
                        </div>
                    </td>
                </tr>
            </tbody>
            <!-- NO MATCHING RECORDS -->
            <tbody class="table-message" *ngIf="dataProvider.isEmpty() && dataProvider.isFiltered()" data-automation-id="empty-table">
                <tr>
                    <td colspan="100%">
                        <div #nomatchmessage><ng-content select="[table-no-matching-records-message]"></ng-content></div>
                        <div class="no-matching-records" *ngIf="nomatchmessage.childNodes.length == 0">
                            <h4><i class="bhi-search-question"></i> {{ labels.noMatchingRecordsMessage }}</h4>
                        </div>
                    </td>
                </tr>
            </tbody>
            <!-- TABLE DATA ERROR PLACEHOLDER -->
            <tbody class="table-message" *ngIf="dataProvider.hasErrors()" data-automation-id="table-errors">
                <tr>
                    <td colspan="100%">
                        <div #errormessage><ng-content select="[table-error-message]"></ng-content></div>
                        <div class="table-error-message" *ngIf="errormessage.childNodes.length == 0">
                            <h4><i class="bhi-caution"></i> {{ labels.erroredTableMessage }}</h4>
                        </div>
                    </td>
                </tr>
            </tbody>
            <!-- TABLE LOADING PLACEHOLDER -->
            <tbody class="table-message" *ngIf="dataProvider.isLoading()" data-automation-id="table-loading">
                <tr>
                    <td colspan="100%">
                        <div #loader><ng-content select="[table-loader]"></ng-content></div>
                        <div class="table-loading" *ngIf="loader.childNodes.length == 0">
                            <novo-loading></novo-loading>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    `
})
export class NovoTableElement implements DoCheck {
    @Input() config: any = {};
    @Input() columns: Array<any>;
    @Input() theme: string;
    @Input() skipSortAndFilterClear: boolean = false;

    @Output() onRowClick: EventEmitter<any> = new EventEmitter();
    @Output() onRowSelect: EventEmitter<any> = new EventEmitter();
    @Output() onTableChange: EventEmitter<any> = new EventEmitter();

    _dataProvider: PagedCollection<any>;
    _rows: Array<any> = [];
    selected: Array<any> = [];
    activeId: number = 0;
    master: boolean = false;
    indeterminate: boolean = false;
    lastPage: number = 0;
    selectedPageCount: number = 0;
    showSelectAllMessage: boolean = false;
    currentSortColumn: any;
    pagedData: Array<any> = [];
    pageSelected: any;

    @Input()
    set rows(rows: Array<any>) {
        this.dataProvider = rows;
        if (rows && rows.length > 0) {
            this.setupColumnDefaults();
        }
        //this is a temporary/hacky fix until async dataloading is handled within the table
        if (!this.skipSortAndFilterClear) {
            this.clearAllSortAndFilters();
        }
    }
    get rows() {
        return this._rows;
    }

    @Input()
    set dataProvider(dp: any) {
        this._dataProvider = Array.isArray(dp) ? new PagedArrayCollection<any>(dp) : dp;
        this._dataProvider.dataChange.debounceTime(100).subscribe((event: CollectionEvent) => {
            switch (event.type) {
                case CollectionEvent.CHANGE:
                    this._rows = event.data;
                    // Remove all selection on sort change if selection is on
                    if (this.config.rowSelectionStyle === 'checkbox') {
                        this.pagedData = event.data;
                        this.pageSelected = this.pagedData.filter(r => r._selected);
                        this.rowSelectHandler();
                    }
                    break;
                default:
                    break;
            }
        });
        this._dataProvider.page = this.config.paging.current;
        this._dataProvider.pageSize = this.config.paging.itemsPerPage;
        if (dp && dp.length > 0) {
            this.setupColumnDefaults();
        }
    }
    get dataProvider() {
        return this._dataProvider;
    }

    constructor(public labels: NovoLabelService) { }

    onPageChange(event) {
        //this.dataProvider.page = event.page;
        //this.dataProvider.pageSize = event.itemsPerPage;
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
        return this.config.paging ? (this.dataProvider.page - 1) * this.dataProvider.pageSize : 0;
    }

    /**
     * @name getPageEnd
     * @returns {*}
     */
    getPageEnd() {
        return this.config.paging && this.dataProvider.pageSize > -1 ? this.getPageStart() + this.dataProvider.pageSize : this.rows.length;
    }

    /**
     * @name onFilterClick
     * @param column
     * @param filter
     */
    onFilterClick(column, filter) {
        if (filter.range && !column.calendarShow) {
            column.calenderShow = true;
            return;
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
            column.filter = filter.value || filter;
        }
        this.onFilterChange();
    }

    /**
     * @name onFilterClear
     * @param column
     */
    onFilterClear(column) {
        // if (column.filter && column.filter.startDate) {
        //     column.filter = { startDate: null, endDate: null };
        // }
        setTimeout(() => {
            column.filter = null;
            this.onFilterChange();
        });
    }

    clearAllSortAndFilters() {
        if (this.config.filtering) {
            this.columns.forEach(column => {
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
            const filters = this.columns.filter(col => !Helpers.isEmpty(col.filter));
            if (filters.length) {
                let query = {};
                for (const column of filters) {
                    if (Helpers.isFunction(column.match)) {
                        query[column.name] = (value, record) => {
                            return column.match(record, column.filter);
                        };
                    } else if (column.preFilter && Helpers.isFunction(column.preFilter)) {
                        query = Object.assign({}, query, column.preFilter(column.filter));
                    } else if (Array.isArray(column.filter)) {
                        // The filters are an array (multi-select), check value
                        let options = column.filter;
                        // We have an array of {value: '', labels: ''}
                        if (options[0].value || options[0].label) {
                            options = column.filter.map(opt => opt.value);
                        }
                        query[column.name] = { any: options };
                    } else if (column.type && column.type === 'date') {
                        if (column.filter.startDate && column.filter.endDate) {
                            query[column.name] = {
                                min: Helpers.clearTime(column.filter.startDate),
                                max: Helpers.tomorrow(column.filter.endDate)
                            };
                        } else {
                            query[column.name] = {
                                min: column.filter.min ? Helpers.addDays(Helpers.today(), column.filter.min) : Helpers.today(),
                                max: column.filter.max ? Helpers.addDays(Helpers.tomorrow(), column.filter.max) : Helpers.tomorrow()
                            };
                        }
                    } else {
                        query[column.name] = column.filter;
                    }
                }
                if (Helpers.isFunction(this.config.filtering)) {
                    this.config.filtering(query);
                } else {
                    this._dataProvider.filter = query;
                }
            } else {
                this._dataProvider.filter = {};
            }
            // Trickle down to keep sort
            // this.onSortChange(this.currentSortColumn);

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
    isFilterActive(column, filter) {
        //TODO: This needs to be refactored
        let isActive = false;
        if (column && column.filter && filter) {
            if (Array.isArray(column.filter)) {
                if (typeof (filter) !== 'string') {
                    isActive = column.filter.some(item => {
                        return item.label === filter.label;
                    });
                } else {
                    isActive = column.filter.includes(filter);
                }
            } else {
                if (typeof (column.filter) === typeof (filter)) {
                    isActive = (column.filter === filter);
                } else {
                    isActive = (column.filter === filter.value);
                }
            }
        }
        return isActive;
    }

    /**
     * @name onSortChange
     * @param newSortColumn
     */
    onSortChange(column) {
        this.currentSortColumn = column;
        let sortedColumns: any = this.columns.filter((thisColumn) => {
            return thisColumn.sort && thisColumn !== this.currentSortColumn;
        });
        for (let sortedColumn of sortedColumns) {
            sortedColumn.sort = null;
        }

        if (column) {
            if (Helpers.isFunction(this.config.sorting)) {
                this.config.sorting();
            } else if (Helpers.isFunction(column.preSort)) {
                this._dataProvider.sort = [].concat(column.preSort(column));
            } else {
                this._dataProvider.sort = [{ field: (column.compare || column.name), reverse: column.sort === 'desc' }];
            }
        }

        // Fire table change event
        // this.fireTableChangeEvent();

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
            //this.pagedData = this.rows.slice(this.getPageStart(), this.getPageEnd());
            for (let row of this.pagedData) {
                row._selected = this.master;
            }
            this.selected = this.dataProvider.list.filter(r => r._selected);
            this.pageSelected = this.pagedData.filter(r => r._selected);
            this.emitSelected(this.selected);
            // Only show the select all message when there is only one new page selected at a time
            this.selectedPageCount++;
            this.showSelectAllMessage = this.selectedPageCount === 1 && this.selected.length !== this.dataProvider.length;
        }
    }

    /**
     * @name selectAll
     */
    selectAll(value) {
        this.master = value;
        this.indeterminate = false;
        for (let row of this.dataProvider.list) {
            row._selected = value;
        }
        this.selected = value ? this.dataProvider.list : [];
        this.showSelectAllMessage = false;
        this.selectedPageCount = this.selectedPageCount > 0 ? this.selectedPageCount - 1 : 0;
        this.rowSelectHandler();
    }

    /**
     * @name rowSelectHandler
     */
    rowSelectHandler() {
        //this.pagedData = this.rows.slice(this.getPageStart(), this.getPageEnd());
        this.pageSelected = this.pagedData.filter(r => r._selected);
        this.selected = this.dataProvider.list.filter(r => r._selected);
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

    onFilterKeywords(config) {
        if (config && config.filtering && config.filtering.freetextFilter) {
            let filterKeywords = config.filtering.freetextFilter.toLowerCase();
            if (!config.filtering.originalOptions) {
                config.filtering.originalOptions = config.filtering.options;
            }
            let newOptions = config.filtering.originalOptions.filter(option => {
                let value = option && option.label ? option.label : option;
                value = value.toLowerCase() ? value.toLowerCase() : value;
                if (value === filterKeywords) {
                    return true;
                } else if (~value.indexOf(filterKeywords) || ~value.indexOf(filterKeywords)) {
                    return true;
                }
                return false;
            });
            config.filtering.options = newOptions;
            // if (config.filtering.originalOptions[0].label) {
            //     config.filtering.filter = [{ label: config.filtering.freetextFilter, value: config.filtering.freetextFilter }];
            // } else {
            config.filtering.filter = config.filtering.freetextFilter;
            // }
        } else {
            config.filtering.options = config.filtering.originalOptions;
        }
        this.onFilterChange();
    }
}
