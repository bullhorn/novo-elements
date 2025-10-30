import { NovoToastService } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Header with SearchBar Example
 */
export declare class HeaderSearchbarExample {
    private toaster;
    theme: string;
    icon: string;
    private options;
    isChecked: boolean;
    private themeIndex;
    constructor(toaster: NovoToastService);
    changeTheme(): void;
    catchEv(type: any, ev: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<HeaderSearchbarExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HeaderSearchbarExample, "header-searchbar-example", never, {}, {}, never, never, false, never>;
}
