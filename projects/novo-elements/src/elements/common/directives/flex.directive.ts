import { Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[flex]',
    standalone: false,
})
export class FlexDirective {
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
  }
}
