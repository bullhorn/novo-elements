import { Component, Input, EventEmitter, Output, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'novo-tab',
  template: `
        <div class="novo-tab-link">
            <ng-content></ng-content>
        </div>
        <span class="indicator"></span>
   `,
})
export class NovoTabComponent {
  @HostBinding('class.active') @Input() public active: boolean = false;
  @HostBinding('class.disabled') @Input() public disabled: boolean = false;
  @Output() public select: EventEmitter<NovoTabComponent> = new EventEmitter<NovoTabComponent>();

  @HostListener('click')
  public onClick(): void {
    if (!this.disabled) {
      this.select.emit(this);
    }
  }

  public deactivate(): void {
    this.active = false;
  }

  public activate(): void {
    this.active = true;
  }
}
