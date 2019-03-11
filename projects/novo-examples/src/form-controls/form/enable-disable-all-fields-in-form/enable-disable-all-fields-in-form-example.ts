// NG
import { Component } from '@angular/core';
// Vendor
import { FormUtils } from 'novo-elements';
// App
import { MockMetaForForm } from '../MockMeta';

/**
 * @title Enable/Disable all Fields in Form Example
 */
@Component({
  selector: 'enable-disable-all-fields-in-form-example',
  templateUrl: 'enable-disable-all-fields-in-form-example.html',
  styleUrls: ['enable-disable-all-fields-in-form-example.css'],
})
export class EnableDisableAllFieldsInFormExample {
  public controls: any;
  public form: any;

  constructor(public formUtils: FormUtils) {
    // Updating form
    this.controls = formUtils.toFieldSets(
      MockMetaForForm,
      '$ USD',
      {},
      { token: 'TOKEN', military: true },
      {},
    );
    formUtils.setInitialValuesFieldsets(this.controls, {
      select: 'disabledValue',
    });
    this.form = formUtils.toFormGroupFromFieldset(this.controls);
  }

  public get buttonText(): string {
    return this.form.controls.textbox.readOnly ? 'Enable fields' : 'Disable fields';
  }

  public toggleEnableDisableAllFields(): void {
    if (this.form.controls.textbox.readOnly) {
      this.form.enableAllControls();
    } else {
      this.form.disableAllControls();
    }
  }
}
