import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BackgroundColorDirective } from './directives/bgc.directive';
import { BorderDirective } from './directives/border.directive';
import { TextColorDirective } from './directives/color.directive';
import { MarginDirective, PaddingDirective } from './directives/space.directive';
import { NovoTemplate } from './novo-template/novo-template.directive';
import { NovoOptionModule } from './option';
import { NovoCaption } from './typography/caption/caption.component';
import { NovoLabel } from './typography/label/label.component';
import { NovoLink } from './typography/link/link.component';
import { NovoText } from './typography/text/text.component';
import { NovoTitle } from './typography/title/title.component';
@NgModule({
  imports: [CommonModule, NovoOptionModule],
  exports: [
    NovoTemplate,
    NovoText,
    NovoTitle,
    NovoCaption,
    NovoLabel,
    NovoLink,
    MarginDirective,
    PaddingDirective,
    BackgroundColorDirective,
    TextColorDirective,
    BorderDirective,
  ],
  declarations: [
    NovoTemplate,
    NovoText,
    NovoTitle,
    NovoCaption,
    NovoLabel,
    NovoLink,
    MarginDirective,
    PaddingDirective,
    BackgroundColorDirective,
    TextColorDirective,
    BorderDirective,
  ],
})
export class NovoCommonModule {}
