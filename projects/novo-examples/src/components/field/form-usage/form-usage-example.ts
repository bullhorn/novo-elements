import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

/**
 * @title Form Usage Example
 */
@Component({
  selector: 'form-usage-example',
  templateUrl: 'form-usage-example.html',
  styleUrls: ['form-usage-example.css'],
})
export class FormUsageExample {
  options: UntypedFormGroup;
  numberControl = new UntypedFormControl(16, Validators.min(10));
  timeControl = new UntypedFormControl(new Date());
  dateControl = new UntypedFormControl(new Date());
  dateTimeControl = new UntypedFormControl(new Date());
  post: any = '';

  constructor(fb: UntypedFormBuilder) {
    this.options = fb.group({
      number: this.numberControl,
      time: this.timeControl,
      date: this.dateControl,
      dateTime: this.dateTimeControl,
    });
  }

  onSubmit(post: any) {
    this.post = post;
  }
}
