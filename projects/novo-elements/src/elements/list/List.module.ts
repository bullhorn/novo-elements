// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import {
  NovoListElement,
  NovoListItemElement,
  NovoItemAvatarElement,
  NovoItemTitleElement,
  NovoItemContentElement,
  NovoItemEndElement,
  NovoItemHeaderElement,
  NovoItemDateElement,
} from './List';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NovoListElement,
    NovoListItemElement,
    NovoItemAvatarElement,
    NovoItemTitleElement,
    NovoItemContentElement,
    NovoItemEndElement,
    NovoItemHeaderElement,
    NovoItemDateElement,
  ],
  exports: [
    NovoListElement,
    NovoListItemElement,
    NovoItemAvatarElement,
    NovoItemTitleElement,
    NovoItemHeaderElement,
    NovoItemContentElement,
    NovoItemEndElement,
    NovoItemDateElement,
  ],
})
export class NovoListModule {}
