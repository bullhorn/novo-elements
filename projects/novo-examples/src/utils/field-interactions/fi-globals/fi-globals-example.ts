import { Component } from '@angular/core';
// Vendor
import { FormUtils, TextBoxControl, FieldInteractionApi } from 'novo-elements';

/**
 * @title Fi Globals Example
 */
@Component({
  selector: 'fi-globals-example',
  templateUrl: 'fi-globals-example.html',
  styleUrls: ['fi-globals-example.css'],
})
export class FiGlobalsExample {
  public form: any = {};
  public controls: any = {};

  constructor(private formUtils: FormUtils) {
    let globalsFunction = (API: FieldInteractionApi) => {
      console.log('[FieldInteractionDemo] - globalsFunction'); // tslint:disable-line
      API.setProperty(API.getActiveKey(), 'label', `${API.getProperty(API.getActiveKey(), 'label')} -- ${API.globals.TEST}`);
    };

    // Global Field Interactions
    this.controls.globalControl = new TextBoxControl({
      type: 'number',
      key: 'global',
      value: 5,
      label: 'Form Input',
      description: 'The label gets updated on load to use a global!',
      interactions: [{ event: 'init', script: globalsFunction, invokeOnInit: true }],
    });
    this.form = formUtils.toFormGroup([this.controls.globalControl]);
  }
}
