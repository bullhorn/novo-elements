// NG2
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// APP
let HorizontalStepperDemoTpl = require('./templates/HorizontalStepper.html');
let VerticalStepperDemoTpl = require('./templates/VerticalStepper.html');

const template = `
<div class="container">
    <h1>Steppers <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/slides">(source)</a></small></h1>
    <p>Stepper element to toggle some information</p>

    <h5>Horizontal</h5>
    <div class="example slides-demo">${HorizontalStepperDemoTpl}</div>
    <code-snippet [code]="HorizontalStepperDemoTpl"></code-snippet>
    
    <h5>Vertical</h5>
    <div class="example slides-demo">${VerticalStepperDemoTpl}</div>
    <code-snippet [code]="VerticalStepperDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'stepper-demo',
    template: template
})
export class StepperDemoComponent implements OnInit {
    private HorizontalStepperDemoTpl: string = HorizontalStepperDemoTpl;
    private VerticalStepperDemoTpl: string = VerticalStepperDemoTpl;
    isLinear = true;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    constructor(private _formBuilder: FormBuilder) { }

    public ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
    }

    public next(stepper, step) {
        // step.editable = false;
        stepper.next();
    }
}
