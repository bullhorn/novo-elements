import { Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';

@Directive({
  selector:
    // tslint:disable-next-line: directive-selector
    '[fontWeight],[lineHeight],[textAlign],[textAlign],[fontStyle],[textTransform]',
})
export class TypographyDirective {
  @HostBinding('style.fontWeight')
  @Input()
  fontWeight: string;

  @HostBinding('style.lineHeight')
  @Input()
  lineHeight: string;

  @HostBinding('style.textAlign')
  @Input()
  textAlign: string;

  @HostBinding('style.fontStyle')
  @Input()
  fontStyle: string;

  @HostBinding('style.textTransform')
  @Input()
  textTransform: string;

  constructor(private readonly el: ElementRef, private readonly renderer: Renderer2) {}
}
