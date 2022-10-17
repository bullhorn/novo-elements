import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoCommonModule, NovoOptionModule, NovoOverlayModule } from 'novo-elements/common';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoChipsModule } from 'novo-elements/components/chips';
import { NovoFieldModule } from 'novo-elements/components/field';
import { NovoAutocompleteElement } from './autocomplete.component';

@NgModule({
  imports: [CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule, NovoFieldModule, NovoChipsModule],
  declarations: [NovoAutocompleteElement],
  exports: [NovoAutocompleteElement],
})
export class NovoAutoCompleteModule {}
