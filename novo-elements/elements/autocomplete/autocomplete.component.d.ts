import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnDestroy, QueryList, SimpleChanges } from '@angular/core';
import { CanDisable, CanDisableCtor, HasOverlayCtor, NovoOptgroup, NovoOption, NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import { NovoFieldControl, NovoFieldElement } from 'novo-elements/elements/field';
import * as i0 from "@angular/core";
/** Event object that is emitted when an autocomplete option is selected. */
export declare class NovoOptionSelectedEvent {
    /** Reference to the autocomplete panel that emitted the event. */
    source: NovoAutocompleteElement;
    /** Option that was selected. */
    option: NovoOption;
    constructor(
    /** Reference to the autocomplete panel that emitted the event. */
    source: NovoAutocompleteElement, 
    /** Option that was selected. */
    option: NovoOption);
}
declare class NovoAutocompleteBase {
    constructor();
}
declare const NovoAutocompleteMixins: HasOverlayCtor & CanDisableCtor & typeof NovoAutocompleteBase;
export declare class NovoAutocompleteElement extends NovoAutocompleteMixins implements CanDisable, AfterContentInit, AfterViewInit, OnChanges, OnDestroy {
    private _elementRef;
    private cdr;
    private _formField;
    private _stateChanges;
    private _activeOptionChanges;
    private _selectedOptionChanges;
    private _keyDownChanges;
    /** Manages active item in option list based on key events. */
    private _keyManager;
    /** Old value of the native input. Used to work around issues with the `input` event on IE. */
    private _previousValue;
    optionGroups: QueryList<NovoOptgroup>;
    options: QueryList<NovoOption>;
    /** Event that is emitted whenever an option from the list is selected. */
    readonly optionSelected: EventEmitter<NovoOptionSelectedEvent>;
    /** Emits whenever an option is activated using the keyboard. */
    readonly optionActivated: EventEmitter<NovoOptionSelectedEvent>;
    /** Tabindex for the toggle. */
    tabIndex: number | null;
    /** Key to use to trigger autocomplete. used for textarea. */
    triggerOn: (control: NovoFieldControl<any>) => boolean;
    /** Function that maps an option's control value to its display value in the trigger. */
    displayWith: ((value: any) => string) | null;
    /** Screenreader label for the button. */
    ariaLabel: string;
    /** Whether the user should be allowed to select multiple options. */
    get multiple(): boolean;
    set multiple(value: boolean);
    private _multiple;
    /** Whether the toggle button is disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    makeFirstItemActive: boolean;
    /** Element for the panel containing the autocomplete options. */
    overlay: NovoOverlayTemplateComponent;
    element: ElementRef;
    constructor(_elementRef: ElementRef, cdr: ChangeDetectorRef, defaultTabIndex: string, _formField: NovoFieldElement);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    checkPanel(): void;
    private _setTriggerValue;
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    private _clearPreviousSelectedOption;
    /** Emits the `select` event. */
    private _emitSelectEvent;
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    private _setValueAndClose;
    private _watchSelectionEvents;
    private _watchStateChanges;
    /** The currently active option, coerced to MatOption type. */
    get activeOption(): NovoOption | null;
    _handleKeydown(event: KeyboardEvent): void;
    private checkSelectedOptions;
    /**
     * Finds and selects and option based on its value.
     * @returns Option that has the corresponding value.
     */
    private _selectValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAutocompleteElement, [null, null, { attribute: "tabindex"; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAutocompleteElement, "novo-autocomplete", ["novoAutocomplete"], { "tabIndex": { "alias": "tabIndex"; "required": false; }; "triggerOn": { "alias": "triggerOn"; "required": false; }; "displayWith": { "alias": "displayWith"; "required": false; }; "ariaLabel": { "alias": "aria-label"; "required": false; }; "multiple": { "alias": "multiple"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "makeFirstItemActive": { "alias": "makeFirstItemActive"; "required": false; }; }, { "optionSelected": "optionSelected"; "optionActivated": "optionActivated"; }, ["optionGroups", "options"], ["*"], false, never>;
}
export {};
