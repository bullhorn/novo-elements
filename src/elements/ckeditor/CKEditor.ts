// NG2
import { Component, Input, Output, ViewChild, EventEmitter, NgZone, forwardRef, AfterViewInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

// Value accessor for the component (supports ngModel)
const CKEDITOR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoCKEditorElement),
    multi: true
};

declare var CKEDITOR: any;

/**
 * CKEditor component
 * Usage :
 *  <novo-editor [(ngModel)]="data" [config]="{...}" debounce="500"></novo-editor>
 */
@Component({
    selector: 'novo-editor',
    providers: [CKEDITOR_CONTROL_VALUE_ACCESSOR],
    template: '<textarea [name]="name" [id]="name" #host></textarea>'
})
export class NovoCKEditorElement implements OnDestroy, AfterViewInit {
    @Input() config;
    @Input() debounce;
    @Input() name;

    @Output() change = new EventEmitter();
    @Output() ready = new EventEmitter();
    @Output() blur = new EventEmitter();
    @Output() focus = new EventEmitter();
    @Output() paste = new EventEmitter();
    @Output() loaded = new EventEmitter();
    @ViewChild('host') host;

    _value: string = '';
    instance;
    debounceTimeout;

    constructor(private zone: NgZone) {}

    get value() {
        return this._value;
    }

    @Input() set value(v) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    ngOnDestroy() {
        if (this.instance) {
            setTimeout(() => {
                this.instance.removeAllListeners();
                this.instance.destroy();
                this.instance = null;
            });
        }
    }

    ngAfterViewInit() {
        let config = this.config || this.getBaseConfig();
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
            let value = this.instance.getData();

            // Debounce update
            if (this.debounce) {
                if (this.debounceTimeout) {
                    clearTimeout(this.debounceTimeout);
                }
                this.debounceTimeout = setTimeout(() => {
                    this.updateValue(value);
                    this.debounceTimeout = null;
                }, parseInt(this.debounce));
            } else {
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
        return {
            toolbar: [
                { name: 'clipboard', items: ['Paste', 'PasteText', 'PasteFromWord', 'Undo', 'Redo', 'Scayt'] },
                { name: 'paragraph', items: ['NumberedList', 'BulletedList', 'Outdent', 'Indent', 'Blockquote', 'CreateDiv', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'BidiLtr', 'BidiRtl'] },
                { name: 'links', items: ['Link'] },
                { name: 'tools', items: ['Maximize', 'Source'] },
                '/',
                { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'] },
                { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
                { name: 'colors', items: ['TextColor', 'BGColor'] }
            ]
        };
    }

    writeValue(value) {
        this._value = value;
        if (this.instance) {
            this.instance.setData(value);
        }
    }

    onChange(value?: any) {
    }

    onTouched(event?) {
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    insertText(text) {
        let trimmedText = text.trim();
        this.instance.insertText(trimmedText);
    }
}
