import { NovoToastService } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Details Card Example
 */
export declare class DetailsCardExample {
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
    static ɵfac: i0.ɵɵFactoryDeclaration<DetailsCardExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DetailsCardExample, "details-card-example", never, {}, {}, never, never, false, never>;
}
