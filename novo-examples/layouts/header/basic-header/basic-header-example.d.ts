import { NovoToastService } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Basic Header Example
 */
export declare class BasicHeaderExample {
    private toaster;
    theme: string;
    icon: string;
    private options;
    private themeIndex;
    constructor(toaster: NovoToastService);
    changeTheme(): void;
    catchEv(type: any, ev: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicHeaderExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicHeaderExample, "basic-header-example", never, {}, {}, never, never, false, never>;
}
