import { FocusableOption } from '@angular/cdk/a11y';
import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectorRef, ElementRef, EventEmitter, InjectionToken, NgZone, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { CanColor, CanColorCtor, CanSizeCtor, HasTabIndex, HasTabIndexCtor } from 'novo-elements/elements/common';
import * as i0 from "@angular/core";
export interface IRemovable {
    remove: () => void;
    removable: boolean;
    disabled: boolean;
}
export declare const REMOVABLE_REF: InjectionToken<IRemovable>;
/** Represents an event fired on an individual `novo-chip`. */
export interface NovoChipEvent {
    /** The chip the event was fired on. */
    chip: NovoChipElement;
}
/** Event object emitted by NovoChip when selected or deselected. */
export declare class NovoChipSelectionChange {
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
export declare class NovoChipAvatar {
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
export declare class NovoChipRemove {
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
export declare class NovoChipElement extends NovoChipMixinBase implements FocusableOption, OnDestroy, CanColor, HasTabIndex {
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
export {};
