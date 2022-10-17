import { Component } from '@angular/core';
// Vendor
import { CheckboxControl, FieldInteractionApi, FormUtils, TextBoxControl } from 'novo-elements';

/**
 * @title Fi Required Example
 */
@Component({
  selector: 'fi-required-example',
  templateUrl: 'fi-description-example.html',
  styleUrls: ['fi-description-example.css'],
})
export class FiDescriptionExample {
  public form: any = {};
  public controls: any = {};

  constructor(formUtils: FormUtils) {
    const standardDescription = 'Toggle the checkbox below to toggle between an HTML description and a plain text description!';
    const htmlDescription = '<span><b>BOLD</b> description with a <a target="_blank" href="https://www.google.com">Google</a> Link</span>';

    const descriptionFunction = (API: FieldInteractionApi) => {
      console.log('[FieldInteractionDemo] - descriptionFunction'); // tslint:disable-line
      const activeValue = API.getActiveValue();

      if (activeValue) {
        API.setDescription('description', htmlDescription);
      } else {
        API.setDescription('description', standardDescription);
      }
    };

    // Required Field Interactions
    this.controls.descriptionControl = new TextBoxControl({
      type: 'text',
      key: 'description',
      label: 'Test',
      description: standardDescription,
    });
    this.controls.toggleControl = new CheckboxControl({
      key: 'toggle',
      label: 'Description has HTML?',
      interactions: [{ event: 'change', script: descriptionFunction }],
    });
    this.form = formUtils.toFormGroup([this.controls.descriptionControl, this.controls.toggleControl]);
  }
}
