import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, QueryList } from '@angular/core';
import { NovoButtonElement } from 'novo-elements/elements/button';
import { CanDisableCtor, HasOverlayCtor, HasTabIndexCtor, NovoOptgroup, NovoOption, NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import * as i0 from "@angular/core";
export declare class NovoDropDownTrigger {
    element: ElementRef;
    constructor(element: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDropDownTrigger, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoDropDownTrigger, "[dropdownTrigger]", never, {}, {}, never, never, false, never>;
}
declare class NovoDropdownBase {
    constructor();
}
declare const NovoDropdownMixins: HasOverlayCtor & CanDisableCtor & HasTabIndexCtor & typeof NovoDropdownBase;
export declare class NovoDropdownElement extends NovoDropdownMixins implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
    element: ElementRef;
    private ref;
    parentScrollSelector: string;
    parentScrollAction: string;
    containerClass: string;
    side: 'default' | 'right' | 'above-below' | 'right-above-below' | 'center' | 'bottom' | 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    scrollStrategy: 'reposition' | 'block' | 'close';
    /**
     * Keep dropdown open after an item is selected
     */
    keepOpen: boolean;
    height: number;
    width: number;
    appendToBody: boolean;
    toggled: EventEmitter<boolean>;
    overlay: NovoOverlayTemplateComponent;
    _button: NovoButtonElement;
    _trigger: NovoDropDownTrigger;
    optionGroups: QueryList<NovoOptgroup>;
    options: QueryList<NovoOption>;
    panel: ElementRef;
    private clickHandler;
    private closeHandler;
    private _selectedOptionChanges;
    /** The Subject to complete all subscriptions when destroyed. */
    private _onDestroy;
    /** The FocusKeyManager which handles focus. */
    private _keyManager;
    /** Whether the user should be allowed to select multiple options. */
    get multiple(): boolean;
    set multiple(value: boolean);
    private _multiple;
    /** Whether the dropdown should scroll to the active item whenever it is opened. */
    get scrollToActiveItemOnOpen(): boolean;
    set scrollToActiveItemOnOpen(value: boolean);
    private _scrollToActiveItemOnOpen;
    get button(): NovoDropDownTrigger | NovoButtonElement;
    constructor(element: ElementRef, ref: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    focus(options?: FocusOptions): void;
    openPanel(): void;
    private findFirstSelectedOptionIndex;
    set items(items: QueryList<NovoItemElement>);
    /** Handles all keydown events on the dropdown. */
    _handleKeydown(event: KeyboardEvent): void;
    /** Handles keyboard events while the dropdown is closed. */
    private _handleClosedKeydown;
    /** Handles keyboard events when the dropdown is open. */
    private _handleOpenKeydown;
    private _watchPanelEvents;
    private _watchSelectionEvents;
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    private _clearPreviousSelectedOption;
    /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    private _initKeyManager;
    /** Scrolls the active option into view. */
    protected _scrollOptionIntoView(index: number): void;
    /** Calculates the height of the select's options. */
    private _getItemHeight;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDropdownElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDropdownElement, "novo-dropdown", never, { "parentScrollSelector": { "alias": "parentScrollSelector"; "required": false; }; "parentScrollAction": { "alias": "parentScrollAction"; "required": false; }; "containerClass": { "alias": "containerClass"; "required": false; }; "side": { "alias": "side"; "required": false; }; "scrollStrategy": { "alias": "scrollStrategy"; "required": false; }; "keepOpen": { "alias": "keepOpen"; "required": false; }; "height": { "alias": "height"; "required": false; }; "width": { "alias": "width"; "required": false; }; "appendToBody": { "alias": "appendToBody"; "required": false; }; "multiple": { "alias": "multiple"; "required": false; }; "scrollToActiveItemOnOpen": { "alias": "scrollToActiveItemOnOpen"; "required": false; }; }, { "toggled": "toggled"; }, ["_button", "_trigger", "optionGroups", "options"], ["button,novo-button,[dropdownTrigger]", "*"], false, never>;
}
export declare class NovoItemElement {
    private dropdown;
    element: ElementRef;
    disabled: boolean;
    keepOpen: boolean;
    action: EventEmitter<any>;
    active: boolean;
    constructor(dropdown: NovoDropdownElement, element: ElementRef);
    onClick(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoItemElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoItemElement, "item", never, { "disabled": { "alias": "disabled"; "required": false; }; "keepOpen": { "alias": "keepOpen"; "required": false; }; }, { "action": "action"; }, never, ["*"], false, never>;
}
export declare class NovoDropdownListElement implements AfterContentInit {
    private dropdown;
    items: QueryList<NovoItemElement>;
    constructor(dropdown: NovoDropdownElement);
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDropdownListElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDropdownListElement, "list", never, {}, {}, ["items"], ["*"], false, never>;
}
export declare class NovoDropDownItemHeaderElement {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDropDownItemHeaderElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoDropDownItemHeaderElement, "dropdown-item-header", never, {}, {}, never, ["*"], false, never>;
}
export {};
