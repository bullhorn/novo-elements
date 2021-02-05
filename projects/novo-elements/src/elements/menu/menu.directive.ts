import { ChangeDetectorRef, Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
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
  @Input() @BooleanInput() public anchor: boolean = false;
  @Input() public trigger: 'click' | 'contextmenu' = 'click';

  isActive: boolean = false;
  @HostBinding('class.menu-active')
  get hb_menuActive() {
    return this.isActive;
  }

  subscription: Subscription;

  constructor(private element: ElementRef, private menuService: NovoMenuService, private cdr: ChangeDetectorRef) {}

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
  public onMenuClick(event: MouseEvent): void {
    if (this.trigger === 'click' && event.button !== 0) {
      return;
    } else if (this.trigger === 'contextmenu' && event.button !== 2) {
      return;
    }

    if (this.waitWhenOpen && this.menuService.hasOpenMenus()) {
      return;
    }
    if (!this.menu.disabled) {
      this.menuService.show.next({
        menu: this.menu,
        event,
        item: this.menuContext,
        anchorElement: this.anchor ? this.element.nativeElement : null,
      });
      this.isActive = true;
      event.preventDefault();
      event.stopPropagation();
      this.cdr.detectChanges();
    }
  }
}
