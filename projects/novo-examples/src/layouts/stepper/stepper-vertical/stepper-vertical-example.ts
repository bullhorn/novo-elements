import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoStep, NovoVerticalStepper } from 'novo-elements';

/**
 * @title Stepper w/ Vertical Layout
 */
@Component({
  selector: 'stepper-vertical-example',
  templateUrl: 'stepper-vertical-example.html',
  styleUrls: ['stepper-vertical-example.css'],
})
export class StepperVerticalExample implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  next(stepper: NovoVerticalStepper, step: NovoStep) {
    step.editable = false;
    stepper.next();
  }
}
