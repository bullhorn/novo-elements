import { Directive, TemplateRef } from '@angular/core';
import { CdkStepLabel } from '@angular/cdk/stepper';

@Directive({
  selector: '[novoStepLabel]',
})
export class NovoStepLabel extends CdkStepLabel {
  constructor(template: TemplateRef<any>) {
    super(template);
  }
}
