import * as i0 from '@angular/core';
import { OnDestroy, AfterViewInit, EventEmitter, NgZone } from '@angular/core';
import * as i3 from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import * as i2 from '@angular/common';

/**
 * CKEditor component
 * Usage :
 *  <novo-editor [(ngModel)]="data" [config]="{...}" debounce="500"></novo-editor>
 */
declare class NovoCKEditorElement implements OnDestroy, AfterViewInit, ControlValueAccessor {
    private zone;
    config: any;
    debounce: any;
    name: any;
    minimal: any;
    startupFocus: boolean;
    fileBrowserImageUploadUrl: string;
    disabled: boolean;
    change: EventEmitter<any>;
    ready: EventEmitter<any>;
    blur: EventEmitter<any>;
    focus: EventEmitter<any>;
    paste: EventEmitter<any>;
    loaded: EventEmitter<any>;
    host: any;
    _value: string;
    instance: any;
    debounceTimeout: any;
    constructor(zone: NgZone);
    get value(): string;
    set value(v: string);
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    updateValue(value: any): void;
    private ckeditorInit;
    getBaseConfig(): {
        [key: string]: any;
    };
    writeValue(value: any): void;
    onChange(value?: any): void;
    onTouched(event?: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(disabled: boolean): void;
    insertText(text: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoCKEditorElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoCKEditorElement, "novo-editor", never, { "config": { "alias": "config"; "required": false; }; "debounce": { "alias": "debounce"; "required": false; }; "name": { "alias": "name"; "required": false; }; "minimal": { "alias": "minimal"; "required": false; }; "startupFocus": { "alias": "startupFocus"; "required": false; }; "fileBrowserImageUploadUrl": { "alias": "fileBrowserImageUploadUrl"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "change": "change"; "ready": "ready"; "blur": "blur"; "focus": "focus"; "paste": "paste"; "loaded": "loaded"; }, never, never, false, never>;
}

declare class NovoNovoCKEditorModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoNovoCKEditorModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoNovoCKEditorModule, [typeof NovoCKEditorElement], [typeof i2.CommonModule, typeof i3.FormsModule], [typeof NovoCKEditorElement]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoNovoCKEditorModule>;
}

export { NovoCKEditorElement, NovoNovoCKEditorModule };
