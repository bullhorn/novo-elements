import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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

  constructor() {}
}
