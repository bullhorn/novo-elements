// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// APP
import { NovoSwitchElement } from './Switch';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NovoSwitchElement],
  exports: [NovoSwitchElement],
})
export class NovoSwitchModule {}
