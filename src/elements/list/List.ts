// NG2
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'novo-list',
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
    @Input() theme:string;
    @Input() direction:string;
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
    `
})
export class NovoListItemElement {
}

@Component({
    selector: 'item-avatar',
    template: `
        <i *ngIf="iconClass" [ngClass]="classMap" theme="contained"></i>
    `
})
export class NovoItemAvatarElement implements OnChanges, OnInit {
    @Input() icon:string;

    iconClass:string;
    classMap:any;

    ngOnChanges(changes?:SimpleChanges) {
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
export class NovoItemTitleElement {
}

@Component({
    selector: 'item-content',
    host: {
        '[class.vertical-list]': 'direction === "vertical"',
        '[class.horizontal-list]': 'direction === "horizontal"'
    },
    template: `
        <ng-content></ng-content>
    `
})
export class NovoItemContentElement {
    @Input() direction:string;
}

@Component({
    selector: 'item-end',
    template: `
        <ng-content></ng-content>
    `
})
export class NovoItemEndElement {
}
