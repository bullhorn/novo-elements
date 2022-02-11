// tslint:disable: directive-selector
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[accent]',
})
export class AccentColorDirective {
  @Input() accent: string;

  @HostBinding('class')
  get hb_textColor() {
    return `novo-accent-${this.accent}`;
  }

  constructor(private el: ElementRef) {}
}
