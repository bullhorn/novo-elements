// tslint:disable: directive-selector
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[theme]',
})
export class ThemeColorDirective {
  @Input() theme: string;

  @HostBinding('class')
  get hb_textColor() {
    return `novo-theme-${this.theme}`;
  }

  constructor(private el: ElementRef) {}
}
