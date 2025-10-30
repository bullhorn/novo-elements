import { OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NovoHorizontalStepper, NovoStep } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Basic Stepper Component
 */
export declare class StepperHorizontalExample implements OnInit {
    private _formBuilder;
    isLinear: boolean;
    firstFormGroup: UntypedFormGroup;
    secondFormGroup: UntypedFormGroup;
    constructor(_formBuilder: UntypedFormBuilder);
    ngOnInit(): void;
    next(stepper: NovoHorizontalStepper, step: NovoStep): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StepperHorizontalExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StepperHorizontalExample, "stepper-horizontal-example", never, {}, {}, never, never, false, never>;
}
