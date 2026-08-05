import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivateDirective } from './directives/activate.directive';
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
import { If2026ThemePipe } from './theme/if2026.pipe';

@NgModule({
  imports: [CommonModule, NovoOptionModule, ActivateDirective],
  exports: [
    NovoTemplate,
    NovoText,
    NovoTitle,
    NovoCaption,
    NovoLabel,
    NovoLink,
    ActivateDirective,
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
    If2026ThemePipe,
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
    If2026ThemePipe,
  ],
})
export class NovoCommonModule {}
