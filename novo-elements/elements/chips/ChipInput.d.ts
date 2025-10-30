import { BooleanInput } from '@angular/cdk/coercion';
import { ElementRef, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { NovoChipsDefaultOptions } from './ChipDefaults';
import { NovoChipList } from './ChipList';
import { NovoChipTextControl } from './ChipTextControl';
import { NovoFieldElement } from 'novo-elements/elements/field';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
/** Represents an input event on a `novoChipInput`. */
export interface NovoChipInputEvent {
    /** The native `<input>` element that the event is being fired for. */
    input: HTMLInputElement;
    /** The value of the input. */
    value: string;
}
/**
 * Directive that adds chip-specific behaviors to an input element inside `<novo-form-field>`.
 * May be placed inside or outside of an `<novo-chip-list>`.
 */
export declare class NovoChipInput implements NovoChipTextControl, OnChanges, OnDestroy {
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
