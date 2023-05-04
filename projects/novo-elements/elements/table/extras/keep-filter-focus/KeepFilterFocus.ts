// NG2
import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[keepFilterFocused]',
})
export class NovoTableKeepFilterFocus implements AfterViewInit {
  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this.element.nativeElement.focus();
  }
}
