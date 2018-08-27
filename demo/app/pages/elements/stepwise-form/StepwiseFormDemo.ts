// NG2
import { Component, Input, OnInit } from '@angular/core';
// APP
let StepwiseFormDemoTpl = require('./templates/StepwiseForm.html');
// Vendor
import {
  FormUtils,
  TextBoxControl,
  CheckboxControl,
  CheckListControl,
  FileControl,
  QuickNoteControl,
  TilesControl,
  DateControl,
  TimeControl,
  DateTimeControl,
  PickerControl,
  EntityPickerResult,
  EntityPickerResults,
} from 'novo-elements';

const template = `
<div class="container">
    <h1>Form Workflows <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/form">(source)</a></small></h1>
    <p>Forms use inputs and labels to submit user content. But you already knew that. What you may not know is that you can make form worflows.</p>

    <h2>Stepwise Form</h2>
    <div class="example form-demo stepwise">${StepwiseFormDemoTpl}</div>
    <code-snippet [code]="StepwiseFormDemoTpl"></code-snippet>
</div>
`;

@Component({
  selector: 'form-workflow-demo',
  template: template,
})
export class FormWorkflowDemoComponent implements OnInit {
  private StepwiseFormDemoTpl: string = StepwiseFormDemoTpl;
  stepwiseFormConfig: any; // TODO: use interfrace
  constructor(private formUtils: FormUtils) {}

  ngOnInit() {
    this.stepwiseFormConfig = {
      steps: [
        {
          title: 'what',
          icon: 'bot',
          controls: [],
        },
        {
          title: 'when',
          icon: 'next',
          controls: [],
        },
      ],
    };
  }

  isValidStep(stepNumber: number) {
    return true;
  }

  nextStep(stepwiseForm) {
    stepwiseForm.goToNextStep();
  }
}
