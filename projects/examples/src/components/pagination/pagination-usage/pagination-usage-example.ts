import { Component } from '@angular/core';
import { PageChangeEvent } from 'novo-elements/components/pagination';

/**
 * @title Pagination Usage Example
 */
@Component({
  selector: 'pagination-usage-example',
  templateUrl: 'pagination-usage-example.html',
  styleUrls: ['pagination-usage-example.css'],
})
export class PaginationUsageExample {
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50, 100];

  disablePageSelection = false;
  hidePageSelection = false;
  hidePageSize = false;
  showFirstAndLast = true;
  disabled = false;

  pageEvent: PageChangeEvent;

  handlePageEvent(e: PageChangeEvent) {
    this.pageEvent = e;
    this.length = e.itemsPerPage * e.totalPages;
    this.pageSize = e.itemsPerPage;
    this.pageIndex = e.page;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map((str) => +str);
    }
  }
}
