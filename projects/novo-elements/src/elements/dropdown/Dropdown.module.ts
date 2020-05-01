// NG2
import { NgModule } from '@angular/core';
// APP
import { NovoDropdownElement, NovoItemElement, NovoDropDownItemHeaderElement, NovoDropdownListElement } from './Dropdown';
import { NovoOverlayModule } from '../overlay/Overlay.module';

@NgModule({
  imports: [NovoOverlayModule],
  declarations: [NovoDropdownElement, NovoItemElement, NovoDropdownListElement, NovoDropDownItemHeaderElement],
  exports: [NovoDropdownElement, NovoItemElement, NovoDropdownListElement, NovoDropDownItemHeaderElement],
})
export class NovoDropdownModule { }
