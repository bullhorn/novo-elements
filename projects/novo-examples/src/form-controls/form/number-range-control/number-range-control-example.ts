import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormUtils, NovoFormGroup } from 'novo-elements';

/**
 * @title Number Range Control Example
 */
@Component({
  selector: 'number-range-control-example',
  templateUrl: 'number-range-control-example.html',
  styleUrls: ['number-range-control-example.css'],
})
export class NumberRangeControlExample {
  public exampleForm: FormGroup;


  constructor(private formUtils: FormUtils) {
    this.exampleForm = new FormGroup({
      numberRangeControl1: new FormControl(),
      numberRangeControl2: new FormControl()
    })
    // this.exampleForm = this.formUtils.toFormGroup([this.numberRangeControl1, this.numberRangeControl2]);

  }

}

