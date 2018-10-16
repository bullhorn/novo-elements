import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * @title Basic Stepper Component
 */
@Component({
  selector: 'stepper-horizontal-example',
  templateUrl: 'stepper-horizontal-example.html',
  styleUrls: ['stepper-horizontal-example.css'],
})
export class StepperHorizontalExample implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  public ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  public next(stepper, step) {
    // step.editable = false;
    stepper.next();
  }
}
