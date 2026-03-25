import * as i0 from '@angular/core';
import { AfterContentInit, OnChanges, EventEmitter, ElementRef, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import * as i4 from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import * as i2 from '@angular/common';
import * as i3 from 'novo-elements/elements/button';

declare class NovoTilesElement implements ControlValueAccessor, AfterContentInit, OnChanges {
    private element;
    private ref;
    name: string;
    options: any;
    required: boolean;
    disabled: boolean;
    onChange: EventEmitter<any>;
    onSelectedOptionClick: EventEmitter<any>;
    onDisabledOptionClick: EventEmitter<any>;
    _options: Array<any>;
    activeTile: any;
    focused: boolean;
    model: any;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(element: ElementRef, ref: ChangeDetectorRef);
    setFocus(focus: boolean): void;
    ngAfterContentInit(): void;
    ngOnChanges(change: SimpleChanges): void;
    setupOptions(): void;
    select(event: any, item: any): void;
    setTile(item: any): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(disabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTilesElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoTilesElement, "novo-tiles", never, { "name": { "alias": "name"; "required": false; }; "options": { "alias": "options"; "required": false; }; "required": { "alias": "required"; "required": false; }; "disabled": { "alias": "controlDisabled"; "required": false; }; }, { "onChange": "onChange"; "onSelectedOptionClick": "onSelectedOptionClick"; "onDisabledOptionClick": "onDisabledOptionClick"; }, never, never, false, never>;
}

declare class NovoTilesModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTilesModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoTilesModule, [typeof NovoTilesElement], [typeof i2.CommonModule, typeof i3.NovoButtonModule, typeof i4.ReactiveFormsModule], [typeof NovoTilesElement]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoTilesModule>;
}

export { NovoTilesElement, NovoTilesModule };
