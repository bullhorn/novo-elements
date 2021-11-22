// tslint:disable: directive-selector
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[fill]',
})
export class FillColorDirective {
  @Input() fill: string;

  @HostBinding('class')
  get hb_textColor() {
    return `novo-fill-${this.fill}`;
  }

  constructor(private el: ElementRef) {}
}
