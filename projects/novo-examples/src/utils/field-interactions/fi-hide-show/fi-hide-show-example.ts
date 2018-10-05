import { Component } from '@angular/core';
// Vendor
import { FormUtils, TextBoxControl, CheckboxControl, FieldInteractionApi } from 'novo-elements';

/**
 * @title Fi Hide Show Example
 */
@Component({
  selector: 'fi-hide-show-example',
  templateUrl: 'fi-hide-show-example.html',
  styleUrls: ['fi-hide-show-example.css'],
})
export class FiHideShowExample {
  public form: any = {};
  public controls: any = {};

  constructor(private formUtils: FormUtils) {
    let hideShowFunction = (API: FieldInteractionApi) => {
      console.log('[FieldInteractionDemo] - hideShowFunction'); // tslint:disable-line
      let activeValue = API.getActiveValue();
      if (!activeValue) {
        API.show('text');
      } else {
        API.hide('text');
      }
    };

    // Hide/Show Field Interactions
    this.controls.textControl = new TextBoxControl({
      type: 'text',
      key: 'text',
      required: true,
      label: 'MyField',
    });
    this.controls.text2Control = new TextBoxControl({
      type: 'text',
      key: 'text2',
      label: 'MyField',
    });
    this.controls.toggleControl = new CheckboxControl({
      key: 'toggle',
      label: 'Hidden?',
      description: 'I will toggle the above field to display or not!',
      interactions: [{ event: 'change', script: hideShowFunction }],
    });
    this.form = formUtils.toFormGroup([this.controls.textControl, this.controls.text2Control, this.controls.toggleControl]);
  }
}
