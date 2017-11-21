// NG2
import { Component, forwardRef, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// APP
import { Helpers } from '../../../../utils/Helpers';

// Value accessor for the component (supports ngModel)
const CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoCheckboxElement),
    multi: true
};

const LAYOUT_DEFAULTS = { iconStyle: 'box' };

@Component({
    selector: 'novo-checkbox',
    providers: [CHECKBOX_VALUE_ACCESSOR],
    template: `
        <div class="check-box-group" [class.checked]="model" [class.disabled]="disabled">
            <input [name]="name" type="checkbox" [(ngModel)]="model" [attr.id]="name">
            <label [attr.for]="name" (click)="select($event)">
              <i [class.bhi-checkbox-empty]="!model && !indeterminate && boxIcon"
                 [class.bhi-checkbox-filled]="model && !indeterminate && boxIcon"
                 [class.bhi-checkbox-indeterminate]="indeterminate && boxIcon"
                 [class.bhi-circle-o]="!model && !indeterminate && !boxIcon"
                 [class.bhi-check]="model && !indeterminate && !boxIcon"
                 [class.bhi-circle]="indeterminate && !boxIcon"></i>
              <span *ngIf="label">{{ label }}</span>
            </label>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NovoCheckboxElement implements ControlValueAccessor, OnInit {
    @Input() name: string;
    @Input() label: string;
    @Input() indeterminate: boolean = false;
    @Input() disabled: boolean;
    @Input() layoutOptions: { iconStyle?: string };

    boxIcon: boolean = true;
    model;

    onModelChange: Function = () => {
    };
    onModelTouched: Function = () => {
    };

    constructor(private ref: ChangeDetectorRef) { }

    ngOnInit() {
        this.layoutOptions = Object.assign({}, LAYOUT_DEFAULTS, this.layoutOptions);
        this.boxIcon = this.layoutOptions.iconStyle === 'box';
    }

    select(event) {
        Helpers.swallowEvent(event);
        this.model = !this.model;
        this.onModelChange(this.model);
    }

    writeValue(model: any): void {
        this.model = model;
        this.ref.markForCheck();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
}
