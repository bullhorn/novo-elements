// NG2
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'novo-box',
  template: ` <ng-content></ng-content> `,
})
export class NovoBoxElement {
  @HostBinding('style.display')
  get display(): string {
    return 'block';
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
  gap: string;

  // get hb_gridCols() {
  //   return this._sanitizer.bypassSecurityTrustStyle(`repeat(${this.columns}, ${ResourceSettings.eventWidth})`);
  // }
}
