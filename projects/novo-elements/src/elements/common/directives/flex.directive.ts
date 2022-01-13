import { Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[flex]',
})
export class FlexDirective {
  // @HostBinding('style.align-items')
  // @Input()
  // align: string = 'center';

  // @HostBinding('style.justify-content')
  // @Input()
  // justify: string = 'flex-start';

  // @HostBinding('style.flex-flow')
  // @Input()
  // flow: string = 'row nowrap';

  private _flex: string;

  @HostBinding('style.flex')
  @Input()
  public get flex(): string {
    return this._flex;
  }

  public set flex(value: string) {
    if (!value) {
      this._flex = '1 1 auto';
    } else {
      this._flex = value;
    }
  }

  constructor(private readonly el: ElementRef, private readonly renderer: Renderer2) {
    // this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
  }
}
