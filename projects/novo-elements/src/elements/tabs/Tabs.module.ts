// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import {
  NovoNavContentElement,
  NovoNavElement,
  NovoNavHeaderElement,
  NovoNavOutletElement,
  NovoTabButtonElement,
  NovoTabElement,
  NovoTabLinkElement,
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
