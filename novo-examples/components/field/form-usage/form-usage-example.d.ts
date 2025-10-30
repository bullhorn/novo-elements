import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
/**
 * @title Form Usage Example
 */
export declare class FormUsageExample {
    options: UntypedFormGroup;
    numberControl: UntypedFormControl;
    timeControl: UntypedFormControl;
    dateControl: UntypedFormControl;
    dateTimeControl: UntypedFormControl;
    post: any;
    constructor(fb: UntypedFormBuilder);
    onSubmit(post: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormUsageExample, "form-usage-example", never, {}, {}, never, never, false, never>;
}
