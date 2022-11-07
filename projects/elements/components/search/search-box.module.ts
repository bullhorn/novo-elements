// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoSearchBoxElement } from './search-box';
import { NovoTooltipModule } from 'novo-elements/components/tooltip';
import { NovoPickerModule } from 'novo-elements/components/picker';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoOverlayModule } from 'novo-elements/common/overlay';
@NgModule({
  imports: [CommonModule, NovoIconModule, NovoPickerModule, NovoTooltipModule, NovoOverlayModule],
  declarations: [NovoSearchBoxElement],
  exports: [NovoSearchBoxElement],
})
export class NovoSearchBoxModule {}
