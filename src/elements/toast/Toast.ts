// NG2
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

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
            <div class="dialogue">
                <ng-content></ng-content>
            </div>
        </div>
    `
})
export class NovoToastElement implements OnInit, OnChanges {
    @Input() theme: string = 'danger';
    @Input() icon: string = 'caution';
    @Input() title: string;
    @Input() message: string;
    @Input() hasDialogue: boolean = false;

    show: boolean = false;
    animate: boolean = false;
    parent: any = null;
    launched: boolean = false;
    position: any;
    time: any;
    iconClass: string;
    alertTheme: string;
    embedded: any;

    ngOnInit() {
        if (!this.launched) {
            // clear position and time
            this.position = null;
            this.time = null;

            // set icon and styling
            this.iconClass = `bhi-${this.icon}`;
            this.alertTheme = `${this.theme} toast-container embedded`;
            if (this.hasDialogue) { this.alertTheme += ' dialogue'; }
        }
    }

    ngOnChanges(changes?: SimpleChanges) {
        // set icon and styling
        this.iconClass = `bhi-${this.icon}`;
        this.alertTheme = `${this.theme} toast-container embedded`;
        if (this.hasDialogue) { this.alertTheme += ' dialogue'; }
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
