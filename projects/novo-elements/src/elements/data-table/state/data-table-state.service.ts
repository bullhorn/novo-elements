import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { IDataTableChangeEvent, IDataTableFilter } from '../interfaces';
import { Helpers } from '../../../utils/Helpers';
import { NovoDataTableFilterUtils } from '../services/data-table-filter-utils';

export class DataTableState<T> {
  public selectionSource = new Subject();
  public paginationSource = new Subject();
  public sortFilterSource = new Subject();
  public resetSource = new Subject();
  public expandSource = new Subject();
  public dataLoaded = new Subject();

  sort: { id: string; value: string } = undefined;
  filter: IDataTableFilter | IDataTableFilter[] = undefined;
  page: number = 0;
  pageSize: number = undefined;
  globalSearch: string = undefined;
  selectedRows: Map<string, T> = new Map<string, T>();
  expandedRows: Set<string> = new Set<string>();
  outsideFilter: any;
  isForceRefresh: boolean = false;

  updates: EventEmitter<IDataTableChangeEvent> = new EventEmitter<IDataTableChangeEvent>();

  get userFiltered(): boolean {
    return !!(this.filter || this.sort || this.globalSearch || this.outsideFilter);
  }

  get userFilteredInternal(): boolean {
    return !!(this.filter || this.sort || this.globalSearch);
  }

  get selected(): T[] {
    return Array.from(this.selectedRows.values());
  }

  public reset(fireUpdate: boolean = true, persistUserFilters?: boolean): void {
    if (!persistUserFilters) {
      this.sort = undefined;
      this.globalSearch = undefined;
      this.filter = undefined;
    }
    this.page = 0;
    this.selectedRows.clear();
    this.resetSource.next();
    this.onSortFilterChange();
    if (fireUpdate) {
      this.updates.emit({
        sort: this.sort,
        filter: this.filter,
        globalSearch: this.globalSearch,
      });
    }
  }

  public clearSort(fireUpdate: boolean = true): void {
    this.sort = undefined;
    this.page = 0;
    this.selectedRows.clear();
    this.resetSource.next();
    this.onSortFilterChange();
    if (fireUpdate) {
      this.updates.emit({
        sort: this.sort,
        filter: this.filter,
        globalSearch: this.globalSearch,
      });
    }
  }

  public clearFilter(fireUpdate: boolean = true): void {
    this.filter = undefined;
    this.globalSearch = undefined;
    this.page = 0;
    this.selectedRows.clear();
    this.resetSource.next();
    this.onSortFilterChange();
    if (fireUpdate) {
      this.updates.emit({
        sort: this.sort,
        filter: this.filter,
        globalSearch: this.globalSearch,
      });
    }
  }

  public onSelectionChange(): void {
    this.selectionSource.next();
  }

  public onExpandChange(targetId?: number): void {
    this.expandSource.next(targetId);
  }

  public onPaginationChange(isPageSizeChange: boolean, pageSize: number): void {
    this.paginationSource.next({ isPageSizeChange, pageSize });
  }

  public onSortFilterChange(): void {
    this.sortFilterSource.next({
      sort: this.sort,
      filter: this.filter,
      globalSearch: this.globalSearch,
    });
  }

  public setInitialSortFilter(preferences): void {
    if (preferences) {
      if (preferences.sort) {
        this.sort = preferences.sort;
      }

      if (preferences.filter) {
        const filters = Helpers.convertToArray(preferences.filter);
        filters.forEach((filter) => {
          filter.value =
            filter.selectedOption && filter.type
              ? NovoDataTableFilterUtils.constructFilter(filter.selectedOption, filter.type)
              : filter.value;
        });
        this.filter = filters;
      }
    }
  }
}
