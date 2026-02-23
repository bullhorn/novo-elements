// NG2
import { Component, ContentChild, ElementRef, Input, OnInit } from '@angular/core';

@Component({
    selector: 'novo-list',
    host: {
        class: 'novo-list',
        '[class.vertical-list]': 'direction === "vertical"',
        '[class.horizontal-list]': 'direction === "horizontal"',
        '[attr.theme]': 'theme',
    },
    template: ' <ng-content></ng-content> ',
    styleUrls: ['./List.scss'],
    standalone: false,
})
export class NovoListElement {
  @Input()
  theme: string;
  @Input()
  direction: string;

  constructor(public element: ElementRef) {}
}

@Component({
    selector: 'item-avatar, novo-item-avatar',
    template: ' <novo-icon *ngIf="icon" [color]="color || icon">{{ icon }}</novo-icon> ',
    styleUrls: ['./list-item-header-avatar.scss'],
    host: {
        class: 'novo-item-avatar',
    },
    standalone: false,
})
export class NovoItemAvatarElement {
  @Input()
  icon: string;
  @Input()
  color: string;
}

@Component({
    selector: 'item-title, novo-item-title',
    template: '<ng-content></ng-content>',
    styleUrls: ['./list-item-header-title.scss'],
    host: {
        class: 'novo-item-title',
    },
    standalone: false,
})
export class NovoItemTitleElement {}

@Component({
    selector: 'item-header, novo-item-header',
    template: `
    <novo-title class="novo-item-header-container" size="md">
      <ng-content select="item-avatar, novo-item-avatar"></ng-content>
      <ng-content select="item-title, novo-item-title"></ng-content>
      <ng-content select="item-header-end, novo-item-header-end"></ng-content>
    </novo-title>
  `,
    styleUrls: ['./list-item-header.scss'],
    host: {
        class: 'novo-item-header',
    },
    standalone: false,
})
export class NovoItemHeaderElement {}

@Component({
    selector: 'item-header-end, novo-item-header-end',
    template: ' <ng-content></ng-content> ',
    styleUrls: ['./list-item-header-end.scss'],
    host: {
        class: 'novo-item-header-end',
    },
    standalone: false,
})
export class NovoItemDateElement {}

@Component({
    selector: 'item-content, novo-item-content',
    host: {
        class: 'novo-item-content',
        '[class.vertical-list]': 'direction === "vertical"',
        '[class.horizontal-list]': 'direction === "horizontal"',
    },
    template: ' <ng-content></ng-content> ',
    styleUrls: ['./list-item-content.scss'],
    standalone: false,
})
export class NovoItemContentElement {
  @Input()
  direction: string;
}

@Component({
    selector: 'item-end, novo-item-end',
    template: ' <ng-content></ng-content> ',
    styleUrls: ['./list-item-end.scss'],
    host: {
        class: 'novo-item-end',
    },
    standalone: false,
})
export class NovoItemEndElement {}

@Component({
    selector: 'novo-list-item, a[list-item], button[list-item]',
    template: `
    <div class="list-item" [ngClass]="{ avatar: avatar }" *ngIf="_content || _header">
      <ng-content select="item-header, novo-item-header"></ng-content>
      <ng-content select="item-content, novo-item-content"></ng-content>
    </div>
    <ng-content></ng-content>
    <ng-content select="item-end, novo-item-end"></ng-content>
  `,
    styleUrls: ['./list-item.scss'],
    host: {
        class: 'novo-list-item',
    },
    standalone: false,
})
export class NovoListItemElement implements OnInit {
  avatar: boolean = false;
  @ContentChild(NovoItemContentElement) _content: NovoItemContentElement;
  @ContentChild(NovoItemHeaderElement) _header: NovoItemHeaderElement;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.avatar = !!this.element.nativeElement.querySelector('item-avatar');
  }
}
