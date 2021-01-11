// NG2
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
// APP
import { NovoLabelService } from '../../../../services/novo-label-service';

interface Page {
  num: number;
  text: string;
  active: boolean;
}
@Component({
  selector: 'novo-pagination',
  template: `
    <ng-container *ngIf="rowOptions.length > 1">
      <h5 class="rows">{{ label }}</h5>
      <novo-select
        [options]="rowOptions"
        [placeholder]="labels.select"
        [(ngModel)]="itemsPerPage"
        (onSelect)="onPageSizeChanged($event)"
        data-automation-id="pager-select"
      ></novo-select>
      <span class="spacer"></span>
    </ng-container>
    <ul class="pager" data-automation-id="pager">
      <li class="page" (click)="selectPage(page - 1)" [ngClass]="{ disabled: noPrevious() }">
        <i class="bhi-previous" data-automation-id="pager-previous"></i>
      </li>
      <li
        class="page"
        [ngClass]="{ active: p.active }"
        [class.disabled]="disablePageSelection"
        *ngFor="let p of pages"
        (click)="selectPage(p.num, $event)"
      >
        {{ p.text }}
      </li>
      <li class="page" (click)="selectPage(page + 1)" [ngClass]="{ disabled: noNext() }">
        <i class="bhi-next" data-automation-id="pager-next"></i>
      </li>
    </ul>
  `,
})
export class Pagination implements OnInit, OnChanges {
  @Input()
  page: number;
  @Input()
  totalItems: number;
  @Input()
  itemsPerPage = 10;
  @Input()
  rowOptions;
  @Input()
  label: string;
  @Input()
  get disablePageSelection(): boolean {
    return this.pageSelectDisabled;
  }
  set disablePageSelection(val: boolean) {
    this.pageSelectDisabled = coerceBooleanProperty(val);
  }
  @Output()
  pageChange = new EventEmitter();
  @Output()
  itemsPerPageChange = new EventEmitter();
  @Output()
  onPageChange = new EventEmitter();

  public pageSelectDisabled: boolean;
  maxPagesDisplayed = 5;
  totalPages: number;
  pages: Array<Page>;

  constructor(public labels: NovoLabelService) {}

  ngOnInit() {
    this.label = this.label || this.labels.itemsPerPage;
    this.rowOptions = this.rowOptions || this.getDefaultRowOptions();
  }

  ngOnChanges(changes?: SimpleChanges) {
    this.page = this.page || 1;
    this.totalPages = this.calculateTotalPages();
    this.pages = this.getPages(this.page, this.totalPages);
  }

  getDefaultRowOptions() {
    return [
      { value: 10, label: '10' },
      { value: 25, label: '25' },
      { value: 50, label: '50' },
      { value: 100, label: '100' },
    ];
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
    });
  }

  noPrevious() {
    return this.page === 1;
  }

  noNext() {
    return this.page === this.totalPages;
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
