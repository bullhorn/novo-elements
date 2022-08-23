// NG2
import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'novo-grid',
  template: ` <ng-content></ng-content> `,
})
export class NovoGridElement {
  @HostBinding('style.display')
  get display(): string {
    return 'grid';
  }

  @HostBinding('style.flex-direction')
  @Input()
  direction: string = 'row';

  @HostBinding('style.align-items')
  @Input()
  align: string = 'start';

  @HostBinding('style.justify-content')
  @Input()
  justify: string = 'flex-start';

  @Input()
  columns: string = '1';

  @HostBinding('style.grid-template-columns')
  get hb_gridCols() {
    if (_isNumberValue(this.columns)) {
      return this._sanitizer.bypassSecurityTrustStyle(`repeat(${this.columns}, 1fr)`);
    }
    return this._sanitizer.bypassSecurityTrustStyle(`${this.columns}`);
  }

  constructor(private _sanitizer: DomSanitizer) {}
}
