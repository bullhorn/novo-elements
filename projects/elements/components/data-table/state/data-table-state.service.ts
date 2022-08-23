import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NovoDataTableFilterUtils } from '../services/data-table-filter-utils';
import {
  IDataTableChangeEvent,
  IDataTableFilter,
  IDataTableSelectionOption,
  IDataTableSort,
} from '../interfaces';
import { Helpers } from 'novo-elements/utils';

@Injectable()
export class DataTableState<T> {
  public selectionSource = new Subject();
  public paginationSource = new Subject();
  public sortFilterSource = new Subject();
  public resetSource = new Subject();
  public expandSource = new Subject();
  public allMatchingSelectedSource = new Subject();
  public dataLoaded = new Subject();

  sort: IDataTableSort = undefined;
  filter: IDataTableFilter | IDataTableFilter[] = undefined;
  where: { query: string; form: any } = undefined;
  page: number = 0;
  pageSize: number = undefined;
  globalSearch: string = undefined;
  selectedRows: Map<string, T> = new Map<string, T>();
  expandedRows: Set<string> = new Set<string>();
  outsideFilter: any;
  isForceRefresh: boolean = false;
  selectionOptions: IDataTableSelectionOption[];
  updates: EventEmitter<IDataTableChangeEvent> = new EventEmitter<IDataTableChangeEvent>();
  retainSelected: boolean = false;

  get userFiltered(): boolean {
    return !!(this.filter || this.sort || this.globalSearch || this.outsideFilter || this.where);
  }

  get userFilteredInternal(): boolean {
    return !!(this.filter || this.sort || this.globalSearch || this.where);
  }

  get selected(): T[] {
    return Array.from(this.selectedRows.values());
  }

  public reset(fireUpdate: boolean = true, persistUserFilters?): void {
    if (!persistUserFilters) {
      this.sort = undefined;
      this.globalSearch = undefined;
      this.filter = undefined;
      this.where = undefined;
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
      });
    }
  }

  public clearSort(fireUpdate: boolean = true): void {
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

  public clearFilter(fireUpdate: boolean = true): void {
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

  public clearQuery(fireUpdate: boolean = true): void {
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

  public clearSelected(fireUpdate: boolean = true): void {
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

  public onSelectionChange(): void {
    this.selectionSource.next();
  }

  public onExpandChange(targetId?: number): void {
    this.expandSource.next(targetId);
  }

  public onPaginationChange(isPageSizeChange: boolean, pageSize: number): void {
    this.checkRetainment('page');
    this.paginationSource.next({ isPageSizeChange, pageSize });
  }

  public onSortFilterChange(): void {
    this.checkRetainment('sort');
    this.checkRetainment('filter');
    this.checkRetainment('where');
    this.sortFilterSource.next({
      sort: this.sort,
      filter: this.filter,
      globalSearch: this.globalSearch,
      where: this.where,
    });
  }

  public setInitialSortFilter(preferences): void {
    if (preferences) {
      if (preferences.where) {
        this.where = preferences.where;
      }

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

      if (preferences.globalSearch) {
        this.globalSearch = preferences.globalSearch;
      }
    }
  }

  public checkRetainment(caller: string, allMatchingSelected = false): void {
    this.retainSelected = this.selectionOptions?.some((option) => option.label === caller) || this.retainSelected || allMatchingSelected;
  }
}
