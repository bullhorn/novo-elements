import { FocusKeyManager } from '@angular/cdk/a11y';
import { AfterContentInit, EventEmitter, QueryList } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { CanUpdateErrorStateCtor, ErrorStateMatcher } from 'novo-elements/elements/common';
import { NovoFieldControl } from 'novo-elements/elements/field';
import { NovoRadioElement } from './Radio';
import * as i0 from "@angular/core";
declare class NovoRadioGroupBase {
    _defaultErrorStateMatcher: ErrorStateMatcher;
    _parentForm: NgForm;
    _parentFormGroup: FormGroupDirective;
    ngControl: NgControl;
    constructor(_defaultErrorStateMatcher: ErrorStateMatcher, _parentForm: NgForm, _parentFormGroup: FormGroupDirective, ngControl: NgControl);
}
declare const NovoRadioGroupMixins: CanUpdateErrorStateCtor & typeof NovoRadioGroupBase;
export declare class NovoRadioGroup extends NovoRadioGroupMixins implements NovoFieldControl<any>, ControlValueAccessor, AfterContentInit {
    private _uniqueId;
    /** The aria-describedby attribute on the chip list for improved a11y. */
    _ariaDescribedby: string;
    /** Tab index for the chip list. */
    _tabIndex: number;
    /** User defined tab index. */
    _userTabIndex: number | null;
    /** The FocusKeyManager which handles focus. */
    _keyManager: FocusKeyManager<NovoRadioElement>;
    readonly controlType: string;
    /** @docs-private Implemented as part of NovoFieldControl. */
    lastKeyValue: string;
    /** @docs-private Implemented as part of NovoFieldControl.*/
    lastCaretPosition: number | null;
    id: string;
    tabindex: number;
    /** An object used to control when error messages are shown. */
    errorStateMatcher: ErrorStateMatcher;
    change: EventEmitter<any>;
    blur: EventEmitter<any>;
    _radios: QueryList<NovoRadioElement>;
    get appearance(): any;
    set appearance(value: any);
    get value(): any;
    set value(value: any);
    get name(): string;
    set name(value: string);
    get disabled(): boolean;
    set disabled(value: boolean);
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get required(): boolean;
    set required(value: boolean);
    /** Implemented as part of NovoFieldControl. */
    get placeholder(): string;
    set placeholder(value: string);
    get selected(): NovoRadioElement;
    protected _name: string;
    protected _value: boolean;
    protected _selected: NovoRadioElement;
    protected _required: boolean;
    protected _disabled: boolean;
    protected _placeholder: string;
    protected _appearance: 'horizontal' | 'vertical';
    ngAfterContentInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private onChangeCallback;
    private onTouchedCallback;
    private _updateRadioButtonAppearance;
    private _updateRadioButtonNames;
    private _updateRadioButtonDisabled;
    private _updateSelectedRadioFromValue;
    /** Whether any radio buttons has focus. */
    get focused(): boolean;
    /** Implemented as part of NovoFieldControl. */
    get empty(): boolean;
    /** Implemented as part of NovoFieldControl. */
    get shouldLabelFloat(): boolean;
    /** Implemented as part of NovoFieldControl. */
    setDescribedByIds(ids: string[]): void;
    /** Implemented as part of NovoFieldControl. */
    onContainerClick(event: MouseEvent): void;
    /**
     * Focuses the first non-disabled chip in this chip list, or the associated input when there
     * are no eligible chips.
     */
    focus(options?: FocusOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoRadioGroup, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoRadioGroup, "novo-radio-group", never, { "id": { "alias": "id"; "required": false; }; "tabindex": { "alias": "tabindex"; "required": false; }; "errorStateMatcher": { "alias": "errorStateMatcher"; "required": false; }; "appearance": { "alias": "appearance"; "required": false; }; "value": { "alias": "value"; "required": false; }; "name": { "alias": "name"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "required": { "alias": "required"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; }, { "change": "change"; "blur": "blur"; }, ["_radios"], ["*"], false, never>;
}
export {};
