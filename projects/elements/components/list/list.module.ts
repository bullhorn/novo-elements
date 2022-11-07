// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  NovoItemAvatarElement,
  NovoItemContentElement,
  NovoItemDateElement,
  NovoItemEndElement,
  NovoItemHeaderElement,
  NovoItemTitleElement,
  NovoListElement,
  NovoListItemElement,
} from './list';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoCommonModule } from 'novo-elements/common';

@NgModule({
  imports: [CommonModule, NovoCommonModule, NovoIconModule],
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
