import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, HostListener, HostBinding, ViewChild, Input, Output, Component, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { Annotation, EditorState } from '@codemirror/state';
import { keymap, EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { CommonModule } from '@angular/common';

// NG2
// organize-imports-ignore
// APP
const CODE_EDITOR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoCodeEditor),
    multi: true,
};
// CodeMirror transaction annotation to show changes that came in through writeValue (FormControl value) as opposed to UI editing
const FormControlCodeWriter = Annotation.define();
// (This is a replacement for the "novo-ace-editor". Notably, we are no longer naming it based on the underlying component. It is possible, in the future,
// we decide there is another code editing component that better fits our use case - in which situation we should replace the implementation here, but keep its name)
class NovoCodeEditor {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.theme = 'default';
        this.lineNumbers = true;
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this.changed = new EventEmitter();
        this.mode = 'javascript';
        this.initialValue = '';
        this.disabled = false;
    }
    ngOnInit() {
    }
    ngOnDestroy() {
    }
    ngAfterViewInit() {
        this.createEditorView();
    }
    createEditorView() {
        const extensions = [
            basicSetup,
            keymap.of(defaultKeymap)
        ];
        if (this.mode === 'javascript') {
            extensions.push(javascript());
        }
        const initialEditorState = EditorState.create({
            doc: this.initialValue,
            extensions,
        });
        this.editorView = new EditorView({
            state: initialEditorState,
            parent: this.elementRef.nativeElement,
            dispatch: (transaction, view) => {
                // Prevent changes if the form is disabled - unless the change came from writeValue function
                if (transaction.annotation(FormControlCodeWriter) || !(this.disabled && transaction.docChanged)) {
                    view.update([transaction]);
                }
                if (transaction.docChanged) {
                    this.changed.emit(view.state.doc.toString());
                }
            }
        });
    }
    onFocus() {
        this.focus.emit();
    }
    onBlur() {
        this.blur.emit();
    }
    // ControlValueAccessor forward implementation
    writeValue(value) {
        if (this.editorView) {
            this.editorView.dispatch({
                changes: {
                    from: 0,
                    to: this.editorView.state.doc.length,
                    insert: value,
                },
                annotations: FormControlCodeWriter.of({}),
            });
        }
        else if (value != null) {
            this.initialValue = value;
        }
    }
    registerOnChange(fn) {
        this.changed.subscribe(fn);
    }
    registerOnTouched(fn) {
        this.blur.subscribe(fn);
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCodeEditor, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoCodeEditor, isStandalone: false, selector: "novo-code-editor", inputs: { theme: "theme", lineNumbers: "lineNumbers", name: "name", mode: "mode" }, outputs: { blur: "blur", focus: "focus" }, host: { listeners: { "focus": "onFocus()", "blur": "onBlur()" }, properties: { "class.editor-disabled": "this.disabled" } }, providers: [CODE_EDITOR_VALUE_ACCESSOR], viewQueries: [{ propertyName: "editorRoot", first: true, predicate: ["editorRoot"], descendants: true }], ngImport: i0, template: '', isInline: true, styles: [":host{height:200px;display:block;overflow:auto}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCodeEditor, decorators: [{
            type: Component,
            args: [{ selector: 'novo-code-editor', template: '', providers: [CODE_EDITOR_VALUE_ACCESSOR], standalone: false, styles: [":host{height:200px;display:block;overflow:auto}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { theme: [{
                type: Input
            }], lineNumbers: [{
                type: Input
            }], name: [{
                type: Input
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], mode: [{
                type: Input
            }], editorRoot: [{
                type: ViewChild,
                args: ['editorRoot']
            }], disabled: [{
                type: HostBinding,
                args: ['class.editor-disabled']
            }], onFocus: [{
                type: HostListener,
                args: ['focus']
            }], onBlur: [{
                type: HostListener,
                args: ['blur']
            }] } });

class NovoCodeEditorModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCodeEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoCodeEditorModule, declarations: [NovoCodeEditor], imports: [CommonModule, FormsModule], exports: [NovoCodeEditor] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCodeEditorModule, imports: [CommonModule, FormsModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCodeEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: [NovoCodeEditor],
                    exports: [NovoCodeEditor]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoCodeEditor, NovoCodeEditorModule };
//# sourceMappingURL=novo-elements-addons-code-editor.mjs.map
