// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// APP
import { NovoButtonModule } from './../../button/Button.module';
import { NovoSelectModule } from './../../select/Select.module';
import { NovoLoadingModule } from './../../loading/Loading.module';
import { NovoTabModule } from './../../tabs/Tabs.module';
import { NovoPipesModule } from './../../../pipes/Pipes.module';
import { NovoDragulaModule } from './../../dragula/Dragula.module';
import { NovoAddressElement } from './address/Address';
import { NovoCheckboxElement } from './checkbox/Checkbox';
import { NovoCheckListElement } from './checkbox/CheckList';
import { NovoFileInputElement } from './file/FileInput';

@NgModule({
    imports: [CommonModule, FormsModule, NovoPipesModule, NovoButtonModule, NovoSelectModule, NovoTabModule, NovoLoadingModule, NovoDragulaModule],
    declarations: [NovoAddressElement, NovoCheckboxElement, NovoCheckListElement, NovoFileInputElement],
    exports: [NovoAddressElement, NovoCheckboxElement, NovoCheckListElement, NovoFileInputElement]
})
export class NovoFormExtrasModule {
}
