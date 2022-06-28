// tslint:disable: directive-selector
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { BooleanInput } from '../../../utils';

@Directive({
  selector: '[visible]',
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
