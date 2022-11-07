// NG2
import { NgModule } from '@angular/core';
import {
  NovoDropdownElement,
  NovoDropDownItemHeaderElement,
  NovoDropdownListElement,
  NovoDropDownTrigger,
  NovoItemElement,
} from './dropdown';
import { NovoOverlayModule } from 'novo-elements/common/overlay';
import { NovoOptionModule } from 'novo-elements/common';

@NgModule({
  imports: [NovoOverlayModule, NovoOptionModule],
  declarations: [NovoDropdownElement, NovoItemElement, NovoDropdownListElement, NovoDropDownItemHeaderElement, NovoDropDownTrigger],
  exports: [NovoDropdownElement, NovoItemElement, NovoDropdownListElement, NovoDropDownItemHeaderElement, NovoDropDownTrigger],
})
export class NovoDropdownModule {}
