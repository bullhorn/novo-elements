import * as i0 from '@angular/core';
import { OnInit, ElementRef, EventEmitter, ChangeDetectorRef, OnChanges, OnDestroy } from '@angular/core';
import * as i5 from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import { NovoLabelService } from 'novo-elements/services';
import * as i8 from 'novo-elements/elements/common';
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import { Subscription } from 'rxjs';
import { HSLA, HSVA, RGBA, HSL, HSV, RGB, Color } from 'novo-elements/utils';
import * as i4 from '@angular/common';
import * as i6 from 'novo-elements/pipes';
import * as i7 from 'novo-elements/elements/field';
import * as i9 from 'novo-elements/elements/icon';

declare class NovoColorInputElement implements OnInit, ControlValueAccessor {
    element: ElementRef;
    labels: NovoLabelService;
    private cdr;
    name: string;
    placeholder: string;
    blurEvent: EventEmitter<FocusEvent>;
    focusEvent: EventEmitter<FocusEvent>;
    /** Element for the panel containing the autocomplete options. */
    overlay: NovoOverlayTemplateComponent;
    change: EventEmitter<any>;
    blur: EventEmitter<any>;
    focus: EventEmitter<any>;
    private _value;
    lastValidValue: string;
    private _disabled;
    get value(): string;
    set value(value: string);
    get disabled(): boolean;
    set disabled(value: boolean);
    constructor(element: ElementRef, labels: NovoLabelService, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    /** BEGIN: Convenient Panel Methods. */
    openPanel(): void;
    closePanel(): void;
    get panelOpen(): boolean;
    /** END: Convenient Panel Methods. */
    _handleKeydown(event: KeyboardEvent): void;
    _handleInput(event: KeyboardEvent): void;
    _handleBlur(event: FocusEvent): void;
    _handleFocus(event: FocusEvent): void;
    writeValue(value: any): void;
    setDisabledState(disabled: boolean): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private onChangeCallback;
    private onTouchedCallback;
    private _setFormValue;
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    setValueAndClose(event: any): void;
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue(): void;
    get hasValue(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoColorInputElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoColorInputElement, "novo-color-input", never, { "name": { "alias": "name"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "value": { "alias": "value"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "blurEvent": "blurEvent"; "focusEvent": "focusEvent"; "change": "change"; "blur": "blur"; "focus": "focus"; }, never, never, false, never>;
}

declare class NovoColorPickerComponent implements OnInit, OnChanges, OnDestroy {
    /** Pixel value for picker width */
    width: string | number;
    /** Color squares to display */
    colors: string[];
    color: HSLA | HSVA | RGBA | string;
    onChange: EventEmitter<any>;
    onChangeComplete: EventEmitter<any>;
    onSwatchHover: EventEmitter<any>;
    hsl: HSL;
    hsv: HSV;
    rgb: RGB;
    hex: string;
    currentColor: Color;
    changes: Subscription;
    swatchStyle: {
        [key: string]: string;
    };
    input: {
        [key: string]: string;
    };
    focus(color: string): {
        boxShadow: string;
    };
    handleBlockChange({ hex, $event }: any): void;
    handleValueChange({ data, $event }: any): void;
    ngOnInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    setState(data: Color): void;
    handleChange(data: any, $event: any): void;
    /** hook for components after a complete change */
    afterValidChange(): void;
    handleSwatchHover($event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoColorPickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoColorPickerComponent, "novo-color-picker", never, { "width": { "alias": "width"; "required": false; }; "colors": { "alias": "colors"; "required": false; }; "color": { "alias": "color"; "required": false; }; }, { "onChange": "onChange"; "onChangeComplete": "onChangeComplete"; "onSwatchHover": "onSwatchHover"; }, never, never, false, never>;
}

declare class NovoColorSwatchComponent implements OnInit {
    color: string;
    style: {
        [key: string]: string;
    };
    focusStyle: {
        [key: string]: string;
    };
    focus: boolean;
    onClick: EventEmitter<any>;
    onHover: EventEmitter<any>;
    divStyles: {
        [key: string]: string;
    };
    focusStyles: {
        [key: string]: string;
    };
    inFocus: boolean;
    ngOnInit(): void;
    currentStyles(): {
        [key: string]: string;
    };
    handleFocusOut(): void;
    handleFocus(): void;
    handleHover(hex: string, $event: any): void;
    handleClick(hex: string, $event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoColorSwatchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoColorSwatchComponent, "novo-color-swatch", never, { "color": { "alias": "color"; "required": false; }; "style": { "alias": "style"; "required": false; }; "focusStyle": { "alias": "focusStyle"; "required": false; }; "focus": { "alias": "focus"; "required": false; }; }, { "onClick": "onClick"; "onHover": "onHover"; }, never, ["*"], false, never>;
}

declare class NovoColorPickerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoColorPickerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoColorPickerModule, [typeof NovoColorPickerComponent, typeof NovoColorInputElement, typeof NovoColorSwatchComponent], [typeof i4.CommonModule, typeof i5.FormsModule, typeof i6.NovoPipesModule, typeof i7.NovoFieldModule, typeof i8.NovoOverlayModule, typeof i9.NovoIconModule], [typeof NovoColorPickerComponent, typeof NovoColorInputElement, typeof NovoColorSwatchComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoColorPickerModule>;
}

export { NovoColorInputElement, NovoColorPickerComponent, NovoColorPickerModule, NovoColorSwatchComponent };
