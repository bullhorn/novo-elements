// NG2
import { NgModule } from '@angular/core';
import { NovoOverlayModule } from '../overlay/Overlay.module';
// APP
import { NovoDropdownElement, NovoDropDownItemHeaderElement, NovoDropdownListElement, NovoItemElement } from './Dropdown';

@NgModule({
  imports: [NovoOverlayModule],
  declarations: [NovoDropdownElement, NovoItemElement, NovoDropdownListElement, NovoDropDownItemHeaderElement],
  exports: [NovoDropdownElement, NovoItemElement, NovoDropdownListElement, NovoDropDownItemHeaderElement],
})
export class NovoDropdownModule {}
