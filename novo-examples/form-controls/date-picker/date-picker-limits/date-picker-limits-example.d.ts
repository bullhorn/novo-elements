import { BaseControl, FormUtils, NovoFormGroup } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Date picker limits Example
 */
export declare class DatePickerLimitsExample {
    private formUtils;
    startDate: Date;
    endDate: Date;
    tooltip: String;
    initValue: {}[];
    formGroup: NovoFormGroup;
    controls: BaseControl[];
    constructor(formUtils: FormUtils);
    updateInitialValue(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DatePickerLimitsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DatePickerLimitsExample, "date-picker-limits-example", never, {}, {}, never, never, false, never>;
}
