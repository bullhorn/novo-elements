// NG2
import { Component, Input, OnInit } from '@angular/core';
// APP
import { NovoFormGroup } from './DynamicForm';

@Component({
    selector: 'novo-form',
    template: `
        <div class="novo-form-container">
            <header>
                <ng-content select="form-title"></ng-content>
                <ng-content select="form-subtitle"></ng-content>
            </header>
            <form class="novo-form" [formGroup]="form" autocomplete="off">
                <ng-content></ng-content>
            </form>
        </div>
    `
})
export class NovoFormElement implements OnInit {
    @Input() form:NovoFormGroup;
    @Input() layout:string;

    ngOnInit() {
        this.form.layout = this.layout;
    }

    get value() {
        return this.form.value;
    }

    get isValid() {
        return this.form.valid;
    }
}
