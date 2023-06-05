// NG2
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, HostBinding, Input, QueryList } from '@angular/core';
import { BooleanInput } from 'novo-elements/utils';
import { NovoFieldElement } from './field';

@Component({
  selector: 'novo-fields',
  templateUrl: './fieldset.html',
  styleUrls: ['./fieldset.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'novo-field',
    '[class.novo-fieldset-appearance-standard]': 'appearance == "standard"',
    '[class.novo-fieldset-appearance-fill]': 'appearance == "fill"',
    '[class.novo-fieldset-appearance-outline]': 'appearance == "outline"',
    '[class.novo-fieldset-appearance-list]': 'appearance == "list"',
    // '[class.novo-field-layout-horizontal]': 'layout=="horizontal"',
    // '[class.novo-field-layout-vertical]': 'layout=="vertical"',
  },
})
export class NovoFieldsElement implements AfterContentInit {
  @ContentChildren(NovoFieldElement)
  _fields: QueryList<NovoFieldElement>;

  _layout: 'horizontal' | 'vertical' = 'horizontal';
  @Input() get layout(): any {
    return this._layout;
  }
  set layout(value) {
    if (this._layout !== value) {
      this._layout = value;
      this._updateFieldLayout();
    }
  }

  _appearance: 'standard' | 'outline' | 'fill' | 'list' = 'standard';
  @Input() get appearance(): any {
    return this._appearance;
  }
  set appearance(value) {
    if (this._appearance !== value) {
      this._appearance = value;
      this._updateFieldAppearance();
    }
  }

  @HostBinding('class.full-width')
  @Input()
  @BooleanInput()
  fullWidth: boolean = false;

  ngAfterContentInit(): any {
    this._updateFieldLayout();
    this._updateFieldAppearance();
  }

  private _updateFieldLayout(): void {
    if (this._fields) {
      this._fields.forEach((field) => {
        field.layout = this.layout;
      });
    }
  }

  private _updateFieldAppearance(): void {
    if (this._fields) {
      this._fields.forEach((field) => {
        field.appearance = this.appearance;
      });
    }
  }
}
