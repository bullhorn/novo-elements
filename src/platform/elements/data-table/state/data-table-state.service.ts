import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { IDataTableChangeEvent, IDataTableSortFilter } from '../interfaces';

export class DataTableState<T> {
  public selectionSource = new Subject();
  public paginationSource = new Subject();
  public sortFilterSource = new Subject();
  public resetSource = new Subject();

  sort: { id: string; value: string } = undefined;
  filter: { id: string; value: string } = undefined;
  page: number = 0;
  pageSize: number = undefined;
  globalSearch: string = undefined;
  selectedRows: Map<string, T> = new Map<string, T>();
  outsideFilter: any;
  isForceRefresh: boolean = false;

  updates: EventEmitter<IDataTableChangeEvent> = new EventEmitter<IDataTableChangeEvent>();

  get userFiltered(): boolean {
    return !!(this.filter || this.sort || this.globalSearch || this.outsideFilter);
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

  public onPaginationChange(isPageSizeChange: boolean, pageSize: number): void {
    this.paginationSource.next({ isPageSizeChange, pageSize });
  }

  public onSortFilterChange(): void {
    this.sortFilterSource.next();
  }
}
