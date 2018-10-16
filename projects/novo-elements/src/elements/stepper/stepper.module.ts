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
import { NovoHorizontalStepper, NovoStep, NovoStepper, NovoVerticalStepper } from './stepper.component';

@NgModule({
  imports: [CommonModule, PortalModule, NovoButtonModule, CdkStepperModule, NovoIconModule, A11yModule],
  exports: [NovoHorizontalStepper, NovoVerticalStepper, NovoStep, NovoStepLabel, NovoStepper, NovoStepHeader, NovoStepStatus],
  declarations: [NovoHorizontalStepper, NovoVerticalStepper, NovoStep, NovoStepLabel, NovoStepper, NovoStepHeader, NovoStepStatus],
})
export class NovoStepperModule {}
