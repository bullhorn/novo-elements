import { Component, Input } from '@angular/core';
import { FormUtils } from 'novo-elements';
import { MockMeta, MockMetaHeaders } from '../MockMeta';

/**
 * @title Dynamic Form Field Sets Example
 */
@Component({
  selector: 'dynamic-form-field-sets-example',
  templateUrl: 'dynamic-form-field-sets-example.html',
  styleUrls: ['dynamic-form-field-sets-example.css'],
})
export class DynamicFormFieldSetsExample {
  public dynamic: any;
  public dynamicForm: any;
  public fieldsets: Array<any>;
  public fieldsetsForm: any;

  constructor(private formUtils: FormUtils) {
    // Dynamic
    this.dynamic = formUtils.toFieldSets(
      MockMeta,
      '$ USD',
      {},
      { token: 'TOKEN', military: true },
      {
        customfield: {
          template: 'custom-demo-component',
        },
      },
    );
    formUtils.setInitialValuesFieldsets(this.dynamic, { firstName: 'Initial F Name', number: 12 });
    this.dynamicForm = formUtils.toFormGroupFromFieldset(this.dynamic);

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
    this.dynamic.forEach((control) => {
      control.forceClear.emit();
    });
  }

  onChange(value) {
    console.log('I changed!', value); // tslint:disable-line
  }
}
