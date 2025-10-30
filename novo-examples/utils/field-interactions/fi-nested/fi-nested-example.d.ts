import { FormUtils, NovoControlConfig, NovoFormGroup, TextBoxControl } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Fi Nested Form Example
 */
export declare class FiNestedExample {
    private formUtils;
    form: NovoFormGroup;
    minPayRateControl: TextBoxControl;
    maxPayRateControl: TextBoxControl;
    controls: NovoControlConfig[];
    initialValue: {
        selected: boolean;
        label: string;
        multiplier: number;
        payRate: number;
    }[];
    constructor(formUtils: FormUtils);
    private calculatePayRates;
    static ɵfac: i0.ɵɵFactoryDeclaration<FiNestedExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FiNestedExample, "fi-nested-example", never, {}, {}, never, never, false, never>;
}
