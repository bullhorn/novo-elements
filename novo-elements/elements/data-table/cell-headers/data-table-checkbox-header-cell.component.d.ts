import { CdkColumnDef, CdkHeaderCell } from '@angular/cdk/table';
import { ChangeDetectorRef, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { NovoToastService } from 'novo-elements/elements/toast';
import { NovoDataTableRef } from '../data-table.token';
import * as i0 from "@angular/core";
export declare class NovoDataTableCheckboxHeaderCell<T> extends CdkHeaderCell implements OnDestroy {
    private dataTable;
    private ref;
    private toaster;
    role: string;
    maxSelected: number;
    checked: boolean;
    private selectionSubscription;
    private paginationSubscription;
    private resetSubscription;
    get isAtLimit(): boolean;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, dataTable: NovoDataTableRef, ref: ChangeDetectorRef, toaster: NovoToastService);
    ngOnDestroy(): void;
    onClick(): void;
    private resetAllMatchingSelected;
    selectAllChanged(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableCheckboxHeaderCell<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDataTableCheckboxHeaderCell<any>, "novo-data-table-checkbox-header-cell", never, { "maxSelected": { "alias": "maxSelected"; "required": false; }; }, {}, never, never, false, never>;
}
