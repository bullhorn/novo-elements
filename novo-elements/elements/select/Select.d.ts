import { ActiveDescendantKeyManager, FocusMonitor } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, Injector, NgZone, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { NovoLabelService } from 'novo-elements/services';
import { CanDisableCtor, CanRequireCtor, CanUpdateErrorStateCtor, ErrorStateMatcher, HasOverlayCtor, HasTabIndexCtor, NovoOptgroup, NovoOption } from 'novo-elements/elements/common';
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import { NovoFieldControl, NovoFieldElement } from 'novo-elements/elements/field';
import * as i0 from "@angular/core";
/** Change event object that is emitted when the select value has changed. */
export declare class NovoSelectChange {
    /** Reference to the select that emitted the change event. */
    source: NovoSelectElement;
    /** Current value of the select that emitted the event. */
    value: any;
    constructor(
    /** Reference to the select that emitted the change event. */
    source: NovoSelectElement, 
    /** Current value of the select that emitted the event. */
    value: any);
}
declare class NovoSelectBase {
    _defaultErrorStateMatcher: ErrorStateMatcher;
    _parentForm: NgForm;
    _parentFormGroup: FormGroupDirective;
    ngControl: NgControl;
    constructor(_defaultErrorStateMatcher: ErrorStateMatcher, _parentForm: NgForm, _parentFormGroup: FormGroupDirective, ngControl: NgControl);
}
declare const NovoSelectMixins: HasOverlayCtor & CanRequireCtor & CanDisableCtor & HasTabIndexCtor & CanUpdateErrorStateCtor & typeof NovoSelectBase;
export declare class NovoSelectElement extends NovoSelectMixins implements OnInit, AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor, NovoFieldControl<any> {
    elementRef: ElementRef;
    labels: NovoLabelService;
    ref: ChangeDetectorRef;
    private focusMonitor;
    private ngZone;
    private injector;
    private _fieldElement;
    private _uniqueId;
    private _stateChanges;
    private _activeOptionChanges;
    private _selectedOptionChanges;
    protected readonly _destroy: Subject<void>;
    readonly controlType: string;
    /** @docs-private Implemented as part of NovoFieldControl. */
    lastKeyValue: string;
    /** @docs-private Implemented as part of NovoFieldControl.*/
    lastCaretPosition: number | null;
    _selectionModel: SelectionModel<NovoOption>;
    /** The aria-labelledby attribute */
    _ariaLabelledBy: string;
    /** The aria-describedby attribute on the chip list for improved a11y. */
    _ariaDescribedby: string;
    /** User defined tab index. */
    _userTabIndex: number | null;
    /** The FocusKeyManager which handles focus. */
    _keyManager: ActiveDescendantKeyManager<NovoOption>;
    /**
     * The display string for the current value, kept from when the associated <novo-option> has stopped rendering
     * due to filtration
     */
    private _lingeringDisplayValue;
    private _legacyOption;
    id: string;
    name: string;
    placeholder: string;
    readonly: boolean;
    headerConfig: any;
    position: string;
    overlayWidth: number;
    overlayHeight: number;
    displayIcon: string;
    onSelect: EventEmitter<any>;
    /** Event emitted when the selected value has been changed by the user. */
    readonly selectionChange: EventEmitter<NovoSelectChange>;
    /** Event that emits whenever the raw value of the select changes.*/
    readonly valueChange: EventEmitter<any>;
    /** Event emitted when the select panel has been toggled. */
    readonly openedChange: EventEmitter<boolean>;
    /** Event emitted when the select has been opened. */
    readonly _openedStream: Observable<void>;
    /** Event emitted when the select has been closed. */
    readonly _closedStream: Observable<void>;
    /** Function that maps an option's control value to its display value in the trigger. */
    displayWith: ((value: any) => string) | null;
    /** * Function to compare the option values with the selected values. */
    compareWith: (o1: any, o2: any) => boolean;
    header: any;
    createdItem: any;
    model: any;
    onModelChange: Function;
    onModelTouched: Function;
    filterTerm: string;
    filterTermTimeout: any;
    filteredOptions: any;
    disabled: boolean;
    /** Element for the panel containing the autocomplete options. */
    overlay: NovoOverlayTemplateComponent;
    optionGroups: QueryList<NovoOptgroup>;
    contentOptions: QueryList<NovoOption>;
    viewOptions: QueryList<NovoOption>;
    viewOptionsSignal: import("@angular/core").WritableSignal<NovoOption[]>;
    contentOptionsSignal: import("@angular/core").WritableSignal<NovoOption[]>;
    hideLegacyOptionsForSearch: import("@angular/core").WritableSignal<boolean>;
    hideLegacyOptions: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    private displayLegacyOptions;
    panel: ElementRef;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get value(): any;
    set value(newValue: any);
    private _value;
    /** Whether the user should be allowed to select multiple options. */
    get multiple(): boolean;
    set multiple(value: boolean);
    private _multiple;
    /** Array of options to display in the select dropdown */
    set options(options: Array<any>);
    get options(): Array<any>;
    private _options;
    /** Whether the select is focused. */
    get focused(): boolean;
    private _focused;
    /** Implemented as part of NovoFieldControl. */
    get empty(): boolean;
    /** The currently selected option. */
    get selected(): NovoOption | NovoOption[];
    /** The value displayed in the trigger. */
    get displayValue(): string;
    constructor(elementRef: ElementRef, labels: NovoLabelService, ref: ChangeDetectorRef, focusMonitor: FocusMonitor, ngZone: NgZone, injector: Injector, defaultErrorStateMatcher: ErrorStateMatcher, ngControl: NgControl, _parentForm: NgForm, _parentFormGroup: FormGroupDirective, _fieldElement: NovoFieldElement);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onClick(): boolean;
    openPanel(): void;
    private _initializeSelection;
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     */
    private _setSelectionByValue;
    /**
     * Finds and selects and option based on its value.
     * @returns Option that has the corresponding value.
     */
    private _selectValue;
    select(option: any, i: any, fireEvents?: boolean): void;
    clear(): void;
    /**
     * If the item is not disabled, this method closes the panel, and if a value is specified,
     * also sets the associated control to that value. It will also mark the control as dirty
     * if this interaction stemmed from the user.
     */
    handleSelection(option: NovoOption, isUserInput?: boolean): void;
    private _getDisplayValue;
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    private _clearPreviousSelectedOption;
    private _watchSelectionEvents;
    /** Handles all keydown events on the select. */
    _handleKeydown(event: KeyboardEvent): void;
    /** Handles keyboard events while the select is closed. */
    private _handleClosedKeydown;
    /** Handles keyboard events when the selected is open. */
    private _handleOpenKeydown;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(disabled: boolean): void;
    /** Implemented as part of NovoFieldControl. */
    setDescribedByIds(ids: string[]): void;
    /** Implemented as part of NovoFieldControl. */
    onContainerClick(event: MouseEvent): void;
    /**
     * Focuses the first non-disabled chip in this chip list, or the associated input when there
     * are no eligible chips.
     */
    focus(options?: FocusOptions): void;
    protected _getOptions(): NovoOption[];
    protected _optionsComputed: import("@angular/core").Signal<NovoOption[]>;
    /** Sorts the selected values in the selected based on their order in the panel. */
    private _sortValues;
    /** Emits change event to set the model value. */
    private _propagateChanges;
    protected _makeChangeEvent(value: any): NovoSelectChange;
    /** Scrolls the active option into view. */
    protected _scrollOptionIntoView(index: number): void;
    /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    private _initKeyManager;
    /**
     * Highlights the selected item. If no option is selected, it will highlight
     * the first item instead.
     */
    private _highlightCorrectOption;
    /** Calculates the height of the select's options. */
    private _getItemHeight;
    private _initLegacyOptions;
    /**
     * TODO: Deprecate all header methods
     */
    toggleHeader(event: any, forceValue?: boolean): void;
    /**
     * @deprecated use highlight pipe
     */
    highlight(match: any, query: any): any;
    escapeRegexp(queryToEscape: any): any;
    saveHeader(): void;
    /** Determines the `aria-activedescendant` to be set on the host. */
    _getAriaActiveDescendant(): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSelectElement, [null, null, null, null, null, null, null, { optional: true; self: true; }, { optional: true; }, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSelectElement, "novo-select", never, { "disabled": { "alias": "disabled"; "required": false; }; "required": { "alias": "required"; "required": false; }; "tabIndex": { "alias": "tabIndex"; "required": false; }; "id": { "alias": "id"; "required": false; }; "name": { "alias": "name"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "headerConfig": { "alias": "headerConfig"; "required": false; }; "position": { "alias": "position"; "required": false; }; "overlayWidth": { "alias": "overlayWidth"; "required": false; }; "overlayHeight": { "alias": "overlayHeight"; "required": false; }; "displayIcon": { "alias": "displayIcon"; "required": false; }; "displayWith": { "alias": "displayWith"; "required": false; }; "compareWith": { "alias": "compareWith"; "required": false; }; "hideLegacyOptions": { "alias": "hideLegacyOptions"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; }; "multiple": { "alias": "multiple"; "required": false; }; "options": { "alias": "options"; "required": false; }; }, { "onSelect": "onSelect"; "selectionChange": "selectionChange"; "valueChange": "valueChange"; "openedChange": "openedChange"; "_openedStream": "opened"; "_closedStream": "closed"; }, ["optionGroups", "contentOptions"], ["*"], false, never>;
}
export {};
