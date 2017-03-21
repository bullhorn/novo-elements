// NG2
import { Component, Input, ElementRef, forwardRef, OnInit, OnDestroy } from '@angular/core';
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

@Component({
    selector: 'novo-file-input',
    providers: [FILE_VALUE_ACCESSOR],
    template: `
        <div class="file-output-group">
            <div class="file-item" *ngFor="let file of files">
                <label>{{ file.name | decodeURI }}</label>
                <div class="actions" [attr.data-automation-id]="'file-actions'" *ngIf="file.loaded">
                    <button theme="icon" icon="save" (click)="download(file)" [attr.data-automation-id]="'file-download'"></button>
                    <button theme="icon" icon="close" (click)="remove(file)" [attr.data-automation-id]="'file-remove'"></button>
                </div>
                <novo-loading *ngIf="!file.loaded"></novo-loading>
            </div>
        </div>
        <div class="file-input-group" [class.disabled]="disabled" [class.active]="active">
            <input type="file" [name]="name" [attr.id]="name" (change)="check($event)" [attr.multiple]="multiple"/>
            <label [attr.for]="name">
                <span>{{ placeholder || labels.chooseAFile }}</span>
                <small>{{ labels.or }} <strong class="link">{{ labels.clickToBrowse }}</strong></small>
            </label>
        </div>
    `
})
export class NovoFileInputElement implements ControlValueAccessor, OnInit, OnDestroy {
    @Input() name: string;
    @Input() multiple: boolean = false;
    @Input() disabled: boolean = false;
    @Input() placeholder: string;

    value: Array<any> = [];
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
    }

    ngOnDestroy() {
        ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(type => {
            this.element.nativeElement.removeEventListener(type, this.commands[type]);
        });
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
