import { Component } from '@angular/core';

@Component({
    selector: 'form-label',
    inputs: [
        'text'
    ],
    template: `
        <label class="form-label" [attr.for]="name">
            {{text}}
            <ng-content></ng-content>
        </label>
    `
})
export class FormLabel {
}

@Component({
    selector: 'form-label',
    template: `
        <label class="form-label" [attr.for]="name">{{text}}</label>
    `
})
export class FormLabelMeta {
}
