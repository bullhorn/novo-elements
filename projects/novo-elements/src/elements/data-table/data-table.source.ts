import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { DataSource } from '@angular/cdk/table';
import { ChangeDetectorRef, ElementRef } from '@angular/core';
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
  public headerRow: ElementRef;

  private totalSet: boolean = false;

  itemsLoadedAtOnce = 20; // set dynamically based on row height and viewport?
  itemSize = 33;
  rowHeight = 33;
  offset = 0;
  private readonly visibleData: BehaviorSubject<any[]> = new BehaviorSubject([]);

  private _data: any[];
  get data(): any[] {
    return this._data.slice();
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
      const slicedData = this._data.slice(start - prevExtraData, start + (this.itemsLoadedAtOnce - prevExtraData));
      this.offset = this.rowHeight * (start - prevExtraData);
      this.viewport.setRenderedContentOffset(this.offset);
      console.log('offset', this.offset, start, this.rowHeight)
      console.log('viewport', this.viewport.getViewportSize(), this.viewport)
      let haha = start * this.rowHeight * 1.02;
      let magicNumber = haha * .005;
      console.log('headerOffset', haha, this.viewport.getViewportSize(), magicNumber)
      let headerOffset = haha < this.viewport.getViewportSize() - 35 ? 0 : this.viewport.getViewportSize() - 35 + magicNumber;
      this.headerRow.nativeElement.style.transform = `translateY(${headerOffset}px)`;
      console.log('UPDATE scroll', this.headerRow.nativeElement.style.transform)
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
