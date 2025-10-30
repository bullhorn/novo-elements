import { FocusableOption, FocusOptions, FocusOrigin } from '@angular/cdk/a11y';
import { AfterViewChecked, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { NovoOptgroup, NovoOptgroupBase } from './optgroup.component';
import { NovoOptionParentComponent } from './option-parent';
import * as i0 from "@angular/core";
/** Event object emitted by NovoOption when selected or deselected. */
export declare class NovoOptionSelectionChange {
    /** Reference to the option that emitted the event. */
    source: NovoOptionBase;
    /** Whether the change in the option's value was a result of a user action. */
    isUserInput: boolean;
    constructor(
    /** Reference to the option that emitted the event. */
    source: NovoOptionBase, 
    /** Whether the change in the option's value was a result of a user action. */
    isUserInput?: boolean);
}
export declare class NovoOptionBase implements FocusableOption, AfterViewChecked, OnDestroy {
    private _element;
    private _changeDetectorRef;
    private _parent;
    readonly group: NovoOptgroupBase;
    private _selected;
    private _active;
    private _disabled;
    private _mostRecentViewValue;
    private _clickCapture;
    private _clickPassive;
    /** TODO: deprecate maybe, check support for table headers */
    keepOpen: boolean;
    novoInert: boolean;
    allowSelection: boolean;
    customViewValue: string;
    /** If there is no parent then nothing is managing the selection. */
    get selectable(): NovoOptionParentComponent;
    /** Whether the wrapping component is in multiple selection mode. */
    get multiple(): boolean;
    /** The form value of the option. */
    value: any;
    /** The unique ID of the option. */
    id: string;
    /** Whether the option is disabled. */
    get disabled(): any;
    set disabled(value: any);
    get selected(): any;
    set selected(value: any);
    /** Event emitted when the option is selected or deselected. */
    readonly onSelectionChange: EventEmitter<NovoOptionSelectionChange>;
    /** Emits when the state of the option changes and any parents have to be notified. */
    readonly _stateChanges: Subject<void>;
    constructor(_element: ElementRef<HTMLElement>, _changeDetectorRef: ChangeDetectorRef, _parent: NovoOptionParentComponent, group: NovoOptgroupBase);
    /**
     * Whether or not the option is currently active and ready to be selected.
     * An active option displays styles as if it is focused, but the
     * focus is actually retained somewhere else. This comes in handy
     * for components like autocomplete where focus must remain on the input.
     */
    get active(): boolean;
    /**
     * The displayed value of the option. It is necessary to show the selected option in the
     * select's trigger.
     */
    get viewValue(): string;
    /** Selects the option. */
    select(): void;
    /** Deselects the option. */
    deselect(): void;
    /** Sets focus onto this option. */
    focus(_origin?: FocusOrigin, options?: FocusOptions): void;
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setActiveStyles(): void;
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setInactiveStyles(): void;
    /** Gets the label to be used when determining whether the option should be focused. */
    getLabel(): string;
    _handleDisabledClick(event: MouseEvent): void;
    _handlePassiveClick(event: MouseEvent): void;
    /** Ensures the option is selected when activated from the keyboard. */
    _handleKeydown(event: KeyboardEvent): void;
    /**
     * `Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.`
     */
    _selectViaInteraction(): void;
    /**
     * Force a click event
     */
    _clickViaInteraction(): void;
    /**
     * Gets the `aria-selected` value for the option. We explicitly omit the `aria-selected`
     * attribute from single-selection, unselected options. Including the `aria-selected="false"`
     * attributes adds a significant amount of noise to screen-reader users without providing useful
     * information.
     */
    _getAriaSelected(): boolean | null;
    /** Returns the correct tabindex for the option depending on disabled state. */
    _getTabIndex(): string;
    /** Gets the host DOM element. */
    _getHostElement(): HTMLElement;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    /** Emits the selection change event. */
    private _emitSelectionChangeEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoOptionBase, [null, null, { optional: true; }, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoOptionBase, never, never, { "keepOpen": { "alias": "keepOpen"; "required": false; }; "novoInert": { "alias": "novoInert"; "required": false; }; "allowSelection": { "alias": "allowSelection"; "required": false; }; "customViewValue": { "alias": "customViewValue"; "required": false; }; "value": { "alias": "value"; "required": false; }; "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "onSelectionChange": "onSelectionChange"; }, never, never, true, never>;
}
/**
 * Single option inside of a `<novo-select>` element.
 */
export declare class NovoOption extends NovoOptionBase {
    constructor(element: ElementRef<HTMLElement>, changeDetectorRef: ChangeDetectorRef, parent: NovoOptionParentComponent, group: NovoOptgroup);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoOption, [null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoOption, "novo-option", ["novoOption"], { "selected": { "alias": "selected"; "required": false; }; "keepOpen": { "alias": "keepOpen"; "required": false; }; "novoInert": { "alias": "novoInert"; "required": false; }; "value": { "alias": "value"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, ["*", "[novoSuffix]"], false, never>;
}
/**
 * Counts the amount of option group labels that precede the specified option.
 * @param optionIndex Index of the option at which to start counting.
 * @param options Flat list of all of the options.
 * @param optionGroups Flat list of all of the option groups.
 * @docs-private
 */
export declare function _countGroupLabelsBeforeOption(optionIndex: number, options: QueryList<NovoOption>, optionGroups: QueryList<NovoOptgroup>): number;
/**
 * Determines the position to which to scroll a panel in order for an option to be into view.
 * @param optionOffset Offset of the option from the top of the panel.
 * @param optionHeight Height of the options.
 * @param currentScrollPosition Current scroll position of the panel.
 * @param panelHeight Height of the panel.
 * @docs-private
 */
export declare function _getOptionScrollPosition(optionOffset: number, optionHeight: number, currentScrollPosition: number, panelHeight: number): number;
