// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoFileInputElement } from './file/file-input';
import { NovoAddressElement } from './address/address';
import { NovoTooltipModule } from 'novo-elements/components/tooltip';
import { NovoSelectModule } from 'novo-elements/components/select';
import { NovoPickerModule } from 'novo-elements/components/picker';
import { NovoLoadingModule } from 'novo-elements/components/loading';
import { NovoDragulaModule } from 'novo-elements/addons/dragula';
import { NovoCheckboxModule } from 'novo-elements/components/checkbox';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoPipesModule } from 'novo-elements/pipes';

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
