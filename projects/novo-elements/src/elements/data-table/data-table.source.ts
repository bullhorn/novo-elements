import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable, merge, of, Subscription } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';

import { DataTableState } from './state/data-table-state.service';
import { IDataTableService } from './interfaces';

export class DataTableSource<T> extends DataSource<T> implements OnDestroy {
  public total = 0;
  public currentTotal = 0;
  public current = 0;
  public loading = false;
  public pristine = true;
  public data: T[];
  private connectSub: Subscription;

  private totalSet: boolean = false;

  get totallyEmpty(): boolean {
    return this.total === 0;
  }

  get currentlyEmpty(): boolean {
    return this.current === 0;
  }

  constructor(private tableService: IDataTableService<T>, private state: DataTableState<T>, private ref: ChangeDetectorRef) {
    super();
    this.connectSub = this.connect().subscribe(() => {
      if (!this.totalSet || this.currentTotal > this.total) {
        this.total = this.currentTotal;
        this.totalSet = true;
      }
      this.loading = false;
      this.ref.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.connectSub.unsubscribe();
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
        );
      }),
      map((data: { results: T[]; total: number }) => {
        if (this.state.isForceRefresh) {
          this.totalSet = false;
          this.state.isForceRefresh = false;
        }
        this.currentTotal = data.total;
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
            this.state.dataLoaded.next();
          });
        });
        return data.results;
      }),
      catchError((err, caught) => {
        this.loading = false;
        console.error(err, caught); // tslint: disable-line
        return of(null);
      }),
    );
  }

  public disconnect(): void {}
}
