import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NovoHorizontalStepper, NovoStep } from 'novo-elements';

/**
 * @title Basic Stepper Component
 */
@Component({
    selector: 'stepper-horizontal-example',
    templateUrl: 'stepper-horizontal-example.html',
    styleUrls: ['stepper-horizontal-example.css'],
    standalone: false
})
export class StepperHorizontalExample implements OnInit {
  isLinear = true;
  firstFormGroup: UntypedFormGroup;
  secondFormGroup: UntypedFormGroup;

  constructor(private _formBuilder: UntypedFormBuilder) {}

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
