import { NovoToastService } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Basic Header Example
 */
export declare class RecordHeaderExample {
    private toaster;
    theme: string;
    icon: string;
    record: any;
    values: any[];
    tabs: string[];
    private options;
    private themeIndex;
    constructor(toaster: NovoToastService);
    refresh(): void;
    changeTheme(): void;
    catchEv(type: any, ev: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordHeaderExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RecordHeaderExample, "record-header-example", never, {}, {}, never, never, false, never>;
}
