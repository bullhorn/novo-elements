import { FormUtils } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Dynamic Form Example
 */
export declare class DynamicFormExample {
    private formUtils;
    dynamic: any;
    dynamicForm: any;
    constructor(formUtils: FormUtils);
    save(form: any): void;
    clear(): void;
    onChange(value: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DynamicFormExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DynamicFormExample, "dynamic-form-example", never, {}, {}, never, never, false, never>;
}
