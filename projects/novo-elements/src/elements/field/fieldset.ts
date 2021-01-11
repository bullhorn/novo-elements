// NG2
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { NovoFieldElement } from './field';

@Component({
  selector: 'novo-fields',
  templateUrl: './fieldset.html',
  styleUrls: ['./fieldset.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'novo-field',
    // '[class.novo-field-appearance-horizontal]': 'appearance=="horizontal"',
    // '[class.novo-field-appearance-vertical]': 'appearance=="vertical"',
  },
})
export class NovoFieldsElement implements AfterContentInit {
  @ContentChildren(NovoFieldElement)
  _fields: QueryList<NovoFieldElement>;

  _appearance: 'horizontal' | 'vertical' = 'horizontal';

  @Input() get appearance(): any {
    return this._appearance;
  }

  set appearance(value) {
    if (this._appearance !== value) {
      this._appearance = value;
      this._updateFieldAppearance();
    }
  }

  ngAfterContentInit(): any {
    this._updateFieldAppearance();
  }

  private _updateFieldAppearance(): void {
    if (this._fields) {
      this._fields.forEach((field) => {
        field.appearance = this.appearance;
      });
    }
  }
}
