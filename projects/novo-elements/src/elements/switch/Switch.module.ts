import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoIconModule } from '../icon';
import { NovoSwitchElement } from './Switch';

@NgModule({
  imports: [CommonModule, FormsModule, NovoIconModule],
  declarations: [NovoSwitchElement],
  exports: [NovoSwitchElement],
})
export class NovoSwitchModule {}
