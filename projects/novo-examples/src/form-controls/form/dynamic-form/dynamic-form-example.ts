import { Component, Input } from '@angular/core';
import { FormUtils } from 'novo-elements';
import { MockMeta, MockMetaHeaders } from '../MockMeta';

/**
 * @title Dynamic Form Example
 */
@Component({
  selector: 'dynamic-form-example',
  templateUrl: 'dynamic-form-example.html',
  styleUrls: ['dynamic-form-example.css'],
})
export class DynamicFormExample {
  public dynamic: any;
  public dynamicForm: any;

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
