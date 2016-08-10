import { Component, Input, Output, ViewChild, Optional, EventEmitter, Renderer } from '@angular/core'; // eslint-disable-line
import { NgControl } from '@angular/common';

@Component({
    selector: 'novo-editor',
    template: '<textarea #host (change)="onValueChange($event)"></textarea>'
})
export class CKEditor {
    @Input() config;
    @Input() ngModel;
    @Output() change = new EventEmitter();
    @ViewChild('host') host;

    value = '';
    instance;
    ngControl;
    renderer;

    constructor(@Optional() ngControl:NgControl, renderer:Renderer) {
        if (ngControl) {
            ngControl.valueAccessor = this;
            this.ngControl = ngControl;
        }
        this.renderer = renderer;
    }

    ngOnDestroy() {
        if (this.instance) {
            this.instance.removeAllListeners();
            this.instance.destroy();
            this.instance = null;
        }
    }

    ngAfterViewInit() {
        // Configuration
        let config = this.config || this.getBaseConfig();
        this.ckeditorInit(config);
    }

    onValueChange() {
        let value = this.host.nativeElement.value;
        this.change.emit(value);
        if (this.ngControl) {
            this.ngControl.viewToModelUpdate(value);
        }
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

        // CKEditor change event
        this.instance.on('change', () => {
            this.renderer.setElementProperty(this.host.nativeElement, 'value', this.instance.getData());
            this.renderer.invokeElementMethod(this.host.nativeElement, 'dispatchEvent', [new Event('change')]);
        });
    }

    writeValue(value) {
        this.value = value;
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
}

export const NOVO_EDITOR_ELEMENTS = [CKEditor];
