import { OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { NovoDataTableRef } from './data-table.token';
import { DataTableState } from './state/data-table-state.service';
import * as i0 from "@angular/core";
export declare class NovoDataTableExpandDirective<T> implements OnDestroy {
    vcRef: ViewContainerRef;
    private state;
    private dataTable;
    row: T;
    template: TemplateRef<any>;
    private subscription;
    constructor(vcRef: ViewContainerRef, state: DataTableState<T>, dataTable: NovoDataTableRef);
    shouldExpandAllRows: (targetId: number) => boolean;
    shouldExpandOneRow: (targetId: number) => boolean;
    ngOnDestroy(): void;
    onClick(event: MouseEvent): void;
    private clear;
    private render;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDataTableExpandDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoDataTableExpandDirective<any>, "[novoDataTableExpand]", never, { "row": { "alias": "row"; "required": false; }; "template": { "alias": "novoDataTableExpand"; "required": false; }; }, {}, never, never, false, never>;
}
