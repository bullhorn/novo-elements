import * as i0 from '@angular/core';
import { OnInit, OnDestroy, EventEmitter, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i2 from '@angular/common';

/**
 * @deprecated Use NovoCodeEditor instead
 */
declare class NovoAceEditor implements ControlValueAccessor, OnInit, OnDestroy {
    private elementRef;
    set theme(theme: any);
    set options(options: any);
    set mode(mode: any);
    name: string;
    blur: EventEmitter<any>;
    focus: EventEmitter<any>;
    private _options;
    private _theme;
    private _mode;
    private text;
    private oldText;
    private editor;
    private onChange;
    private onTouched;
    constructor(elementRef: ElementRef);
    ngOnDestroy(): void;
    ngOnInit(): void;
    private initializeEditor;
    private initializeOptions;
    private initializeEvents;
    private updateText;
    private setText;
    private setOptions;
    private setTheme;
    private setMode;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAceEditor, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAceEditor, "novo-ace-editor", never, { "theme": { "alias": "theme"; "required": false; }; "options": { "alias": "options"; "required": false; }; "mode": { "alias": "mode"; "required": false; }; "name": { "alias": "name"; "required": false; }; }, { "blur": "blur"; "focus": "focus"; }, never, never, false, never>;
}

declare class NovoAceEditorModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAceEditorModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoAceEditorModule, [typeof NovoAceEditor], [typeof i2.CommonModule], [typeof NovoAceEditor]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoAceEditorModule>;
}

export { NovoAceEditor, NovoAceEditorModule };
