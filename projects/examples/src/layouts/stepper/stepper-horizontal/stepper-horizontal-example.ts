import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoHorizontalStepper, NovoStep } from 'novo-elements';

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

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  next(stepper: NovoHorizontalStepper, step: NovoStep) {
    step.editable = false;
    stepper.next();
  }
}
