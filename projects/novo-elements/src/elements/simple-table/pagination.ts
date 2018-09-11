import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { NovoSimplePaginationEvent } from './interfaces';
import { NovoLabelService } from '../../services/novo-label-service';
import { NovoActivityTableState } from './state';

const DEFAULT_PAGE_SIZE = 50;

@Component({
  selector: 'novo-simple-table-pagination',
  template: `
        <div class="novo-simple-table-pagination-size">
            <novo-tiles *ngIf="displayedPageSizeOptions.length > 1"
                        [(ngModel)]="pageSize"
                        [options]="displayedPageSizeOptions"
                        (onChange)="changePageSize($event)"
                        data-automation-id="novo-simple-table-pagination-tiles">
            </novo-tiles>
            <div *ngIf="displayedPageSizeOptions.length <= 1">{{ pageSize }}</div>
        </div>

        <div class="novo-simple-table-range-label-long"data-automation-id="novo-simple-table-pagination-range-label-long">
            {{ longRangeLabel }}
        </div>
        <div class="novo-simple-table-range-label-short"data-automation-id="novo-simple-table-pagination-range-label-short">
            {{ shortRangeLabel }}
        </div>

        <button theme="dialogue" type="button"
                class="novo-simple-table-pagination-navigation-previous"
                (click)="previousPage()"
                icon="previous"
                side="left"
                [disabled]="!hasPreviousPage()"
                data-automation-id="novo-simple-table-pagination-previous">
            <span>{{ labels.previous }}</span>
        </button>
        <button theme="dialogue" type="button"
                class="novo-simple-table-pagination-navigation-next"
                (click)="nextPage()"
                icon="next"
                side="right"
                [disabled]="!hasNextPage()"
                data-automation-id="novo-simple-table-pagination-next">
            <span>{{ labels.next }}</span>
        </button>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoSimpleTablePagination implements OnInit, OnDestroy {
  private _initialized: boolean;

  @Input()
  get page(): number {
    return this._page;
  }
  set page(page: number) {
    this._page = page;
    this.changeDetectorRef.markForCheck();
    this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
    this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
    this.state.page = this._page;
  }
  _page: number = 0;

  @Input()
  get length(): number {
    return this._length;
  }
  set length(length: number) {
    this._length = length;
    this.changeDetectorRef.markForCheck();
    this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
    this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
  }
  _length: number = 0;

  @Input()
  get pageSize(): number {
    return this._pageSize;
  }
  set pageSize(pageSize: number) {
    this._pageSize = pageSize;
    this.updateDisplayedPageSizeOptions();
    this.state.pageSize = this._pageSize;
  }
  private _pageSize: number;

  @Input()
  get pageSizeOptions(): number[] {
    return this._pageSizeOptions;
  }
  set pageSizeOptions(pageSizeOptions: number[]) {
    this._pageSizeOptions = pageSizeOptions;
    this.updateDisplayedPageSizeOptions();
  }
  private _pageSizeOptions: number[] = [];

  @Output()
  pageChange = new EventEmitter<NovoSimplePaginationEvent>();

  public displayedPageSizeOptions: number[];
  public longRangeLabel: string;
  public shortRangeLabel: string;

  private resetSubscription: Subscription;

  constructor(private changeDetectorRef: ChangeDetectorRef, public labels: NovoLabelService, private state: NovoActivityTableState) {
    if (state && state.onReset) {
      this.resetSubscription = this.state.onReset.subscribe((clear: boolean) => {
        if (clear) {
          this.page = 0;
          this.changeDetectorRef.markForCheck();
        }
      });
    }
  }

  public ngOnInit(): void {
    this._initialized = true;
    this.updateDisplayedPageSizeOptions();
  }

  public ngOnDestroy(): void {
    this.resetSubscription.unsubscribe();
  }

  public nextPage(): void {
    if (!this.hasNextPage()) {
      return;
    }
    this.page++;
    this.emitPageEvent();
  }

  public previousPage(): void {
    if (!this.hasPreviousPage()) {
      return;
    }
    this.page--;
    this.emitPageEvent();
  }

  public hasPreviousPage(): boolean {
    return this.page >= 1 && this.pageSize !== 0;
  }

  public hasNextPage(): boolean {
    const numberOfPages = Math.ceil(this.length / this.pageSize) - 1;
    return this.page < numberOfPages && this.pageSize !== 0;
  }

  public changePageSize(pageSize: number): void {
    this.page = 0;
    this.pageSize = pageSize;
    this.emitPageEvent();
  }

  private updateDisplayedPageSizeOptions(): void {
    if (!this._initialized) {
      return;
    }
    if (!this.pageSize) {
      this._pageSize = this.pageSizeOptions.length !== 0 ? this.pageSizeOptions[0] : DEFAULT_PAGE_SIZE;
    }
    this.displayedPageSizeOptions = this.pageSizeOptions.slice();
    if (this.displayedPageSizeOptions.indexOf(this.pageSize) === -1) {
      this.displayedPageSizeOptions.push(this.pageSize);
    }
    this.displayedPageSizeOptions.sort((a, b) => a - b);
    this.changeDetectorRef.markForCheck();
    this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
    this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
  }

  private emitPageEvent(): void {
    let event = {
      page: this.page,
      pageSize: this.pageSize,
      length: this.length,
    };
    this.pageChange.next(event);
    this.state.page = this.page;
    this.state.pageSize = this.pageSize;
    this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
    this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
    this.state.updates.next(event);
  }
}
