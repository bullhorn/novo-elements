import { CdkStepLabel } from '@angular/cdk/stepper';
import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[novoStepLabel]',
})
export class NovoStepLabel extends CdkStepLabel {
  constructor(template: TemplateRef<any>) {
    super(template);
  }
}
