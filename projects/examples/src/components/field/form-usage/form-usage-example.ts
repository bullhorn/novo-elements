import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * @title Form Usage Example
 */
@Component({
  selector: 'form-usage-example',
  templateUrl: 'form-usage-example.html',
  styleUrls: ['form-usage-example.css'],
})
export class FormUsageExample {
  options: FormGroup;
  numberControl = new FormControl(16, Validators.min(10));
  timeControl = new FormControl(new Date());
  dateControl = new FormControl(new Date());
  post: any = '';

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      number: this.numberControl,
      time: this.timeControl,
      date: this.dateControl,
    });
  }

  onSubmit(post: any) {
    this.post = post;
  }
}
