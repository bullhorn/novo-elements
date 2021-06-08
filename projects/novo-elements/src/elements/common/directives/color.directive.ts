// tslint:disable: directive-selector
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[tc]',
})
export class TextColorDirective {
  @Input() bgc: string;

  @HostBinding('class')
  get background() {
    return `novo-text-color-${this.bgc}`;
  }

  constructor(private el: ElementRef) {}
}
