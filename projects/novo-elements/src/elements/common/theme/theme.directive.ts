import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

// TODO: Define theme interface

@Directive({
    selector: '[novoTheme]',
    standalone: false,
})
export class ThemeDirective implements OnChanges {
  @Input('novoTheme') theme: { [prop: string]: string };

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnChanges() {
    Object.keys(this.theme).forEach((prop) => {
      this.el.nativeElement.style.setProperty(`--${prop}`, this.theme[prop]);
    });
  }
}
