import { ChangeDetectionStrategy, Component, ContentChildren, Directive, ElementRef, QueryList, ViewEncapsulation } from '@angular/core';
import { CanColor, mixinColor } from '../common/mixins';

// Boilerplate for applying mixins to NovoToolbar.
/** @docs-private */
const _NovoToolbarBase = mixinColor(
  class {
    constructor(public _elementRef: ElementRef) {}
  },
);

@Directive({
  selector: 'novo-toolbar-row',
  host: { class: 'novo-toolbar-row' },
  inputs: ['color', 'gap'],
})
export class NovoToolbarRow extends _NovoToolbarBase implements CanColor {
  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}

@Component({
  selector: 'novo-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  inputs: ['color', 'gap'],
  host: {
    class: 'novo-toolbar',
    '[class.novo-toolbar-multiple-rows]': '_toolbarRows.length > 0',
    '[class.novo-toolbar-single-row]': '_toolbarRows.length === 0',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NovoToolbar extends _NovoToolbarBase implements CanColor {
  /** Reference to all toolbar row elements that have been projected. */
  @ContentChildren(NovoToolbarRow, { descendants: true }) _toolbarRows: QueryList<NovoToolbarRow>;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
