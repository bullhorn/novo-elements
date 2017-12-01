import { CdkHeaderRow, CdkRow, CdkRowDef, CdkHeaderRowDef } from '@angular/cdk/table';
/** Workaround for https://github.com/angular/angular/issues/17849 */
export declare const _NovoHeaderRowDef: typeof CdkHeaderRowDef;
export declare const _NovoCdkRowDef: typeof CdkRowDef;
export declare const _NovoHeaderRow: typeof CdkHeaderRow;
export declare const _NovoRow: typeof CdkRow;
export declare class NovoSimpleHeaderRowDef extends _NovoHeaderRowDef {
    columns: any;
}
export declare class NovoSimpleRowDef<T> extends _NovoCdkRowDef<T> {
    columns: any;
}
export declare class NovoSimpleHeaderRow extends _NovoHeaderRow {
    rowClass: string;
    role: string;
}
export declare class NovoSimpleRow extends _NovoRow {
    rowClass: string;
    role: string;
}
