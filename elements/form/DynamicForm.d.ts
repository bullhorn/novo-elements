import { OnInit, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';
import { ComponentUtils } from './../../utils/component-utils/ComponentUtils';
import { NovoFieldset, NovoFormGroup } from './FormInterfaces';
export declare class NovoFieldsetHeaderElement {
    title: string;
    icon: string;
}
export declare class NovoControlCustom implements OnInit {
    private componentUtils;
    control: any;
    form: any;
    referencePoint: ViewContainerRef;
    controlComponent: any;
    constructor(componentUtils: ComponentUtils);
    ngOnInit(): void;
}
export declare class NovoFieldsetElement {
    controls: Array<any>;
    form: any;
    title: string;
    icon: string;
}
export declare class NovoDynamicFormElement implements OnChanges, OnInit {
    controls: Array<any>;
    fieldsets: Array<NovoFieldset>;
    form: NovoFormGroup;
    layout: string;
    hideNonRequiredFields: boolean;
    allFieldsRequired: boolean;
    allFieldsNotRequired: boolean;
    showingAllFields: boolean;
    showingRequiredFields: boolean;
    numControls: number;
    ngOnInit(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    showAllFields(): void;
    showOnlyRequired(hideRequiredWithValue: any): void;
    readonly values: any;
    readonly isValid: boolean;
    updatedValues(): any;
    forceValidation(): void;
}
