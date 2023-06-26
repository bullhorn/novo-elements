// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoPipesModule } from 'novo-elements/pipes';
import { NovoDragulaModule } from 'novo-elements/addons/dragula';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoCheckboxModule } from 'novo-elements/elements/checkbox';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import { NovoPickerModule } from 'novo-elements/elements/picker';
import { NovoSelectModule } from 'novo-elements/elements/select';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
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
