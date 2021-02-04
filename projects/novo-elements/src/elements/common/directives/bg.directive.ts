// tslint:disable: directive-selector
import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[bg]',
})
export class BGDirective {
  @Input() bg: string;

  @HostBinding('style.backgroundColor') get background() {
    return this.bg;
  }
}
