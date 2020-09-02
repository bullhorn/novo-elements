// NG2
import { Component, EventEmitter, forwardRef, Input, Output, QueryList, ContentChildren, HostBinding } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// APP
import { NovoRadioElement } from './Radio';
export * from './Radio';

// make radio-button-group ids unique
let nextId = 0;
// Value accessor for the component (supports ngModel)
const RADIOGROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoRadioGroup),
  multi: true,
};

@Component({
  selector: 'novo-radio-group',
  providers: [RADIOGROUP_VALUE_ACCESSOR],
  template: '<ng-content></ng-content>',
  host: {
    class: 'novo-radio-group',
    '[class.novo-radio-group-appearance-horizontal]': 'appearance=="horizontal"',
    '[class.novo-radio-group-appearance-vertical]': 'appearance=="vertical"',
  },
})
export class NovoRadioGroup implements ControlValueAccessor {
  private _uniqueId: string = `ngx-radio-group-${++nextId}`;

  @Input() id: string = this._uniqueId;
  @Input() tabindex: number = 0;

  @HostBinding('class.disabled')
  @Input()
  disabled: boolean = false;

  @Output() change = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();

  @ContentChildren(forwardRef(() => NovoRadioElement), { descendants: true })
  _radios: QueryList<NovoRadioElement>;

  _appearance: 'horizontal' | 'vertical' = 'horizontal';

  @Input() get appearance(): any {
    return this._appearance;
  }

  set appearance(value) {
    if (this._appearance !== value) {
      this._appearance = value;
      this._updateRadioButtonAppearance();
    }
  }

  @Input() get value(): any {
    return this._value;
  }

  set value(value) {
    if (this._value !== value) {
      this._value = value;
      this._updateSelectedRadioFromValue();
      this.onChangeCallback(this._value);
    }
  }

  @Input() get name(): string {
    return this._name;
  }
  set name(value: string) {
    if (this._name !== value) {
      this._updateRadioButtonNames();
    }
  }

  get selected(): NovoRadioElement {
    return this._selected;
  }

  private _name: string = this._uniqueId;
  private _value: boolean = false;
  private _selected: NovoRadioElement;

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  private onChangeCallback = (_: any) => {
    // placeholder
  };

  private onTouchedCallback = () => {
    // placeholder
  };

  private _updateRadioButtonAppearance(): void {
    this._radios.forEach((radio) => {
      radio.vertical = this.appearance === 'vertical';
    });
  }

  private _updateRadioButtonNames(): void {
    if (this._radios) {
      this._radios.forEach((radio) => {
        radio.name = this.name;
      });
    }
  }

  private _updateSelectedRadioFromValue(): void {
    if (this._radios) {
      this._radios.forEach((radio) => {
        radio.checked = this.value === radio.value;
        if (radio.checked) {
          this._selected = radio;
        }
      });
    }
  }
}
