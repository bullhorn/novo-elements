import { NovoAsideRef, NovoAsideService } from 'novo-elements';
import * as i0 from "@angular/core";
interface CustomParams {
    id: number;
    name: string;
}
export declare class AsideCustomDemo {
    ref: NovoAsideRef<CustomParams, string>;
    values: {
        label: string;
        data: string;
    }[];
    constructor(ref: NovoAsideRef<CustomParams, string>);
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsideCustomDemo, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsideCustomDemo, "aside-custom-demo", never, {}, {}, never, never, false, never>;
}
/**
 * @title Aside Usage Example
 */
export declare class AsideUsageExample {
    private aside;
    constructor(aside: NovoAsideService);
    showAside(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsideUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsideUsageExample, "aside-usage-example", never, {}, {}, never, never, false, never>;
}
export {};
