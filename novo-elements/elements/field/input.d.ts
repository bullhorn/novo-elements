/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { AfterViewInit, DoCheck, ElementRef, EventEmitter, InjectionToken, NgZone, OnChanges, OnDestroy } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { NovoFieldControl } from './field-control';
import * as i0 from "@angular/core";
/**
 * This token is used to inject the object whose value should be set into `NovoInput`. If none is
 * provided, the native `HTMLInputElement` is used. Directives like `MatDatepickerInput` can provide
 * themselves for this token, in order to make `NovoInput` delegate the getting and setting of the
 * value to them.
 */
export declare const NOVO_INPUT_VALUE_ACCESSOR: InjectionToken<{
    value: any;
}>;
declare class NovoInputBase {
    _parentForm: NgForm;
    _parentFormGroup: FormGroupDirective;
    /** @docs-private */
    ngControl: NgControl;
    constructor(_parentForm: NgForm, _parentFormGroup: FormGroupDirective, 
    /** @docs-private */
    ngControl: NgControl);
}
/** Directive that allows a native input to work inside a `NovoField`. */
export declare class NovoInput extends NovoInputBase implements NovoFieldControl<any>, OnChanges, OnDestroy, AfterViewInit, DoCheck {
    protected _elementRef: ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
    protected _platform: Platform;
    /** @docs-private */
    ngControl: NgControl;
    private _autofillMonitor;
    protected _uid: string;
    protected _previousNativeValue: any;
    private _inputValueAccessor;
    /** The aria-describedby attribute on the input for improved a11y. */
    _ariaDescribedby: string;
    /** Whether the component is being rendered on the server. */
    readonly _isServer: boolean;
    /** Whether the component is a native html select. */
    readonly _isNativeSelect: boolean;
    /** Whether the component is a textarea. */
    readonly _isTextarea: boolean;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    focused: boolean;
    errorState: boolean;
    /** @docs-private Implemented as part of NovoFieldControl. */
    lastKeyValue: string;
    /** @docs-private Implemented as part of NovoFieldControl.*/
    lastCaretPosition: number | null;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    readonly stateChanges: Subject<void>;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    controlType: string;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    autofilled: boolean;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get disabled(): boolean;
    set disabled(value: boolean);
    protected _disabled: boolean;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get id(): string;
    set id(value: string);
    protected _id: string;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    placeholder: string;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get required(): boolean;
    set required(value: boolean);
    protected _required: boolean;
    /** Input type of the element. */
    get type(): string;
    set type(value: string);
    protected _type: string;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get value(): string;
    set value(value: string);
    /** Whether the element is readonly. */
    get readonly(): boolean;
    set readonly(value: boolean);
    private _readonly;
    protected _neverEmptyInputTypes: string[];
    constructor(_elementRef: ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, _platform: Platform, 
    /** @docs-private */
    ngControl: NgControl, _parentForm: NgForm, _parentFormGroup: FormGroupDirective, inputValueAccessor: any, _autofillMonitor: AutofillMonitor, ngZone: NgZone);
    ngAfterViewInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    ngDoCheck(): void;
    /** Focuses the input. */
    focus(options?: FocusOptions): void;
    _focusChanged(isFocused: boolean): void;
    _onInput(event: InputEvent): void;
    /** Does some manual dirty checking on the native input `value` property. */
    protected _dirtyCheckNativeValue(): void;
    /** Make sure the input is a supported type. */
    protected _validateType(): void;
    /** Checks whether the input type is one of the types that are never empty. */
    protected _isNeverEmpty(): boolean;
    /** Checks whether the input is invalid based on the native validation. */
    protected _isBadInput(): boolean;
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
    setDescribedByIds(ids: string[]): void;
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    onContainerClick(): void;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_readonly: BooleanInput;
    static ngAcceptInputType_required: BooleanInput;
    static ngAcceptInputType_value: any;
    onSelect: EventEmitter<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoInput, [null, null, { optional: true; self: true; }, { optional: true; }, { optional: true; }, { optional: true; self: true; }, null, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoInput, "input[novoInput], textarea[novoInput], select[novoInput]", never, { "disabled": { "alias": "disabled"; "required": false; }; "id": { "alias": "id"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "required": { "alias": "required"; "required": false; }; "type": { "alias": "type"; "required": false; }; "value": { "alias": "value"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; }, { "onSelect": "onSelect"; }, never, never, false, never>;
}
export {};
