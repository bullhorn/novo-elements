import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Key } from 'novo-elements/utils';
import { NovoOption } from 'novo-elements/elements/common';
import { MenuItemDirective } from './menu-item.directive';
import { CloseLeafMenuEvent, IMenuClickEvent } from './menu.service';
import { ILinkConfig } from './menu.types';

@Component({
    selector: 'menu-content',
    styleUrls: ['./menu-content.component.scss'],
    template: `<div class="menu-container novo-menu" [ngClass]="menuClass" tabindex="0">
    <ul #menu class="menu" style="position: static; float: none;" tabindex="0">
      <ng-container *ngFor="let menuItem of menuItems; let i = index">
        <ng-template [ngTemplateOutlet]="menuItem.template" [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
      </ng-container>
    </ul>
  </div> `,
    standalone: false
})
export class MenuContentComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() public menuItems: MenuItemDirective[] = [];
  @Input() public item: any;
  @Input() public event: MouseEvent | KeyboardEvent;
  @Input() public menu: any;
  @Input() public parentMenu: MenuContentComponent;
  @Input() public menuClass: string;
  @Input() public overlay: OverlayRef;
  @Input() public isLeaf = false;
  @Output() public openSubMenu: EventEmitter<IMenuClickEvent> = new EventEmitter();
  @Output() public closeLeafMenu: EventEmitter<CloseLeafMenuEvent> = new EventEmitter();
  @Output() public closeAllMenus: EventEmitter<{ event: MouseEvent }> = new EventEmitter();

  public autoFocus = false;
  private _keyManager: ActiveDescendantKeyManager<NovoOption>;
  private subscription: Subscription = new Subscription();
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (this.autoFocus) {
      setTimeout(() => this.focus());
    }
    this.overlay.updatePosition();
    this._keyManager = new ActiveDescendantKeyManager<NovoOption>(this.menu.menuOptions).withWrap();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  focus(): void {}

  stopEvent($event: MouseEvent) {
    $event.stopPropagation();
  }

  public isMenuItemEnabled(menuItem: MenuItemDirective): boolean {
    return this.evaluateIfFunction(menuItem && menuItem.menuItemEnabled);
  }

  public isMenuItemVisible(menuItem: MenuItemDirective): boolean {
    return this.evaluateIfFunction(menuItem && menuItem.menuItemVisible);
  }

  public evaluateIfFunction(value: any): any {
    if (value instanceof Function) {
      return value(this.item);
    }
    return value;
  }

  public isDisabled(link: ILinkConfig): boolean {
    return link.enabled && !link.enabled(this.item);
  }

  @HostListener('window:keydown.ArrowDown', ['$event'])
  @HostListener('window:keydown.ArrowUp', ['$event'])
  public onKeyEvent(event: KeyboardEvent): void {
    if (!this.isLeaf) {
      return;
    }
    this._keyManager.onKeydown(event);
  }

  @HostListener('window:keydown.ArrowRight', ['$event'])
  public keyboardOpenSubMenu(event?: KeyboardEvent): void {
    if (!this.isLeaf) {
      return;
    }
    this.cancelEvent(event);
    const menuItem = this.menuItems[this._keyManager.activeItemIndex];
    if (menuItem) {
      this.onOpenSubMenu(menuItem);
    }
  }

  @HostListener('window:keydown.Enter', ['$event'])
  @HostListener('window:keydown.Space', ['$event'])
  public keyboardMenuItemSelect(event?: KeyboardEvent): void {
    if (!this.isLeaf) {
      return;
    }
    this.cancelEvent(event);
    const menuItem = this.menuItems[this._keyManager.activeItemIndex];
    const option = this._keyManager.activeItem;
    option._clickViaInteraction();
  }

  @HostListener('window:keydown.Escape', ['$event'])
  @HostListener('window:keydown.ArrowLeft', ['$event'])
  public onCloseLeafMenu(event: KeyboardEvent): void {
    if (!this.isLeaf) {
      return;
    }
    this.cancelEvent(event);
    this.closeLeafMenu.emit({ exceptRootMenu: event.key === Key.ArrowLeft, event });
  }

  @HostListener('document:click', ['$event'])
  public closeMenu(event: MouseEvent): void {
    if (event.type === 'click' && event.button === 2) {
      return;
    }
    this.closeAllMenus.emit({ event });
  }

  @HostListener('mouseleave', ['$event'])
  public onMouseLeave(event: MouseEvent): void {
    if (this.isLeaf) {
      this.closeLeafMenu.emit({ exceptRootMenu: true, event });
    }
  }

  public onOpenSubMenu(menuItem: MenuItemDirective, event?: MouseEvent | KeyboardEvent): void {}

  public onMenuItemSelect(menuItem: MenuItemDirective, event: MouseEvent | KeyboardEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.onOpenSubMenu(menuItem, event);
  }

  private cancelEvent(event): void {
    if (!event) {
      return;
    }

    const target: HTMLElement = event.target;
    if (['INPUT', 'TEXTAREA', 'SELECT'].indexOf(target.tagName) > -1 || target.isContentEditable) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
  }
}
