/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { PortalModule } from '@angular/cdk/portal';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NovoButtonModule } from '../button/Button.module';
import { NovoIconModule } from '../icon/Icon.module';
import { NovoStepHeader } from './step-header.component';
import { NovoStepLabel } from './step-label.component';
import { NovoStepStatus } from './step-status.component';
// import {NovoStepperNext, NovoStepperPrevious} from './stepper-bxutton';
import { NovoHorizontalStepper, NovoStep, NovoStepper, NovoVerticalStepper } from './stepper.component';


@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    NovoButtonModule,
    CdkStepperModule,
    NovoIconModule,
    A11yModule,
  ],
  exports: [
    NovoHorizontalStepper,
    NovoVerticalStepper,
    NovoStep,
    NovoStepLabel,
    NovoStepper,
    // NovoStepperNext,
    // NovoStepperPrevious,
    NovoStepHeader,
    NovoStepStatus,
  ],
  declarations: [
    NovoHorizontalStepper,
    NovoVerticalStepper,
    NovoStep,
    NovoStepLabel,
    NovoStepper,
    // NovoStepperNext,
    // NovoStepperPrevious,
    NovoStepHeader,
    NovoStepStatus,
  ]
})
export class NovoStepperModule { }
