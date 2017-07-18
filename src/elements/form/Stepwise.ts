// NG2
import { Component, ElementRef, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'novo-stepwise-form',
    template: `
        <ng-content></ng-content>
    `
})
export class NovoStepwiseFormElement {
    @Output() stepChange: EventEmitter<any> = new EventEmitter();
}

@Component({
    selector: 'novo-form-step',
    template: `
        <div class="form-step">
            <ng-content></ng-content>
        </div>
    `
})
export class NovoFormStepElement implements OnInit {
    @Input() icon: string;
    @Input() valid: boolean;

    constructor(private element: ElementRef) {
    }

    ngOnInit() {
    }
}
