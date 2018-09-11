import { Component } from '@angular/core';
// Vendor
import { FormUtils, TextBoxControl, FieldInteractionApi } from 'novo-elements';

/**
 * @title Fi Confirm Example
 */
@Component({
  selector: 'fi-confirm-example',
  templateUrl: 'fi-confirm-example.html',
  styleUrls: ['fi-confirm-example.css'],
})
export class FiConfirmExample {
  public form: any;
  public controls: any = {};

  constructor(private formUtils: FormUtils) {
    let confirmFunction = (API: FieldInteractionApi) => {
      console.log('[FieldInteractionDemo] - confirmFunction'); // tslint:disable-line
      if (API.getActiveKey() === 'confirm1') {
        API.confirmChanges(API.getActiveKey());
      } else {
        API.confirmChanges(API.getActiveKey(), 'This is VERY serious!');
      }
    };

    // Confirm Interactions
    this.controls.confirm1Control = new TextBoxControl({
      type: 'text',
      key: 'confirm1',
      value: 'Hello!',
      label: 'Prompt!',
      description: 'As you take focus out of this field you will be prompted for changes!',
      interactions: [{ event: 'change', script: confirmFunction }],
    });
    this.controls.confirm2Control = new TextBoxControl({
      type: 'text',
      key: 'confirm2',
      value: 'Another!',
      label: 'Custom Promp!',
      description: 'You can provide a custom message!',
      interactions: [{ event: 'change', script: confirmFunction }],
    });
    this.form = formUtils.toFormGroup([this.controls.confirm1Control, this.controls.confirm2Control]);
  }
}
