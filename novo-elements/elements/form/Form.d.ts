import { AfterContentInit, OnInit, QueryList } from '@angular/core';
import { NovoTemplateService } from 'novo-elements/services';
import { NovoTemplate } from 'novo-elements/elements/common';
import { NovoFormGroup } from './NovoFormGroup';
import * as i0 from "@angular/core";
export declare class NovoFormElement implements AfterContentInit, OnInit {
    private templates;
    form: NovoFormGroup;
    layout: string;
    hideHeader: boolean;
    customTemplates: QueryList<NovoTemplate>;
    showingAllFields: boolean;
    showingRequiredFields: boolean;
    constructor(templates: NovoTemplateService);
    get value(): any;
    get isValid(): boolean;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    showAllFields(): void;
    showOnlyRequired(hideRequiredWithValue: any): void;
    forceValidation(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFormElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoFormElement, "novo-form", never, { "form": { "alias": "form"; "required": false; }; "layout": { "alias": "layout"; "required": false; }; "hideHeader": { "alias": "hideHeader"; "required": false; }; }, {}, ["customTemplates"], ["form-title", "form-subtitle", "*"], false, never>;
}
