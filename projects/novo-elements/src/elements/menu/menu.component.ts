import {
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { NovoOption } from '../common';
import { MenuItemDirective } from './menu-item.directive';
import { CloseMenuEvent, IMenuClickEvent, NovoMenuService } from './menu.service';
import { MENU_OPTIONS, PARENT_MENU } from './menu.tokens';
import { ILinkConfig, IMenuOptions } from './menu.types';

export interface MouseLocation {
  left?: string;
  marginLeft?: string;
  marginTop?: string;
  top?: string;
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'novo-menu',
  styles: [
    `
      .cdk-overlay-container {
        position: fixed;
        z-index: z(overlay);
        pointer-events: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .novo-menu.cdk-overlay-pane {
        position: absolute;
        pointer-events: auto;
        box-sizing: border-box;
      }
    `,
  ],
  template: ``,
  providers: [{ provide: PARENT_MENU, useExisting: MenuComponent }],
})
export class MenuComponent implements OnDestroy {
  @Input() public menuClass = '';
  @Input() public autoFocus = false;
  @Input() public disabled = false;
  @Output() public close: EventEmitter<CloseMenuEvent> = new EventEmitter();
  @Output() public open: EventEmitter<IMenuClickEvent> = new EventEmitter();
  @ContentChildren(MenuItemDirective) public menuItems: QueryList<MenuItemDirective>;
  @ContentChildren(NovoOption) public menuOptions: QueryList<NovoOption>;
  @ViewChild('menu') public menuElement: ElementRef;
  public visibleMenuItems: MenuItemDirective[] = [];

  public links: ILinkConfig[] = [];
  public item: any;
  public event: MouseEvent | KeyboardEvent;
  private subscription: Subscription = new Subscription();

  constructor(
    private menuService: NovoMenuService,
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef,
    @Optional()
    @Inject(MENU_OPTIONS)
    private options: IMenuOptions,
  ) {
    if (options) {
      this.autoFocus = options.autoFocus;
    }
    this.subscription.add(
      menuService.show.subscribe((menuEvent) => {
        this.onMenuEvent(menuEvent);
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onMenuEvent(menuEvent: IMenuClickEvent): void {
    if (this.disabled) {
      return;
    }
    const { menu, event, item } = menuEvent;
    if (menu && menu !== this) {
      return;
    }
    this.event = event;
    this.item = item;
    this.setVisibleMenuItems();
    this.menuService.openMenu({ ...menuEvent, menuItems: this.visibleMenuItems, menuClass: this.menuClass });
    this.menuService.close
      .asObservable()
      .pipe(first())
      .subscribe((closeEvent) => this.close.emit(closeEvent));
    this.open.next(menuEvent);
  }

  public isMenuItemVisible(menuItem: MenuItemDirective): boolean {
    return this.evaluateIfFunction(menuItem.menuItemVisible);
  }

  public setVisibleMenuItems(): void {
    this.visibleMenuItems = this.menuItems.filter((menuItem) => this.isMenuItemVisible(menuItem));
  }

  public evaluateIfFunction(value: any): any {
    if (value instanceof Function) {
      return value(this.item);
    }
    return value;
  }
}
