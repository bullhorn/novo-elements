import { Component, Input } from '@angular/core';
import { FormUtils } from 'novo-elements';
import { MockMeta, MockMetaHeaders } from '../MockMeta';

/**
 * @title Vertical Dynamic Form Example
 */
@Component({
  selector: 'vertical-dynamic-form-example',
  templateUrl: 'vertical-dynamic-form-example.html',
  styleUrls: ['vertical-dynamic-form-example.css'],
})
export class VerticalDynamicFormExample {
  public dynamicVertical: any;
  public dynamicVerticalForm: any;
  public fieldsets: Array<any>;
  public fieldsetsForm: any;

  constructor(private formUtils: FormUtils) {
    // Dynamic
    this.dynamicVertical = formUtils.toControls(MockMeta, '$ USD', {}, { token: 'TOKEN', military: true });
    formUtils.setInitialValues(this.dynamicVertical, { number: 0, firstName: 'Bobby Flay' });
    this.dynamicVerticalForm = formUtils.toFormGroup(this.dynamicVertical);
  }

  save(form) {
    if (!form.isValid) {
      form.showOnlyRequired(true);
    } else {
      alert('SAVING');
    }
  }
}
