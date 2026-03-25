import * as i0 from '@angular/core';
import { InjectionToken, OnInit, EventEmitter, ChangeDetectorRef, AfterContentInit, QueryList } from '@angular/core';
import { ControlValueAccessor, NgForm, FormGroupDirective, NgControl } from '@angular/forms';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { CanUpdateErrorStateCtor, ErrorStateMatcher } from 'novo-elements/elements/common';
import { NovoFieldControl } from 'novo-elements/elements/field';
import * as i3 from '@angular/common';
import * as i4 from 'novo-elements/elements/button';

interface RadioGroup<T = any> {
    name: string;
    value: T;
    disabled: boolean;
    appearance: 'vertical' | 'horizontal';
}
type ComponentType<T> = new (...args: any[]) => T;
declare const NOVO_RADIO_GROUP: InjectionToken<ComponentType<RadioGroup<any>>>;

declare class NovoRadioElement implements ControlValueAccessor, OnInit {
    radioGroup: RadioGroup;
    private ref;
    private _uniqueId;
    private _value;
    _checked: boolean;
    id: string;
    name: string;
    tabindex: number;
    vertical: boolean;
    label: string;
    button: boolean;
    theme: string;
    size: string;
    icon: string;
    color: string;
    disabled: boolean;
    change: EventEmitter<any>;
    blur: EventEmitter<any>;
    focus: EventEmitter<any>;
    get checked(): boolean;
    set checked(value: boolean);
    get value(): boolean | string;
    set value(value: boolean | string);
    constructor(radioGroup: RadioGroup, ref: ChangeDetectorRef);
    ngOnInit(): void;
    _onInputChange(event: Event): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private onChangeCallback;
    private onTouchedCallback;
    setDisabledState(disabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoRadioElement, [{ optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoRadioElement, "novo-radio", never, { "id": { "alias": "id"; "required": false; }; "name": { "alias": "name"; "required": false; }; "tabindex": { "alias": "tabindex"; "required": false; }; "vertical": { "alias": "vertical"; "required": false; }; "label": { "alias": "label"; "required": false; }; "button": { "alias": "button"; "required": false; }; "theme": { "alias": "theme"; "required": false; }; "size": { "alias": "size"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "color": { "alias": "color"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "checked": { "alias": "checked"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "change": "change"; "blur": "blur"; "focus": "focus"; }, never, ["*"], false, never>;
}

declare class NovoRadioGroupBase {
    _defaultErrorStateMatcher: ErrorStateMatcher;
    _parentForm: NgForm;
    _parentFormGroup: FormGroupDirective;
    ngControl: NgControl;
    constructor(_defaultErrorStateMatcher: ErrorStateMatcher, _parentForm: NgForm, _parentFormGroup: FormGroupDirective, ngControl: NgControl);
}
declare const NovoRadioGroupMixins: CanUpdateErrorStateCtor & typeof NovoRadioGroupBase;
declare class NovoRadioGroup extends NovoRadioGroupMixins implements NovoFieldControl<any>, ControlValueAccessor, AfterContentInit {
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

declare class NovoRadioModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoRadioModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoRadioModule, [typeof NovoRadioElement, typeof NovoRadioGroup], [typeof i3.CommonModule, typeof i4.NovoButtonModule], [typeof NovoRadioElement, typeof NovoRadioGroup]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoRadioModule>;
}

export { NOVO_RADIO_GROUP, NovoRadioElement, NovoRadioGroup, NovoRadioModule };
export type { ComponentType, RadioGroup };
