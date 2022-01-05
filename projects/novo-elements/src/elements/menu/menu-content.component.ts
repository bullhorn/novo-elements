import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Key } from '../../utils';
import { NovoOption } from '../common';
import { MenuItemDirective } from './menu-item.directive';
// import type { MenuComponent } from './menu.component';
import { CloseLeafMenuEvent, IMenuClickEvent } from './menu.service';
import { ILinkConfig } from './menu.types';

@Component({
  selector: 'menu-content',
  styleUrls: ['./menu-content.component.scss'],
  template: `<div class="menu-container novo-menu" [ngClass]="menuClass" tabindex="0">
    <ul #menu class="menu" style="position: static; float: none;" tabindex="0">
      <ng-container *ngFor="let menuItem of menuItems; let i = index">
        <ng-template [ngTemplateOutlet]="menuItem.template" [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        <!-- <novo-icon class="sub-menu-caret" suffix *ngIf="!!menuItem.subMenu" size="small" color="ash">expand</novo-icon> -->
      </ng-container>
    </ul>
  </div> `,
})
export class MenuContentComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() public menuItems: MenuItemDirective[] = [];
  @Input() public item: any;
  @Input() public event: MouseEvent | KeyboardEvent;
  @Input() public menu: any; // MenuComponent
  @Input() public parentMenu: MenuContentComponent;
  @Input() public menuClass: string;
  @Input() public overlay: OverlayRef;
  @Input() public isLeaf = false;
  ///
  @Output() public openSubMenu: EventEmitter<IMenuClickEvent> = new EventEmitter();
  @Output() public closeLeafMenu: EventEmitter<CloseLeafMenuEvent> = new EventEmitter();
  @Output() public closeAllMenus: EventEmitter<{ event: MouseEvent }> = new EventEmitter();
  // @ViewChild('menu') public menuElement: ElementRef;
  // @ViewChildren('li') public menuItemElements: QueryList<ElementRef>;

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

  focus(): void {
    if (this.autoFocus) {
      // this.menuElement.nativeElement.focus();
    }
  }

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
    // if (menuItem) {
    //   this.onMenuItemSelect(menuItem, event);
    // }
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

  // @HostListener('document:contextmenu', ['$event'])
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

  public onOpenSubMenu(menuItem: MenuItemDirective, event?: MouseEvent | KeyboardEvent): void {
    // const anchorElementRef = this.menuItemElements.toArray()[this._keyManager.activeItemIndex];
    // const anchorElement = anchorElementRef && anchorElementRef.nativeElement;
    // this.openSubMenu.emit({
    //   anchorElement,
    //   menu: menuItem.subMenu,
    //   event,
    //   item: this.item,
    //   // parentMenu: this,
    // });
  }

  public onMenuItemSelect(menuItem: MenuItemDirective, event: MouseEvent | KeyboardEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.onOpenSubMenu(menuItem, event);
    // if (!menuItem.subMenu) {
    //   menuItem.triggerExecute(this.item, event);
    // }
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
