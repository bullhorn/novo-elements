import { Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { BooleanInput } from 'novo-elements/utils';

export interface PageChangeEvent {
  page: number;
  itemsPerPage: number;
  totalPages: number;
}

interface Page {
  num: number;
  text: string;
  active: boolean;
}
@Component({
  selector: 'novo-pagination',
  styleUrls: ['./pagination.scss'],
  template: `
    <ng-container *ngIf="!hidePageSize && pageSizeOptions.length > 1">
      <novo-label class="rows">{{ label }}</novo-label>
      <novo-select
        [placeholder]="labels.select"
        [(ngModel)]="itemsPerPage"
        (onSelect)="onPageSizeChanged($event)"
        [disabled]="disabled"
        data-automation-id="pager-select"
      >
        <novo-option *ngFor="let size of pageSizeOptions" [value]="size">{{ size }}</novo-option>
      </novo-select>
      <span class="spacer"></span>
    </ng-container>
    <ng-container *ngIf="!hidePageSize && pageSizeOptions.length === 1">
      <novo-label class="page-selection">{{ label }} {{ pageSizeOptions[0] }}</novo-label>
      <span class="spacer"></span>
    </ng-container>
    <ng-container *ngIf="hidePageSelection">
      <novo-caption class="page-selection">{{ labels.getRangeText(page - 1, itemsPerPage, totalItems, false) }}</novo-caption>
    </ng-container>
    <ul class="pager" data-automation-id="pager">
      <li *ngIf="showFirstAndLast" class="page first-page" (click)="selectPage(1)" [ngClass]="{ disabled: noPrevious() }">
        <i class="bhi-arrow-left" data-automation-id="pager-first"></i>
      </li>
      <li class="page prev-page" (click)="selectPage(page - 1)" [ngClass]="{ disabled: noPrevious() }">
        <i class="bhi-previous" data-automation-id="pager-previous"></i>
      </li>
      <ng-container *ngIf="!hidePageSelection">
        <li
          class="page"
          [ngClass]="{ active: p.active }"
          [class.disabled]="disabled || disablePageSelection"
          *ngFor="let p of pages"
          (click)="selectPage(p.num, $event)"
        >
          {{ p.text }}
        </li>
      </ng-container>
      <li class="page next-page" (click)="selectPage(page + 1)" [ngClass]="{ disabled: noNext() }">
        <i class="bhi-next" data-automation-id="pager-next"></i>
      </li>
      <li *ngIf="showFirstAndLast" class="page last-page" (click)="selectPage(totalPages)" [ngClass]="{ disabled: noNext() }">
        <i class="bhi-arrow-right" data-automation-id="pager-last"></i>
      </li>
    </ul>
  `,
})
export class NovoPaginationElement implements OnInit, OnChanges {
  @Input()
  page: number;
  @Input()
  totalItems: number;
  @Input()
  itemsPerPage = 10;
  @Input()
  pageSizeOptions = [10, 25, 50, 100];
  @Input()
  label: string;
  @Input()
  @BooleanInput()
  disablePageSelection = false;
  @Input()
  @BooleanInput()
  hidePageSelection = false;
  @Input()
  @BooleanInput()
  hidePageSize = false;
  @Input()
  @BooleanInput()
  showFirstAndLast = false;
  @Input()
  @BooleanInput()
  @HostBinding('class.disabled')
  disabled = false;
  @Output()
  pageChange = new EventEmitter<Number>();
  @Output()
  itemsPerPageChange = new EventEmitter<Number>();
  @Output()
  onPageChange = new EventEmitter<PageChangeEvent>();

  maxPagesDisplayed = 5;
  totalPages: number;
  pages: Array<Page>;

  constructor(public labels: NovoLabelService) {}

  ngOnInit() {
    this.label = this.label || this.labels.itemsPerPage;
  }

  ngOnChanges(changes?: SimpleChanges) {
    this.page = this.page || 1;
    this.totalPages = this.calculateTotalPages();
    this.pages = this.getPages(this.page, this.totalPages);
  }

  onPageSizeChanged(event) {
    this.page = 1;
    this.itemsPerPage = event.selected;
    this.totalPages = this.calculateTotalPages();
    this.pages = this.getPages(this.page, this.totalPages);
    this.pageChange.emit(this.page);
    this.itemsPerPageChange.emit(this.itemsPerPage);
    this.onPageChange.emit({
      page: this.page,
      itemsPerPage: this.itemsPerPage,
      totalPages: this.totalPages,
    });
  }

  selectPage(page: number, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }

    this.page = page;
    this.pages = this.getPages(this.page, this.totalPages);
    this.pageChange.emit(this.page);
    this.onPageChange.emit({
      page: this.page,
      itemsPerPage: this.itemsPerPage,
      totalPages: this.totalPages,
    });
  }

  noFirst() {
    return this.disabled || this.totalPages <= 1 || this.page === 1;
  }
  noPrevious() {
    return this.disabled || this.page === 1;
  }

  noNext() {
    return this.disabled || this.page === this.totalPages;
  }

  // Create page object used in template
  makePage(num: number, text: string, isActive: boolean) {
    return { num, text, active: isActive } as Page;
  }

  getPages(currentPage: number, totalPages: number) {
    const pages: Array<Page> = [];
    // Default page limits
    let startPage = 1;
    let endPage = totalPages;
    const isMaxSized = this.maxPagesDisplayed < totalPages;

    // recompute if maxPagesDisplayed
    if (isMaxSized) {
      // Current page is displayed in the middle of the visible ones
      startPage = Math.max(currentPage - Math.floor(this.maxPagesDisplayed / 2), 1);
      endPage = startPage + this.maxPagesDisplayed - 1;

      // Adjust if limit is exceeded
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - this.maxPagesDisplayed + 1;
      }
    }

    // Add page number links
    for (let num = startPage; num <= endPage; num++) {
      const page = this.makePage(num, num.toString(), num === currentPage);
      pages.push(page);
    }
    return pages;
  }

  calculateTotalPages() {
    const totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
    return Math.max(totalPages || 0, 1);
  }
}
