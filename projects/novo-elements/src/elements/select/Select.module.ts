// NG
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// App
import { NovoOverlayModule } from '../overlay/Overlay.module';
import { NovoSelectElement } from './Select';

@NgModule({
  imports: [CommonModule, FormsModule, A11yModule, NovoOverlayModule],
  declarations: [NovoSelectElement],
  exports: [NovoSelectElement],
})
export class NovoSelectModule {}
