// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import {
  NovoNavElement,
  NovoTabElement,
  NovoTabButtonElement,
  NovoTabLinkElement,
  NovoNavOutletElement,
  NovoNavContentElement,
  NovoNavHeaderElement,
} from './Tabs';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NovoNavElement,
    NovoTabElement,
    NovoTabButtonElement,
    NovoTabLinkElement,
    NovoNavOutletElement,
    NovoNavContentElement,
    NovoNavHeaderElement,
  ],
  exports: [
    NovoNavElement,
    NovoTabElement,
    NovoTabButtonElement,
    NovoTabLinkElement,
    NovoNavOutletElement,
    NovoNavContentElement,
    NovoNavHeaderElement,
  ],
})
export class NovoTabModule {}
