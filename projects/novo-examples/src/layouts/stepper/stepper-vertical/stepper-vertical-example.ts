import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NovoStep, NovoVerticalStepper } from 'novo-elements';

/**
 * @title Stepper w/ Vertical Layout
 */
@Component({
    selector: 'stepper-vertical-example',
    templateUrl: 'stepper-vertical-example.html',
    styleUrls: ['stepper-vertical-example.css'],
    standalone: false
})
export class StepperVerticalExample implements OnInit {
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

  next(stepper: NovoVerticalStepper, step: NovoStep) {
    step.editable = false;
    stepper.next();
  }
}
