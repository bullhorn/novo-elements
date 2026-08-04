import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

export type NovoBadgeColor =
  | 'neutral'
  | 'positive'
  | 'success'
  | 'warning'
  | 'negative'
  | 'info'
  | 'candidate'
  | 'company'
  | 'job'
  | 'placement';

export type NovoBadgeShape = 'pill' | 'rounded';

/**
 * A small label/pill used for counts, statuses and tags.
 */
@Component({
  selector: 'novo-badge',
  host: {
    class: 'novo-badge',
    '[class]': '"novo-badge novo-badge-color-" + color + " novo-badge-shape-" + shape',
    '[class.novo-badge-dot]': 'dot',
    '[attr.aria-label]': 'dot ? label : null',
    '[attr.role]': 'dot ? "img" : null',
  },
  template: `<span class="novo-badge-indicator" *ngIf="dot"></span><ng-content *ngIf="!dot"></ng-content>`,
  styleUrls: ['./badge.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NovoBadgeComponent {
  /** Semantic color of the badge. */
  @Input() color: NovoBadgeColor = 'neutral';

  /** Corner style of the badge. */
  @Input() shape: NovoBadgeShape = 'pill';

  /** Accessible label, used when rendering as a dot. */
  @Input() label: string;

  /** Renders the badge as a small colored status dot with no text. */
  @Input()
  get dot(): boolean {
    return this._dot;
  }
  set dot(value: boolean) {
    this._dot = coerceBooleanProperty(value);
  }
  private _dot = false;

  static ngAcceptInputType_dot: BooleanInput;
}
