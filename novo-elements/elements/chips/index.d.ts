import { FocusableOption, FocusKeyManager } from '@angular/cdk/a11y';
import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import * as i0 from '@angular/core';
import { ElementRef, OnDestroy, EventEmitter, NgZone, ChangeDetectorRef, InjectionToken, AfterViewInit, AfterContentInit, DoCheck, OnInit, QueryList, OnChanges, ViewContainerRef, PipeTransform } from '@angular/core';
import { Subject, Observable, ReplaySubject } from 'rxjs';
import * as i13 from 'novo-elements/elements/common';
import { CanSizeCtor, CanColorCtor, HasTabIndexCtor, CanColor, HasTabIndex, CanUpdateErrorStateCtor, ErrorStateMatcher, CanUpdateErrorState, ElementSize } from 'novo-elements/elements/common';
import * as i8 from '@angular/forms';
import { NgForm, FormGroupDirective, NgControl, ControlValueAccessor } from '@angular/forms';
import { Directionality } from '@angular/cdk/bidi';
import { SelectionModel } from '@angular/cdk/collections';
import * as i12 from 'novo-elements/elements/field';
import { NovoFieldControl, NovoFieldElement } from 'novo-elements/elements/field';
import { NovoLabelService, ComponentUtils } from 'novo-elements/services';
import * as i10 from 'novo-elements/elements/picker';
import { NovoPickerElement } from 'novo-elements/elements/picker';
import * as i7 from '@angular/common';
import * as i9 from 'novo-elements/elements/checkbox';
import * as i11 from 'novo-elements/elements/icon';

interface IRemovable {
    remove: () => void;
    removable: boolean;
    disabled: boolean;
}
declare const REMOVABLE_REF: InjectionToken<IRemovable>;
/** Represents an event fired on an individual `novo-chip`. */
interface NovoChipEvent {
    /** The chip the event was fired on. */
    chip: NovoChipElement;
}
/** Event object emitted by NovoChip when selected or deselected. */
declare class NovoChipSelectionChange {
    /** Reference to the chip that emitted the event. */
    source: NovoChipElement;
    /** Whether the chip that emitted the event is selected. */
    selected: boolean;
    /** Whether the selection change was a result of a user interaction. */
    isUserInput: boolean;
    constructor(
    /** Reference to the chip that emitted the event. */
    source: NovoChipElement, 
    /** Whether the chip that emitted the event is selected. */
    selected: boolean, 
    /** Whether the selection change was a result of a user interaction. */
    isUserInput?: boolean);
}
/** @docs-private */
declare class NovoChipBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
declare const NovoChipMixinBase: CanSizeCtor & CanColorCtor & HasTabIndexCtor & typeof NovoChipBase;
/**
 * Dummy directive to add CSS class to chip avatar.
 * @docs-private
 */
declare class NovoChipAvatar {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoChipAvatar, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoChipAvatar, "novo-chip-avatar, [novoChipAvatar]", never, {}, {}, never, never, false, never>;
}
/**
 * Applies proper (click) support and adds styling for use with Bullhorn's "x" icon *
 * Example:
 *
 *     `<novo-chip>
 *       <novo-icon novoChipRemove>x</novo-icon>
 *     </novo-chip>`
 *
 * You *may* use a custom icon, but you may need to override the `novo-chip-remove` positioning
 * styles to properly center the icon within the chip.
 */
