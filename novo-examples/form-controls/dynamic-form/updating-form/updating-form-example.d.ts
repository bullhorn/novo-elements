import { FormUtils } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Updating Form Example
 */
export declare class UpdatingFormExample {
    private formUtils;
    textControl: any;
    percentageControl: any;
    checkControl: any;
    fileControl: any;
    singlePickerControl: any;
    updatingForm: any;
    updatingFormControls: any[];
    required: boolean;
    disabled: boolean;
    constructor(formUtils: FormUtils);
    toggleEnabled(): void;
    toggleRequired(): void;
    markAsInvalid(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpdatingFormExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UpdatingFormExample, "updating-form-example", never, {}, {}, never, never, false, never>;
}
