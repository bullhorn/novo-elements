import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Input, ViewChild, Output, Component, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// NG2
// Value accessor for the component (supports ngModel)
const CKEDITOR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoCKEditorElement),
    multi: true,
};
// Prevents CKEDITOR from querying the page for all [contenteditable] elements (fixes a conflict against Codemirror Editor)
try {
    CKEDITOR.disableAutoInline = true;
}
catch (err) {
    // may be running in a context without CKEDITOR - ignore
}
/**
 * CKEditor component
 * Usage :
 *  <novo-editor [(ngModel)]="data" [config]="{...}" debounce="500"></novo-editor>
 */
class NovoCKEditorElement {
    constructor(zone) {
        this.zone = zone;
        this.startupFocus = false;
        this.fileBrowserImageUploadUrl = '';
        this.disabled = false;
        this.change = new EventEmitter();
        this.ready = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this.paste = new EventEmitter();
        this.loaded = new EventEmitter();
        this._value = '';
    }
    get value() {
        return this._value;
    }
    set value(v) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }
    ngOnDestroy() {
        if (this.instance) {
            this.instance.focusManager.blur(true); // Remove focus from editor
            setTimeout(() => {
                this.instance.removeAllListeners();
                const aInstance = CKEDITOR.instances[this.instance.name];
                if (aInstance) {
                    aInstance.destroy();
                }
                this.instance.destroy();
                this.instance = null;
            });
        }
    }
    ngAfterViewInit() {
        const config = Object.assign(this.getBaseConfig(), this.config);
        if (this.startupFocus) {
            config.startupFocus = true;
        }
        if (this.disabled) {
            config.readOnly = true;
        }
        this.ckeditorInit(config);
    }
    updateValue(value) {
        this.zone.run(() => {
            this.value = value;
            this.onChange(value);
            this.onTouched();
            this.change.emit(value);
        });
    }
    ckeditorInit(config) {
        if (!CKEDITOR) {
            console.error('Make sure to include CKEditor sources in your dependencies!');
            return;
        }
        // CKEditor replace textarea
        this.instance = CKEDITOR.replace(this.host.nativeElement, config);
        // Set initial value
        this.instance.setData(this.value);
        // listen for instanceReady event
        this.instance.on('instanceReady', (evt) => {
            // send the evt to the EventEmitter
            this.ready.emit(evt);
        });
        // CKEditor change event
        this.instance.on('change', () => {
            this.onTouched();
            const value = this.instance.getData();
            // Debounce update
            if (this.debounce) {
                if (this.debounceTimeout) {
                    clearTimeout(this.debounceTimeout);
                }
                this.debounceTimeout = setTimeout(() => {
                    this.updateValue(value);
                    this.debounceTimeout = null;
                }, parseInt(this.debounce, 10));
            }
            else {
                this.updateValue(value);
            }
        });
        this.instance.on('blur', (event) => {
            this.blur.emit(event);
        });
        this.instance.on('focus', (event) => {
            this.focus.emit(event);
        });
        this.instance.on('paste', (event) => {
            this.paste.emit(event);
        });
        this.instance.on('loaded', (event) => {
            this.loaded.emit(event);
        });
    }
    getBaseConfig() {
        const baseConfig = {
            enterMode: CKEDITOR.ENTER_BR,
            entities: false,
            shiftEnterMode: CKEDITOR.ENTER_P,
            disableNativeSpellChecker: false,
            removePlugins: 'liststyle,tabletools,contextmenu,tableselection', // allows browser based spell checking
            extraAllowedContent: '*(*){*};table tbody tr td th[*];', // allows class names (*) and inline styles {*} for all and attributes [*] on tables
            font_names: 'Arial/Arial, Helvetica, sans-serif;' +
                'Calibri/Calibri, Verdana, Geneva, sans-serif;' +
                'Comic Sans MS/Comic Sans MS, cursive;' +
                'Courier New/Courier New, Courier, monospace;' +
                'Georgia/Georgia, serif;' +
                'Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;' +
                'Tahoma/Tahoma, Geneva, sans-serif;' +
                'Times New Roman/Times New Roman, Times, serif;' +
                'Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;' +
                'Verdana/Verdana, Geneva, sans-serif',
        };
        const minimalConfig = {
            toolbar: [
                {
                    name: 'basicstyles',
                    items: [
                        'Styles',
                        'FontSize',
                        'Bold',
                        'Italic',
                        'Underline',
                        'TextColor',
                        '-',
                        'NumberedList',
                        'BulletedList',
                        'Outdent',
                        'Indent',
                        'Link',
                    ],
                },
            ],
        };
        const extendedConfig = {
            toolbar: [
                { name: 'clipboard', items: ['Paste', 'PasteText', 'PasteFromWord', 'Undo', 'Redo'] },
                {
                    name: 'paragraph',
                    items: [
                        'NumberedList',
                        'BulletedList',
                        'Outdent',
                        'Indent',
                        'Blockquote',
                        'JustifyLeft',
                        'JustifyCenter',
                        'JustifyRight',
                        'JustifyBlock',
                        'BidiLtr',
                        'BidiRtl',
                    ],
                },
                { name: 'links', items: ['Link'] },
                { name: 'insert', items: ['Image', 'Table', 'HorizontalRule'] },
                { name: 'tools', items: ['Maximize', 'Source'] },
                '/', // line break
                { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'] },
                { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
                { name: 'colors', items: ['TextColor', 'BGColor'] },
            ],
            filebrowserImageUploadUrl: this.fileBrowserImageUploadUrl,
        };
        return Object.assign(baseConfig, this.minimal ? minimalConfig : extendedConfig);
    }
    writeValue(value) {
        this._value = value;
        if (this.instance) {
            this.instance.setData(value);
        }
    }
    onChange(value) { }
    onTouched(event) { }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
        if (this.instance) {
            CKEDITOR.instances[this.instance.name].setReadOnly(disabled);
        }
    }
    insertText(text) {
        const trimmedText = text.trim();
        this.instance.insertText(trimmedText);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCKEditorElement, deps: [{ token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoCKEditorElement, isStandalone: false, selector: "novo-editor", inputs: { config: "config", debounce: "debounce", name: "name", minimal: "minimal", startupFocus: "startupFocus", fileBrowserImageUploadUrl: "fileBrowserImageUploadUrl", disabled: "disabled", value: "value" }, outputs: { change: "change", ready: "ready", blur: "blur", focus: "focus", paste: "paste", loaded: "loaded" }, providers: [CKEDITOR_CONTROL_VALUE_ACCESSOR], viewQueries: [{ propertyName: "host", first: true, predicate: ["host"], descendants: true }], ngImport: i0, template: '<textarea [name]="name" [id]="name" #host></textarea>', isInline: true, styles: [":host ::ng-deep .cke{font:inherit!important;box-shadow:none;border-color:var(--background-muted)}:host ::ng-deep .cke .cke_top,:host ::ng-deep .cke .cke_bottom{background:var(--background-muted) none;box-shadow:none}:host ::ng-deep .cke .cke_bottom{border-top:none}.cke_dialog_background_cover{background-color:#000!important}.cke_dialog .cke_dialog_title{text-shadow:none;background:var(--background-muted) none;box-shadow:none;border-bottom:none}.cke_dialog .cke_dialog_footer{text-shadow:none;background:var(--background-muted) none;box-shadow:none;border-top:none}:host-context(.theme-dark) ::ng-deep .cke_button{filter:invert(1)}:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button:hover,:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button:active,:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button:focus,:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button.cke_combo_on{background:var(--background-main);border:1px solid var(--border)}:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button .cke_combo_text{color:#fff}:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button .cke_combo_arrow{border-top-color:#fff}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCKEditorElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-editor', providers: [CKEDITOR_CONTROL_VALUE_ACCESSOR], template: '<textarea [name]="name" [id]="name" #host></textarea>', standalone: false, styles: [":host ::ng-deep .cke{font:inherit!important;box-shadow:none;border-color:var(--background-muted)}:host ::ng-deep .cke .cke_top,:host ::ng-deep .cke .cke_bottom{background:var(--background-muted) none;box-shadow:none}:host ::ng-deep .cke .cke_bottom{border-top:none}.cke_dialog_background_cover{background-color:#000!important}.cke_dialog .cke_dialog_title{text-shadow:none;background:var(--background-muted) none;box-shadow:none;border-bottom:none}.cke_dialog .cke_dialog_footer{text-shadow:none;background:var(--background-muted) none;box-shadow:none;border-top:none}:host-context(.theme-dark) ::ng-deep .cke_button{filter:invert(1)}:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button:hover,:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button:active,:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button:focus,:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button.cke_combo_on{background:var(--background-main);border:1px solid var(--border)}:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button .cke_combo_text{color:#fff}:host-context(.theme-dark) ::ng-deep .cke_combo a.cke_combo_button .cke_combo_arrow{border-top-color:#fff}\n"] }]
        }], ctorParameters: () => [{ type: i0.NgZone }], propDecorators: { config: [{
                type: Input
            }], debounce: [{
                type: Input
            }], name: [{
                type: Input
            }], minimal: [{
                type: Input
            }], startupFocus: [{
                type: Input
            }], fileBrowserImageUploadUrl: [{
                type: Input
            }], disabled: [{
                type: Input
            }], change: [{
                type: Output
            }], ready: [{
                type: Output
            }], blur: [{
                type: Output
            }], focus: [{
                type: Output
            }], paste: [{
                type: Output
            }], loaded: [{
                type: Output
            }], host: [{
                type: ViewChild,
                args: ['host']
            }], value: [{
                type: Input
            }] } });

// NG2
class NovoNovoCKEditorModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoNovoCKEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoNovoCKEditorModule, declarations: [NovoCKEditorElement], imports: [CommonModule, FormsModule], exports: [NovoCKEditorElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoNovoCKEditorModule, imports: [CommonModule, FormsModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoNovoCKEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: [NovoCKEditorElement],
                    exports: [NovoCKEditorElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoCKEditorElement, NovoNovoCKEditorModule };
//# sourceMappingURL=novo-elements-addons-ckeditor.mjs.map
