import { CdkStep, CdkStepper } from '@angular/cdk/stepper';
import { Directionality } from '@angular/cdk/bidi';
import { FocusableOption } from '@angular/cdk/a11y';
import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  forwardRef,
  Inject,
  QueryList,
  ViewChildren,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Optional,
  TemplateRef,
  Input,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { NovoStepHeader } from './step-header.component';
import { NovoStepLabel } from './step-label.component';
import { novoStepperAnimations } from './stepper.animations';
import { NovoIconComponent } from '../icon/Icon';

export const _NovoStep = CdkStep;
export const _NovoStepper = CdkStepper;

@Component({
  selector: 'novo-step',
  templateUrl: 'step.component.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
})
export class NovoStepper extends CdkStepper implements AfterContentInit {
  /** The list of step headers of the steps in the stepper. */
  @ViewChildren(NovoStepHeader)
  _stepHeader: QueryList<FocusableOption>;

  /** Steps that the stepper holds. */
  @ContentChildren(NovoStep)
  _steps: QueryList<NovoStep>;

  /** Custom icon overrides passed in by the consumer. */
  @ContentChildren(NovoIconComponent)
  _icons: QueryList<NovoIconComponent>;

  /** Consumer-specified template-refs to be used to override the header icons. */
  _iconOverrides: { [key: string]: TemplateRef<any> } = {};

  get completed(): boolean {
    try {
      let steps = this._steps.toArray();
      let length = steps.length - 1;
      return steps[length].completed && length === this.selectedIndex;
    } catch (err) {
      return false;
    }
  }

  ngAfterContentInit() {
    // Mark the component for change detection whenever the content children query changes
    this._steps.changes.pipe(takeUntil(this._destroyed)).subscribe(() => this._stateChanged());
  }

  complete() {
    try {
      let steps = this._steps.toArray();
      steps[this.selectedIndex].completed = true;
      this.next();
      this._stateChanged();
    } catch (err) {
      // do nothing
    }
  }

  getIndicatorType(index: number): 'none' | '' | 'edit' | 'done' {
    let steps = this._steps.toArray();
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
  templateUrl: 'stepper-horizontal.html',
  styleUrls: ['stepper.component.scss'],
  host: {
    class: 'novo-stepper-horizontal',
    'aria-orientation': 'horizontal',
    role: 'tablist',
  },
  animations: [novoStepperAnimations.horizontalStepTransition],
  providers: [{ provide: NovoStepper, useExisting: NovoHorizontalStepper }],
  // encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoHorizontalStepper extends NovoStepper {
  @Input()
  selectedIndex: number;
}

@Component({
  selector: 'novo-vertical-stepper',
  templateUrl: 'stepper-vertical.html',
  styleUrls: ['stepper.component.scss'],
  host: {
    class: 'novo-stepper-vertical',
    'aria-orientation': 'vertical',
    role: 'tablist',
  },
  animations: [novoStepperAnimations.verticalStepTransition],
  providers: [{ provide: NovoStepper, useExisting: NovoVerticalStepper }],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoVerticalStepper extends NovoStepper {
  @Input()
  selectedIndex: number;

  constructor(@Optional() dir: Directionality, changeDetectorRef: ChangeDetectorRef) {
    super(dir, changeDetectorRef);
    this._orientation = 'vertical';
  }
}
