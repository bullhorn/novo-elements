import { ChangeDetectionStrategy, Component, ViewEncapsulation, HostBinding, Input, ViewChild, Directive, ElementRef } from '@angular/core';
import { CDK_TABLE_TEMPLATE, CdkTable } from '@angular/cdk/table';

import { NovoSortFilter, NovoSelection } from './sort';
import { SimpleTablePagination } from './pagination';
import { SimpleTableColumn, SimpleTableButtonColumn } from './interfaces';

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
    @HostBinding('class') public tableClass = 'novo-table';
}

@Directive({
    selector: 'novo-activity-table-header'
})
export class NovoActivityTableHeader { }

@Directive({
    selector: 'novo-activity-table-footer'
})
export class NovoActivityTableFooter { }

@Component({
    selector: 'novo-activity-table',
    template: `
        <header>
            <simple-table-pagination
                [length]="dataSource.total"
                [page]="0"
                [pageSize]="25"
                [pageSizeOptions]="[5, 10, 25, 100]">
            </simple-table-pagination>
        </header>
        <div class="novo-activity-table-loading-mask" *ngIf="dataSource.loading">
            <novo-loading></novo-loading>
        </div>
        <novo-simple-table [dataSource]="dataSource" novoSortFilter novoSelection>
            <ng-content></ng-content>
            <ng-container novoColumnDef="selection">
                <novo-checkbox-header-cell *novoHeaderCellDef></novo-checkbox-header-cell>
                <novo-checkbox-cell *novoCellDef="let row; let i = index" [row]="row" [index]="i"></novo-checkbox-cell>
            </ng-container>
            <ng-container *ngFor="let column of buttonColumns" [novoColumnDef]="column.icon">
                <novo-empty-header-cell class="button-header-cell" *novoHeaderCellDef></novo-empty-header-cell>
                <novo-button-cell *novoCellDef="let row; let i = index" [row]="row" [column]="column"></novo-button-cell>
            </ng-container>
            <ng-container *ngFor="let column of columns" [novoColumnDef]="column.id">
                <novo-header-cell *novoHeaderCellDef [novo-header-config]="column.config">{{ column.label }}</novo-header-cell>
                <novo-cell *novoCellDef="let row" [column]="column" [row]="row"></novo-cell>
            </ng-container>
            <novo-header-row *novoHeaderRowDef="displayedColumns"></novo-header-row>
            <novo-row *novoRowDef="let row; columns: displayedColumns;"></novo-row>
        </novo-simple-table>
    `
})
export class NovoActivityTable<T> {
    @Input() dataSource;
    @Input() columns: SimpleTableColumn<T>[];
    @Input() displayedColumns: string[];
    @Input() buttonColumns: SimpleTableButtonColumn<T>[];

    @ViewChild(NovoSortFilter) sort: NovoSortFilter;
    @ViewChild(NovoSelection) selection: NovoSelection;
    @ViewChild(SimpleTablePagination) pagination: SimpleTablePagination;
}
