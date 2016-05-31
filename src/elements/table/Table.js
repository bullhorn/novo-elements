import { Component, EventEmitter } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgModel } from '@angular/common';
import { isFunction, isString } from '@angular/core/src/facade/lang';

import { NOVO_BUTTON_ELEMENTS } from '../button';
import { NOVO_DROPDOWN_ELEMENTS } from '../dropdown';
import { NOVO_TABLE_EXTRA_ELEMENTS } from './extras/TableExtras';
import { CheckBox } from '../form/extras/FormExtras';

@Component({
    selector: 'novo-table, [novoTable]',
    inputs: [
        'rows',
        'columns',
        'config'
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
        CheckBox
    ],
    template: `
        <table class="table table-striped dataTable" [class.table-details]="config.hasDetails" role="grid" style="width: 100%;">
            <thead>
                <tr role="row">
                    <th class="row-actions" *ngIf="config.hasDetails"></th>
                    <th class="row-actions" *ngIf="config.rowSelectionStyle==='checkbox'">
                        <check-box [(value)]="master" [indeterminate]="indeterminate" (valueChange)="selectAll($event)" data-automation-id="select-all-checkbox"></check-box>
                    </th>
                    <th *ngFor="let column of columns" [novoThOrderable]="column" (onOrderChange)="onOrderChange($event)">
                        <div class="th-group" [attr.data-automation-id]="column.name">
                            <div class="th-title" [novoThSortable]="config" [column]="column" (onSortChange)="onSortChange($event)">
                                <label>{{ column.title }}</label>
                                <div class="table-sort-icons" [ngClass]="column.sort || ''" *ngIf="config.sorting || column.sorting">
                                    <i class="bhi-arrow-down"></i>
                                    <i class="bhi-arrow-up"></i>
                                </div>
                            </div>
                            <novo-dropdown side="right" *ngIf="column.filtering" class="column-filters">
                                <button type="button" theme="icon" icon="filter" [class.filtered]="column.filter" (click)="focusInput(column.name)"></button>
                                <list *ngIf="column.options?.length">
                                    <item class="filter-search">
                                        <div class="header">
                                            <span>Filters</span>
                                            <button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)">Clear</button>
                                        </div>
                                    </item>
                                    <item [ngClass]="{active: column.filter && column.filter.length && column.filter.includes(option)}" *ngFor="let option of column.options" (click)="onFilterClick(column, option)"[attr.data-automation-id]="option">
                                        {{option}} <i class="bhi-check" *ngIf="column.filter && column.filter.length && column.filter.includes(option)"></i>
                                    </item>
                                </list>
                                <list *ngIf="!column.options?.length">
                                    <item class="filter-search">
                                        <div class="header">
                                            <span>Filters</span>
                                            <button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)">Clear</button>
                                        </div>
                                        <input type="text" [attr.id]="column.name + '-input'" [novoTableFilter]="column" (onFilterChange)="onFilterChange($event)" [(ngModel)]="column.filter"/>
                                    </item>
                                </list>
                            </novo-dropdown>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <template ngFor let-row="$implicit" [ngForOf]="rows | slice:getPageStart():getPageEnd()">
                    <tr class="table-row" [attr.data-automation-id]="row.id" (click)="rowClickHandler(row)" [class.active]="row.id === activeId">
                        <td class="row-actions" *ngIf="config.hasDetails">
                            <button theme="icon" icon="next" (click)="row._expanded=!row._expanded" *ngIf="!row._expanded"></button>
                            <button theme="icon" icon="sort-desc" (click)="row._expanded=!row._expanded" *ngIf="row._expanded"></button>
                        </td>
                        <td class="row-actions" *ngIf="config.rowSelectionStyle=='checkbox'">
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
            <tbody *ngIf="rows.length<=0" data-automation-id="empty-table">
                <tr>
                    <td colspan="100%">
                        <div class="no-matching-records">
                            <h4><i class="bhi-search-question"></i> No matching records</h4>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    `
})
export class NovoTable {
    constructor() {
        this.originalRows = [];
        this.activeId = 0;
        this.master = false;
        this.indeterminate = false;
        this.onRowClick = new EventEmitter();
        this.onRowSelect = new EventEmitter();
        this.onTableChange = new EventEmitter();
        this.lastPage = 0;
    }

