// NG2
import { NgModule } from '@angular/core';
// APP
import { NovoDropdownElement, NovoItemElement } from './Dropdown';

@NgModule({
    declarations: [NovoDropdownElement, NovoItemElement],
    exports: [NovoDropdownElement, NovoItemElement]
})
export class NovoDropdownModule {
}
