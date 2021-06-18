// NG2
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'novo-flex,novo-row',
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
  gap: string;

  // get hb_gridCols() {
  //   return this._sanitizer.bypassSecurityTrustStyle(`repeat(${this.columns}, ${ResourceSettings.eventWidth})`);
  // }
}

@Component({
  selector: 'novo-stack,novo-column',
  template: ` <ng-content></ng-content> `,
})
export class NovoStackElement extends NovoFlexElement {
  @HostBinding('style.flex-direction')
  @Input()
  direction: string = 'column';

  @HostBinding('style.align-items')
  @Input()
  align: string = 'start';
}
