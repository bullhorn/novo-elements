import { FocusKeyManager } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, DoCheck, ElementRef, EventEmitter, OnDestroy, OnInit, QueryList } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { CanUpdateErrorState, CanUpdateErrorStateCtor, ErrorStateMatcher } from 'novo-elements/elements/common';
import { NovoFieldControl } from 'novo-elements/elements/field';
import { NovoChipElement, NovoChipEvent, NovoChipSelectionChange } from './Chip';
import { NovoChipTextControl } from './ChipTextControl';
import * as i0 from "@angular/core";
/** @docs-private */
declare class NovoChipListBase {
    _defaultErrorStateMatcher: ErrorStateMatcher;
    _parentForm: NgForm;
    _parentFormGroup: FormGroupDirective;
    /** @docs-private */
    ngControl: NgControl;
    constructor(_defaultErrorStateMatcher: ErrorStateMatcher, _parentForm: NgForm, _parentFormGroup: FormGroupDirective, 
    /** @docs-private */
    ngControl: NgControl);
}
declare const _NovoChipListMixinBase: CanUpdateErrorStateCtor & typeof NovoChipListBase;
/** Change event object that is emitted when the chip list value has changed. */
export declare class NovoChipListChange {
    /** Chip list that emitted the event. */
    source: NovoChipList;
    /** Value of the chip list when the event was emitted. */
    value: any;
    constructor(
    /** Chip list that emitted the event. */
    source: NovoChipList, 
    /** Value of the chip list when the event was emitted. */
    value: any);
}
/**
 * A chip list component (named ChipList for its similarity to the List component).
 */
