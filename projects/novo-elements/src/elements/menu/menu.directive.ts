import { MenuComponent } from './menu.component';
import { NovoMenuService } from './menu.service';
import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[menu]',
})
export class MenuDirective {
  @Input() public menuContext: any;
  @Input() public menu: MenuComponent;

  constructor(private menuService: NovoMenuService) {}

  @HostListener('click', ['$event'])
  public onMenuClick(event: MouseEvent): void {
    if (!this.menu.disabled) {
      this.menuService.show.next({
        menu: this.menu,
        event,
        item: this.menuContext,
      });
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
