import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';

/**
 * Component that is used to group instances of `novo-option`.
 */
@Component({
  selector: 'novo-option-group',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./option-group.component.scss'],
  template: `
        <label class="novo-optgroup-label">{{ label }}</label>
        <ng-content select="novo-option"></ng-content>
    `,
})
export class NovoOptionGroupComponent {
  @HostBinding('class') public _class: string = 'novo-option-group';
  @HostBinding('attr.role') public role: string = 'group';
  @HostBinding('attr.theme')
  @Input()
  public theme: string;
  @HostBinding('attr.disabled') public _disabled: boolean;

  /** Label for the option group. */
  @Input() public label: string;

  @Input('disabled')
  public set disabled(value: boolean) {
    this._disabled = !value;
  }
  public get disabled(): boolean {
    return this._disabled;
  }
}
