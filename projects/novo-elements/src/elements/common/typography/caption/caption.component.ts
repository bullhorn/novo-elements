// NG2
import { Component } from '@angular/core';
import { NovoBaseTextElement } from '../base/base-text.component';

/**
 * Tag Example
 * <novo-title size="sm" disabled>Label</novo-title
 * <novo-title small disabled>Label</novo-title>
 * <novo-title large disabled>Label</novo-title>
 * <novo-title error>Label</novo-title>
 * <novo-title muted>Label</novo-title>
 * <novo-title class="tc-grapefruit">Label</novo-title>
 * <novo-title color="grapefruit">Label</novo-title>
 */

@Component({
  selector: 'novo-caption,[novo-caption]',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./caption.scss'],
  host: {
    class: 'novo-caption',
  },
})
export class NovoCaption extends NovoBaseTextElement {}
