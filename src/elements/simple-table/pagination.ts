import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

const DEFAULT_PAGE_SIZE = 50;

export class PageEvent {
    page: number;
    pageSize: number;
    length: number;
}

@Component({
    selector: 'simple-table-pagination',
    template: `
        <div class="simple-table-pagination-size">
            <novo-tiles *ngIf="_displayedPageSizeOptions.length > 1"
                        [(ngModel)]="pageSize"
                        [options]="_displayedPageSizeOptions"
                        (onChange)="_changePageSize($event)">
            </novo-tiles>
            <div *ngIf="_displayedPageSizeOptions.length <= 1">{{ pageSize }}</div>
        </div>

        <div class="simple-table-range-label">
            {{ _rangeLabel }}
        </div>

        <button theme="dialogue" type="button"
                class="simple-table-pagination-navigation-previous"
                (click)="previousPage()"
                icon="bhi-previous"
                [disabled]="!hasPreviousPage()">
            Previous
        </button>
        <button theme="dialogue" type="button"
                class="simple-table-pagination-navigation-next"
                (click)="nextPage()"
                icon="bhi-previous"
                [disabled]="!hasNextPage()">
            Next
        </button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleTablePagination implements OnInit {
    private _initialized: boolean;

    @Input()
    get page(): number { return this._page; }
    set page(page: number) {
        this._page = page;
        this._changeDetectorRef.markForCheck();
    }
    _page: number = 0;

    @Input()
    get length(): number { return this._length; }
    set length(length: number) {
        this._length = length;
        this._changeDetectorRef.markForCheck();
    }
    _length: number = 0;

    @Input()
    get pageSize(): number { return this._pageSize; }
    set pageSize(pageSize: number) {
        this._pageSize = pageSize;
        this._updateDisplayedPageSizeOptions();
    }
    private _pageSize: number;

    @Input()
    get pageSizeOptions(): number[] { return this._pageSizeOptions; }
    set pageSizeOptions(pageSizeOptions: number[]) {
        this._pageSizeOptions = pageSizeOptions;
        this._updateDisplayedPageSizeOptions();
    }
    private _pageSizeOptions: number[] = [];

    @Output() pageChange = new EventEmitter<PageEvent>();

    _displayedPageSizeOptions: number[];
    _rangeLabel: string = 'RANGE TODO';

    constructor(private _changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this._initialized = true;
        this._updateDisplayedPageSizeOptions();
    }

    nextPage() {
        if (!this.hasNextPage()) { return; }
        this.page++;
        this._emitPageEvent();
    }

    previousPage() {
        if (!this.hasPreviousPage()) { return; }
        this.page--;
        this._emitPageEvent();
    }

    hasPreviousPage() {
        return this.page >= 1 && this.pageSize !== 0;
    }

    hasNextPage() {
        const numberOfPages = Math.ceil(this.length / this.pageSize) - 1;
        return this.page < numberOfPages && this.pageSize !== 0;
    }

    _changePageSize(pageSize: number) {
        const startIndex = this.page * this.pageSize;
        this.page = Math.floor(startIndex / pageSize) || 0;

        this.pageSize = pageSize;
        this._emitPageEvent();
    }

    private _updateDisplayedPageSizeOptions() {
        if (!this._initialized) { return; }
        if (!this.pageSize) {
            this._pageSize = this.pageSizeOptions.length !== 0 ?
                this.pageSizeOptions[0] :
                DEFAULT_PAGE_SIZE;
        }
        this._displayedPageSizeOptions = this.pageSizeOptions.slice();
        if (this._displayedPageSizeOptions.indexOf(this.pageSize) === -1) {
            this._displayedPageSizeOptions.push(this.pageSize);
        }
        this._displayedPageSizeOptions.sort((a, b) => a - b);
        this._changeDetectorRef.markForCheck();
    }

    private _emitPageEvent() {
        this.pageChange.next({
            page: this.page,
            pageSize: this.pageSize,
            length: this.length
        });
    }
}
