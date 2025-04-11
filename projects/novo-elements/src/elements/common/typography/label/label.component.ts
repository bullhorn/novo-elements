// NG2
import { Component, computed, HostBinding, input } from '@angular/core';
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

let nextId = 0;

@Component({
  selector: 'novo-label,[novo-label]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./label.scss'],
  host: {
    class: 'novo-label',
  },
})
export class NovoLabel extends NovoBaseTextElement {
  inputId = input<string | null>(null, { alias: 'id' });

  computedId = computed(() => this.inputId() ?? `novo-label-${++nextId}`);

  @HostBinding('attr.id')
  get id(): string {
    return this.computedId();
  }
}
