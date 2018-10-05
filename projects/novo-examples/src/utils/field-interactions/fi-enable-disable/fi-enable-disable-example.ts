import { Component } from '@angular/core';
// Vendor
import { FormUtils, TextBoxControl, CheckboxControl, FieldInteractionApi } from 'novo-elements';

/**
 * @title Fi Enable Disable Example
 */
@Component({
  selector: 'fi-enable-disable-example',
  templateUrl: 'fi-enable-disable-example.html',
  styleUrls: ['fi-enable-disable-example.css'],
})
export class FiEnableDisableExample {
  public form: any;
  public controls: any = {};

  constructor(private formUtils: FormUtils) {
    let enableDisableFunction = (API: FieldInteractionApi) => {
      console.log('[FieldInteractionDemo] - enableDisableFunction'); // tslint:disable-line
      let currentValue = API.getActiveValue();
      if (!currentValue) {
        API.enable('text');
      } else {
        API.disable('text');
      }
    };

    // Enable/Disable Field Interactions
    this.controls.textControl = new TextBoxControl({
      type: 'text',
      key: 'text',
      label: 'MyField',
    });
    this.controls.toggleControl = new CheckboxControl({
      key: 'toggle',
      label: 'Disable?',
      description: 'I will disable the above field!',
      interactions: [{ event: 'change', script: enableDisableFunction }],
    });
    this.form = formUtils.toFormGroup([this.controls.textControl, this.controls.toggleControl]);
  }
}
