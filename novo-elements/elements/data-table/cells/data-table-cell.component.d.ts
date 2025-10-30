import { CdkCell, CdkColumnDef } from '@angular/cdk/table';
import { ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2, TemplateRef } from '@angular/core';
import { IDataTableColumn } from '../interfaces';
import * as i0 from "@angular/core";
export declare class NovoDataTableCell<T> extends CdkCell implements OnInit, OnDestroy {
    private elementRef;
    private renderer;
    role: string;
    row: T;
    template: TemplateRef<any>;
    column: IDataTableColumn<T>;
    resized: EventEmitter<IDataTableColumn<T>>;
    private subscriptions;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private calculateWidths;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableCell<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDataTableCell<any>, "novo-data-table-cell", never, { "row": { "alias": "row"; "required": false; }; "template": { "alias": "template"; "required": false; }; "column": { "alias": "column"; "required": false; }; "resized": { "alias": "resized"; "required": false; }; }, {}, never, never, false, never>;
}
