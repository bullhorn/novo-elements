import { OnInit } from '@angular/core';
import { FormUtils, NovoAsideRef, NovoAsideService } from 'novo-elements';
import * as i0 from "@angular/core";
export declare class AsideFormDemo implements OnInit {
    private ref;
    private formUtils;
    textControl: any;
    emailControl: any;
    numberControl: any;
    pickerControl: any;
    textForm: any;
    constructor(ref: NovoAsideRef, formUtils: FormUtils);
    ngOnInit(): void;
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsideFormDemo, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsideFormDemo, "aside-form-demo", never, {}, {}, never, never, false, never>;
}
/**
 * @title Aside Form Example
 */
export declare class AsideFormExample {
    private aside;
    constructor(aside: NovoAsideService);
    showAside(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsideFormExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsideFormExample, "aside-form-example", never, {}, {}, never, never, false, never>;
}