declare class NovoChipRemove {
    private _parentChip;
    constructor(_parentChip: IRemovable, elementRef: ElementRef<HTMLElement>);
    /** Calls the parent chip's public `remove()` method if applicable. */
    _handleClick(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoChipRemove, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoChipRemove, "[novoChipRemove]", never, {}, {}, never, never, false, never>;
}
/**
 * Chip component. Used inside the NovoChipList component.
 */
declare class NovoChipElement extends NovoChipMixinBase implements FocusableOption, OnDestroy, CanColor, HasTabIndex {
    _elementRef: ElementRef<HTMLElement>;
    private _ngZone;
    private _changeDetectorRef;
    /** Whether the chip has focus. */
    _hasFocus: boolean;
    /** Whether animations for the chip are enabled. */
    _animationsDisabled: boolean;
    /** Whether the chip list is selectable */
    _chipListSelectable: boolean;
    /** Whether the chip list allows toggling */
    _chipListToggleable: boolean;
    /** Whether the chip list is in multi-selection mode. */
    _chipListMultiple: boolean;
    /** Whether the chip list as a whole is disabled. */
    _chipListDisabled: boolean;
    /** The chip avatar */
    avatar: NovoChipAvatar;
    /** The chip's remove toggler. */
    removeIcon: NovoChipRemove;
    type: string;
    /** Whether the chip is selected. */
    get selected(): boolean;
    set selected(value: boolean);
    protected _selected: boolean;
    /** The value of the chip. Defaults to the content inside `<novo-chip>` tags. */
    get value(): any;
    set value(value: any);
    protected _value: any;
    /**
     * Whether or not the chip is selectable. When a chip is not selectable,
     * changes to its selected state are always ignored. By default a chip is
     * selectable, and it becomes non-selectable if its parent chip list is
     * not selectable.
     */
    get selectable(): boolean;
    set selectable(value: boolean);
    protected _selectable: boolean;
    /** Whether the chip is disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    protected _disabled: boolean;
    /**
     * Determines whether or not the chip displays the remove styling and emits (removed) events.
     */
    get removable(): boolean;
    set removable(value: boolean);
    protected _removable: boolean;
    /** Emits when the chip is focused. */
    readonly _onFocus: Subject<NovoChipEvent>;
    /** Emits when the chip is blured. */
    readonly _onBlur: Subject<NovoChipEvent>;
    /** Emitted when the chip is selected or deselected. */
    readonly selectionChange: EventEmitter<NovoChipSelectionChange>;
    /** Emitted when the chip is destroyed. */
    readonly destroyed: EventEmitter<NovoChipEvent>;
    /** Emitted when a chip is to be removed. */
    readonly removed: EventEmitter<NovoChipEvent>;
    /** The ARIA selected applied to the chip. */
    get ariaSelected(): string | null;
    constructor(_elementRef: ElementRef<HTMLElement>, _ngZone: NgZone, platform: Platform, _changeDetectorRef: ChangeDetectorRef, _document: any, animationMode?: string, tabIndex?: string);
    ngOnDestroy(): void;
    /** Selects the chip. */
    select(): void;
    /** Deselects the chip. */
    deselect(): void;
    /** Select this chip and emit selected event */
    selectViaInteraction(): void;
    /** Toggles the current selected state of this chip. */
    toggleSelected(isUserInput?: boolean): boolean;
    /** Allows for programmatic focusing of the chip. */
    focus(): void;
    /**
     * Allows for programmatic removal of the chip. Called by the NovoChipList when the DELETE or
     * BACKSPACE keys are pressed.
     *
     * Informs any listeners of the removal request. Does not remove the chip from the DOM.
     */
    remove(): void;
    /** Handles click events on the chip. */
    _handleClick(event: Event): void;
    /** Handle custom key presses. */
    _handleKeydown(event: KeyboardEvent): void;
    _blur(): void;
    private _dispatchSelectionChange;
    static ngAcceptInputType_selected: BooleanInput;
    static ngAcceptInputType_selectable: BooleanInput;
    static ngAcceptInputType_removable: BooleanInput;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_tabIndex: NumberInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoChipElement, [null, null, null, { optional: true; }, null, { optional: true; }, { attribute: "tabindex"; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoChipElement, "novo-chip, [novo-chip]", never, { "color": { "alias": "color"; "required": false; }; "tabIndex": { "alias": "tabIndex"; "required": false; }; "size": { "alias": "size"; "required": false; }; "type": { "alias": "type"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "value": { "alias": "value"; "required": false; }; "selectable": { "alias": "selectable"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "removable": { "alias": "removable"; "required": false; }; }, { "selectionChange": "selectionChange"; "destroyed": "destroyed"; "removed": "removed"; }, ["avatar", "removeIcon"], ["*"], false, never>;
}

/** Default options, for the chips module, that can be overridden. */
interface NovoChipsDefaultOptions {
    /** The list of key codes that will trigger a chipEnd event. */
    separatorKeyCodes: readonly string[];
}
/** Injection token to be used to override the default options for the chips module. */
declare const NOVO_CHIPS_DEFAULT_OPTIONS: InjectionToken<NovoChipsDefaultOptions>;

/** Interface for a text control that is used to drive interaction with a novo-chip-list. */
interface NovoChipTextControl {
    /** Unique identifier for the text control. */
    id: string;
    /** The text control's placeholder text. */
    placeholder: string;
    /** Whether the text control has browser focus. */
    focused: boolean;
    /** Whether the text control is empty. */
    empty: boolean;
    /** Focuses the text control. */
    focus(options?: FocusOptions): void;
    clearValue(): void;
}

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
declare class NovoChipListChange {
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
declare class NovoChipList extends _NovoChipListMixinBase implements NovoFieldControl<any>, ControlValueAccessor, AfterViewInit, AfterContentInit, DoCheck, OnInit, OnDestroy, CanUpdateErrorState {
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

/** Represents an input event on a `novoChipInput`. */
interface NovoChipInputEvent {
    /** The native `<input>` element that the event is being fired for. */
    input: HTMLInputElement;
    /** The value of the input. */
    value: string;
}
/**
 * Directive that adds chip-specific behaviors to an input element inside `<novo-form-field>`.
 * May be placed inside or outside of an `<novo-chip-list>`.
 */
declare class NovoChipInput implements NovoChipTextControl, OnChanges, OnDestroy {
    protected _elementRef: ElementRef<HTMLInputElement>;
    private readonly _defaultOptions;
    private readonly _field;
    private readonly _chipList;
    protected ngControl: NgControl;
    /** Whether the control is focused. */
    focused: boolean;
    /**
     * Whether or not the chipEnd event will be emitted when the input is blurred.
     */
    get addOnBlur(): boolean;
    set addOnBlur(value: boolean);
    _addOnBlur: boolean;
    /**
     * The list of key codes that will trigger a chipEnd event.
     *
     * Defaults to `[Key.Enter]`.
     */
    separatorKeyCodes: readonly string[];
    /** Emitted when a chip is to be added. */
    chipEnd: EventEmitter<NovoChipInputEvent>;
    /** The input's placeholder text. */
    placeholder: string;
    /** Unique id for the input. */
    id: string;
    /** Whether the input is disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    /** Whether the input is empty. */
    get empty(): boolean;
    /** Getter for accessing chipList in templates */
    get chipList(): NovoChipList;
    /** The native input element to which this directive is attached. */
    protected _inputElement: HTMLInputElement;
    destroy$: Subject<void>;
    constructor(_elementRef: ElementRef<HTMLInputElement>, _defaultOptions: NovoChipsDefaultOptions, _field: NovoFieldElement, _chipList: NovoChipList, ngControl: NgControl);
    ngOnChanges(): void;
    ngOnDestroy(): void;
    /** Utility method to make host definition/tests more clear. */
    _keydown(event?: KeyboardEvent): void;
    /** Checks to see if the blur should emit the (chipEnd) event. */
    _blur(blurEvent: FocusEvent): void;
    _focus(): void;
    /** Checks to see if the (chipEnd) event needs to be emitted. */
    _emitChipEnd(event?: KeyboardEvent): void;
    _onInput(): void;
    /** Focuses the input. */
    focus(options?: FocusOptions): void;
    /** Clears the input. */
    clearValue(): void;
    /** Checks whether a keycode is one of the configured separators. */
    private _isSeparatorKey;
    static readonly ngAcceptInputType_addOnBlur: BooleanInput;
    static readonly ngAcceptInputType_disabled: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoChipInput, [null, null, { optional: true; }, null, { optional: true; self: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoChipInput, "input[novoChipInput]", ["novoChipInput", "novoChipInputFor"], { "addOnBlur": { "alias": "novoChipInputAddOnBlur"; "required": false; }; "separatorKeyCodes": { "alias": "novoChipInputSeparatorKeyCodes"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "chipEnd": "novoChipInputTokenEnd"; }, never, never, false, never>;
}

declare class NovoChipsElement implements OnInit, ControlValueAccessor {
    element: ElementRef;
    private componentUtils;
    labels: NovoLabelService;
    readonly CHIPS_SHOWN_MAX = 999;
    closeOnSelect: boolean;
    placeholder: string;
    source: any;
    maxlength: any;
    type: any;
    allowCustomValues: boolean;
    set disablePickerInput(v: boolean);
    get disablePickerInput(): boolean;
    private _disablePickerInput;
    overrideElement: ElementRef;
    width: string;
    minWidth: string;
    size: ElementSize;
    changed: EventEmitter<any>;
    focus: EventEmitter<any>;
    blur: EventEmitter<any>;
    typing: EventEmitter<any>;
    preview: ViewContainerRef;
    picker: NovoPickerElement;
    items: any[];
    selected: any;
    config: any;
    model: any;
    itemToAdd: any;
    popup: any;
    hiddenChipsLimit: number;
    hiddenChipsCount: number;
    _value: any;
    _items: ReplaySubject<any[]>;
    _hiddenChipsLimit: number;
    onModelChange: Function;
    onModelTouched: Function;
    changeRef: ChangeDetectorRef;
    constructor(element: ElementRef, componentUtils: ComponentUtils, labels: NovoLabelService);
    ngOnInit(): void;
    get value(): any;
    set value(selected: any);
    clearValue(): void;
    setItems(): void;
    getLabelFromOptions(value: any): {
        value: any;
        label: any;
    };
    deselectAll(event?: any): void;
    select(event?: any, item?: any): void;
    deselect(event?: any, item?: any): void;
    onTyping(event?: any): void;
    onFocus(event?: any): void;
    add(event: any): void;
    updateHiddenChips(): void;
    toggleHiddenChips(): void;
    remove(event: any, item: any): void;
    onKeyDown(event: any): void;
    onTouched(e: any): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(disabled: boolean): void;
    private _finalizeItemValue;
    /** Emits change event to set the model value. */
    private _propagateChanges;
    private _updateOverlay;
    /**
     * @name showPreview
     *
     * @description This method creates an instance of the preview (called popup) and adds all the bindings to that
     * instance. Will reuse the popup or create a new one if it does not already exist. Will only work if there is
     * a previewTemplate given in the config.
     */
    showPreview(): void;
    /**
     * @name hidePreview
     *
     * @description - This method deletes the preview popup from the DOM.
     */
    hidePreview(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoChipsElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoChipsElement, "chips,novo-chips", never, { "closeOnSelect": { "alias": "closeOnSelect"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "source": { "alias": "source"; "required": false; }; "maxlength": { "alias": "maxlength"; "required": false; }; "type": { "alias": "type"; "required": false; }; "allowCustomValues": { "alias": "allowCustomValues"; "required": false; }; "disablePickerInput": { "alias": "disablePickerInput"; "required": false; }; "overrideElement": { "alias": "overrideElement"; "required": false; }; "width": { "alias": "width"; "required": false; }; "minWidth": { "alias": "minWidth"; "required": false; }; "size": { "alias": "size"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "changed": "changed"; "focus": "focus"; "blur": "blur"; "typing": "typing"; }, never, ["*"], false, never>;
}

declare class NovoRowChipElement extends NovoChipElement {
    onSelect(e: any): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoRowChipElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoRowChipElement, "novo-row-chip", never, {}, {}, never, ["*"], false, never>;
}
declare class NovoRowChipsElement extends NovoChipsElement {
    closeOnSelect: boolean;
    constructor(element: ElementRef, componentUtils: ComponentUtils, labels: NovoLabelService);
    onKeyDown(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoRowChipsElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoRowChipsElement, "novo-row-chips", never, { "closeOnSelect": { "alias": "closeOnSelect"; "required": false; }; }, {}, never, never, false, never>;
}

declare class AvatarTypePipe implements PipeTransform {
    transform(item: any, type?: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AvatarTypePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<AvatarTypePipe, "avatarType", false>;
}

declare class NovoChipsModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoChipsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoChipsModule, [typeof NovoChipElement, typeof NovoChipAvatar, typeof NovoChipRemove, typeof NovoChipInput, typeof NovoChipList, typeof NovoChipsElement, typeof NovoRowChipElement, typeof NovoRowChipsElement, typeof AvatarTypePipe], [typeof i7.CommonModule, typeof i8.FormsModule, typeof i9.NovoCheckboxModule, typeof i10.NovoPickerModule, typeof i11.NovoIconModule, typeof i12.NovoFieldModule, typeof i13.NovoCommonModule], [typeof NovoChipElement, typeof NovoChipAvatar, typeof NovoChipRemove, typeof NovoChipInput, typeof NovoChipList, typeof NovoChipsElement, typeof NovoRowChipElement, typeof NovoRowChipsElement, typeof AvatarTypePipe]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoChipsModule>;
}

export { AvatarTypePipe, NOVO_CHIPS_DEFAULT_OPTIONS, NovoChipAvatar, NovoChipElement, NovoChipInput, NovoChipList, NovoChipListChange, NovoChipRemove, NovoChipSelectionChange, NovoChipsElement, NovoChipsModule, NovoRowChipElement, NovoRowChipsElement, REMOVABLE_REF };
export type { IRemovable, NovoChipEvent, NovoChipInputEvent, NovoChipTextControl, NovoChipsDefaultOptions };
