import { Component } from '@angular/core';
// Vendor
import { FormUtils, TextBoxControl, CheckboxControl, FieldInteractionApi } from 'novo-elements';

/**
 * @title Fi Required Example
 */
@Component({
  selector: 'fi-required-example',
  templateUrl: 'fi-required-example.html',
  styleUrls: ['fi-required-example.css'],
})
export class FiRequiredExample {
  public form: any = {};
  public controls: any = {};

  constructor(formUtils: FormUtils) {
    let requiredFunction = (API: FieldInteractionApi) => {
      console.log('[FieldInteractionDemo] - requiredFunction'); // tslint:disable-line
      let activeValue = API.getActiveValue();
      if (activeValue) {
        API.setRequired('required', true);
      } else {
        API.setRequired('required', false);
      }
    };

    // Required Field Interactions
    this.controls.requiredControl = new TextBoxControl({
      type: 'text',
      key: 'required',
      label: 'Test',
      description: 'I may or may not be required, play with the checkbox below!',
    });
    this.controls.toggleControl = new CheckboxControl({
      key: 'toggle',
      label: 'Required?',
      interactions: [{ event: 'change', script: requiredFunction }],
    });
    this.form = formUtils.toFormGroup([this.controls.requiredControl, this.controls.toggleControl]);
  }
}
