// NG2
import { Component, Input, ElementRef, forwardRef, OnInit, OnDestroy, ViewChild, ViewChildren, ViewContainerRef, TemplateRef, QueryList, Pipe } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// APP
import { NovoLabelService } from '../../../../services/novo-label-service';
import { NovoFile } from './extras/file/File';

// Value accessor for the component (supports ngModel)
const FILE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoFileInputElement),
    multi: true
};

const LAYOUT_DEFAULTS = { order: 'default', download: true, boxedLabel: true };

@Component({
    selector: 'novo-file-input',
    providers: [FILE_VALUE_ACCESSOR],
    template: `
        <div #container></div>
        <template #fileInput>
            <div class="file-input-group" [class.disabled]="disabled" [class.active]="active">
                <input type="file" [name]="name" [attr.id]="name" (change)="check($event)" [attr.multiple]="multiple"/>
                <label [attr.for]="name" *ngIf="layoutOptions.boxedLabel" class="boxed">
                        <span>{{ placeholder || labels.chooseAFile }}</span>
                        <small>{{ labels.or }} <strong class="link">{{ labels.clickToBrowse }}</strong></small>
                </label>
                <label [attr.for]="name" *ngIf="!layoutOptions?.boxedLabel">
                        <span> <i class="bhi-dropzone"></i>{{ placeholder || labels.chooseAFile }} {{ labels.or }} <strong class="link">{{ labels.clickToBrowse }}</strong></span>
                </label>
            </div>
        </template>
        <template #fileOutput>
            <div class="file-output-group">
                <div class="file-item" *ngFor="let file of files">
                    <label>{{ file.name | decodeURI }}</label>
                    <div class="actions" [attr.data-automation-id]="'file-actions'" *ngIf="file.loaded">
                        <button *ngIf="layoutOptions.download" theme="icon" icon="save" (click)="download(file)" [attr.data-automation-id]="'file-download'"></button>
                        <button theme="icon" icon="close" (click)="remove(file)" [attr.data-automation-id]="'file-remove'"></button>
                    </div>
                    <novo-loading *ngIf="!file.loaded"></novo-loading>
                </div>
            </div>
        </template>`
})
export class NovoFileInputElement implements ControlValueAccessor, OnInit, OnDestroy {
    @ViewChild('fileInput')
    fileInput: TemplateRef<any>;
    @ViewChild('fileOutput')
    fileOutput: TemplateRef<any>;
    @ViewChild('container', { read: ViewContainerRef })
    container: ViewContainerRef;


    @Input() name: string;
    @Input() multiple: boolean = false;
    @Input() disabled: boolean = false;
    @Input() placeholder: string;
    @Input() layoutOptions: any;
    @Input() value: Array<any> = [];

    elements: Array<any> = [];
    files: Array<any> = [];
    model: any;
    active: boolean = false;
    commands: any;
    visible: boolean;
    target: any;

    onModelChange: Function = () => {
    };
    onModelTouched: Function = () => {
    };

    constructor(private element: ElementRef, public labels: NovoLabelService) {
        this.commands = {
            dragenter: this.dragEnterHandler.bind(this),
            dragleave: this.dragLeaveHandler.bind(this),
            dragover: this.dragOverHandler.bind(this),
            drop: this.dropHandler.bind(this)
        };
    }

    ngOnInit() {
        ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(type => {
            this.element.nativeElement.addEventListener(type, this.commands[type]);
        });
        this.updateLayout();
        this.setInitialFileList();
    }

    ngOnDestroy() {
        ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(type => {
            this.element.nativeElement.removeEventListener(type, this.commands[type]);
        });
    }

    updateLayout() {
        this.layoutOptions = Object.assign({}, LAYOUT_DEFAULTS, this.layoutOptions);
        this.insertTemplatesBasedOnLayout();
    }

    insertTemplatesBasedOnLayout() {
        let order;
        switch (this.layoutOptions['order']) {
            case 'displayFilesBelow':
                order = ['fileInput', 'fileOutput'];
                break;
            default:
                order = ['fileOutput', 'fileInput'];
        }
        order.forEach((template) => {
            this.container.createEmbeddedView(this[template], 0);
        });
    }

    setInitialFileList() {
        if (this.value && this.value.length > 0) {
            this.files = this.value;
        }
    }

    dragEnterHandler(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        this.target = event.target;
        this.active = true;
    }

    dragLeaveHandler(event) {
        event.preventDefault();
        if (this.target === event.target) {
            this.active = false;
        }
    }

    dragOverHandler(event) {
        event.preventDefault();
        // no-op
    }

    dropHandler(event) {
        event.preventDefault();
        this.visible = false;
        if (event.dataTransfer.types[0] !== 'Files') {
            return;
        }
        let filelist = Array.from(event.dataTransfer.files);
        this.process(this.multiple ? filelist : [filelist[0]]);
        this.active = false;
    }

    writeValue(model: any): void {
        this.model = model;
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    check(event) {
        this.process(Array.from(event.target.files));
    }

    process(filelist) {
        Promise.all(
            filelist.map((file) => this.readFile(file))
        ).then((files) => {
            if (this.multiple) {
                this.files.push(...files);
            } else {
                this.files = files;
            }
            this.model = this.files;
            this.onModelChange(this.model);
        });
    }

    download(file) {
        window.open(file.dataURL, '_blank');
    }

    remove(file) {
        this.files.splice(this.files.findIndex(f => (f.name === file.name && f.size === file.size)), 1);
        this.model = this.files;
        this.onModelChange(this.model);
    }

    readFile(file) {
        return new NovoFile(file).read();
    }
}
