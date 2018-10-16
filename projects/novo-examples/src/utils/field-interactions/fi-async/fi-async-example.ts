import { Component } from '@angular/core';
import { FormUtils, TextBoxControl, FieldInteractionApi } from 'novo-elements';
import { map } from 'rxjs/operators';
import { MockMetaHeaders } from '../MockMeta';

/**
 * @title Fi Async Example
 */
@Component({
  selector: 'fi-async-example',
  templateUrl: 'fi-async-example.html',
  styleUrls: ['fi-async-example.css'],
})
export class FiAsyncExample {
  public form: any;
  public controls: any = {};

  constructor(private formUtils: FormUtils) {
    let asyncFunction = (API: FieldInteractionApi) => {
      console.log('[FieldInteractionDemo] - asyncFunction'); // tslint:disable-line
      if (API.getActiveKey() === 'async1') {
        API.setLoading(API.getActiveKey(), true);
        setTimeout(function() {
          API.setLoading(API.getActiveKey(), false);
        }, 3000);
      } else {
        API.setLoading(API.getActiveKey(), true);
        setTimeout(function() {
          API.setLoading(API.getActiveKey(), false);
        }, 15000);
      }
    };

    // Async Interactions
    this.controls.async1Control = new TextBoxControl({
      type: 'text',
      key: 'async1',
      value: 5,
      label: 'Async Validation',
      description: 'As you finish typing, the async check will mark the form as invalid',
      interactions: [{ event: 'change', script: asyncFunction }],
    });
    this.controls.async2Control = new TextBoxControl({
      type: 'text',
      key: 'async2',
      value: 5,
      label: 'Async Validation (takes too long)',
      description: 'This one will take too long and trigger the default timeout (10s)',
      interactions: [{ event: 'change', script: asyncFunction }],
    });
    this.form = formUtils.toFormGroup([this.controls.async1Control, this.controls.async2Control]);
  }
}
