// NG2
import { Component, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'novo-toast',
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
    `
})
export class NovoToastElement {
    @Input() theme:string = 'danger';
    @Input() icon:string = 'caution';
    @Input() title:string;
    @Input() message:string;

    constructor(element:ElementRef) {
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

    ngOnChanges() {
        // set icon and styling
        this.iconClass = `bhi-${this.icon}`;
        this.alertTheme = `${this.theme} toast-container embedded`;
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
