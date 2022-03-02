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
  public disabled: boolean = false;

  constructor(public formUtils: FormUtils) {
    // Updating form
    this.controls = formUtils.toFieldSets(MockMetaForForm, '$ USD', {}, { token: 'TOKEN', military: true }, {});
    formUtils.setInitialValuesFieldsets(this.controls, {
      select: 'disabledValue',
    });
    this.form = formUtils.toFormGroupFromFieldset(this.controls);
  }

  public toggleEnableDisableAllFields(): void {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.form.enableAllControls();
    } else {
      this.form.disableAllControls();
    }
  }
}
