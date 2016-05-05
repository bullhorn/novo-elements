import { Component } from 'angular2/core';
import { CORE_DIRECTIVES, NgFor, NgIf, NgClass } from 'angular2/common';

@Component({
    selector: 'novo-list',
    inputs: ['direction'],
    host: {
        '[class.vertical-list]': 'direction === "vertical"',
        '[class.horizontal-list]': 'direction === "horizontal"'
    },
    template: `
        <ng-content></ng-content>
    `,
    directives: [CORE_DIRECTIVES, NgFor]
})
export class NovoList {}

@Component({
    selector: 'novo-list-item',
    template: `
        <ng-content select="item-avatar"></ng-content>
        <div>
            <ng-content select="item-title"></ng-content>
            <ng-content select="item-content"></ng-content>
        </div>
        <ng-content select="item-end"></ng-content>
    `,
    directives: [CORE_DIRECTIVES, NgFor, NgIf]
})
export class NovoListItem {}

@Component({
    selector: 'item-avatar',
    inputs: ['icon'],
    template: `
        <i *ngIf="iconClass" [ngClass]="classMap" theme="contained"></i>
    `,
    directives: [NgIf, NgClass]
})
export class ItemAvatar {
    ngOnChanges() {
        this.iconClass = (this.icon) ? `bhi-${this.icon}` : null;
        this.classMap = [this.iconClass, this.icon];
    }

    ngOnInit() {
        this.ngOnChanges();
    }
}

@Component({
    selector: 'item-title',
    template: `
        <h3><ng-content></ng-content></h3>
    `
})
export class ItemTitle {}

@Component({
    selector: 'item-content',
    inputs: ['direction'],
    host: {
        '[class.vertical-list]': 'direction === "vertical"',
        '[class.horizontal-list]': 'direction === "horizontal"'
    },
    template: `
        <ng-content></ng-content>
    `
})
export class ItemContent {}

@Component({
    selector: 'item-end',
    template: `
        <ng-content></ng-content>
    `
})
export class ItemEnd {}

export const NOVO_LIST_ELEMENTS = [NovoList, NovoListItem, ItemAvatar, ItemTitle, ItemContent, ItemEnd];
