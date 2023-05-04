import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccentColorDirective } from './directives/accent.directive';
import { BackgroundColorDirective } from './directives/bg.directive';
import { BorderDirective } from './directives/border.directive';
import { TextColorDirective } from './directives/color.directive';
import { FillColorDirective } from './directives/fill.directive';
import { FlexDirective } from './directives/flex.directive';
import { GapDirective, MarginDirective, PaddingDirective } from './directives/space.directive';
import { SwitchCasesDirective } from './directives/switch-cases.directive';
import { ThemeColorDirective } from './directives/theme.directive';
import { VisibleDirective } from './directives/visible.directive';
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
    GapDirective,
    AccentColorDirective,
    FillColorDirective,
    FlexDirective,
    ThemeColorDirective,
    SwitchCasesDirective,
    VisibleDirective,
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
    GapDirective,
    AccentColorDirective,
    FillColorDirective,
    FlexDirective,
    ThemeColorDirective,
    SwitchCasesDirective,
    VisibleDirective,
  ],
})
export class NovoCommonModule {}
