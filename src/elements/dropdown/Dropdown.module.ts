// NG2
import { NgModule } from '@angular/core';
// APP
import { NovoDropdownElement, NovoItemElement, NovoListElement } from './Dropdown';

@NgModule({
    declarations: [NovoDropdownElement, NovoItemElement, NovoListElement],
    exports: [NovoDropdownElement, NovoItemElement, NovoListElement]
})
export class NovoDropdownModule {
}
