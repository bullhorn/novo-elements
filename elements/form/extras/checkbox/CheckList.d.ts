import { EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class NovoCheckListElement implements ControlValueAccessor, OnInit {
    name: string;
    options: Array<any>;
    onSelect: EventEmitter<any>;
    _options: Array<any>;
    model: any;
    onModelChange: Function;
    onModelTouched: Function;
    ngOnInit(): void;
    select(event: any, item: any): void;
    setupOptions(): void;
    setModel(): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
}
