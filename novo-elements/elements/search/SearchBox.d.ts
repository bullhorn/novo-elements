import { ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
export declare class NovoSearchBoxElement implements ControlValueAccessor, OnInit {
    element: ElementRef;
    labels: NovoLabelService;
    private _changeDetectorRef;
    private _zone;
    name: string;
    icon: string;
    position: string;
    placeholder: string;
    alwaysOpen: boolean;
    theme: string;
    color: string;
    closeOnSelect: boolean;
    displayField: string;
    displayValue: string;
    hint: string;
    keepOpen: boolean;
    hasBackdrop: boolean;
    allowPropagation: boolean;
    overrideElement: ElementRef;
    searchChanged: EventEmitter<string>;
    applySearch: EventEmitter<KeyboardEvent>;
    focused: boolean;
    value: any;
    /** View -> model callback called when value changes */
    _onChange: (value: any) => void;
    /** View -> model callback called when autocomplete has been touched */
    _onTouched: () => void;
    /** Element for the panel containing the autocomplete options. */
    overlay: any;
    input: any;
    private debounceSearchChange;
    constructor(element: ElementRef, labels: NovoLabelService, _changeDetectorRef: ChangeDetectorRef, _zone: NgZone);
    ngOnInit(): void;
    /**
     * @name showFasterFind
     * @description This function shows the picker and adds the active class (for animation)
     */
    showSearch(event?: any, forceClose?: boolean): void;
    onFocus(): void;
    onBlur(): void;
    onSelect(): void;
    /** BEGIN: Convenient Panel Methods. */
    openPanel(): void;
    closePanel(): void;
    get panelOpen(): boolean;
    get active(): boolean;
    /** END: Convenient Panel Methods. */
    _handleKeydown(event: KeyboardEvent): void;
    _handleInput(event: KeyboardEvent): void;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    private _setValue;
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    setValueAndClose(event: any | null): void;
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue(skip: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSearchBoxElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSearchBoxElement, "novo-search", never, { "name": { "alias": "name"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "position": { "alias": "position"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "alwaysOpen": { "alias": "alwaysOpen"; "required": false; }; "theme": { "alias": "theme"; "required": false; }; "color": { "alias": "color"; "required": false; }; "closeOnSelect": { "alias": "closeOnSelect"; "required": false; }; "displayField": { "alias": "displayField"; "required": false; }; "displayValue": { "alias": "displayValue"; "required": false; }; "hint": { "alias": "hint"; "required": false; }; "keepOpen": { "alias": "keepOpen"; "required": false; }; "hasBackdrop": { "alias": "hasBackdrop"; "required": false; }; "allowPropagation": { "alias": "allowPropagation"; "required": false; }; "overrideElement": { "alias": "overrideElement"; "required": false; }; }, { "searchChanged": "searchChanged"; "applySearch": "applySearch"; }, never, ["*"], false, never>;
}
