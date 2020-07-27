// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoProgressElement } from './Progress';
import { NovoProgressBarElement } from './ProgressBar';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoProgressBarElement, NovoProgressElement],
  exports: [NovoProgressBarElement, NovoProgressElement],
})
export class NovoProgressModule {}
