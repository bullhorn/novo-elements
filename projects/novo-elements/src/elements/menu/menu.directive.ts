import { ChangeDetectorRef, Directive, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BooleanInput } from '../../utils';
import { MenuComponent } from './menu.component';
import { NovoMenuService } from './menu.service';

@Directive({
  selector: '[menu]',
})
export class MenuDirective implements OnInit, OnDestroy {
  @Input() public menuContext: any;
  @Input() public menu: MenuComponent;
  @Input() @BooleanInput() public waitWhenOpen: boolean = false;
  @Input() @BooleanInput() public capture: boolean = false;

  isActive: boolean = false;
  @HostBinding('class.menu-active')
  get hb_menuActive() {
    return this.isActive;
  }

  subscription: Subscription;

  constructor(private menuService: NovoMenuService, private cdr: ChangeDetectorRef) {}

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
  public onMenuClick(event: MouseEvent): void {
    if (this.waitWhenOpen && this.menuService.hasOpenMenus()) {
      return;
    }
    if (!this.menu.disabled) {
      this.menuService.show.next({
        menu: this.menu,
        event,
        item: this.menuContext,
      });
      this.isActive = true;
      event.preventDefault();
      event.stopPropagation();
      this.cdr.detectChanges();
    }
  }
}
