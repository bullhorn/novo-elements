import { Directive, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkAccordion } from '@angular/cdk/accordion';

/** NovoAccordion's display modes. */
export type NovoAccordionDisplayMode = 'default' | 'flat';

/**
 * Directive for a Material Design Accordion.
 */
@Directive({
  selector: 'novo-accordion',
  exportAs: 'novoAccordion',
  host: {
    class: 'novo-accordion',
  },
})
export class NovoAccordion extends CdkAccordion {
  /** Whether the expansion indicator should be hidden. */
  @Input()
  get hideToggle(): boolean {
    return this._hideToggle;
  }
  set hideToggle(show: boolean) {
    this._hideToggle = coerceBooleanProperty(show);
  }
  private _hideToggle: boolean = false;

  /**
   * The display mode used for all expansion panels in the accordion. Currently two display
   * modes exist:
   *  default - a gutter-like spacing is placed around any expanded panel, placing the expanded
   *     panel at a different elevation from the reset of the accordion.
   *  flat - no spacing is placed around expanded panels, showing all panels at the same
   *     elevation.
   */
  @Input()
  displayMode: NovoAccordionDisplayMode = 'default';
}
