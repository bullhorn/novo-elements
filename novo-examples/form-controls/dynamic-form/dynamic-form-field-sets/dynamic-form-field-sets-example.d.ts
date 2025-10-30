import { FormUtils } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Dynamic Form Field Sets Example
 */
export declare class DynamicFormFieldSetsExample {
    private formUtils;
    fieldsets: Array<any>;
    fieldsetsForm: any;
    constructor(formUtils: FormUtils);
    save(form: any): void;
    clear(): void;
    onChange(value: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DynamicFormFieldSetsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DynamicFormFieldSetsExample, "dynamic-form-field-sets-example", never, {}, {}, never, never, false, never>;
}
