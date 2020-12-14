import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'novo-divider',
  host: {
    role: 'separator',
    '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
    '[class.novo-divider-vertical]': 'vertical',
    '[class.novo-divider-horizontal]': '!vertical',
    '[class.novo-divider-inset]': 'inset',
    class: 'novo-divider',
  },
  template: '',
  styleUrls: ['./divider.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoDividerComponent {
  /** Whether the divider is vertically aligned. */
  @Input()
  get vertical(): boolean {
    return this._vertical;
  }
  set vertical(value: boolean) {
    this._vertical = coerceBooleanProperty(value);
  }
  private _vertical: boolean = false;

  /** Whether the divider is an inset divider. */
  @Input()
  get inset(): boolean {
    return this._inset;
  }
  set inset(value: boolean) {
    this._inset = coerceBooleanProperty(value);
  }
  private _inset: boolean = false;

  static ngAcceptInputType_vertical: BooleanInput;
  static ngAcceptInputType_inset: BooleanInput;
}
