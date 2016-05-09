import { Component, EventEmitter } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { NOVO_SELECT_ELEMENTS } from '../../../select';

@Component({
    selector: 'novo-pagination',
    inputs: [
        'page',
        'totalItems',
        'itemsPerPage'
    ],
    outputs: ['onPageChange'],
    directives: [
        CORE_DIRECTIVES,
        NOVO_SELECT_ELEMENTS
    ],
    template: `
        <h5 class="rows">Rows Per Page: </h5>
        <bh-select [items]="pageOptions" placeholder="Select..." [value]="itemsPerPage" (valueChange)="onPageSizeChanged($event)" data-automation-id="pager-select"></bh-select>
        <spacer></spacer>
        <ul class="pager" data-automation-id="pager">
            <li class="page" (click)="selectPage(page-1)"><i class="bhi-previous" [hidden]="noPrevious()" data-automation-id="pager-previous"></i></li>
            <li class="page" [ngClass]="{active: p.number==page}" *ngFor="let p of pages" (click)="selectPage(p.number)">{{p.text}}</li>
            <li class="page" (click)="selectPage(page+1)"><i class="bhi-next" [hidden]="noNext()" data-automation-id="pager-next"></i></li>
        </ul>
  `
})
export class Pagination {
    constructor() {
        this.maxPagesDisplayed = 5;
        this.itemsPerPage = 10;
        this.pageOptions = ['10', '50', '500'];
        this.onPageChange = new EventEmitter();
    }

    ngOnChanges() {
        this.page = this.page || 1;
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
    }

    onPageSizeChanged(event) {
        this.page = 1;
        this.itemsPerPage = event.selected;
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
        this.onPageChange.emit({
            page: this.page,
            itemsPerPage: this.itemsPerPage
        });
    }

    selectPage(page, event) {
        if (event) {
            event.preventDefault();
        }

        this.page = page;
        this.pages = this.getPages(this.page, this.totalPages);
        this.onPageChange.emit({
            page: this.page,
            itemsPerPage: this.itemsPerPage
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
            active: isActive
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
