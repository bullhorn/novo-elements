// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoProgressBarElement } from './progress-bar';
import { NovoProgressElement } from './progress';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoProgressBarElement, NovoProgressElement],
  exports: [NovoProgressBarElement, NovoProgressElement],
})
export class NovoProgressModule {}
