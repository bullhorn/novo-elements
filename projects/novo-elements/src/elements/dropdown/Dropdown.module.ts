// NG2
import { NgModule } from '@angular/core';
import { NovoOptionModule } from '../common';
import { NovoOverlayModule } from '../common/overlay/Overlay.module';
// APP
import { NovoDropdownElement, NovoDropDownItemHeaderElement, NovoDropdownListElement, NovoItemElement } from './Dropdown';

@NgModule({
  imports: [NovoOverlayModule, NovoOptionModule],
  declarations: [NovoDropdownElement, NovoItemElement, NovoDropdownListElement, NovoDropDownItemHeaderElement],
  exports: [NovoDropdownElement, NovoItemElement, NovoDropdownListElement, NovoDropDownItemHeaderElement],
})
export class NovoDropdownModule {}
