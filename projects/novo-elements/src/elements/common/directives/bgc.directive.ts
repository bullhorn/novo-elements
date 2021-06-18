// tslint:disable: directive-selector
import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[bgc]',
})
export class BackgroundColorDirective {
  @Input() bgc: string;

  @HostBinding('class')
  get background() {
    return `bgc-${this.bgc}`;
  }
}
