// NG2
import { Component } from '@angular/core';

@Component({
    selector: 'novo-list',
    inputs: ['theme', 'direction'],
    host: {
        '[class.vertical-list]': 'direction === "vertical"',
        '[class.horizontal-list]': 'direction === "horizontal"',
        '[attr.theme]': 'theme'
    },
    template: `
        <ng-content></ng-content>
    `
})
export class NovoListElement {
}

@Component({
    selector: 'novo-list-item',
    template: `
        <div class="list-item">
            <ng-content select="item-header"></ng-content>
            <ng-content select="item-content"></ng-content>
        </div>
        <ng-content select="item-end"></ng-content>
    `
})
export class NovoListItemElement {
}

@Component({
    selector: 'item-avatar',
    inputs: ['icon'],
    template: `
        <i *ngIf="iconClass" [ngClass]="classMap" theme="contained"></i>
    `
})
export class NovoItemAvatarElement {
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
        <h6><ng-content></ng-content></h6>
    `
})
export class NovoItemTitleElement {
}

@Component({
    selector: 'item-header',
    template: `
            <ng-content select="item-avatar"></ng-content>
            <ng-content select="item-title"></ng-content>
            <ng-content select="item-date"></ng-content>
    `
})
export class NovoItemHeaderElement {
}

@Component({
    selector: 'item-date',
    template: `
        <ng-content></ng-content>
    `
})
export class NovoItemDateElement {
}

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
export class NovoItemContentElement {
}

@Component({
    selector: 'item-end',
    template: `
        <ng-content></ng-content>
    `
})
export class NovoItemEndElement {
}
