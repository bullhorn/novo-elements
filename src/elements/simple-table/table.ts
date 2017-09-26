import {
    ChangeDetectionStrategy, Component, ViewEncapsulation, HostBinding,
    Input, ViewChild, Directive, ElementRef, EventEmitter, Output, OnInit
} from '@angular/core';
import { CDK_TABLE_TEMPLATE, CdkTable } from '@angular/cdk/table';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { NovoSortFilter, NovoSelection } from './sort';
import { NovoSimpleTablePagination } from './pagination';
import { SimpleTableColumn, SimpleTableActionColumn, SimpleTablePaginationOptions } from './interfaces';

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
    @HostBinding('class') public tableClass = 'novo-simple-table';
}

@Directive({
    selector: 'novo-activity-table-actions'
})
export class NovoActivityTableActions { }

@Component({
    selector: 'novo-activity-table',
    template: `
        <header>
            <novo-search alwaysOpen="true" (searchChanged)="onSearchChange($event)" *ngIf="!hideGlobalSearch"></novo-search>
            <novo-simple-table-pagination
                [length]="dataSource.total"
                [page]="paginationOptions.page"
                [pageSize]="paginationOptions.pageSize"
                [pageSizeOptions]="paginationOptions.pageSizeOptions">
            </novo-simple-table-pagination>
            <div class="novo-activity-table-actions">
                <ng-content select="[novo-activity-table-actions]"></ng-content>
            </div>
        </header>
        <div class="novo-activity-table-loading-mask" *ngIf="dataSource.loading">
            <novo-loading></novo-loading>
        </div>
        <novo-simple-table [dataSource]="dataSource" novoSortFilter novoSelection>
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
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoActivityTable<T> implements OnInit {
    @HostBinding('class.global-search-hidden') globalSearchHiddenClassToggle: boolean = false;

    @Input() dataSource;
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

    public ngOnInit(): void {
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
