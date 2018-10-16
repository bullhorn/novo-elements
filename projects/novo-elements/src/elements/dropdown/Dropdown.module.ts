// NG2
import { NgModule } from '@angular/core';
// APP
import { NovoDropdownElement, NovoItemElement, NovoItemHeaderElement, NovoListElement } from './Dropdown';
import { NovoOverlayModule } from '../overlay/Overlay.module';

@NgModule({
  imports: [NovoOverlayModule],
  declarations: [NovoDropdownElement, NovoItemElement, NovoListElement, NovoItemHeaderElement],
  exports: [NovoDropdownElement, NovoItemElement, NovoListElement, NovoItemHeaderElement],
})
export class NovoDropdownModule {}
