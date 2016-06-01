import { Component } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';

import { BaseInput } from './../FormExtras';
import { NovoLabelService } from './../../../../novo-elements';

@Component({
    selector: 'check-list',
    inputs: [
        'name',
        'options',
        'required'
    ],
    directives: [COMMON_DIRECTIVES],
    properties: ['for'],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !value?.length, 'bhi-check': value?.length > 0}"></i>
        <div>
            <div class="check-box-group" *ngFor="let option of _options; let i = index" [ngClass]="{checked: option.checked}" >
                <input [hidden]="true" [name]="name" type="checkbox" [ngModel]="option.checked" [attr.id]="name+i" [value]="option.checked">
                <label [attr.for]="name+i" (click)="select($event, option)">
                  <i [ngClass]="{'bhi-checkbox-empty': !option.checked, 'bhi-checkbox-filled': option.checked }"></i>
                  <span>{{option.label}}</span>
                </label>
            </div>
        </div>
        <span class="error-message" *ngIf="required && empty">{{labels.required}}</span>
    `
})
export class CheckList extends BaseInput {
    constructor(labels:NovoLabelService) {
        super();
        this.labels = labels;
    }

    ngOnInit() {
        super.ngOnInit();
        this.value = this.value || [];
        this.options = this.options || [];
        this._options = [];
        if (this.options.length && !this.options[0].value) {
            this.options.forEach(option => {
                let formattedOption = {
                    value: option,
                    label: option,
                    checked: (this.value.length && (this.value.indexOf(option.value) !== -1))
                };
                this._options.push(formattedOption);
            });
        } else {
            this.options.forEach(option => {
                let formattedOption = option;
                formattedOption.checked = (this.value.length && (this.value.indexOf(option.value) !== -1));
                this._options.push(formattedOption);
            });
        }
    }

    select(event, item) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        item.checked = !item.checked;
        this.value = this._options.filter(checkBox => checkBox.checked).map(x => x.value);
        if (this.value.length === 0) {
            this.update.emit();
        } else {
            this.update.emit(this.value);
        }
    }
}
