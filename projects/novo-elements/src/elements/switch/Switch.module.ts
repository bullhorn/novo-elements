// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// APP
import { NovoSwitchElement } from './Switch';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NovoSwitchElement],
  exports: [NovoSwitchElement],
})
export class NovoSwitchModule {}
