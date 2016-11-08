// NG2
import { Component } from '@angular/core';

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
    inputs: ['icon', 'inverse', 'disabled'],
    template: `
        <button theme="icon" [icon]="icon" [attr.inverse]="inverse" [disabled]="disabled"></button>
    `
})
export class UtilActionElement {
}

@Component({
    selector: 'header[theme]',
    inputs: [
        'title',
        'theme',
        'icon',
        'config'
    ],
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
export class NovoHeaderElement {
    constructor() {
        this.inverse = 'inverse';
        this.headerClass = 'novo-header';
    }

    ngOnInit() {
        this.iconClass = `bhi-${this.icon}`;
        this.config = this.config || {};
        this.inverse = (this.theme === 'white' || this.theme === 'off-white' || this.theme === 'light') ? null : 'inverse';
    }
}
