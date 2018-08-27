// NG2
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'novo-list',
  host: {
    '[class.vertical-list]': 'direction === "vertical"',
    '[class.horizontal-list]': 'direction === "horizontal"',
    '[attr.theme]': 'theme',
  },
  template: `
        <ng-content></ng-content>
    `,
})
export class NovoListElement {
  @Input()
  theme: string;
  @Input()
  direction: string;

  constructor(public element: ElementRef) {}
}

@Component({
  selector: 'novo-list-item',
  template: `
        <div class="list-item" [ngClass]="{'avatar': avatar}">
            <ng-content select="item-header"></ng-content>
            <ng-content select="item-content"></ng-content>
        </div>
        <ng-content></ng-content>
        <ng-content select="item-end"></ng-content>
    `,
})
export class NovoListItemElement implements OnInit {
  avatar: boolean = false;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.avatar = !!this.element.nativeElement.querySelector('item-avatar');
  }
}

@Component({
  selector: 'item-avatar',
  template: `
        <i *ngIf="iconClass" [ngClass]="classMap" theme="contained"></i>
    `,
})
export class NovoItemAvatarElement implements OnChanges, OnInit {
  @Input()
  icon: string;

  iconClass: string;
  classMap: any;

  ngOnChanges(changes?: SimpleChanges) {
    this.iconClass = this.icon ? `bhi-${this.icon}` : null;
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
    `,
})
export class NovoItemTitleElement {}

@Component({
  selector: 'item-header',
  template: `
        <ng-content select="item-avatar"></ng-content>
        <ng-content select="item-title"></ng-content>
        <ng-content select="item-header-end"></ng-content>
    `,
})
export class NovoItemHeaderElement {}

@Component({
  selector: 'item-header-end',
  template: `
        <ng-content></ng-content>
    `,
})
export class NovoItemDateElement {}

@Component({
  selector: 'item-content',
  host: {
    '[class.vertical-list]': 'direction === "vertical"',
    '[class.horizontal-list]': 'direction === "horizontal"',
  },
  template: `
        <ng-content></ng-content>
    `,
})
export class NovoItemContentElement {
  @Input()
  direction: string;
}

@Component({
  selector: 'item-end',
  template: `
        <ng-content></ng-content>
    `,
})
export class NovoItemEndElement {}
