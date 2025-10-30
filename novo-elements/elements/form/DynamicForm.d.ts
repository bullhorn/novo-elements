import { AfterContentInit, ElementRef, OnChanges, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { NovoTemplateService } from 'novo-elements/services';
import { NovoTemplate } from 'novo-elements/elements/common';
import { NovoFieldset } from './FormInterfaces';
import { NovoFormGroup } from './NovoFormGroup';
import * as i0 from "@angular/core";
export declare class NovoFieldsetHeaderElement {
    title: string;
    icon: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFieldsetHeaderElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoFieldsetHeaderElement, "novo-fieldset-header", never, { "title": { "alias": "title"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; }, {}, never, never, false, never>;
}
export declare class NovoFieldsetElement {
    controls: Array<any>;
    form: any;
    title: string;
    icon: string;
    index: number;
    autoFocus: boolean;
    isEmbedded: boolean;
    isInlineEmbedded: boolean;
    hidden: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFieldsetElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoFieldsetElement, "novo-fieldset", never, { "controls": { "alias": "controls"; "required": false; }; "form": { "alias": "form"; "required": false; }; "title": { "alias": "title"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "index": { "alias": "index"; "required": false; }; "autoFocus": { "alias": "autoFocus"; "required": false; }; "isEmbedded": { "alias": "isEmbedded"; "required": false; }; "isInlineEmbedded": { "alias": "isInlineEmbedded"; "required": false; }; "hidden": { "alias": "hidden"; "required": false; }; }, {}, never, never, false, never>;
}
export declare class NovoDynamicFormElement implements OnChanges, OnInit, AfterContentInit {
    private element;
    private templates;
    controls: Array<any>;
    fieldsets: Array<NovoFieldset>;
    form: NovoFormGroup;
    layout: string;
    hideNonRequiredFields: boolean;
    autoFocusFirstField: boolean;
    customTemplates: QueryList<NovoTemplate>;
    private fieldsAlreadyHidden;
    allFieldsRequired: boolean;
    allFieldsNotRequired: boolean;
    showingAllFields: boolean;
    showingRequiredFields: boolean;
    numControls: number;
    constructor(element: ElementRef, templates: NovoTemplateService);
    ngOnInit(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    ngAfterContentInit(): void;
    showAllFields(): void;
    showOnlyRequired(hideRequiredWithValue: any): void;
    get values(): any;
    get isValid(): boolean;
    updatedValues(): any;
    forceValidation(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDynamicFormElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDynamicFormElement, "novo-dynamic-form", never, { "controls": { "alias": "controls"; "required": false; }; "fieldsets": { "alias": "fieldsets"; "required": false; }; "form": { "alias": "form"; "required": false; }; "layout": { "alias": "layout"; "required": false; }; "hideNonRequiredFields": { "alias": "hideNonRequiredFields"; "required": false; }; "autoFocusFirstField": { "alias": "autoFocusFirstField"; "required": false; }; }, {}, ["customTemplates"], ["form-title", "form-subtitle"], false, never>;
}
