import { ChangeDetectionStrategy, Component, ViewEncapsulation, HostBinding, Input, ViewChild } from '@angular/core';
import { CDK_TABLE_TEMPLATE, CdkTable } from '@angular/cdk/table';

import { NovoSortFilter, NovoSelection } from "./sort";

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

@Component({
    selector: 'novo-activity-table',
    template: `
    <div class="example-container">
    <div class="example-loading-shade" *ngIf="dataSource.isLoadingResults">
        <novo-loading *ngIf="dataSource.isLoadingResults"></novo-loading>
    </div>

    <novo-simple-table [dataSource]="dataSource" class="example-table" novoSortFilter novoSelection>
        <ng-content></ng-content>
        <ng-container novoColumnDef="selection">
            <novo-checkbox-header-cell *novoHeaderCellDef></novo-checkbox-header-cell>
            <novo-checkbox-cell *novoCellDef="let row; let i = index" [row]="row" [index]="i"></novo-checkbox-cell>
        </ng-container>
        <ng-container *ngFor="let column of columns" [novoColumnDef]="column.id">
            <novo-header-cell *novoHeaderCellDef [novo-header-config]="column.config">{{ column.label }}</novo-header-cell>
            <novo-cell *novoCellDef="let row" [column]="column" [row]="row"></novo-cell>
        </ng-container>
        <novo-header-row *novoHeaderRowDef="displayedColumns"></novo-header-row>
        <novo-row *novoRowDef="let row; columns: displayedColumns;"></novo-row>
    </novo-simple-table>

    <!-- <novo-paginator [length]="dataSource.resultsLength" [pageSize]="30">
    </novo-paginator> -->
</div>
`
})
export class NovoActivityTable {
    @Input() dataSource;
    @Input() columns;
    @Input() displayedColumns;

    @ViewChild(NovoSortFilter) sort: NovoSortFilter;
    @ViewChild(NovoSelection) selection: NovoSelection;
}
