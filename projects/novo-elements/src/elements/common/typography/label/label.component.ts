// NG2
import { Component } from '@angular/core';
import { NovoBaseTextElement } from '../base/base-text.component';

/**
 * Tag Example
 * <novo-label size="sm" disabled>Label</novo-label
 * <novo-label small disabled>Label</novo-label>
 * <novo-label large disabled>Label</novo-label>
 * <novo-label error>Label</novo-label>
 * <novo-label muted>Label</novo-label>
 * <novo-label class="tc-grapefruit">Label</novo-label>
 * <novo-label color="grapefruit">Label</novo-label>
 */

@Component({
  selector: 'novo-label,[novo-label]',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./label.scss'],
  host: {
    class: 'novo-label',
  },
})
export class NovoLabel extends NovoBaseTextElement {}