export declare class NovoChipList extends _NovoChipListMixinBase implements NovoFieldControl<any>, ControlValueAccessor, AfterViewInit, AfterContentInit, DoCheck, OnInit, OnDestroy, CanUpdateErrorState {
    protected _elementRef: ElementRef<HTMLElement>;
    private _changeDetectorRef;
    private _dir;
    /** @docs-private */
    ngControl: NgControl;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    readonly controlType: string;
    /**
     * When a chip is destroyed, we store the index of the destroyed chip until the chips
     * query list notifies about the update. This is necessary because we cannot determine an
     * appropriate chip that should receive focus until the array of chips updated completely.
     */
    private _lastDestroyedChipIndex;
    /** Subject that emits when the component has been destroyed. */
    private _destroyed;
    /** Subscription to focus changes in the chips. */
    private _chipFocusSubscription;
    /** Subscription to blur changes in the chips. */
    private _chipBlurSubscription;
    /** Subscription to selection changes in chips. */
    private _chipSelectionSubscription;
    /** Subscription to remove changes in chips. */
    private _chipRemoveSubscription;
    /** The chip input to add more chips */
    protected _chipInput: NovoChipTextControl;
    /** Uid of the chip list */
    _uid: string;
    /** The aria-describedby attribute on the chip list for improved a11y. */
    _ariaDescribedby: string;
    /** Tab index for the chip list. */
    _tabIndex: number;
    /**
     * User defined tab index.
     * When it is not null, use user defined tab index. Otherwise use _tabIndex
     */
    _userTabIndex: number | null;
    /** The FocusKeyManager which handles focus. */
    _keyManager: FocusKeyManager<NovoChipElement>;
    /** Function when touched */
    _onTouched: () => void;
    /** Function when changed */
    _onChange: (value: any) => void;
    _selectionModel: SelectionModel<NovoChipElement>;
    /** The array of selected chips inside chip list. */
    get selected(): NovoChipElement[] | NovoChipElement;
    /** The ARIA role applied to the chip list. */
    get role(): string | null;
    /** An object used to control when error messages are shown. */
    errorStateMatcher: ErrorStateMatcher;
    /** Whether the user should be allowed to select multiple chips. */
    get multiple(): boolean;
    set multiple(value: boolean);
    private _multiple;
    /** Whether chips in this list can be toggled by user interaction */
    get chipsToggleable(): boolean;
    set chipsToggleable(value: boolean);
    private _chipsToggleable;
    /** Whether the chips should appear stacked instead of a row. */
    get stacked(): boolean;
    set stacked(value: boolean);
    private _stacked;
    /**
     * A function to compare the option values with the selected values. The first argument
     * is a value from an option. The second is a value from the selection. A boolean
     * should be returned.
     */
    get compareWith(): (o1: any, o2: any) => boolean;
    set compareWith(fn: (o1: any, o2: any) => boolean);
    private _compareWith;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get value(): any;
    set value(value: any);
    protected _value: any;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get id(): string;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get required(): boolean;
    set required(value: boolean);
    protected _required: boolean;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get placeholder(): string;
    set placeholder(value: string);
    protected _placeholder: string;
    /** Whether any chips or the novoChipInput inside of this chip-list has focus. */
    get focused(): boolean;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get empty(): boolean;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get shouldLabelFloat(): boolean;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get disabled(): boolean;
    set disabled(value: boolean);
    protected _disabled: boolean;
    /** Orientation of the chip list. */
    ariaOrientation: 'horizontal' | 'vertical';
    /**
     * Whether or not this chip list is selectable. When a chip list is not selectable,
     * the selected states for all the chips inside the chip list are always ignored.
     */
    get selectable(): boolean;
    set selectable(value: boolean);
    protected _selectable: boolean;
    set tabIndex(value: number);
    /** Combined stream of all of the child chips' selection change events. */
    get chipSelectionChanges(): Observable<NovoChipSelectionChange>;
    /** Combined stream of all of the child chips' focus change events. */
    get chipFocusChanges(): Observable<NovoChipEvent>;
    /** Combined stream of all of the child chips' blur change events. */
    get chipBlurChanges(): Observable<NovoChipEvent>;
    /** Combined stream of all of the child chips' remove change events. */
    get chipRemoveChanges(): Observable<NovoChipEvent>;
    /** Event emitted when the selected chip list value has been changed by the user. */
    readonly change: EventEmitter<NovoChipListChange>;
    /**
     * Event that emits whenever the raw value of the chip-list changes. This is here primarily
     * to facilitate the two-way binding for the `value` input.
     * @docs-private
     */
    readonly valueChange: EventEmitter<any>;
    /** The chip components contained within this chip list. */
    chips: QueryList<NovoChipElement>;
    /** @docs-private Implemented as part of NovoFieldControl. */
    lastKeyValue: string;
    /** @docs-private Implemented as part of NovoFieldControl.*/
    lastCaretPosition: number | null;
    constructor(_elementRef: ElementRef<HTMLElement>, _changeDetectorRef: ChangeDetectorRef, _dir: Directionality, _parentForm: NgForm, _parentFormGroup: FormGroupDirective, _defaultErrorStateMatcher: ErrorStateMatcher, 
    /** @docs-private */
    ngControl: NgControl);
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnInit(): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
    /** Associates an HTML input element with this chip list. */
    registerInput(inputElement: NovoChipTextControl): void;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    setDescribedByIds(ids: string[]): void;
    writeValue(value: any): void;
    addValue(value: any): void;
    removeValue(value: any): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    onContainerClick(event: MouseEvent): void;
    /**
     * Focuses the first non-disabled chip in this chip list, or the associated input when there
     * are no eligible chips.
     */
    focus(options?: FocusOptions): void;
    /** Attempt to focus an input if we have one. */
    _focusInput(options?: FocusOptions): void;
    /**
     * Pass events to the keyboard manager. Available here for tests.
     */
    _keydown(event: KeyboardEvent): void;
    /**
     * Check the tab index as you should not be allowed to focus an empty list.
     */
    protected _updateTabIndex(): void;
    /**
     * If the amount of chips changed, we need to update the
     * key manager state and focus the next closest chip.
     */
    protected _updateFocusForDestroyedChips(): void;
    /**
     * Utility to ensure all indexes are valid.
     *
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of chips.
     */
    private _isValidIndex;
    private _isInputEmpty;
    _setSelectionByValue(value: any, isUserInput?: boolean): void;
    /**
     * Finds and selects the chip based on its value.
     * @returns Chip that has the corresponding value.
     */
    private _selectValue;
    private _initializeSelection;
    /**
     * Deselects every chip in the list.
     * @param skip Chip that should not be deselected.
     */
    private _clearSelection;
    /**
     * Sorts the model values, ensuring that they keep the same
     * order that they have in the panel.
     */
    private _sortValues;
    /** Emits change event to set the model value. */
    private _propagateChanges;
    /** When blurred, mark the field as touched when focus moved outside the chip list. */
    _blur(): void;
    /** Mark the field as touched */
    _markAsTouched(): void;
    /**
     * Removes the `tabindex` from the chip list and resets it back afterwards, allowing the
     * user to tab out of it. This prevents the list from capturing focus and redirecting
     * it back to the first chip, creating a focus trap, if it user tries to tab away.
     */
    _allowFocusEscape(): void;
    private _resetChips;
    private _dropSubscriptions;
    /** Listens to user-generated selection events on each chip. */
    private _listenToChipsSelection;
    /** Listens to user-generated selection events on each chip. */
    private _listenToChipsFocus;
    private _listenToChipsRemoved;
    /** Checks whether an event comes from inside a chip element. */
    private _originatesFromChip;
    /** Checks whether any of the chips is focused. */
    private _hasFocusedChip;
    /** Syncs the list's state with the individual chips. */
    private _syncChipsState;
    static ngAcceptInputType_multiple: BooleanInput;
    static ngAcceptInputType_required: BooleanInput;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_selectable: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoChipList, [null, null, { optional: true; }, { optional: true; }, { optional: true; }, null, { optional: true; self: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoChipList, "novo-chip-list", ["novoChipList"], { "errorStateMatcher": { "alias": "errorStateMatcher"; "required": false; }; "multiple": { "alias": "multiple"; "required": false; }; "chipsToggleable": { "alias": "chipsToggleable"; "required": false; }; "stacked": { "alias": "stacked"; "required": false; }; "compareWith": { "alias": "compareWith"; "required": false; }; "value": { "alias": "value"; "required": false; }; "required": { "alias": "required"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "ariaOrientation": { "alias": "aria-orientation"; "required": false; }; "selectable": { "alias": "selectable"; "required": false; }; "tabIndex": { "alias": "tabIndex"; "required": false; }; }, { "change": "change"; "valueChange": "valueChange"; }, ["chips"], ["*"], false, never>;
}
export {};
