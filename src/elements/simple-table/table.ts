import {
    ChangeDetectionStrategy, Component, ViewEncapsulation, HostBinding,
    Input, ViewChild, Directive, EventEmitter, Output, AfterContentInit,
    OnChanges, SimpleChanges, ChangeDetectorRef
} from '@angular/core';
import { CDK_TABLE_TEMPLATE, CdkTable } from '@angular/cdk/table';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { NovoSortFilter, NovoSelection } from './sort';
import { NovoSimpleTablePagination } from './pagination';
import { SimpleTableColumn, SimpleTableActionColumn, SimpleTablePaginationOptions } from './interfaces';
import { ActivityTableService, ActivityTableDataSource } from './table-source';
import { NovoLabelService } from '../../services/novo-label-service';

/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _NovoTable = CdkTable;

@Component({
    moduleId: module.id,
    selector: 'novo-simple-table',
    template: CDK_TABLE_TEMPLATE,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoTable<T> extends _NovoTable<T> {
}

@Directive({
    selector: 'novo-activity-table-actions'
})
export class NovoActivityTableActions { }

@Directive({
    selector: 'novo-activity-table-empty-message'
})
export class NovoActivityTableEmptyMessage { }

@Directive({
    selector: 'novo-activity-table-no-results-message'
})
export class NovoActivityTableNoResultsMessage { }

@Component({
    selector: 'novo-activity-table',
    template: `
        <header [hidden]="(dataSource?.total === 0 && !userFiltered) || loading">
            <novo-search alwaysOpen="true" (searchChanged)="onSearchChange($event)" *ngIf="!hideGlobalSearch"></novo-search>
            <novo-simple-table-pagination
                [loading]="loading"
                [length]="dataSource?.total"
                [page]="paginationOptions.page"
                [pageSize]="paginationOptions.pageSize"
                [pageSizeOptions]="paginationOptions.pageSizeOptions">
            </novo-simple-table-pagination>
            <div class="novo-activity-table-actions">
                <ng-content select="[novo-activity-table-actions]"></ng-content>
            </div>
        </header>
        <div class="novo-activity-table-loading-mask" *ngIf="dataSource?.loading || loading">
            <novo-loading></novo-loading>
        </div>
        <novo-simple-table *ngIf="columns?.length > 0" [dataSource]="dataSource" novoSortFilter novoSelection [hidden]="dataSource?.total === 0 && !userFiltered" [class.empty]="dataSource?.current === 0 && userFiltered">
            <ng-content></ng-content>
            <ng-container novoSimpleColumnDef="selection">
                <novo-simple-checkbox-header-cell *novoSimpleHeaderCellDef></novo-simple-checkbox-header-cell>
                <novo-simple-checkbox-cell *novoSimpleCellDef="let row; let i = index" [row]="row" [index]="i"></novo-simple-checkbox-cell>
            </ng-container>
            <ng-container *ngFor="let column of actionColumns" [novoSimpleColumnDef]="column.id">
                <novo-simple-empty-header-cell [class.button-header-cell]="!column.options" [class.dropdown-header-cell]="column.options" *novoSimpleHeaderCellDef></novo-simple-empty-header-cell>
                <novo-simple-action-cell *novoSimpleCellDef="let row; let i = index" [row]="row" [column]="column"></novo-simple-action-cell>
            </ng-container>
            <ng-container *ngFor="let column of columns" [novoSimpleColumnDef]="column.id">
                <novo-simple-header-cell *novoSimpleHeaderCellDef [column]="column" [novo-simple-cell-config]="column.config">{{ column.label }}</novo-simple-header-cell>
                <novo-simple-cell *novoSimpleCellDef="let row" [column]="column" [row]="row"></novo-simple-cell>
            </ng-container>
            <novo-simple-header-row *novoSimpleHeaderRowDef="displayedColumns"></novo-simple-header-row>
            <novo-simple-row *novoSimpleRowDef="let row; columns: displayedColumns;"></novo-simple-row>
        </novo-simple-table>
        <div class="novo-activity-table-no-results-container" *ngIf="dataSource?.current === 0 && userFiltered && !dataSource?.loading">
            <div #filtered><ng-content select="[novo-activity-table-no-results-message]"></ng-content></div>
            <div class="novo-activity-table-empty-message" *ngIf="filtered.childNodes.length == 0">
                <h4><i class="bhi-search-question"></i> {{ labels.noMatchingRecordsMessage }}</h4>
            </div>
        </div>
        <div class="novo-activity-table-empty-container" *ngIf="dataSource?.total === 0 && !dataSource?.loading">
            <div #empty><ng-content select="[novo-activity-table-empty-message]"></ng-content></div>
            <div class="novo-activity-table-empty-message" *ngIf="empty.childNodes.length == 0">
                <h4><i class="bhi-search-question"></i> {{ labels.emptyTableMessage }}</h4>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoActivityTable<T> implements AfterContentInit, OnChanges {
    @HostBinding('class.global-search-hidden') globalSearchHiddenClassToggle: boolean = false;
    @HostBinding('class.loading') loading: boolean = true;

    @Input() activityService: ActivityTableService<T>;
    @Input() columns: SimpleTableColumn<T>[];
    @Input() displayedColumns: string[];
    @Input() actionColumns: SimpleTableActionColumn<T>[];
    @Input() paginationOptions: SimpleTablePaginationOptions;

    @Input() set hideGlobalSearch(v: boolean) {
        this._hideGlobalSearch = coerceBooleanProperty(v);
        this.globalSearchHiddenClassToggle = this._hideGlobalSearch;
    }
    get hideGlobalSearch() {
        return this._hideGlobalSearch;
    }
    private _hideGlobalSearch: boolean;

    @Output() globalSearchChange: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild(NovoSortFilter) sort: NovoSortFilter;
    @ViewChild(NovoSelection) selection: NovoSelection;
    @ViewChild(NovoSimpleTablePagination) pagination: NovoSimpleTablePagination;

    public currentGlobalSearch: string;
    public dataSource: ActivityTableDataSource<T>;

    @HostBinding('class.empty') get empty() {
        return this.dataSource && this.dataSource.total === 0;
    }

    get userFiltered(): boolean {
        if (!this.sort) {
            return false;
        }
        return !!(this.sort.currentFilterColumn || this.sort.currentSortColumn || this.currentGlobalSearch);
    }

    constructor(public labels: NovoLabelService, private ref: ChangeDetectorRef) {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (!this.dataSource) {
            if (changes.columns.currentValue !== undefined) {
                // Setup the data source on the NEXT cycle, so that the ViewChilds are working
                setTimeout(() => {
                    this.loading = false;
                    this.dataSource = new ActivityTableDataSource<T>(this.activityService, this);
                    this.ref.markForCheck();
                });
            }
        }
    }

    public ngAfterContentInit(): void {
        if (!this.paginationOptions) {
            this.paginationOptions = {}
        }
        if (!this.paginationOptions.page) {
            this.paginationOptions.page = 0;
        }
        if (!this.paginationOptions.pageSize) {
            this.paginationOptions.pageSize = 50;
        }
        if (!this.paginationOptions.pageSizeOptions) {
            this.paginationOptions.pageSizeOptions = [10, 25, 50, 100];
        }
    }

    public onSearchChange(term: string): void {
        this.currentGlobalSearch = term;
        this.globalSearchChange.emit(term);
    }
}
