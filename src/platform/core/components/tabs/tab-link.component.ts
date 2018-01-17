import { Component, Input, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'novo-tab-link, novo-nav-link, [tab-link]',
  styleUrls: ['./tab.component.scss'],
  template: `
        <div class="novo-tab-link" (click)="_checkDisabled($event)">
            <ng-content></ng-content>
        </div>
        <span class="indicator"></span>
    `,
})
export class NovoTabLinkComponent {
  @HostBinding('class.active')
  @Input()
  public active: boolean = false;
  @HostBinding('class.disabled')
  @Input()
  public disabled: boolean = false;
  /** Prevents the default element actions if it is disabled. */
  @HostListener('click', ['$event'])
  public _checkDisabled(event: Event): boolean {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
      return false;
    }
    return true;
  }

  public deactivate(): void {
    this.active = false;
  }

  public activate(): void {
    this.active = true;
  }
}
