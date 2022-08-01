import { DataSource } from '@angular/cdk/table';
import { ChangeDetectorRef } from '@angular/core';
import { merge, Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { IDataTableService } from './interfaces';
import { DataTableState } from './state/data-table-state.service';

export class DataTableSource<T> extends DataSource<T> {
  public total = 0;
  public currentTotal = 0;
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

  public connect(): Observable<any> {
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
          this.state.where,
        );
      }),
      map((data: { results: T[]; total: number }) => {
        if (!this.totalSet || this.state.isForceRefresh) {
          this.total = data.total;
          this.totalSet = true;
          this.state.isForceRefresh = false;
        } else if (data.total > this.total) {
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
            this.state.dataLoaded.next();
            this.ref.markForCheck();
          });
        });
        return data.results;
      }),
      catchError((err, caught) => {
        console.error(err, caught); // tslint: disable-line
        this.loading = false;
        return of(null);
      }),
    );
  }

  public disconnect(): void {}
}
