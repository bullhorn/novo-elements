// NG2
import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { BooleanInput } from '../../../../utils/decorators';
import { NovoBaseTextElement } from '../base/base-text.component';

/**
 * Tag Example
 * <novo-text size="small" disabled>Label</novo-text
 * <novo-text small disabled>Label</novo-text>
 * <novo-text large disabled>Label</novo-text>
 * <novo-text error>Label</novo-text>
 * <novo-text muted>Label</novo-text>
 * <novo-text class="tc-grapefruit">Label</novo-text>
 * <novo-text color="grapefruit">Label</novo-text>
 */

@Component({
  selector: 'novo-text,[novo-text]',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./text.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'novo-text',
  },
})
export class NovoText extends NovoBaseTextElement {
  @HostBinding('class.text-block')
  @Input()
  @BooleanInput()
  block: boolean;
}
