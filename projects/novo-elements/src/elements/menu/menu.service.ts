import { Overlay, OverlayRef, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, ElementRef, Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { MenuContentComponent } from './menu-content.component';
import type { MenuItemDirective } from './menu-item.directive';
import type { MenuComponent } from './menu.component';
import type { MenuDirective } from './menu.directive';

export interface IMenuClickEvent {
  anchorElement?: Element | EventTarget;
  menu?: MenuComponent;
  event?: MouseEvent | KeyboardEvent;
  parentMenu?: MenuComponent;
  menuTrigger?: MenuDirective;
  item: any;
  activeMenuItemIndex?: number;
}
export interface IMenuContext extends IMenuClickEvent {
  menuItems: MenuItemDirective[];
  menuClass: string;
}
export interface CloseLeafMenuEvent {
  exceptRootMenu?: boolean;
  event?: MouseEvent | KeyboardEvent;
}
export interface OverlayRefWithMenu extends OverlayRef {
  menu?: MenuContentComponent;
}

export interface CancelMenuEvent {
  eventType: 'cancel';
  event?: MouseEvent | KeyboardEvent;
}
export interface ExecuteMenuEvent {
  eventType: 'execute';
  event?: MouseEvent | KeyboardEvent;
  item: any;
  menuItem: MenuItemDirective;
}
export type CloseMenuEvent = ExecuteMenuEvent | CancelMenuEvent;

@Injectable({ providedIn: 'root' })
export class NovoMenuService {
  public isDestroyingLeafMenu = false;

  public show: Subject<IMenuClickEvent> = new Subject<IMenuClickEvent>();
  public triggerClose: Subject<MenuContentComponent> = new Subject();
  public close: Subject<CloseMenuEvent> = new Subject();

  private menuContent: ComponentRef<MenuContentComponent>;
  private overlays: OverlayRef[] = [];
  private fakeElement: any = {
    getBoundingClientRect: (): any => ({
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0,
    }),
  };

  constructor(private overlay: Overlay, private scrollStrategy: ScrollStrategyOptions) {}

  public openMenu(context: IMenuContext) {
    const { anchorElement, event, parentMenu } = context;

    if (!parentMenu) {
      const mouseEvent = event as MouseEvent;
      this.fakeElement.getBoundingClientRect = (): any => ({
        bottom: mouseEvent.clientY,
        height: 0,
        left: mouseEvent.clientX,
        right: mouseEvent.clientX,
        top: mouseEvent.clientY,
        width: 0,
        x: mouseEvent.clientX,
        y: mouseEvent.clientY,
      });
      this.closeAllMenus({ eventType: 'cancel', event });
      const positionStrategy = this.overlay
        .position()
        .flexibleConnectedTo(new ElementRef(anchorElement || this.fakeElement))
        .withFlexibleDimensions(false)
        .withPositions([
          { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
          { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
          { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top' },
          { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top' },
          { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' },
          { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' },
        ]);
      this.overlays = [
        this.overlay.create({
          positionStrategy,
          panelClass: 'novo-menu',
          scrollStrategy: this.scrollStrategy.close(),
        }),
      ];
      this.attachMenu(this.overlays[0], context);
    } else {
      const positionStrategy = this.overlay
        .position()
        .flexibleConnectedTo(new ElementRef(event ? event.target : anchorElement))
        .withFlexibleDimensions(false)
        .withPositions([
          { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top' },
          { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top' },
          { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
          { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom' },
        ]);
      const newOverlay = this.overlay.create({
        positionStrategy,
        panelClass: 'novo-menu',
        scrollStrategy: this.scrollStrategy.close(),
      });
      // this.destroySubMenus(parentMenu);
      this.overlays = this.overlays.concat(newOverlay);
      this.attachMenu(newOverlay, context);
    }
  }

  public attachMenu(overlay: OverlayRef, context: IMenuContext): void {
    const { event, item, menu, menuItems, menuClass, menuTrigger } = context;

    const menuContent: ComponentRef<MenuContentComponent> = overlay.attach(new ComponentPortal(MenuContentComponent));
    menuContent.instance.event = event;
    menuContent.instance.item = item;
    menuContent.instance.menu = menu;
    menuContent.instance.menuItems = menuItems;
    menuContent.instance.overlay = overlay;
    menuContent.instance.isLeaf = true;
    menuContent.instance.menuClass = menuClass;
    (overlay as OverlayRefWithMenu).menu = menuContent.instance;

    if (!!menuTrigger) {
      menuTrigger.menuContent = menuContent.instance;
    }

    const subscriptions: Subscription = new Subscription();
    // subscriptions.add(
    //   menuContent.instance.execute
    //     .asObservable()
    //     .subscribe((executeEvent) => this.closeAllMenus({ eventType: 'execute', ...executeEvent })),
    // );
    subscriptions.add(
      menuContent.instance.closeAllMenus
        .asObservable()
        .subscribe((closeAllEvent) => this.closeAllMenus({ eventType: 'cancel', ...closeAllEvent })),
    );
    subscriptions.add(
      menuContent.instance.closeLeafMenu.asObservable().subscribe((closeLeafMenuEvent) => this.destroyLeafMenu(closeLeafMenuEvent)),
    );
    subscriptions.add(
      menuContent.instance.openSubMenu.asObservable().subscribe((subMenuEvent: IMenuContext) => {
        this.destroySubMenus(menuContent.instance);
        if (!subMenuEvent.menu) {
          menuContent.instance.isLeaf = true;
          return;
        }
        menuContent.instance.isLeaf = false;
        this.show.next(subMenuEvent);
      }),
    );
    menuContent.onDestroy(() => {
      // menuItems.forEach((menuItem) => (menuItem.isActive = false));
      subscriptions.unsubscribe();
    });
    menuContent.changeDetectorRef.detectChanges();
  }

  public closeAllMenus(closeEvent: CloseMenuEvent): void {
    if (this.overlays) {
      this.close.next(closeEvent);
      this.overlays.forEach((overlay, index) => {
        overlay.detach();
        overlay.dispose();
      });
    }
    this.overlays = [];
  }

  public hasOpenMenus() {
    return this.overlays?.length > 0;
  }

  public getLastAttachedOverlay(): OverlayRefWithMenu {
    let overlay: OverlayRef = this.overlays[this.overlays.length - 1];
    while (this.overlays.length > 1 && overlay && !overlay.hasAttached()) {
      overlay.detach();
      overlay.dispose();
      this.overlays = this.overlays.slice(0, -1);
      overlay = this.overlays[this.overlays.length - 1];
    }
    return overlay;
  }

  public destroyLeafMenu({ exceptRootMenu, event }: CloseLeafMenuEvent = {}): void {
    if (this.isDestroyingLeafMenu) {
      return;
    }
    this.isDestroyingLeafMenu = true;

    setTimeout(() => {
      const overlay = this.getLastAttachedOverlay();
      if (this.overlays.length > 1 && overlay) {
        overlay.detach();
        overlay.dispose();
      }
      if (!exceptRootMenu && this.overlays.length > 0 && overlay) {
        this.close.next({ eventType: 'cancel', event });
        overlay.detach();
        overlay.dispose();
      }

      const newLeaf = this.getLastAttachedOverlay();
      if (newLeaf) {
        newLeaf.menu.isLeaf = true;
      }

      this.isDestroyingLeafMenu = false;
    });
  }

  public destroySubMenus(menu: MenuContentComponent): void {
    const overlay = menu.overlay;
    const index = this.overlays.indexOf(overlay);
    this.overlays.slice(index + 1).forEach((subMenuOverlay) => {
      subMenuOverlay.detach();
      subMenuOverlay.dispose();
    });
  }

  public isLeafMenu(menuContent: MenuContentComponent): boolean {
    const overlay = this.getLastAttachedOverlay();
    return menuContent.overlay === overlay;
  }
}
