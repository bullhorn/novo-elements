/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { CdkStep, CdkStepper } from '@angular/cdk/stepper';
import { Directionality } from '@angular/cdk/bidi';
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
  SkipSelf,
  ViewChildren,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Optional,
  TemplateRef,
  Input,
} from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
// import { ErrorStateMatcher } from '@angular/material/core';
import { NovoStepHeader } from './step-header.component';
import { NovoStepLabel } from './step-label.component';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { novoStepperAnimations } from './stepper.animations';
import { NovoIconComponent } from '../icon/Icon';

/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _NovoStep = CdkStep;
export const _NovoStepper = CdkStepper;

@Component({
  selector: 'novo-step',
  templateUrl: 'step.component.html',
  // encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoStep extends CdkStep {
  /** Content for step label given by `<ng-template matStepLabel>`. */
  @ContentChild(NovoStepLabel) stepLabel: NovoStepLabel;

  @Input() theme: string;
  @Input() color: string;
  @Input() icon: string;

  constructor(@Inject(forwardRef(() => NovoStepper)) stepper: NovoStepper) {
    super(stepper);
  }
}


@Directive({
  selector: '[novoStepper]'
})
export class NovoStepper extends CdkStepper implements AfterContentInit {
  /** The list of step headers of the steps in the stepper. */
  @ViewChildren(NovoStepHeader, { read: ElementRef }) _stepHeader: QueryList<ElementRef>;

  /** Steps that the stepper holds. */
  @ContentChildren(NovoStep) _steps: QueryList<NovoStep>;

  /** Custom icon overrides passed in by the consumer. */
  @ContentChildren(NovoIconComponent) _icons: QueryList<NovoIconComponent>;

  /** Consumer-specified template-refs to be used to override the header icons. */
  _iconOverrides: { [key: string]: TemplateRef<any> } = {};

  get completed():boolean {
    try {
      let steps = this._steps.toArray();
      let length = steps.length-1;
      return steps[length].completed && length === this.selectedIndex ;
    } catch (err) {
      return false
    }
  }

  ngAfterContentInit() {
    const icons = this._icons.toArray();
    const editOverride = icons.find(icon => icon.name === 'edit');
    const doneOverride = icons.find(icon => icon.name === 'done');
  
    // if (editOverride) {
    //   this._iconOverrides.edit = editOverride.templateRef;
    // }

    // if (doneOverride) {
    //   this._iconOverrides.done = doneOverride.templateRef;
    // }

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
    if( index === this.selectedIndex ) {
      if(steps[index] && index===steps.length-1 && steps[index].completed ) {
        return 'done';
      }
      return 'edit'
    }
    if( index < this.selectedIndex ) {
      return 'done'
    }
    return 'none';
  }

}

@Component({
  selector: 'novo-horizontal-stepper',
  templateUrl: 'stepper-horizontal.html',
  styleUrls: ['stepper.component.scss'],
  host: {
    'class': 'novo-stepper-horizontal',
    'aria-orientation': 'horizontal',
    'role': 'tablist',
  },
  animations: [novoStepperAnimations.horizontalStepTransition],
  providers: [{ provide: NovoStepper, useExisting: NovoHorizontalStepper }],
  // encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoHorizontalStepper extends NovoStepper { 
  @Input() selectedIndex: number;
}

@Component({
  selector: 'novo-vertical-stepper',
  templateUrl: 'stepper-vertical.html',
  styleUrls: ['stepper.component.scss'],
  host: {
    'class': 'novo-stepper-vertical',
    'aria-orientation': 'vertical',
    'role': 'tablist',
  },
  animations: [novoStepperAnimations.verticalStepTransition],
  providers: [{ provide: NovoStepper, useExisting: NovoVerticalStepper }],
  // encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoVerticalStepper extends NovoStepper {
  @Input() selectedIndex: number;

  constructor(@Optional() dir: Directionality, changeDetectorRef: ChangeDetectorRef) {
    super(dir, changeDetectorRef);
    this._orientation = 'vertical';
  }
}
