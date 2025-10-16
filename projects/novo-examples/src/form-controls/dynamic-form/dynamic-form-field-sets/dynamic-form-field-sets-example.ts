import { Component } from '@angular/core';
import { FormUtils } from 'novo-elements';
import { MockMeta, MockMetaHeaders } from '../MockMeta';

/**
 * @title Dynamic Form Field Sets Example
 */
@Component({
    selector: 'dynamic-form-field-sets-example',
    templateUrl: 'dynamic-form-field-sets-example.html',
    styleUrls: ['dynamic-form-field-sets-example.css'],
    standalone: false
})
export class DynamicFormFieldSetsExample {
  public fieldsets: Array<any>;
  public fieldsetsForm: any;

  constructor(private formUtils: FormUtils) {
    // Dynamic + Fieldsets
    this.fieldsets = formUtils.toFieldSets(
      MockMetaHeaders,
      '$ USD',
      {},
      { token: 'TOKEN' },
      {
        customfield: {
          template: 'custom-demo-component',
        },
      },
    );
    formUtils.setInitialValuesFieldsets(this.fieldsets, { firstName: 'Initial F Name', number: 12 });
    this.fieldsetsForm = formUtils.toFormGroupFromFieldset(this.fieldsets);
  }

  save(form) {
    if (!form.isValid) {
      form.showOnlyRequired(true);
    } else {
      alert('SAVING');
    }
  }

  clear() {
    this.fieldsets.forEach((fieldset) => {
      fieldset.controls.forEach((control) => {
        control.forceClear.emit();
      });
    });
  }

  onChange(value) {
    console.log('I changed!', value); // tslint:disable-line
  }
}
