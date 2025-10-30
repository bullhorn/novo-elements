import { Directionality } from '@angular/cdk/bidi';
import { CdkStep, CdkStepHeader, CdkStepper } from '@angular/cdk/stepper';
import { AfterContentInit, ChangeDetectorRef, ElementRef, OnDestroy, QueryList, TemplateRef } from '@angular/core';
import { NovoIconComponent } from 'novo-elements/elements/icon';
import { NovoStepLabel } from './step-label.component';
import * as i0 from "@angular/core";
export declare class NovoStep extends CdkStep {
    /** Content for step label given by `<ng-template novoStepLabel>`. */
    stepLabel: NovoStepLabel;
    theme: string;
    color: string;
    icon: string;
    constructor(stepper: CdkStepper);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoStep, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoStep, "novo-step", never, { "theme": { "alias": "theme"; "required": false; }; "color": { "alias": "color"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; }, {}, ["stepLabel"], ["*"], false, never>;
}
export declare class NovoStepper extends CdkStepper implements AfterContentInit, OnDestroy {
    /** The list of step headers of the steps in the stepper. */
    _stepHeader: QueryList<CdkStepHeader>;
    /** Steps that the stepper holds. */
    steps: QueryList<NovoStep>;
    /** Custom icon overrides passed in by the consumer. */
    _icons: QueryList<NovoIconComponent>;
    /** Consumer-specified template-refs to be used to override the header icons. */
    _iconOverrides: {
        [key: string]: TemplateRef<any>;
    };
    get completed(): boolean;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    complete(): void;
    getIndicatorType(index: number): 'none' | '' | 'edit' | 'done';
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoStepper, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoStepper, "[novoStepper]", never, {}, {}, ["steps", "_icons"], never, false, never>;
}
export declare class NovoHorizontalStepper extends NovoStepper {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoHorizontalStepper, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoHorizontalStepper, "novo-horizontal-stepper", ["novoHorizontalStepper"], {}, {}, never, never, false, never>;
}
export declare class NovoVerticalStepper extends NovoStepper {
    constructor(dir: Directionality, changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoVerticalStepper, [{ optional: true; }, null, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoVerticalStepper, "novo-vertical-stepper", ["novoVerticalStepper"], {}, {}, never, never, false, never>;
}
