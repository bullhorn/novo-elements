// NG
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoButtonModule } from '../button';
import { NovoOptionModule } from '../common';
import { NovoOverlayModule } from '../common/overlay';
import { NovoDividerModule } from '../divider';
import { NovoSelectElement } from './Select';

@NgModule({
  imports: [CommonModule, FormsModule, A11yModule, NovoOverlayModule, NovoOptionModule, NovoDividerModule, NovoButtonModule],
  declarations: [NovoSelectElement],
  exports: [NovoSelectElement],
})
export class NovoSelectModule {}
