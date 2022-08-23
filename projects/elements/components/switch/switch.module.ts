import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoSwitchElement } from './switch';
import { NovoIconModule } from 'novo-elements/components/icon';

@NgModule({
  imports: [CommonModule, FormsModule, NovoIconModule],
  declarations: [NovoSwitchElement],
  exports: [NovoSwitchElement],
})
export class NovoSwitchModule {}
