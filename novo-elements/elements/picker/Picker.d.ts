import { ChangeDetectorRef, ComponentRef, ElementRef, EventEmitter, OnInit, ViewContainerRef } from '@angular/core';
import { ComponentUtils } from 'novo-elements/services';
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import * as i0 from "@angular/core";
/**
 * @description This class is the directive definition of the Picker. If you add an attribute of `picker` to an input,
 * it will create an instance of the picker which wraps the input in all of the picker HTML elements and functionality.
 * Picker should be added as a two-way bound ngModel instance `[(picker)]=""` in order to have the picker options
 * dynamically populate.
 */
export declare class NovoPickerElement implements OnInit {
    element: ElementRef;
    private componentUtils;
    private ref;
    results: ViewContainerRef;
    config: any;
    placeholder: string;
    clearValueOnSelect: boolean;
    closeOnSelect: boolean;
    selected: Array<any>;
    appendToBody: boolean;
    parentScrollSelector: string;
    parentScrollAction: string;
    containerClass: string;
    side: string;
    autoSelectFirstOption: boolean;
    overrideElement: ElementRef;
    maxlength: number;
    allowCustomValues: boolean;
    width: string;
    minWidth: string;
    allowTabNavigation: boolean;
    set disablePickerInput(v: boolean);
    get disablePickerInput(): boolean;
    private _disablePickerInput;
    changed: EventEmitter<any>;
    select: EventEmitter<any>;
    focus: EventEmitter<any>;
    blur: EventEmitter<any>;
    typing: EventEmitter<any>;
    tab: EventEmitter<any>;
    container: NovoOverlayTemplateComponent;
    input: ElementRef;
    term: string;
    resultsComponent: any;
    popup: ComponentRef<any>;
    _value: any;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(element: ElementRef, componentUtils: ComponentUtils, ref: ChangeDetectorRef);
    ngOnInit(): void;
    private onDebouncedKeyup;
    openPanel(): void;
    closePanel(): void;
    get panelOpen(): boolean;
    private show;
    onKeyDown(event: KeyboardEvent): void;
    clearValue(wipeTerm: any): void;
    /**
     * @description When the input's focus event is called this method calls the debounced function that displays the
     * results.
     */
    onFocus(event: any): void;
    showResults(term?: any): void;
    hideResults(err?: any): void;
    onOverlayClosed(): void;
    get value(): any;
    set value(selected: any);
    checkTerm(event: any): void;
    onTouched(event?: Event): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(disabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoPickerElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoPickerElement, "novo-picker", never, { "config": { "alias": "config"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "clearValueOnSelect": { "alias": "clearValueOnSelect"; "required": false; }; "closeOnSelect": { "alias": "closeOnSelect"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "appendToBody": { "alias": "appendToBody"; "required": false; }; "parentScrollSelector": { "alias": "parentScrollSelector"; "required": false; }; "parentScrollAction": { "alias": "parentScrollAction"; "required": false; }; "containerClass": { "alias": "containerClass"; "required": false; }; "side": { "alias": "side"; "required": false; }; "autoSelectFirstOption": { "alias": "autoSelectFirstOption"; "required": false; }; "overrideElement": { "alias": "overrideElement"; "required": false; }; "maxlength": { "alias": "maxlength"; "required": false; }; "allowCustomValues": { "alias": "allowCustomValues"; "required": false; }; "width": { "alias": "width"; "required": false; }; "minWidth": { "alias": "minWidth"; "required": false; }; "allowTabNavigation": { "alias": "allowTabNavigation"; "required": false; }; "disablePickerInput": { "alias": "disablePickerInput"; "required": false; }; }, { "changed": "changed"; "select": "select"; "focus": "focus"; "blur": "blur"; "typing": "typing"; "tab": "tab"; }, never, ["*"], false, never>;
}
