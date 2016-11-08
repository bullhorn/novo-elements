// NG2
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'novo-form',
    inputs: ['layout'],
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
export class NovoFormElement {
    @Input() form: FormGroup;

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
