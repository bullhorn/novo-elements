// NG2
import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'novo-flex',
  template: ` <ng-content></ng-content> `,
})
export class NovoFlexElement {
  @HostBinding('style.display')
  get display(): string {
    return 'flex';
  }

  @HostBinding('style.flex-direction')
  @Input()
  direction: string = 'row';

  @HostBinding('style.align-items')
  @Input()
  align: string = 'center';

  @HostBinding('style.justify-content')
  @Input()
  justify: string = 'flex-start';

  @HostBinding('style.flex-wrap')
  @Input()
  wrap: string = 'nowrap';

  @HostBinding('style.gap')
  @Input()
  gap: string = 'nowrap';

  // get hb_gridCols() {
  //   return this._sanitizer.bypassSecurityTrustStyle(`repeat(${this.columns}, ${ResourceSettings.eventWidth})`);
  // }
}
