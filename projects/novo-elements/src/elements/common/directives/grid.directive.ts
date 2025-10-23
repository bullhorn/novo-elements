import { Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appGrid]',
    standalone: false
})
export class GridDirective {
  @HostBinding('style.grid-template-columns')
  @Input()
  columns: string;
  @HostBinding('style.grid-template-rows')
  @Input()
  rows: string;
  @HostBinding('style.grid-template-areas')
  @Input()
  areas: string;

  constructor(private readonly el: ElementRef, private readonly renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'grid');
    this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
  }
}

@Directive({
    selector: '[appGridArea]',
    standalone: false
})
export class GridAreaDirective {
  @HostBinding('style.grid-area')
  @Input('appGridArea')
  area: string;
}
