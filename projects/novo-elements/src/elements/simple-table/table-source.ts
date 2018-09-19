import { ChangeDetectorRef } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable, of, merge } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';

import { NovoActivityTableState } from './state';
import { Helpers } from '../../utils/Helpers';

export interface ActivityTableService<T> {
  getTableResults(
    sort: { id: string; value: string; transform?: Function },
    filter: { id: string; value: string; transform?: Function },
    page: number,
    pageSize: number,
    globalSearch?: string,
    outsideFilter?: any,
  ): Observable<{ results: T[]; total: number }>;
}

export abstract class RemoteActivityTableService<T> implements ActivityTableService<T> {
  abstract getTableResults(
    sort: { id: string; value: string; transform?: Function },
    filter: { id: string; value: string; transform?: Function },
    page: number,
    pageSize: number,
    globalSearch?: string,
    outsideFilter?: any,
  ): Observable<{ results: T[]; total: number }>;
}

export class StaticActivityTableService<T> implements ActivityTableService<T> {
  constructor(private data: T[] = []) {}

  public getTableResults(
    sort: { id: string; value: string; transform?: Function },
    filter: { id: string; value: string; transform?: Function },
    page: number = 0,
    pageSize: number,
    globalSearch?: string,
    outsideFilter?: any,
  ): Observable<{ results: T[]; total: number }> {
    let ret: T[] = Helpers.deepClone(this.data);
    if (ret.length !== 0) {
      if (globalSearch) {
        ret = ret.filter((item) => Object.keys(item).some((key) => `${item[key]}`.toLowerCase().includes(globalSearch.toLowerCase())));
      }
      if (filter) {
        let value = Helpers.isString(filter.value) ? filter.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : filter.value;
        ret = ret.filter(Helpers.filterByField(filter.id, value));
      }
      if (sort) {
        ret = ret.sort(Helpers.sortByField(sort.id, sort.value === 'desc'));
      }
      if (!Helpers.isBlank(page) && !Helpers.isBlank(pageSize)) {
        ret = ret.slice(page * pageSize, (page + 1) * pageSize);
      }
    }
    return of({ results: ret, total: this.data.length });
  }
}

export class ActivityTableDataSource<T> extends DataSource<T> {
  public total = 0;
  public current = 0;
  public loading = false;
  public pristine = true;

  get totallyEmpty(): boolean {
    return this.total === 0;
  }

  get currentlyEmpty(): boolean {
    return this.current === 0;
  }

  constructor(private tableService: ActivityTableService<T>, private state: NovoActivityTableState, private ref: ChangeDetectorRef) {
    super();
  }

  public connect(): Observable<any[]> {
    const displayDataChanges: any = [this.state.updates];
    return merge(...displayDataChanges).pipe(
      startWith(null),
      switchMap(() => {
        this.pristine = false;
        this.loading = true;
        return this.tableService.getTableResults(
          this.state.sort,
          this.state.filter,
          this.state.page,
          this.state.pageSize,
          this.state.globalSearch,
          this.state.outsideFilter,
        );
      }),
      map((data: { results: T[]; total: number }) => {
        this.loading = false;
        this.total = data.total;
        this.current = data.results.length;
        setTimeout(() => {
          this.ref.markForCheck();
        });
        return data.results;
      }),
      catchError((error) => {
        console.error(error); // tslint: disable-line
        this.loading = false;
        return of(null);
      }),
    );
  }

  public disconnect(): void {}
}
