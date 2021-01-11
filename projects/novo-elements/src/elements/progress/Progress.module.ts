// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoProgressElement } from './Progress';
import { NovoProgressBarElement } from './ProgressBar';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoProgressBarElement, NovoProgressElement],
  exports: [NovoProgressBarElement, NovoProgressElement],
})
export class NovoProgressModule {}
