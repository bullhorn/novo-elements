// tslint:disable: directive-selector
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
@Directive({
  selector: '[border], [bb], [borderBottom], [bt], [borderTop], [bl], [borderLeft], [br], [borderRight], [bx], [borderX], [by], [borderY]',
})
export class BorderDirective {
  @Input() borderStyle = 'solid';
  @Input() borderColor = '#eaecef';
  @Input() borderWidth = 1;

  @Input() border: string;
  @Input() borderLeft: string;
  @Input() bl: string;
  @Input() borderRight: string;
  @Input() br: string;
  @Input() borderTop: string;
  @Input() bt: string;
  @Input() borderBottom: string;
  @Input() bb: string;
  @Input() borderX: string;
  @Input() bx: string;
  @Input() borderY: string;
  @Input() by: string;

  // @HostBinding('style.borderStyle') get getBorderStyle() {
  //   return this.border;
  // }

  // @HostBinding('style.borderWidth') get getBorderWidth() {
  //   return this.width;
  // }

  // @HostBinding('style.borderColor') get getBorderColor() {
  //   return this.borderColor;
  // }

  @HostBinding('class') get hb_border() {
    return `border-${this.border}`;
  }
  @HostBinding('style.border-left') get hb_border_left() {
    return this.borderLeft || this.bl || this.bx || this.borderX;
  }
  @HostBinding('style.border-right') get hb_border_right() {
    return this.borderRight || this.bt || this.bx || this.borderX;
  }
  @HostBinding('style.border-top') get hb_border_top() {
    return this.borderTop || this.bt || this.by || this.borderY;
  }
  @HostBinding('style.border-bottom') get hb_border_bottom() {
    return this.borderBottom || this.bt || this.by || this.borderY;
  }

  constructor(private el: ElementRef) {}
}
