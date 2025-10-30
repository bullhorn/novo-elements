import { AfterContentInit, QueryList } from '@angular/core';
import { NovoFieldElement } from './field';
import * as i0 from "@angular/core";
export declare class NovoFieldsElement implements AfterContentInit {
    _fields: QueryList<NovoFieldElement>;
    _layout: 'horizontal' | 'vertical';
    get layout(): any;
    set layout(value: any);
    _appearance: 'standard' | 'outline' | 'fill' | 'list';
    get appearance(): any;
    set appearance(value: any);
    fullWidth: boolean;
    ngAfterContentInit(): any;
    private _updateFieldLayout;
    private _updateFieldAppearance;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFieldsElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoFieldsElement, "novo-fields", never, { "layout": { "alias": "layout"; "required": false; }; "appearance": { "alias": "appearance"; "required": false; }; "fullWidth": { "alias": "fullWidth"; "required": false; }; }, {}, ["_fields"], ["*"], false, never>;
}
