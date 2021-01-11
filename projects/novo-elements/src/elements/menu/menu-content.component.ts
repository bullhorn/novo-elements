import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItemDirective } from './menu-item.directive';
import { CloseLeafMenuEvent, IMenuClickEvent } from './menu.service';
import { MENU_OPTIONS } from './menu.tokens';
import { ILinkConfig, IMenuOptions } from './menu.types';

const ARROW_LEFT_KEYCODE = 37;

@Component({
  selector: 'menu-content',
  styleUrls: ['./menu-content.component.scss'],
  template: `<div class="menu-container novo-menu" [ngClass]="menuClass" tabindex="0">
    <ul #menu class="menu" style="position: static; float: none;" tabindex="0">
      <li
        #li
        *ngFor="let menuItem of menuItems; let i = index"
        [class.disabled]="!isMenuItemEnabled(menuItem)"
        [class.divider]="menuItem.divider"
        [class.menu-divider]="menuItem.divider"
        [class.menu-item-container]="!menuItem.divider"
        [class.active]="menuItem.isActive && isMenuItemEnabled(menuItem)"
        [attr.role]="menuItem.divider ? 'separator' : undefined"
      >
        <a
          *ngIf="!menuItem.divider && !menuItem.passive"
          href
          [class.menu-item]="true"
          [class.active]="menuItem.isActive && isMenuItemEnabled(menuItem)"
          [class.disabled]="!isMenuItemEnabled(menuItem)"
          [class.hasSubMenu]="!!menuItem.subMenu"
          (click)="onMenuItemSelect(menuItem, $event)"
          (mouseenter)="onOpenSubMenu(menuItem, $event)"
        >
          <ng-template [ngTemplateOutlet]="menuItem.template" [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        </a>
        <novo-icon class="sub-menu-caret" suffix *ngIf="!!menuItem.subMenu" size="small" color="ash">expand</novo-icon>
        <span
          (click)="stopEvent($event)"
          class="passive"
          *ngIf="!menuItem.divider && menuItem.passive"
          [class.menu-item]="true"
          [class.disabled]="!isMenuItemEnabled(menuItem)"
        >
          <ng-template [ngTemplateOutlet]="menuItem.template" [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        </span>
      </li>
    </ul>
  </div> `,
})
export class MenuContentComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() public menuItems: MenuItemDirective[] = [];
  @Input() public item: any;
  @Input() public event: MouseEvent | KeyboardEvent;
  @Input() public parentMenu: MenuContentComponent;
  @Input() public menuClass: string;
  @Input() public overlay: OverlayRef;
  @Input() public isLeaf = false;
  @Output() public execute: EventEmitter<{
    event: MouseEvent | KeyboardEvent;
    item: any;
    menuItem: MenuItemDirective;
  }> = new EventEmitter();
  @Output() public openSubMenu: EventEmitter<IMenuClickEvent> = new EventEmitter();
  @Output() public closeLeafMenu: EventEmitter<CloseLeafMenuEvent> = new EventEmitter();
  @Output() public closeAllMenus: EventEmitter<{ event: MouseEvent }> = new EventEmitter();
  @ViewChild('menu') public menuElement: ElementRef;
  @ViewChildren('li') public menuItemElements: QueryList<ElementRef>;

  public autoFocus = false;
  private _keyManager: ActiveDescendantKeyManager<MenuItemDirective>;
  private subscription: Subscription = new Subscription();
  constructor(
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef,
    @Optional()
    @Inject(MENU_OPTIONS)
    private options: IMenuOptions,
  ) {
    if (options) {
      this.autoFocus = options.autoFocus;
    }
  }

  ngOnInit(): void {
    this.menuItems.forEach((menuItem) => {
      menuItem.currentItem = this.item;
      this.subscription.add(menuItem.execute.subscribe((event) => this.execute.emit({ ...event, menuItem })));
    });
    const queryList = new QueryList<MenuItemDirective>();
    queryList.reset(this.menuItems);
    this._keyManager = new ActiveDescendantKeyManager<MenuItemDirective>(queryList).withWrap();
  }

  ngAfterViewInit() {
    if (this.autoFocus) {
      setTimeout(() => this.focus());
    }
    this.overlay.updatePosition();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  focus(): void {
    if (this.autoFocus) {
      this.menuElement.nativeElement.focus();
    }
  }

  stopEvent($event: MouseEvent) {
    $event.stopPropagation();
  }

  public isMenuItemEnabled(menuItem: MenuItemDirective): boolean {
    return this.evaluateIfFunction(menuItem && menuItem.enabled);
  }

  public isMenuItemVisible(menuItem: MenuItemDirective): boolean {
    return this.evaluateIfFunction(menuItem && menuItem.visible);
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
    if (menuItem) {
      this.onMenuItemSelect(menuItem, event);
    }
  }

  @HostListener('window:keydown.Escape', ['$event'])
  @HostListener('window:keydown.ArrowLeft', ['$event'])
  public onCloseLeafMenu(event: KeyboardEvent): void {
    if (!this.isLeaf) {
      return;
    }
    this.cancelEvent(event);
    this.closeLeafMenu.emit({ exceptRootMenu: event.keyCode === ARROW_LEFT_KEYCODE, event });
  }

  // @HostListener('document:contextmenu', ['$event'])
  @HostListener('document:click', ['$event'])
  public closeMenu(event: MouseEvent): void {
    if (event.type === 'click' && event.button === 2) {
      return;
    }
    this.closeAllMenus.emit({ event });
  }

  public onOpenSubMenu(menuItem: MenuItemDirective, event?: MouseEvent | KeyboardEvent): void {
    const anchorElementRef = this.menuItemElements.toArray()[this._keyManager.activeItemIndex];
    const anchorElement = anchorElementRef && anchorElementRef.nativeElement;
    this.openSubMenu.emit({
      anchorElement,
      menu: menuItem.subMenu,
      event,
      item: this.item,
      parentMenu: this,
    });
  }

  public onMenuItemSelect(menuItem: MenuItemDirective, event: MouseEvent | KeyboardEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.onOpenSubMenu(menuItem, event);
    if (!menuItem.subMenu) {
      menuItem.triggerExecute(this.item, event);
    }
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
