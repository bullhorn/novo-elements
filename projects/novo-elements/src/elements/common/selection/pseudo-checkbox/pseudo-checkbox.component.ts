import { ChangeDetectionStrategy, Component, Inject, Input, Optional, ViewEncapsulation } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

/**
 * Possible states for a pseudo checkbox.
 * @docs-private
 */
export type NovoPseudoCheckboxState = 'unchecked' | 'checked' | 'indeterminate';
export type NovoPseudoCheckboxShape = 'box' | 'circle' | 'line';

/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 * Note that theming is meant to be handled by the parent element, e.g.
 * `novo-primary .novo-pseudo-checkbox`.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with `<novo-checkbox>` and should *not* be used if the user would directly
 * interact with the checkbox. The pseudo-checkbox should only be used as an implementation detail
 * of more complex components that appropriately handle selected / checked state.
 * @docs-private
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'novo-pseudo-checkbox',
  styleUrls: ['pseudo-checkbox.component.scss'],
  template: ` <i
    [class.bhi-checkbox-empty]="state === 'unchecked' && shape === 'box'"
    [class.bhi-checkbox-filled]="state === 'checked' && shape === 'box'"
    [class.bhi-checkbox-indeterminate]="state === 'indeterminate' && shape === 'box'"
    [class.bhi-circle-o]="state === 'unchecked' && shape === 'circle'"
    [class.bhi-check-circle-filled]="state === 'checked' && shape === 'circle'"
    [class.bhi-circle]="state === 'indeterminate' && shape === 'circle'"
    [class.bhi-box-empty]="state === 'unchecked' && shape === 'line'"
    [class.bhi-check]="state === 'checked' && shape === 'line'"
    [class.bhi-box-minus-o]="state === 'indeterminate' && shape === 'line'"
  ></i>`,
  host: {
    class: 'novo-pseudo-checkbox',
    '[class.novo-pseudo-checkbox-indeterminate]': 'state === "indeterminate"',
    '[class.novo-pseudo-checkbox-checked]': 'state === "checked"',
    '[class.novo-pseudo-checkbox-disabled]': 'disabled',
    '[class._novo-animation-noopable]': '_animationMode === "NoopAnimations"',
  },
})
export class NovoPseudoCheckbox {
  /** Display state of the checkbox. */
  @Input() state: NovoPseudoCheckboxState = 'unchecked';
  /** Display state of the checkbox. */
  @Input() shape: NovoPseudoCheckboxShape = 'box';
  /** Whether the checkbox is disabled. */
  @Input() disabled: boolean = false;

  constructor(@Optional() @Inject(ANIMATION_MODULE_TYPE) public _animationMode?: string) {}
}
