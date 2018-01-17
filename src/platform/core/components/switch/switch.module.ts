// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// APP
import { NovoSwitchComponent } from './switch.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NovoSwitchComponent],
  exports: [NovoSwitchComponent],
})
export class NovoSwitchModule {}
