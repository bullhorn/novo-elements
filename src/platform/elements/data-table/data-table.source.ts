import { ChangeDetectorRef } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import 'rxjs/add/observable/of';

import { DataTableState } from './state/data-table-state.service';
import { IDataTableService } from './interfaces';

export class DataTableSource<T> extends DataSource<T> {
  public total = 0;
  public current = 0;
  public loading = false;
  public pristine = true;
  public data: T[];

  private totalSet: boolean = false;

  get totallyEmpty(): boolean {
    return this.total === 0;
  }

  get currentlyEmpty(): boolean {
    return this.current === 0;
  }

  constructor(private tableService: IDataTableService<T>, private state: DataTableState<T>, private ref: ChangeDetectorRef) {
    super();
  }

  public connect(): Observable<any[]> {
    const displayDataChanges: any = [this.state.updates];
    return Observable.merge(...displayDataChanges).pipe(
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
        if (!this.totalSet || this.state.isForceRefresh) {
          this.total = data.total;
          this.totalSet = true;
          this.state.isForceRefresh = false;
        }
        this.current = data.results.length;
        this.data = data.results;
        // Clear selection
        this.state.selectedRows.clear();
        this.state.onSelectionChange();
        // Mark changes
        setTimeout(() => {
          this.ref.markForCheck();
          setTimeout(() => {
            this.loading = false;
            this.ref.markForCheck();
          });
        });
        return data.results;
      }),
      catchError((err, caught) => {
        console.error(err, caught); // tslint: disable-line
        this.loading = false;
        return Observable.of(null);
      }),
    );
  }

  public disconnect(): void {}
}
