import { CdkColumnDef, CdkHeaderCell } from '@angular/cdk/table';
import { ElementRef, OnInit, Renderer2 } from '@angular/core';
import { IDataTableColumn } from '../interfaces';
import * as i0 from "@angular/core";
export declare class NovoDataTableHeaderCell<T> extends CdkHeaderCell implements OnInit {
    private elementRef;
    private renderer;
    role: string;
    column: IDataTableColumn<T>;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableHeaderCell<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoDataTableHeaderCell<any>, "novo-data-table-header-cell", never, { "column": { "alias": "column"; "required": false; }; }, {}, never, never, false, never>;
}
