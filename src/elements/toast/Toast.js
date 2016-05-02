import { Component, ElementRef } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';

@Component({
    selector: 'novo-toast',
    inputs: ['theme', 'icon', 'title', 'message'],
    host: {
        '[class]': 'alertTheme',
        '[class.show]': 'show',
        '[class.animate]': 'animate',
        '[class.embedded]': 'embedded',
        '(click)': 'clickHandler($event)'
    },
    template: `
        <div class="toast-icon">
            <i [ngClass]="iconClass"></i>
        </div>
        <div class="toast-content">
            <h5 *ngIf="title">{{title}}</h5>
            <p *ngIf="message" [class.message-only]="!title">{{message}}</p>
        </div>
    `,
    directives: [CORE_DIRECTIVES]
})
export class NovoToast {
    constructor(element: ElementRef) {
        this.show = false;
        this.animate = false;
        this.parent = null;
        this.ref = element;
    }

    ngOnInit() {
        if (!this.launched) {
            // clear position and time
            this.position = null;
            this.time = null;

            // set icon and styling
            this.iconClass = `bhi-${this.icon}`;
            this.alertTheme = `${this.theme} toast-container embedded`;
        }
    }

    clickHandler(event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        if (this.parent) {
            this.parent.hide(this);
        }
    }
}

export const NOVO_TOAST_ELEMENTS = [NovoToast];
