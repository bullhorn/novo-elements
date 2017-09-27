import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter,
    Input, OnDestroy, OnInit, Output, ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { NovoSimplePaginationEvent } from './interfaces';
import { NovoLabelService } from '../../services/novo-label-service';

const DEFAULT_PAGE_SIZE = 50;

@Component({
    selector: 'novo-simple-table-pagination',
    template: `
        <div class="novo-simple-table-pagination-size" *ngIf="!loading">
            <novo-tiles *ngIf="displayedPageSizeOptions.length > 1"
                        [(ngModel)]="pageSize"
                        [options]="displayedPageSizeOptions"
                        (onChange)="changePageSize($event)">
            </novo-tiles>
            <div *ngIf="displayedPageSizeOptions.length <= 1">{{ pageSize }}</div>
        </div>

        <div class="novo-simple-table-range-label-long">
            {{ longRangeLabel }}
        </div>
        <div class="novo-simple-table-range-label-short">
            {{ shortRangeLabel }}
        </div>

        <button theme="dialogue" type="button"
                class="novo-simple-table-pagination-navigation-previous"
                (click)="previousPage()"
                icon="previous"
                side="left"
                [disabled]="!hasPreviousPage()">
            <span>{{ labels.previous }}</span>
        </button>
        <button theme="dialogue" type="button"
                class="novo-simple-table-pagination-navigation-next"
                (click)="nextPage()"
                icon="next"
                side="right"
                [disabled]="!hasNextPage()">
            <span>{{ labels.next }}</span>
        </button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoSimpleTablePagination implements OnInit {
    private _initialized: boolean;

    @Input() loading: boolean;

    @Input()
    get page(): number { return this._page; }
    set page(page: number) {
        this._page = page;
        this.changeDetectorRef.markForCheck();
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
    }
    _page: number = 0;

    @Input()
    get length(): number { return this._length; }
    set length(length: number) {
        this._length = length;
        this.changeDetectorRef.markForCheck();
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
    }
    _length: number = 0;

    @Input()
    get pageSize(): number { return this._pageSize; }
    set pageSize(pageSize: number) {
        this._pageSize = pageSize;
        this.updateDisplayedPageSizeOptions();
    }
    private _pageSize: number;

    @Input()
    get pageSizeOptions(): number[] { return this._pageSizeOptions; }
    set pageSizeOptions(pageSizeOptions: number[]) {
        this._pageSizeOptions = pageSizeOptions;
        this.updateDisplayedPageSizeOptions();
    }
    private _pageSizeOptions: number[] = [];

    @Output() pageChange = new EventEmitter<NovoSimplePaginationEvent>();

    public displayedPageSizeOptions: number[];
    public longRangeLabel: string;
    public shortRangeLabel: string;

    constructor(private changeDetectorRef: ChangeDetectorRef, public labels: NovoLabelService) {
    }

    public ngOnInit(): void {
        this._initialized = true;
        this.updateDisplayedPageSizeOptions();
    }

    public nextPage(): void {
        if (!this.hasNextPage()) { return; }
        this.page++;
        this.emitPageEvent();
    }

    public previousPage(): void {
        if (!this.hasPreviousPage()) { return; }
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
        if (!this._initialized) { return; }
        if (!this.pageSize) {
            this._pageSize = this.pageSizeOptions.length !== 0 ?
                this.pageSizeOptions[0] :
                DEFAULT_PAGE_SIZE;
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
        this.pageChange.next({
            page: this.page,
            pageSize: this.pageSize,
            length: this.length
        });
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
    }
}
