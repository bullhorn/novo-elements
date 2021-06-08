import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { BooleanInput } from '../../utils';
import { MenuContentComponent } from './menu-content.component';
import { MenuComponent } from './menu.component';
import { NovoMenuService } from './menu.service';
import { PARENT_MENU } from './menu.tokens';

@Directive({
  selector: '[menu]',
})
export class MenuDirective implements OnInit, OnDestroy {
  @Input() public menuContext: any;
  @Input() public menu: MenuComponent;
  @Input() public menuContent: MenuContentComponent;
  @Input() @BooleanInput() public waitWhenOpen: boolean = false;
  @Input() @BooleanInput() public capture: boolean = false;
  @Input() @BooleanInput() public anchor: boolean = false;
  @Input() public trigger: 'click' | 'contextmenu' | 'mouseenter' = 'click';

  isSubMenu: boolean = false;
  isActive: boolean = false;
  @HostBinding('class.menu-active')
  get hb_menuActive() {
    return this.isActive;
  }

  subscription: Subscription;

  constructor(
    private element: ElementRef,
    private menuService: NovoMenuService,
    private cdr: ChangeDetectorRef,
    @Optional() @Inject(PARENT_MENU) private _parentMenu: MenuComponent,
  ) {
    if (!!this._parentMenu) {
      this.isSubMenu = true;
      this.trigger = 'mouseenter';
    }
  }

  ngOnInit() {
    this.subscription = this.menuService.close.subscribe(() => {
      this.isActive = false;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.isActive = false;
    this.subscription.unsubscribe();
  }

  @HostListener('click', ['$event'])
  @HostListener('contextmenu', ['$event'])
  @HostListener('mouseenter', ['$event'])
  public onMenuClick(event: MouseEvent): void {
    if (this.trigger !== event.type) {
      return;
    }
    if (this.trigger === 'click' && event.button !== 0) {
      return;
    } else if (this.trigger === 'contextmenu' && event.button !== 2) {
      return;
    } else if (this.waitWhenOpen && this.menuService.hasOpenMenus()) {
      return;
    }

    if (!this.menu.disabled) {
      this.menuService.show.next({
        menu: this.menu,
        event,
        item: this.menuContext,
        anchorElement: this.anchor ? this.element.nativeElement : null,
        parentMenu: this._parentMenu,
        menuTrigger: this,
      });
      this.isActive = true;
      event.preventDefault();
      event.stopPropagation();
      this.cdr.detectChanges();
    }
  }
}
