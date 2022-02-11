import { ContentChild, Directive, ElementRef, Input, TemplateRef } from '@angular/core';
import { NovoOption } from '../common';

/**
 * This is a structural directive now.  Should only be used on `novo-options`
 */
@Directive({
  selector: '[menuItem]',
})
export class MenuItemDirective {
  @Input() public menuItemEnabled: boolean | ((item: any) => boolean) = true;
  @Input() public menuItemVisible: boolean | ((item: any) => boolean) = true;

  @ContentChild(NovoOption) optionRef: NovoOption;

  public currentItem: any;

  constructor(public template: TemplateRef<{ item: any }>, public elementRef: ElementRef) {}
}
