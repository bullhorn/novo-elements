import { NovoToastService } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Condensed Header Example
 */
export declare class CondensedHeaderExample {
    private toaster;
    theme: string;
    icon: string;
    options: any;
    themeIndex: number;
    constructor(toaster: NovoToastService);
    changeTheme(): void;
    catchEv(type: any, ev: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CondensedHeaderExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CondensedHeaderExample, "condensed-header-example", never, {}, {}, never, never, false, never>;
}
