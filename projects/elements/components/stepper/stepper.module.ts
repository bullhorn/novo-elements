import { A11yModule } from '@angular/cdk/a11y';
import { PortalModule } from '@angular/cdk/portal';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoHorizontalStepper, NovoStep, NovoStepper, NovoVerticalStepper } from './stepper.component';
import { NovoStepperNext, NovoStepperPrevious } from './stepper-buttons.component';
import { NovoStepStatus } from './step-status.component';
import { NovoStepLabel } from './step-label.component';
import { NovoStepHeader } from './step-header.component';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoButtonModule } from 'novo-elements/components/button';
@NgModule({
  imports: [CommonModule, PortalModule, NovoButtonModule, CdkStepperModule, NovoIconModule, A11yModule],
  exports: [
    NovoHorizontalStepper,
    NovoVerticalStepper,
    NovoStep,
    NovoStepLabel,
    NovoStepper,
    NovoStepHeader,
    NovoStepStatus,
    NovoStepperNext,
    NovoStepperPrevious,
  ],
  declarations: [
    NovoHorizontalStepper,
    NovoVerticalStepper,
    NovoStep,
    NovoStepLabel,
    NovoStepper,
    NovoStepHeader,
    NovoStepStatus,
    NovoStepperNext,
    NovoStepperPrevious,
  ],
})
export class NovoStepperModule {}
