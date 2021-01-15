// tslint:disable: directive-selector
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[color]',
})
export class ColorDirective {
  @Input() set color(value: string) {
    this.el.nativeElement.style.color = value;
  }

  constructor(private el: ElementRef) {}
}
