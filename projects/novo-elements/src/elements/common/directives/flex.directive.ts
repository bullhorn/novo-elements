import { Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[flex]',
})
export class FlexDirective {
  @HostBinding('style.align-items')
  @Input()
  align: string = 'center';

  @HostBinding('style.justify-content')
  @Input()
  justify: string = 'flex-start';

  @HostBinding('style.flex-flow')
  @Input()
  flow: string = 'row nowrap';

  @HostBinding('style.flex')
  @Input()
  flex: string;

  constructor(private readonly el: ElementRef, private readonly renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
  }
}
