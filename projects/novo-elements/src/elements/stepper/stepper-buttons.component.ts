import { CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';
import { Directive } from '@angular/core';

/** Button that moves to the next step in a stepper workflow. */
@Directive({
  selector: 'button[novoStepperNext],novo-button[novoStepperNext]',
  host: {
    class: 'novo-stepper-next',
    '[type]': 'type',
  },
  inputs: ['type'],
})
export class NovoStepperNext extends CdkStepperNext {}

/** Button that moves to the previous step in a stepper workflow. */
@Directive({
  selector: 'button[novoStepperPrevious],novo-button[novoStepperPrevious]',
  host: {
    class: 'novo-stepper-previous',
    '[type]': 'type',
  },
  inputs: ['type'],
})
export class NovoStepperPrevious extends CdkStepperPrevious {}
