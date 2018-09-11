import { Component, Input } from '@angular/core';

// Vendor
import { FormUtils, TextBoxControl, CheckboxControl, FileControl, PickerControl } from 'novo-elements';

/**
 * @title Updating Form Example
 */
@Component({
  selector: 'updating-form-example',
  templateUrl: 'updating-form-example.html',
  styleUrls: ['updating-form-example.css'],
})
export class UpdatingFormExample {
  public textControl: any;
  public percentageControl: any;
  public checkControl: any;
  public fileControl: any;
  public singlePickerControl: any;
  public updatingForm: any;
  public updatingFormControls: any[];
  public required: boolean = false;
  public disabled: boolean = true;

  constructor(private formUtils: FormUtils) {
    // Text-based Controls
    this.textControl = new TextBoxControl({
      key: 'text',
      label: 'Text Box',
      tooltip: 'Textbox',
      readOnly: true,
      value: 'HI',
      required: true,
    });
    this.percentageControl = new TextBoxControl({
      type: 'percentage',
      key: 'percentage',
      tooltip: 'Percent',
      label: 'Percent',
      required: true,
    });

    // Check box controls
    this.checkControl = new CheckboxControl({ key: 'check', tooltip: 'Checkbox', label: 'Checkbox', checkboxLabel: 'Checkbox' });

    // Picker controls
    this.singlePickerControl = new PickerControl({
      key: 'singlePicker',
      tooltip: 'Single',
      label: 'Single',
      config: { options: ['One', 'Two', 'Three'] },
    });
    // File input controls
    this.fileControl = new FileControl({ key: 'file', name: 'myfile', label: 'File', tooltip: 'Files Control' });

    // Updating form
    this.updatingFormControls = [this.textControl, this.percentageControl, this.checkControl, this.singlePickerControl, this.fileControl];
    this.updatingForm = formUtils.toFormGroup(this.updatingFormControls);
  }

  toggleEnabled() {
    this.disabled = !this.disabled;
    Object.keys(this.updatingForm.controls).forEach((key) => {
      if (this.disabled) {
        this.updatingForm.controls[key].enable();
      } else {
        this.updatingForm.controls[key].disable();
      }
    });
  }

  toggleRequired() {
    this.required = !this.required;
    Object.keys(this.updatingForm.controls).forEach((key) => {
      this.updatingForm.controls[key].setRequired(this.required);
    });
  }

  markAsInvalid() {
    Object.keys(this.updatingForm.controls).forEach((key) => {
      this.updatingForm.controls[key].markAsInvalid('Custom Error!');
    });
  }
}
