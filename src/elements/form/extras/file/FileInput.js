// NG2
import { Component, Input, forwardRef, Provider } from '@angular/core';
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
        <div class="file-input-group" [class.disabled]="disabled">
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
    @Input() multiple:boolean;
    @Input() disabled:boolean;
    @Input() placeholder:string = 'Choose a file';

    value:boolean = false;
    files:Array = [];
    model:any;
    onModelChange:Function = () => {};
    onModelTouched:Function = () => {};

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
