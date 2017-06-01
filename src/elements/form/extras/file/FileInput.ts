// NG2
import { Component, Input, ElementRef, forwardRef, OnInit, OnDestroy, OnChanges, ViewChild, ViewContainerRef, TemplateRef, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// APP
import { NovoLabelService } from '../../../../services/novo-label-service';
import { NovoDragulaService } from '../../../../elements/dragula/DragulaService';
import { NovoFile } from './extras/file/File';

// Value accessor for the component (supports ngModel)
const FILE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoFileInputElement),
    multi: true
};

const LAYOUT_DEFAULTS = { order: 'default', download: true, labelStyle: 'default', draggable: false };

@Component({
    selector: 'novo-file-input',
    providers: [FILE_VALUE_ACCESSOR],
    template: `
        <div #container></div>
        <template #fileInput>
            <div class="file-input-group" [class.disabled]="disabled" [class.active]="active">
                <input type="file" [name]="name" [attr.id]="name" (change)="check($event)" [attr.multiple]="multiple"/>
                <section [ngSwitch]="layoutOptions.labelStyle">
                    <label *ngSwitchCase="'no-box'" [attr.for]="name" class="no-box">
                            <div><i class="bhi-dropzone"></i>{{ placeholder || labels.chooseAFile }} {{ labels.or }} <strong class="link">{{ labels.clickToBrowse }}</strong></div>
                    </label>
                    <label *ngSwitchDefault [attr.for]="name" class="boxed">
                            <span>{{ placeholder || labels.chooseAFile }}</span>
                            <small>{{ labels.or }} <strong class="link">{{ labels.clickToBrowse }}</strong></small>
                    </label>
                </section>
            </div>
        </template>
        <template #fileOutput>
            <div class="file-output-group" [dragula]="fileOutputBag" [dragulaModel]="files">
                <div class="file-item" *ngFor="let file of files">
                    <i *ngIf="layoutOptions.draggable" class="bhi-move"></i>
                    <label>{{ file.name | decodeURI }}</label>
                    <div class="actions" [attr.data-automation-id]="'file-actions'" *ngIf="file.loaded">
                        <button *ngIf="layoutOptions.download" type="button" theme="icon" icon="save" (click)="download(file)" [attr.data-automation-id]="'file-download'"></button>
                        <button type="button" theme="icon" icon="close" (click)="remove(file)" [attr.data-automation-id]="'file-remove'"></button>
                    </div>
                    <novo-loading *ngIf="!file.loaded"></novo-loading>
                </div>
            </div>
        </template>`
})
export class NovoFileInputElement implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
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
    @Input() layoutOptions: { order?: string, download?: boolean, labelStyle?: string, draggable?: boolean };
    @Input() value: Array<any> = [];

    elements: Array<any> = [];
    files: Array<any> = [];
    model: any;
    active: boolean = false;
    commands: any;
    visible: boolean;
    target: any;
    fileOutputBag: string;

    onModelChange: Function = () => {
    };
    onModelTouched: Function = () => {
    };

    constructor(private element: ElementRef, public labels: NovoLabelService, private dragula: NovoDragulaService) {
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
        this.initializeDragula();
        this.setInitialFileList();
    }

    ngOnDestroy() {
        ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(type => {
            this.element.nativeElement.removeEventListener(type, this.commands[type]);
        });
        let dragulaHasFileOutputBag = this.dragula.bags.length > 0 && this.dragula.bags.filter(x => x.name === this.fileOutputBag).length > 0;
        if (dragulaHasFileOutputBag) {
            this.dragula.destroy(this.fileOutputBag);
        }
    }

    ngOnChanges(changes?: SimpleChanges) {
        this.onModelChange(this.model);
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
        return order;
    }

    initializeDragula() {
        this.fileOutputBag = `file-output-${this.dragula.bags.length}`;
        this.dragula.setOptions(this.fileOutputBag, {
            moves: (el, container, handle) => {
                return this.layoutOptions.draggable;
            }
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
