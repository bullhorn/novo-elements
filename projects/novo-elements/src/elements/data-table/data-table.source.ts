import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { DataSource } from '@angular/cdk/table';
import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { IDataTableService } from './interfaces';
import { DataTableState } from './state/data-table-state.service';

export class DataTableSource<T> extends DataSource<T> {
  public total = 0;
  public currentTotal = 0;
  public current = 0;
  public loading = false;
  public pristine = true;

  private totalSet: boolean = false;

  itemsLoadedAtOnce = 20; // set dynamically based on row height and viewport?
  itemSize = 33;
  rowHeight = 33;
  private readonly visibleData: BehaviorSubject<any[]> = new BehaviorSubject([]);

  private _data: any[];
  get data(): any[] {
    return this._data;
  }
  set data(data: any[]) {
    this._data = data;
    this.viewport.scrollToOffset(0);
    this.viewport.setTotalContentSize(this.itemSize * data.length);
    this.visibleData.next(this._data.slice(0, this.itemsLoadedAtOnce));
  }

  get totallyEmpty(): boolean {
    return this.total === 0;
  }

  get currentlyEmpty(): boolean {
    return this.current === 0;
  }

  constructor(
    private tableService: IDataTableService<T>,
    private state: DataTableState<T>,
    private ref: ChangeDetectorRef,
    private viewport: CdkVirtualScrollViewport,
  ) {
    super();

    this.viewport.elementScrolled().subscribe((event: any) => {
      const start = Math.floor(event.currentTarget.scrollTop / this.rowHeight);
      const prevExtraData = start > (this.itemsLoadedAtOnce / 2) ? (this.itemsLoadedAtOnce / 2) : start;
      // we want to have a buffer of items in front of the scroll as well, this current code does not do that
      const slicedData = this._data.slice(start - prevExtraData, start + (this.itemsLoadedAtOnce - prevExtraData));
      const offset = this.rowHeight * (start - prevExtraData);
      this.viewport.setRenderedContentOffset(offset);
      this.visibleData.next(slicedData);
    });
  }

  public connect(): Observable<any> {
    const displayDataChanges: any = [this.state.updates];
    const initialData = merge(...displayDataChanges).pipe(
      startWith(null),
      switchMap(() => {
        this.pristine = false;
        this.loading = true;
        this.state.dataLoadingSource.next(this.loading);
        if (!this.tableService) { // can't ship this, need this to be defined
          return of({ results: [], total: 0 });
        };
        return this.tableService?.getTableResults(
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
            this.state.dataLoadingSource.next(this.loading);
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
    return merge(initialData, this.visibleData);
  }

  public disconnect(): void {}
}
