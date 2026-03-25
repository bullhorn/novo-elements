import * as i0 from '@angular/core';
import { OnInit, OnDestroy, AfterViewInit, EventEmitter, ElementRef, DestroyRef } from '@angular/core';
import * as i3 from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import { EditorView } from '@codemirror/view';
import * as i2 from '@angular/common';

declare class NovoCodeEditor implements ControlValueAccessor, OnInit, OnDestroy, AfterViewInit {
    private elementRef;
    private destroyRef;
    theme: string;
    lineNumbers: boolean;
    name: string;
    blur: EventEmitter<any>;
    focus: EventEmitter<any>;
    private changed;
    mode: string;
    editorRoot: ElementRef<HTMLElement>;
    editorView: EditorView;
    initialValue: string;
    protected disabled: boolean;
    constructor(elementRef: ElementRef, destroyRef: DestroyRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    createEditorView(): void;
    onFocus(): void;
    onBlur(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoCodeEditor, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoCodeEditor, "novo-code-editor", never, { "theme": { "alias": "theme"; "required": false; }; "lineNumbers": { "alias": "lineNumbers"; "required": false; }; "name": { "alias": "name"; "required": false; }; "mode": { "alias": "mode"; "required": false; }; }, { "blur": "blur"; "focus": "focus"; }, never, never, false, never>;
}

declare class NovoCodeEditorModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoCodeEditorModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoCodeEditorModule, [typeof NovoCodeEditor], [typeof i2.CommonModule, typeof i3.FormsModule], [typeof NovoCodeEditor]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoCodeEditorModule>;
}

export { NovoCodeEditor, NovoCodeEditorModule };
