import { CdkCell, CdkColumnDef } from '@angular/cdk/table';
import { ChangeDetectorRef, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NovoDataTableRef } from '../data-table.token';
import * as i0 from "@angular/core";
export declare class NovoDataTableCheckboxCell<T> extends CdkCell implements OnInit, OnDestroy {
    columnDef: CdkColumnDef;
    private dataTable;
    private ref;
    role: string;
    row: T;
    maxSelected: number;
    checked: boolean;
    private selectionSubscription;
    private resetSubscription;
    get isAtLimit(): boolean;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, dataTable: NovoDataTableRef, ref: ChangeDetectorRef);
    ngOnInit(): void;
    onClick(): void;
    getTooltip(): string;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableCheckboxCell<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDataTableCheckboxCell<any>, "novo-data-table-checkbox-cell", never, { "row": { "alias": "row"; "required": false; }; "maxSelected": { "alias": "maxSelected"; "required": false; }; }, {}, never, never, false, never>;
}
