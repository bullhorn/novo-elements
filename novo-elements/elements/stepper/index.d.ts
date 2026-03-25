import * as i11 from '@angular/cdk/a11y';
import { FocusMonitor } from '@angular/cdk/a11y';
import * as i9 from '@angular/cdk/stepper';
import { CdkStepLabel, CdkStepHeader, CdkStepperNext, CdkStepperPrevious, CdkStepper, CdkStep } from '@angular/cdk/stepper';
import * as i0 from '@angular/core';
import { TemplateRef, OnDestroy, ElementRef, AfterContentInit, QueryList, ChangeDetectorRef } from '@angular/core';
import { AnimationTriggerMetadata } from '@angular/animations';
import { Directionality } from '@angular/cdk/bidi';
import * as i10 from 'novo-elements/elements/icon';
import { NovoIconComponent } from 'novo-elements/elements/icon';
import * as i6 from '@angular/common';
import * as i7 from '@angular/cdk/portal';
import * as i8 from 'novo-elements/elements/button';

declare class NovoStepLabel extends CdkStepLabel {
    constructor(template: TemplateRef<any>);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoStepLabel, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoStepLabel, "[novoStepLabel]", never, {}, {}, never, never, false, never>;
}

declare class NovoStepHeader extends CdkStepHeader implements OnDestroy {
    private _focusMonitor;
    private _element;
    theme: string;
    color: string;
    icon: string;
    /** State of the given step. */
    state: string;
    /** Label of the given step. */
    label: NovoStepLabel | string;
    /** Overrides for the header icons, passed in via the stepper. */
    iconOverrides: {
        [key: string]: TemplateRef<any>;
    };
    /** Index of the given step. */
    get index(): number;
    set index(value: number);
    private _index;
    /** Whether the given step is selected. */
    get selected(): boolean;
    set selected(value: boolean);
    private _selected;
    /** Whether the given step label is active. */
    get active(): boolean;
    set active(value: boolean);
    private _active;
    /** Whether the given step label is active. */
    get touched(): boolean;
    /** Whether the given step is optional. */
    get optional(): boolean;
    set optional(value: boolean);
    private _optional;
    constructor(_focusMonitor: FocusMonitor, _element: ElementRef);
    ngOnDestroy(): void;
    /** Returns string label of given step if it is a text label. */
    _stringLabel(): string | null;
    /** Returns NovoStepLabel if the label of given step is a template label. */
    _templateLabel(): NovoStepLabel | null;
    /** Returns the host HTML element. */
    _getHostElement(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoStepHeader, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoStepHeader, "novo-step-header", never, { "theme": { "alias": "theme"; "required": false; }; "color": { "alias": "color"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "state": { "alias": "state"; "required": false; }; "label": { "alias": "label"; "required": false; }; "iconOverrides": { "alias": "iconOverrides"; "required": false; }; "index": { "alias": "index"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "active": { "alias": "active"; "required": false; }; "optional": { "alias": "optional"; "required": false; }; }, {}, never, never, false, never>;
}

declare class NovoStepStatus {
    state: string;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoStepStatus, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoStepStatus, "novo-step-status", never, { "state": { "alias": "state"; "required": false; }; }, {}, never, never, false, never>;
}

/** Button that moves to the next step in a stepper workflow. */
declare class NovoStepperNext extends CdkStepperNext {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoStepperNext, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoStepperNext, "button[novoStepperNext]", never, { "type": { "alias": "type"; "required": false; }; }, {}, never, never, false, never>;
}
/** Button that moves to the previous step in a stepper workflow. */
declare class NovoStepperPrevious extends CdkStepperPrevious {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoStepperPrevious, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoStepperPrevious, "button[novoStepperPrevious]", never, { "type": { "alias": "type"; "required": false; }; }, {}, never, never, false, never>;
}

/** Animations used by the Novo steppers. */
declare const novoStepperAnimations: {
    readonly horizontalStepTransition: AnimationTriggerMetadata;
    readonly verticalStepTransition: AnimationTriggerMetadata;
};

declare class NovoStep extends CdkStep {
    /** Content for step label given by `<ng-template novoStepLabel>`. */
    stepLabel: NovoStepLabel;
    theme: string;
    color: string;
    icon: string;
    constructor(stepper: CdkStepper);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoStep, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoStep, "novo-step", never, { "theme": { "alias": "theme"; "required": false; }; "color": { "alias": "color"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; }, {}, ["stepLabel"], ["*"], false, never>;
}
declare class NovoStepper extends CdkStepper implements AfterContentInit, OnDestroy {
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
declare class NovoHorizontalStepper extends NovoStepper {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoHorizontalStepper, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoHorizontalStepper, "novo-horizontal-stepper", ["novoHorizontalStepper"], {}, {}, never, never, false, never>;
}
declare class NovoVerticalStepper extends NovoStepper {
    constructor(dir: Directionality, changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoVerticalStepper, [{ optional: true; }, null, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoVerticalStepper, "novo-vertical-stepper", ["novoVerticalStepper"], {}, {}, never, never, false, never>;
}

declare class NovoStepperModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoStepperModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoStepperModule, [typeof NovoHorizontalStepper, typeof NovoVerticalStepper, typeof NovoStep, typeof NovoStepLabel, typeof NovoStepper, typeof NovoStepHeader, typeof NovoStepStatus, typeof NovoStepperNext, typeof NovoStepperPrevious], [typeof i6.CommonModule, typeof i7.PortalModule, typeof i8.NovoButtonModule, typeof i9.CdkStepperModule, typeof i10.NovoIconModule, typeof i11.A11yModule], [typeof NovoHorizontalStepper, typeof NovoVerticalStepper, typeof NovoStep, typeof NovoStepLabel, typeof NovoStepper, typeof NovoStepHeader, typeof NovoStepStatus, typeof NovoStepperNext, typeof NovoStepperPrevious]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoStepperModule>;
}

export { NovoHorizontalStepper, NovoStep, NovoStepHeader, NovoStepLabel, NovoStepStatus, NovoStepper, NovoStepperModule, NovoStepperNext, NovoStepperPrevious, NovoVerticalStepper, novoStepperAnimations };
