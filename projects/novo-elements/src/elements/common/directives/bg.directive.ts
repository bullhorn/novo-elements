// tslint:disable: directive-selector
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[bg]',
})
export class BackgroundColorDirective {
  @Input() bg: string;

  @HostBinding('class')
  get hb_textColor() {
    return `novo-background-${this.bg}`;
  }

  constructor(private el: ElementRef) {}
}
