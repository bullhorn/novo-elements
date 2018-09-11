import { Component } from '@angular/core';
// Vendor
import { FormUtils, TextBoxControl, FieldInteractionApi } from 'novo-elements';

/**
 * @title Fi Validation Example
 */
@Component({
  selector: 'fi-validation-example',
  templateUrl: 'fi-validation-example.html',
  styleUrls: ['fi-validation-example.css'],
})
export class FiValidationExample {
  public form: any = {};
  public controls: any = {};

  constructor(private formUtils: FormUtils) {
    let validationFunction = (API: FieldInteractionApi) => {
      console.log('[FieldInteractionDemo] - validationFunction'); // tslint:disable-line
      let activeValue = API.getActiveValue();
      if (activeValue > 10) {
        API.markAsInvalid(API.getActiveKey(), 'Too high! Make it a lot lower!!');
      }
    };

    // Validation Field Interactions
    this.controls.validationControl = new TextBoxControl({
      type: 'number',
      key: 'validation',
      value: 5,
      label: 'Validation Test',
      description: 'Try to input a number larger then 10!',
      interactions: [{ event: 'change', script: validationFunction, invokeOnInit: true }],
    });
    this.form = formUtils.toFormGroup([this.controls.validationControl]);
  }
}
