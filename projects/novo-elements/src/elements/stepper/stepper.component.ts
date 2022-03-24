import { Directionality } from '@angular/cdk/bidi';
import { CdkStep, CdkStepHeader, CdkStepper } from '@angular/cdk/stepper';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  forwardRef,
  Inject,
  Input,
  Optional,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NovoIconComponent } from '../icon/Icon';
import { NovoStepHeader } from './step-header.component';
import { NovoStepLabel } from './step-label.component';
import { novoStepperAnimations } from './stepper.animations';

@Component({
  selector: 'novo-step',
  templateUrl: 'step.component.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: CdkStep, useExisting: NovoStep }],
})
export class NovoStep extends CdkStep {
  /** Content for step label given by `<ng-template novoStepLabel>`. */
  @ContentChild(NovoStepLabel)
  stepLabel: NovoStepLabel;

  @Input()
  theme: string;
  @Input()
  color: string;
  @Input()
  icon: string;

  constructor(@Inject(forwardRef(() => NovoStepper)) stepper: CdkStepper) {
    super(stepper);
  }
}

@Directive({
  selector: '[novoStepper]',
  providers: [
    { provide: CdkStep, useExisting: NovoStep },
    { provide: CdkStepper, useExisting: NovoStepper },
  ],
})
export class NovoStepper extends CdkStepper implements AfterContentInit {
  /** The list of step headers of the steps in the stepper. */
  @ViewChildren(NovoStepHeader)
  _stepHeader: QueryList<CdkStepHeader>;

  /** Steps that the stepper holds. */
  @ContentChildren(NovoStep, { descendants: true })
  steps: QueryList<NovoStep>;

  /** Custom icon overrides passed in by the consumer. */
  @ContentChildren(NovoIconComponent)
  _icons: QueryList<NovoIconComponent>;

  /** Consumer-specified template-refs to be used to override the header icons. */
  _iconOverrides: { [key: string]: TemplateRef<any> } = {};

  get completed(): boolean {
    try {
      const steps = this.steps.toArray();
      const length = steps.length - 1;
      return steps[length].completed && length === this.selectedIndex;
    } catch (err) {
      return false;
    }
  }

  ngAfterContentInit() {
    // Mark the component for change detection whenever the content children query changes
    this.steps.changes.pipe(takeUntil(this._destroyed)).subscribe(() => this._stateChanged());
  }

  complete() {
    try {
      const steps = this.steps.toArray();
      steps[this.selectedIndex].completed = true;
      this.next();
      this._stateChanged();
    } catch (err) {
      // do nothing
    }
  }

  getIndicatorType(index: number): 'none' | '' | 'edit' | 'done' {
    const steps = this.steps.toArray();
    if (index === this.selectedIndex) {
      if (steps[index] && index === steps.length - 1 && steps[index].completed) {
        return 'done';
      }
      return 'edit';
    }
    if (index < this.selectedIndex) {
      return 'done';
    }
    return 'none';
  }
}

@Component({
  selector: 'novo-horizontal-stepper',
  exportAs: 'novoHorizontalStepper',
  templateUrl: 'stepper-horizontal.html',
  styleUrls: ['stepper.component.scss'],
  host: {
    class: 'novo-stepper-horizontal',
    'aria-orientation': 'horizontal',
    role: 'tablist',
  },
  animations: [novoStepperAnimations.horizontalStepTransition],
  providers: [
    { provide: NovoStepper, useExisting: NovoHorizontalStepper },
    { provide: CdkStepper, useExisting: NovoHorizontalStepper },
  ],
  // encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoHorizontalStepper extends NovoStepper {}

@Component({
  selector: 'novo-vertical-stepper',
  exportAs: 'novoVerticalStepper',
  templateUrl: 'stepper-vertical.html',
  styleUrls: ['stepper.component.scss'],
  host: {
    class: 'novo-stepper-vertical',
    'aria-orientation': 'vertical',
    role: 'tablist',
  },
  animations: [novoStepperAnimations.verticalStepTransition],
  providers: [
    { provide: NovoStepper, useExisting: NovoVerticalStepper },
    { provide: CdkStepper, useExisting: NovoVerticalStepper },
  ],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoVerticalStepper extends NovoStepper {
  constructor(@Optional() dir: Directionality, changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef) {
    super(dir, changeDetectorRef, elementRef, '');
    this._orientation = 'vertical';
  }
}
