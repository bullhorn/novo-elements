// tslint:disable: directive-selector
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[txc]',
})
export class TextColorDirective {
  @Input() txc: string;

  @HostBinding('class')
  get hb_textColor() {
    return isValidColor(this.txc) ? 'novo-text-custom' : `novo-text-${this.txc}`;
  }
  @HostBinding('style.color')
  get hb_textStyle() {
    return isValidColor(this.txc) ? this.txc : null;
  }

  constructor(private el: ElementRef) {}
}

function isValidColor(color: string) {
  return color.startsWith('#') || color.startsWith('rgb');
}
