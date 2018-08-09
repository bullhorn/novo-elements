import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  HostBinding,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { IDataTablePaginationEvent } from '../interfaces';
import { NovoLabelService } from '../../../services/novo-label-service';
import { DataTableState } from '../state/data-table-state.service';

const DEFAULT_PAGE_SIZE = 50;
const MAX_PAGES_DISPLAYED = 5;

@Component({
  selector: 'novo-data-table-pagination',
  template: `
      <ng-container *ngIf="theme === 'basic' || theme === 'basic-wide'">
        <div class="novo-data-table-pagination-size">
            <novo-tiles *ngIf="displayedPageSizeOptions.length > 1"
                        [(ngModel)]="pageSize"
                        [options]="displayedPageSizeOptions"
                        (onChange)="changePageSize($event)"
                        data-automation-id="novo-data-table-pagination-tiles">
            </novo-tiles>
            <div *ngIf="displayedPageSizeOptions.length <= 1">{{ pageSize }}</div>
        </div>

        <div class="novo-data-table-range-label-long" data-automation-id="novo-data-table-pagination-range-label-long">
            {{ longRangeLabel }}
        </div>
        <div class="novo-data-table-range-label-short" data-automation-id="novo-data-table-pagination-range-label-short">
            {{ shortRangeLabel }}
        </div>
        <span class="spacer novo-data-table-spacer" *ngIf="theme === 'basic-wide'"></span>
        <button theme="dialogue" type="button"
                class="novo-data-table-pagination-navigation-previous"
                (click)="previousPage()"
                icon="previous"
                side="left"
                [disabled]="!hasPreviousPage()"
                data-automation-id="novo-data-table-pagination-previous">
            <span>{{ labels.previous }}</span>
        </button>
        <button theme="dialogue" type="button"
                class="novo-data-table-pagination-navigation-next"
                (click)="nextPage()"
                icon="next"
                side="right"
                [disabled]="!hasNextPage()"
                data-automation-id="novo-data-table-pagination-next">
            <span>{{ labels.next }}</span>
        </button>
      </ng-container>
      <ng-container *ngIf="theme === 'standard'">
        <h5 class="rows">{{ labels.itemsPerPage }}</h5>
        <novo-select [options]="displayedPageSizeOptions" [placeholder]="labels.select" [(ngModel)]="pageSize" (onSelect)="changePageSize($event.selected)" data-automation-id="pager-select"></novo-select>
        <span class="spacer"></span>
        <ul class="pager" data-automation-id="pager">
            <li class="page" (click)="selectPage(page - 1)" [ngClass]="{ 'disabled': page === 0 }"><i class="bhi-previous" data-automation-id="pager-previous"></i></li>
            <li class="page" [ngClass]="{active: p.number === page + 1}" *ngFor="let p of pages" (click)="selectPage(p.number - 1)">{{ p.text }}</li>
            <li class="page" (click)="selectPage(page + 1)" [ngClass]="{ 'disabled': page + 1 === totalPages }"><i class="bhi-next" data-automation-id="pager-next"></i></li>
        </ul>
      </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoDataTablePagination<T> implements OnInit, OnDestroy {
  @HostBinding('class')
  @Input()
  theme: string = 'standard';

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
  get pageSizeOptions(): any[] {
    return this._pageSizeOptions;
  }
  set pageSizeOptions(pageSizeOptions: any[]) {
    this._pageSizeOptions = pageSizeOptions;
    this.updateDisplayedPageSizeOptions();
  }
  private _pageSizeOptions: any[] = [];

  @Input()
  get length(): number {
    return this._length;
  }
  set length(length: number) {
    this._length = length;
    this.changeDetectorRef.markForCheck();
    this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
    this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
    this.totalPages = this.calculateTotalPages();
    this.pages = this.getPages(this.page, this.totalPages);
  }
  _length: number = 0;

  @Output()
  pageChange = new EventEmitter<IDataTablePaginationEvent>();

  public displayedPageSizeOptions: { value: string; label: string }[];
  public longRangeLabel: string;
  public shortRangeLabel: string;
  public pages: { number: number; text: string; active: boolean }[];

  private resetSubscription: Subscription;
  private totalPages: number;
  private _initialized: boolean;

  constructor(private changeDetectorRef: ChangeDetectorRef, public labels: NovoLabelService, private state: DataTableState<T>) {
    this.resetSubscription = this.state.resetSource.subscribe(() => {
      this.page = 0;
      this.changeDetectorRef.markForCheck();
    });
  }

  public ngOnInit(): void {
    this._initialized = true;
    this.updateDisplayedPageSizeOptions();
  }

  public ngOnDestroy(): void {
    this.resetSubscription.unsubscribe();
  }

  public selectPage(page) {
    this.page = page;
    this.emitPageEvent();
  }

  public nextPage(): void {
    if (!this.hasNextPage()) {
      return;
    }
    this.page++;
    this.pages = this.getPages(this.page, this.totalPages);
    this.emitPageEvent();
  }

  public previousPage(): void {
    if (!this.hasPreviousPage()) {
      return;
    }
    this.page--;
    this.pages = this.getPages(this.page, this.totalPages);
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
    this.emitPageEvent(true);
  }

  private updateDisplayedPageSizeOptions(): void {
    if (!this._initialized) {
      return;
    }
    if (!this.displayedPageSizeOptions) {
      this.displayedPageSizeOptions = [];
      this.pageSizeOptions.forEach((option: any) => {
        if (option.hasOwnProperty('value')) {
          this.displayedPageSizeOptions.push(option);
        } else {
          this.displayedPageSizeOptions.push({
            value: option,
            label: option,
          });
        }
      });
    }
    this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
    this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
    this.totalPages = this.calculateTotalPages();
    this.pages = this.getPages(this.page, this.totalPages);
    this.changeDetectorRef.detectChanges();
  }

  private emitPageEvent(isPageSizeChange: boolean = false): void {
    let event = {
      page: this.page,
      pageSize: this.pageSize,
      length: this.length,
      filter: this.state.filter,
      sort: this.state.sort,
    };
    this.pageChange.next(event);
    this.state.page = this.page;
    this.state.pageSize = this.pageSize;
    this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
    this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
    this.totalPages = this.calculateTotalPages();
    this.pages = this.getPages(this.page, this.totalPages);
    this.state.updates.next(event);
    this.state.onPaginationChange(isPageSizeChange, this.pageSize);
  }

  private calculateTotalPages() {
    const totalPages = this.pageSize < 1 ? 1 : Math.ceil(this.length / this.pageSize);
    return Math.max(totalPages || 0, 1);
  }

  private makePage(number: number, text: string, isActive: boolean): { number: number; text: string; active: boolean } {
    return {
      number: number,
      text: text,
      active: isActive,
    };
  }

  private getPages(currentPage: number, totalPages: number): { number: number; text: string; active: boolean }[] {
    let pages = [];

    // Default page limits
    let startPage = 1;
    let endPage = totalPages;
    const isMaxSized = MAX_PAGES_DISPLAYED < totalPages;

    // Recompute if maxPagesDisplayed
    if (isMaxSized) {
      // Current page is displayed in the middle of the visible ones
      startPage = Math.max(currentPage - Math.floor(MAX_PAGES_DISPLAYED / 2), 1);
      endPage = startPage + MAX_PAGES_DISPLAYED - 1;

      // Adjust if limit is exceeded
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - MAX_PAGES_DISPLAYED + 1;
      }
    }

    // Add page number links
    for (let number = startPage; number <= endPage; number++) {
      const page = this.makePage(number, number.toString(), number === currentPage);
      pages.push(page);
    }
    return pages;
  }
}
