import { ChangeDetectionStrategy, Component, forwardRef, Inject, Input } from '@angular/core';
import { NovoStepHeader } from './step-header.component';
import { NovoStepper } from './stepper.component';

@Component({
  selector: 'novo-step-status',
  templateUrl: 'step-status.component.html',
  // encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'novo-step-status',
  },
})
export class NovoStepStatus {
  @Input()
  state: string;

  constructor(
    @Inject(forwardRef(() => NovoStepper)) stepper: NovoStepper,
    @Inject(forwardRef(() => NovoStepHeader)) step: NovoStepHeader,
  ) {}
}
