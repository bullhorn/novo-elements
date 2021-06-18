// tslint:disable: directive-selector
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[txc]',
})
export class TextColorDirective {
  @Input() txc: string;

  @HostBinding('class')
  get hb_textColor() {
    return `txc-${this.txc}`;
  }

  constructor(private el: ElementRef) {}
}
