import { CdkCell, CdkCellDef, CdkColumnDef, CdkHeaderCell, CdkHeaderCellDef } from '@angular/cdk/table';
import { ChangeDetectorRef, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { SimpleTableActionColumn, SimpleTableActionColumnOption, SimpleTableColumn } from './interfaces';
import { NovoSelection } from './sort';
import * as i0 from "@angular/core";
/** Workaround for https://github.com/angular/angular/issues/17849 */
export declare const _NovoCellDef: typeof CdkCellDef;
export declare const _NovoHeaderCellDef: typeof CdkHeaderCellDef;
export declare const _NovoColumnDef: typeof CdkColumnDef;
export declare const _NovoHeaderCell: typeof CdkHeaderCell;
export declare const _NovoCell: typeof CdkCell;
export declare class NovoSimpleCellDef extends _NovoCellDef {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleCellDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoSimpleCellDef, "[novoSimpleCellDef]", never, {}, {}, never, never, false, never>;
}
export declare class NovoSimpleHeaderCellDef extends _NovoHeaderCellDef {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleHeaderCellDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoSimpleHeaderCellDef, "[novoSimpleHeaderCellDef]", never, {}, {}, never, never, false, never>;
}
export declare class NovoSimpleColumnDef extends _NovoColumnDef {
    get name(): string;
    set name(name: string);
    /**
     * This has been extracted to a util because of TS 4 and VE.
     * View Engine doesn't support property rename inheritance.
     * TS 4.0 doesn't allow properties to override accessors or vice-versa.
     * @docs-private
     */
    protected _setNameInput(value: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleColumnDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoSimpleColumnDef, "[novoSimpleColumnDef]", never, { "name": { "alias": "novoSimpleColumnDef"; "required": false; }; }, {}, never, never, false, never>;
}
export declare class NovoSimpleHeaderCell<T> extends _NovoHeaderCell implements OnInit {
    private elementRef;
    private renderer;
    role: string;
    column: SimpleTableColumn<T>;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleHeaderCell<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoSimpleHeaderCell<any>, "novo-simple-header-cell", never, { "column": { "alias": "column"; "required": false; }; }, {}, never, never, false, never>;
}
export declare class NovoSimpleEmptyHeaderCell extends _NovoHeaderCell {
    role: string;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleEmptyHeaderCell, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoSimpleEmptyHeaderCell, "novo-simple-empty-header-cell", never, {}, {}, never, never, false, never>;
}
export declare class NovoSimpleCheckboxHeaderCell extends _NovoHeaderCell implements OnDestroy {
    private _selection;
    role: string;
    selectAll: boolean;
    private selectAllSubscription;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, ref: ChangeDetectorRef, _selection: NovoSelection);
    ngOnDestroy(): void;
    toggle(value: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleCheckboxHeaderCell, [null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSimpleCheckboxHeaderCell, "novo-simple-checkbox-header-cell", never, {}, {}, never, never, false, never>;
}
export declare class NovoSimpleCell<T> extends _NovoCell implements OnInit {
    private elementRef;
    private renderer;
    role: string;
    row: any;
    column: SimpleTableColumn<T>;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    onClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleCell<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSimpleCell<any>, "novo-simple-cell", never, { "row": { "alias": "row"; "required": false; }; "column": { "alias": "column"; "required": false; }; }, {}, never, never, false, never>;
}
export declare class NovoSimpleCheckboxCell extends _NovoCell implements OnDestroy, OnInit {
    columnDef: CdkColumnDef;
    _selection: NovoSelection;
    role: string;
    row: any;
    index: any;
    selected: boolean;
    private selectAllSubscription;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, _selection: NovoSelection);
    ngOnInit(): void;
    ngOnDestroy(): void;
    toggle(value: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleCheckboxCell, [null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSimpleCheckboxCell, "novo-simple-checkbox-cell", never, { "row": { "alias": "row"; "required": false; }; "index": { "alias": "index"; "required": false; }; }, {}, never, never, false, never>;
}
export declare class NovoSimpleActionCell<T> extends _NovoCell implements OnInit {
    private elementRef;
    private renderer;
    labels: NovoLabelService;
    role: string;
    row: T;
    column: SimpleTableActionColumn<T>;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, labels: NovoLabelService);
    ngOnInit(): void;
    isDisabled(check: SimpleTableActionColumn<T> | SimpleTableActionColumnOption<T>, row: T): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleActionCell<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSimpleActionCell<any>, "novo-simple-action-cell", never, { "row": { "alias": "row"; "required": false; }; "column": { "alias": "column"; "required": false; }; }, {}, never, never, false, never>;
}
