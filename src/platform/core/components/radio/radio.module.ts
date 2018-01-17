// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoButtonModule } from './../button/button.module';

// APP
import { NovoRadioComponent, NovoRadioGroupComponent } from './radio.component';

@NgModule({
  imports: [CommonModule, NovoButtonModule],
  declarations: [NovoRadioComponent, NovoRadioGroupComponent],
  exports: [NovoRadioComponent, NovoRadioGroupComponent],
})
export class NovoRadioModule {}
