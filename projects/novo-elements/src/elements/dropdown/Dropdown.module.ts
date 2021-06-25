// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoDropdownElement, NovoItemElement, NovoDropDownItemHeaderElement, NovoDropdownListElement } from './Dropdown';
import { NovoOverlayModule } from '../overlay/Overlay.module';

@NgModule({
  imports: [NovoOverlayModule, CommonModule],
  declarations: [NovoDropdownElement, NovoItemElement, NovoDropdownListElement, NovoDropDownItemHeaderElement],
  exports: [NovoDropdownElement, NovoItemElement, NovoDropdownListElement, NovoDropDownItemHeaderElement],
})
export class NovoDropdownModule { }
