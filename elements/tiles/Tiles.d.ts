import { SimpleChanges, EventEmitter, ElementRef, AfterContentInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class NovoTilesElement implements ControlValueAccessor, AfterContentInit, OnChanges {
    private element;
    private ref;
    name: string;
    options: any;
    required: boolean;
    onChange: EventEmitter<any>;
    onDisabledOptionClick: EventEmitter<any>;
    _options: Array<any>;
    activeTile: any;
    state: String;
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
    moveTile(): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
}
