import { Component, EventEmitter } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';

import { BaseInput } from './../FormExtras';

@Component({
    selector: 'check-box',
    inputs: ['name', 'label', 'required', 'indeterminate', 'value'],
    outputs: ['valueChange'],
    directives: [COMMON_DIRECTIVES],
    template: `
        <div class="check-box-group" [class.checked]="value">
            <input hidden="true" [name]="name" type="checkbox" [(ngModel)]="value" [attr.id]="name">
            <label [attr.for]="name" (click)="select($event)">
              <i [class.bhi-checkbox-empty]="!value && !indeterminate"
                 [class.bhi-checkbox-filled]="value && !indeterminate"
                 [class.bhi-checkbox-indeterminate]="indeterminate"></i>
              <span>{{label}}</span>
            </label>
        </div>
    `
})
export class CheckBox extends BaseInput {
    value:boolean = false;
    valueChange:EventEmitter = new EventEmitter();
    indeterminate:boolean = false;

    select(event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        this.writeValue(!this.value);
        if (this.update) {
            this.update.emit(this.value);
        }
    }

    //valueAccessor Functions
    writeValue(value) {
        this.value = value;
        this.valueChange.emit(this.value);
    }
}
