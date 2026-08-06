// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoOverlayModule } from 'novo-elements/elements/common';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoPickerModule } from 'novo-elements/elements/picker';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
import { NovoSearchBoxElement, NovoSearchLeadingContentDirective } from './SearchBox';
@NgModule({
  imports: [CommonModule, NovoIconModule, NovoPickerModule, NovoTooltipModule, NovoOverlayModule],
  declarations: [NovoSearchBoxElement, NovoSearchLeadingContentDirective],
  exports: [NovoSearchBoxElement, NovoSearchLeadingContentDirective],
})
export class NovoSearchBoxModule {}
