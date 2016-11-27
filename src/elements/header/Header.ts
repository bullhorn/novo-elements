// NG2
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'utils',
    template: `
        <ng-content></ng-content>
    `
})
export class UtilsElement {
}

@Component({
    selector: 'util-action',
    template: `
        <button theme="icon" [icon]="icon" [attr.inverse]="inverse" [disabled]="disabled"></button>
    `
})
export class UtilActionElement {
    @Input() icon:string;
    @Input() inverse:boolean;
    @Input() disabled:boolean;
}

@Component({
    selector: 'header[theme]',
    host: {
        '[class]': 'headerClass',
        '[attr.theme]': 'theme'
    },
    template: `
        <section class="primary" *ngIf="theme || config.theme">
            <h1><i *ngIf="icon" [ngClass]="iconClass"></i>{{title || config.title}}</h1>
            <ng-content select="utils"></ng-content>
        </section>
        <ng-content></ng-content>
    `
})
export class NovoHeaderElement implements OnInit {
    @Input() title:string;
    @Input() theme:string;
    @Input() icon:string;
    @Input() config:any;

    inverse:string = 'inverse';
    headerClass:string = 'novo-header';
    iconClass:string;

    ngOnInit() {
        this.iconClass = `bhi-${this.icon}`;
        this.config = this.config || {};
        this.inverse = (this.theme === 'white' || this.theme === 'off-white' || this.theme === 'light') ? null : 'inverse';
    }
}
