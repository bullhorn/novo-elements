// NG2
import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[keepFilterFocused]',
})
export class NovoTableKeepFilterFocus implements AfterViewInit {
  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this.element.nativeElement.focus();
  }
}
