// NG2
import { Component, Input, Output, ViewChild, EventEmitter, NgZone, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

// Value accessor for the component (supports ngModel)
const CKEDITOR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoCKEditorElement),
    multi: true
};

/**
 * CKEditor component
 * Usage :
 *  <novo-editor [(ngModel)]="data" [config]="{...}" debounce="500"></novo-editor>
 */
@Component({
    selector: 'novo-editor',
    providers: [CKEDITOR_CONTROL_VALUE_ACCESSOR],
    template: '<textarea #host></textarea>'
})
export class NovoCKEditorElement {
    @Input() config;
    @Input() debounce;

    @Output() change = new EventEmitter();
    @Output() ready = new EventEmitter();
    @ViewChild('host') host;

    _value = '';
    instance;
    debounceTimeout;
    zone;

    constructor(zone:NgZone) {
        this.zone = zone;
    }

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
        let config = this.confi || this.getBaseConfig();
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
            console.error('Make sure to include CKEditor sources in your dependencies!'); // eslint-disable-line
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
                if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
                this.debounceTimeout = setTimeout(() => {
                    this.updateValue(value);
                    this.debounceTimeout = null;
                }, parseInt(this.debounce)); // eslint-disable-line
            } else {
                this.updateValue(value);
            }
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

    onChange() {
    }

    onTouched() {
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}
