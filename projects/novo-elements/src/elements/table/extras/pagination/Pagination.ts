// NG2
import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
// APP
import { NovoLabelService } from '../../../../services/novo-label-service';

@Component({
  selector: 'novo-pagination',
  template: `
        <h5 class="rows">{{label}}</h5>
        <novo-select [options]="rowOptions" [placeholder]="labels.select" [(ngModel)]="itemsPerPage" (onSelect)="onPageSizeChanged($event)" data-automation-id="pager-select"></novo-select>
        <span class="spacer"></span>
        <ul class="pager" data-automation-id="pager">
            <li class="page" (click)="selectPage(page-1)" [ngClass]="{'disabled': noPrevious()}"><i class="bhi-previous" data-automation-id="pager-previous"></i></li>
            <li class="page" [ngClass]="{active: p.number==page}" [class.disabled]="disablePageSelection" *ngFor="let p of pages" (click)="selectPage(p.number)">{{p.text}}</li>
            <li class="page" (click)="selectPage(page+1)" [ngClass]="{'disabled': noNext()}"><i class="bhi-next" data-automation-id="pager-next"></i></li>
        </ul>
  `,
})
export class Pagination implements OnInit, OnChanges {
  @Input()
  page: number;
  @Input()
  totalItems: number;
  @Input()
  itemsPerPage: number = 10;
  @Input()
  rowOptions: any;
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
  pageChange: EventEmitter<any> = new EventEmitter();
  @Output()
  itemsPerPageChange: EventEmitter<any> = new EventEmitter();
  @Output()
  onPageChange: EventEmitter<any> = new EventEmitter();

  public pageSelectDisabled: boolean;
  maxPagesDisplayed: number = 5;
  totalPages: number;
  pages: Array<any>;

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
    return [{ value: 10, label: '10' }, { value: 25, label: '25' }, { value: 50, label: '50' }, { value: 100, label: '100' }];
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

  selectPage(page, event?: any) {
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
  makePage(number, text, isActive) {
    return {
      number: number,
      text: text,
      active: isActive,
    };
  }

  getPages(currentPage, totalPages) {
    let pages = [];
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
    for (let number = startPage; number <= endPage; number++) {
      const page = this.makePage(number, number.toString(), number === currentPage);
      pages.push(page);
    }
    return pages;
  }

  calculateTotalPages() {
    const totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
    return Math.max(totalPages || 0, 1);
  }
}
