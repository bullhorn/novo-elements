import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoPseudoCheckboxModule } from '../selection/index';
import { NovoOptgroup } from './optgroup.component';
import { NovoOption } from './option.component';

@NgModule({
  imports: [CommonModule, NovoPseudoCheckboxModule],
  exports: [NovoOption, NovoOptgroup],
  declarations: [NovoOption, NovoOptgroup],
})
export class NovoOptionModule {}

export * from './optgroup.component';
export * from './option-parent';
export * from './option.component';
