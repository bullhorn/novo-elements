// tslint:disable: directive-selector
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[border], [bb]',
})
export class BorderDirective {
  @Input() border = 'dashed';
  @Input() borderColor = '#666';
  @Input() width = 1;
  @Input() bb: string;

  // @HostBinding('style.borderStyle') get getBorderStyle() {
  //   return this.border;
  // }

  // @HostBinding('style.borderWidth') get getBorderWidth() {
  //   return this.width;
  // }

  // @HostBinding('style.borderColor') get getBorderColor() {
  //   return this.borderColor;
  // }

  @HostBinding('style.border-bottom') get hb_bb() {
    return this.bb;
  }

  constructor(private el: ElementRef) {}
}
