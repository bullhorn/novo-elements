import { NovoToastService } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Header with Subtitle Example
 */
export declare class HeaderSubtitleExample {
    private toaster;
    theme: string;
    icon: string;
    private options;
    private themeIndex;
    constructor(toaster: NovoToastService);
    changeTheme(): void;
    catchEv(type: any, ev: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<HeaderSubtitleExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HeaderSubtitleExample, "header-subtitle-example", never, {}, {}, never, never, false, never>;
}
