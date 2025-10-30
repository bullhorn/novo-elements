import { CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef } from '@angular/cdk/table';
import * as i0 from "@angular/core";
/** Workaround for https://github.com/angular/angular/issues/17849 */
export declare const _NovoHeaderRowDef: typeof CdkHeaderRowDef;
export declare const _NovoCdkRowDef: typeof CdkRowDef;
export declare const _NovoHeaderRow: typeof CdkHeaderRow;
export declare const _NovoRow: typeof CdkRow;
export declare class NovoSimpleHeaderRowDef extends _NovoHeaderRowDef {
    columns: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleHeaderRowDef, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoSimpleHeaderRowDef, "[novoSimpleHeaderRowDef]", never, { "columns": { "alias": "novoSimpleHeaderRowDef"; "required": false; }; }, {}, never, never, false, never>;
}
export declare class NovoSimpleRowDef<T> extends _NovoCdkRowDef<T> {
    columns: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleRowDef<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoSimpleRowDef<any>, "[novoSimpleRowDef]", never, { "columns": { "alias": "novoSimpleRowDefColumns"; "required": false; }; }, {}, never, never, false, never>;
}
export declare class NovoSimpleHeaderRow extends _NovoHeaderRow {
    rowClass: string;
    role: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleHeaderRow, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSimpleHeaderRow, "novo-simple-header-row", never, {}, {}, never, never, false, never>;
}
export declare class NovoSimpleRow extends _NovoRow {
    rowClass: string;
    role: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSimpleRow, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSimpleRow, "novo-simple-row", never, {}, {}, never, never, false, never>;
}
