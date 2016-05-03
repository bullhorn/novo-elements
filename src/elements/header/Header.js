import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { NOVO_BUTTON_ELEMENTS } from '../button';

@Component({
    selector: 'util-action',
    inputs: ['icon', 'inverse'],
    template: `
        <button theme="icon" [icon]="icon" [attr.inverse]="inverse"></button>
    `,
    directives: [NOVO_BUTTON_ELEMENTS]
})
export class UtilAction {
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
    `,
    directives: [CORE_DIRECTIVES, UtilAction]
})
export class NovoHeader {
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

export const NOVO_HEADER_ELEMENTS = [NovoHeader, UtilAction];
