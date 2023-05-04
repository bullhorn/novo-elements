// NG2
import { Component, Input, ViewEncapsulation } from '@angular/core';
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
  selector: 'novo-link',
  template: `<a [attr.href]="href"><ng-content></ng-content></a>`,
  styleUrls: ['./link.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'novo-link',
  },
})
export class NovoLink extends NovoBaseTextElement {
  @Input()
  href: string;
}
