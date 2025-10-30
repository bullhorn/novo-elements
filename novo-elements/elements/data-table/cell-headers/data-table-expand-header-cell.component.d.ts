import { CdkColumnDef, CdkHeaderCell } from '@angular/cdk/table';
import { ChangeDetectorRef, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { NovoDataTableRef } from '../data-table.token';
import * as i0 from "@angular/core";
export declare class NovoDataTableExpandHeaderCell<T> extends CdkHeaderCell implements OnDestroy {
    private dataTable;
    private ref;
    role: string;
    expanded: boolean;
    private expandSubscription;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, dataTable: NovoDataTableRef, ref: ChangeDetectorRef);
    ngOnDestroy(): void;
    expandAll(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableExpandHeaderCell<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDataTableExpandHeaderCell<any>, "novo-data-table-expand-header-cell", never, {}, {}, never, never, false, never>;
}
