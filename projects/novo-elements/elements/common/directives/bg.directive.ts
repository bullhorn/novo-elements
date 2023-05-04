// tslint:disable: directive-selector
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[bg]',
})
export class BackgroundColorDirective {
  @Input() bg: string;

  @HostBinding('class')
  get hb_bgColor() {
    return isValidColor(this.bg) ? 'novo-background-custom' : `novo-background-${this.bg}`;
  }
  @HostBinding('style.background-color')
  get hb_bgStyle() {
    return isValidColor(this.bg) ? this.bg : null;
  }

  constructor(private el: ElementRef) {}
}

function isValidColor(color: string) {
  return color.startsWith('#') || color.startsWith('rgb');
}
