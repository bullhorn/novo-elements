// NG2
import { NgModule } from '@angular/core';
// APP
import { NovoDropdownElement, NovoItemElement, NovoListElement, NovoDropdownContainer, NovoItemHeaderElement } from './Dropdown';

@NgModule({
    declarations: [NovoDropdownElement, NovoItemElement, NovoListElement, NovoDropdownContainer, NovoItemHeaderElement],
    exports: [NovoDropdownElement, NovoItemElement, NovoListElement, NovoDropdownContainer, NovoItemHeaderElement]
})
export class NovoDropdownModule {
}
