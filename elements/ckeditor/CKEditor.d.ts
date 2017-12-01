import { EventEmitter, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
/**
 * CKEditor component
 * Usage :
 *  <novo-editor [(ngModel)]="data" [config]="{...}" debounce="500"></novo-editor>
 */
export declare class NovoCKEditorElement implements OnDestroy, AfterViewInit {
    private zone;
    config: any;
    debounce: any;
    name: any;
    minimal: any;
    change: EventEmitter<{}>;
    ready: EventEmitter<{}>;
    blur: EventEmitter<{}>;
    focus: EventEmitter<{}>;
    paste: EventEmitter<{}>;
    loaded: EventEmitter<{}>;
    host: any;
    _value: string;
    instance: any;
    debounceTimeout: any;
    constructor(zone: NgZone);
    value: string;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    updateValue(value: any): void;
    ckeditorInit(config: any): void;
    getBaseConfig(): {
        enterMode: any;
        shiftEnterMode: any;
        disableNativeSpellChecker: boolean;
        removePlugins: string;
    } & {
        toolbar: (string | {
            name: string;
            items: string[];
        })[];
    };
    writeValue(value: any): void;
    onChange(value?: any): void;
    onTouched(event?: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    insertText(text: any): void;
}