    ngOnChanges() {
        this.originalRows = this.originalRows.length === 0 ? this.rows : this.originalRows;
    }

    ngDoCheck() {
        if (this.config.paging.current !== this.lastPage) {
            this.rowSelectHandler();
        }
        this.lastPage = this.config.paging.current;
    }

    getPageStart() {
        return this.config.paging ? (this.config.paging.current - 1) * this.config.paging.itemsPerPage : 0;
    }

    getPageEnd() {
        return this.config.paging && this.config.paging.itemsPerPage > -1 ? this.getPageStart() + this.config.paging.itemsPerPage : this.rows.length;
    }

    focusInput(name) {
        const element = document.getElementById(`${name}-input`);
        if (element) {
            setTimeout(() => {
                element.focus();
            });
        }
    }

    onFilterClick(column, filter) {
        if (Array.isArray(column.filter)) {
            if (column.filter.includes(filter)) {
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

    onFilterClear(column) {
        column.filter = null;
        this.onFilterChange();
    }

    onFilterChange() {
        if (this.config.filtering) {
            const filters = this.columns.filter((col) => col.filter && col.filter.length);

            if (filters.length) {
                if (isFunction(this.config.filtering)) {
                    // Custom filter function on the table config
                    this.rows = this.config.filtering(filters, this.originalRows);
                } else {
                    this.rows = this.originalRows.filter((item) => {
                        let matched;
                        for (const column of filters) {
                            if (Array.isArray(column.filter)) {
                                // If the filters are an array (multi-select), check value
                                matched = column.filter.includes(item[column.name]);
                            } else {
                                if (column.match && isFunction(column.match)) {
                                    // Custom match function on the column
                                    matched = column.match(item[column.name], column.filter);
                                } else if (Array.isArray(item[column.name])) {
                                    // Value is an array
                                    for (const value of item[column.name]) {
                                        matched = value.match(new RegExp(column.filter, 'gi'));
                                        if (!matched) break;
                                    }
                                } else {
                                    // Basic, value is just a string
                                    matched = JSON.stringify(item[column.name]).match(new RegExp(column.filter, 'gi'));
                                }
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
        }
    }

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
    }

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

    findColumnIndex(value) {
        for (let i = 0; i < this.columns.length; i += 1) {
            if (this.columns[i].name === value) {
                return i;
            }
        }
        return null;
    }

    onOrderChange(event) {
        const oldIndex = this.findColumnIndex(event.first.name);
        const newIndex = this.findColumnIndex(event.second.name);
        this.columns.splice(newIndex, 0, this.columns.splice(oldIndex, 1)[0]);
        this.onSortChange(this.currentSortColumn);
    }

    selectAll() {
        this.indeterminate = false;
        let pagedData = this.rows.slice(this.getPageStart(), this.getPageEnd());
        for (let row of pagedData) {
            row._selected = this.master;
        }
        let selected = pagedData.filter(r => r._selected);
        this.emitSelected(selected);
    }

    rowSelectHandler() {
        let pagedData = this.rows.slice(this.getPageStart(), this.getPageEnd());
        let selected = pagedData.filter(r => r._selected);
        if (selected.length === 0) {
            this.master = false;
            this.indeterminate = false;
        } else if (selected.length === pagedData.length) {
            this.master = true;
            this.indeterminate = false;
        } else {
            this.master = false;
            this.indeterminate = true;
        }
        this.emitSelected(selected);
    }

    emitSelected(selected) {
        this.onRowSelect.emit(selected.length, selected);
    }

    rowClickHandler(row) {
        if (this.config.rowSelect) {
            this.activeId = row.id || 0;
            this.onRowClick.emit(row);
        }
    }
}

export const NOVO_TABLE_ELEMENTS = [NovoTable];
