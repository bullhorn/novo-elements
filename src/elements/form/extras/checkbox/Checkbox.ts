// NG2
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// APP
import { Helpers } from '../../../../utils/Helpers';

// Value accessor for the component (supports ngModel)
const CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoCheckboxElement),
    multi: true
};

@Component({
    selector: 'novo-checkbox',
    providers: [CHECKBOX_VALUE_ACCESSOR],
    template: `
        <div class="check-box-group" [class.checked]="model" [class.disabled]="disabled">
            <input hidden="true" [name]="name" type="checkbox" [(ngModel)]="model" [attr.id]="name">
            <label [attr.for]="name" (click)="select($event)">
              <i [class.bhi-checkbox-empty]="!model && !indeterminate"
                 [class.bhi-checkbox-filled]="model && !indeterminate"
                 [class.bhi-checkbox-indeterminate]="indeterminate"></i>
              <span>{{label}}</span>
            </label>
        </div>
    `
})
export class NovoCheckboxElement implements ControlValueAccessor {
    @Input() name:string;
    @Input() label:string;
    @Input() indeterminate:boolean = false;
    @Input() disabled:boolean;
    value:boolean = false;

    model;
    onModelChange:Function = () => {
    };
    onModelTouched:Function = () => {
    };

    select(event) {
        Helpers.swallowEvent(event);
        this.model = !this.model;
        this.onModelChange(this.model);
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
}
