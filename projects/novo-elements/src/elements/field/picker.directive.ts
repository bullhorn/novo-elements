import { Directive, ElementRef, Inject, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NovoInputFormat, NOVO_INPUT_FORMAT } from './formats/base-format';

/** Directive used to connect an input to a MatDatepicker. */
@Directive({
  selector: 'input[picker]',
  host: {
    class: 'novo-has-picker',
    '[attr.autocomplete]': 'autocompleteAttribute',
  },
})
export class NovoPickerDirective {
  /** The datepicker that this input is associated with. */
  @Input()
  set picker(picker: ControlValueAccessor) {
    if (picker) {
      this._picker = picker;
      picker.registerOnChange((value) => this.updateValue(value));
    }
  }
  _picker: ControlValueAccessor;
  /**
   * `autocomplete` attribute to be set on the input element.
   * @docs-private
   */
  @Input('autocomplete') autocompleteAttribute: string = 'off';

  constructor(
    private _elementRef: ElementRef<HTMLInputElement>,
    @Optional() @Self() @Inject(NOVO_INPUT_FORMAT) private formatter: NovoInputFormat<any>,
  ) {
    if (!this.formatter) {
      console.warn('Picker directive is missing required formatter');
    }
    this.formatter?.valueChange.subscribe((value) => {
      this.updatePicker(value);
    });
  }

  updateValue(value: any) {
    this.formatter.writeValue(value);
  }

  updatePicker(value: any) {
    if (this._picker) {
      this._picker.writeValue(value);
    }
  }
}
