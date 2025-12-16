import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { BooleanInput } from 'novo-elements/utils';

@Directive({
    selector: '[visible]',
    standalone: false
})
export class VisibleDirective {
  @BooleanInput()
  @Input()
  @HostBinding('class')
  visible: boolean;

  @HostBinding('class')
  get hb_visibility() {
    return this.visible ? '' : `novo-visibility-hidden`;
  }

  constructor(private el: ElementRef) {}
}
