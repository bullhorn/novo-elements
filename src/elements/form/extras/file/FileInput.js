// NG2
import { Component, Input, ElementRef, forwardRef, Provider } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

// Value accessor for the component (supports ngModel)
const FILE_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => NovoFileInputElement),
    multi: true
});

@Component({
    selector: 'novo-file-input',
    providers: [FILE_VALUE_ACCESSOR],
    template: `
        <div class="file-output-group">
            <div class="file-item" *ngFor="let file of files">
                <label>{{file.name}}</label>
                <div class="actions" [attr.data-automation-id]="'file-actions'">
                    <button theme="icon" icon="save" (click)="download(file)" [attr.data-automation-id]="'file-download'"></button>
                    <button theme="icon" icon="close" (click)="remove(file)" [attr.data-automation-id]="'file-remove'"></button>
                </div>
            </div>
        </div>
        <div class="file-input-group" [class.disabled]="disabled" [class.active]="active">
            <input type="file" [name]="name" [attr.id]="name" (change)="check($event)" [attr.multiple]="multiple"/>
            <label [attr.for]="name">
                <span>{{placeholder}}</span>
                <small>or <strong class="link">click to browse</strong></small>
            </label>
        </div>
    `
})
export class NovoFileInputElement implements ControlValueAccessor {
    @Input() name:string;
    @Input() multiple:boolean = false;
    @Input() disabled:boolean = false;
    @Input() placeholder:string = 'Choose a file';

    value:Array = [];
    files:Array = [];
    model:any;
    active:boolean = false;
    onModelChange:Function = () => {};
    onModelTouched:Function = () => {};

    constructor(element:ElementRef) {
        this.element = element;
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
            //do something
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
        if (event.dataTransfer.types[0] !== 'Files') return;
        if (this.multiple) {
            this.files = Array.from(event.dataTransfer.files);
        } else {
            this.files = [Array.from(event.dataTransfer.files)[0]];
        }

        this.model = this.files;
        this.onModelChange(this.model);
        this.active = false;
    }

    writeValue(model:any):void {
        this.model = model;
    }

    registerOnChange(fn:Function):void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn:Function):void {
        this.onModelTouched = fn;
    }

    check(event) {
        // get selected file element
        let input = event.target;
        this.files = Array.from(input.files);
        this.model = this.files;
        this.onModelChange(this.model);
    }

    download(file) {
        let reader = new FileReader();
        // inject an image with the src url
        reader.onload = (event) => {
            let url = event.target.result;
            window.open(url, '_blank');
        };
        // when the file is read it triggers the onload event above.
        reader.readAsDataURL(file);
    }

    remove(file) {
        this.files.splice(this.files.findIndex(f => f.name === file.name), 1);
        this.model = this.files;
        this.onModelChange(this.model);
    }
}
