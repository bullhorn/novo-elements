// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoPipesModule } from './../../../pipes/Pipes.module';
// APP
import { NovoButtonModule } from './../../button/Button.module';
import { NovoDragulaModule } from './../../dragula/Dragula.module';
import { NovoLoadingModule } from './../../loading/Loading.module';
import { NovoPickerModule } from './../../picker/Picker.module';
import { NovoSelectModule } from './../../select/Select.module';
import { NovoTooltipModule } from './../../tooltip/Tooltip.module';
import { NovoAddressElement } from './address/Address';
import { NovoCheckboxElement } from './checkbox/Checkbox';
import { NovoCheckListElement } from './checkbox/CheckList';
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
  ],
  declarations: [NovoAddressElement, NovoCheckboxElement, NovoCheckListElement, NovoFileInputElement],
  exports: [NovoAddressElement, NovoCheckboxElement, NovoCheckListElement, NovoFileInputElement],
})
export class NovoFormExtrasModule {}
