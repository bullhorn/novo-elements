// NG2
import { NgModule } from '@angular/core';
// APP
import { NovoDropdownElement, NovoItemElement, NovoListElement, NovoDropdownContainer } from './Dropdown';

@NgModule({
    declarations: [NovoDropdownElement, NovoItemElement, NovoListElement, NovoDropdownContainer],
    exports: [NovoDropdownElement, NovoItemElement, NovoListElement, NovoDropdownContainer]
})
export class NovoDropdownModule {
}
