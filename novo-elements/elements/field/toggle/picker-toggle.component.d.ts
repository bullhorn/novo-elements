import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { NovoButtonElement } from 'novo-elements/elements/button';
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import { NovoFieldElement } from '../field';
import * as i0 from "@angular/core";
export declare class NovoPickerToggleElement<T = any> implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy {
    private _elementRef;
    private cdr;
    private _formField;
    private _stateChanges;
    private _onDestroy;
    /** Datepicker instance that the button will toggle. */
    picker: T;
    icon: string;
    /** Tabindex for the toggle. */
    tabIndex: number | null;
    /** Screenreader label for the button. */
    ariaLabel: string;
    /** Determines whether the overlay is triggered on input focus or solely button click. */
    triggerOnFocus: boolean;
    /** An id to select the correct overlay.*/
    overlayId: string;
    /** Width to pass to overlay.*/
    width: string;
    /** Whether the toggle button is disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    /** Underlying button element. */
    _button: NovoButtonElement;
    /** Element for the panel containing the autocomplete options. */
    overlay: NovoOverlayTemplateComponent;
    element: ElementRef;
    constructor(_elementRef: ElementRef, cdr: ChangeDetectorRef, defaultTabIndex: string, _formField: NovoFieldElement);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    checkPanel(): void;
    togglePanel(event?: Event): void;
    /** BEGIN: Convenient Panel Methods. */
    openPanel(event?: Event): void;
    closePanel(event?: Event): void;
    get panelOpen(): boolean;
    private _watchStateChanges;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoPickerToggleElement<any>, [null, null, { attribute: "tabindex"; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoPickerToggleElement<any>, "novo-picker-toggle", ["novoPickerToggle"], { "picker": { "alias": "for"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "tabIndex": { "alias": "tabIndex"; "required": false; }; "ariaLabel": { "alias": "aria-label"; "required": false; }; "triggerOnFocus": { "alias": "triggerOnFocus"; "required": false; }; "overlayId": { "alias": "overlayId"; "required": false; }; "width": { "alias": "width"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, ["*"], false, never>;
}
