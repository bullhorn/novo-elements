import { Component } from 'angular2/core';
import { CORE_DIRECTIVES, NgFor, NgIf, NgClass } from 'angular2/common';

@Component({
    selector: 'novo-list',
    inputs: ['direction'],
    host: {
        '[class.vertical-list]': 'vert',
        '[class.horizontal-list]': 'horiz'
    },
    template: `
        <ng-content></ng-content>
    `,
    directives: [CORE_DIRECTIVES, NgFor]
})
export class NovoList {
    constructor() {
    }

    ngOnInit() {
        this.vert = (this.direction === 'vertical') ? true : null;
        this.horiz = (this.direction === 'horizontal') ? true : null;
    }
}

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
export class NovoListItem {
    constructor() {
    }

    ngOnInit() {
    }
}

@Component({
    selector: 'item-avatar',
    inputs: ['icon'],
    host: {},
    template: `
        <i *ngIf="iconClass" [ngClass]="classMap" theme="contained"></i>
    `,
    directives: [NgIf, NgClass]
})
export class ItemAvatar {
    constructor() {
    }

    ngOnInit() {
        this.iconClass = (this.icon) ? `bhi-${this.icon}` : null;
        this.classMap = [this.iconClass, this.icon];
    }
}

@Component({
    selector: 'item-title',
    inputs: [],
    host: {},
    template: `
        <h3><ng-content></ng-content></h3>
    `,
    directives: []
})
export class ItemTitle {
    constructor() {
    }

    ngOnInit() {
    }
}

@Component({
    selector: 'item-content',
    inputs: ['direction'],
    host: {
        '[class.vertical-list]': 'vert',
        '[class.horizontal-list]': 'horiz'
    },
    template: `
        <ng-content></ng-content>
    `,
    directives: []
})
export class ItemContent {
    constructor() {
    }

    ngOnInit() {
        this.vert = (this.direction === 'vertical') ? true : null;
        this.horiz = (this.direction === 'horizontal') ? true : null;
    }
}

@Component({
    selector: 'item-end',
    inputs: [],
    host: {},
    template: `
        <ng-content></ng-content>
    `,
    directives: []
})
export class ItemEnd {
    constructor() {
    }

    ngOnInit() {
    }
}

export const NOVO_LIST_ELEMENTS = [NovoList, NovoListItem, ItemAvatar, ItemTitle, ItemContent, ItemEnd];
