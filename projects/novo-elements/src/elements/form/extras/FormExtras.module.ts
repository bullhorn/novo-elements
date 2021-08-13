// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoPipesModule } from './../../../pipes/Pipes.module';
import { NovoButtonModule } from './../../button/Button.module';
import { NovoCheckboxModule } from './../../checkbox';
import { NovoDragulaModule } from './../../dragula/Dragula.module';
import { NovoLoadingModule } from './../../loading/Loading.module';
import { NovoPickerModule } from './../../picker/Picker.module';
import { NovoSelectModule } from './../../select/Select.module';
import { NovoTooltipModule } from './../../tooltip/Tooltip.module';
import { NovoAddressElement } from './address/Address';
import { NovoFileInputElement } from './file/FileInput';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NovoPipesModule,
    NovoButtonModule,
    NovoSelectModule,
    NovoPickerModule,
    NovoLoadingModule,
    NovoDragulaModule,
    NovoTooltipModule,
    NovoCheckboxModule,
  ],
  declarations: [NovoAddressElement, NovoFileInputElement],
  exports: [NovoAddressElement, NovoFileInputElement],
})
export class NovoFormExtrasModule {}
