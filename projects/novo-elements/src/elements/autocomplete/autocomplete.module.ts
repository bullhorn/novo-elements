import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoCommonModule, NovoOptionModule, NovoOverlayModule } from 'novo-elements/elements/common';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoChipsModule } from 'novo-elements/elements/chips';
import { NovoFieldModule } from 'novo-elements/elements/field';
import { NovoAutocompleteElement } from './autocomplete.component';

@NgModule({
  imports: [CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule, NovoFieldModule, NovoChipsModule],
  declarations: [NovoAutocompleteElement],
  exports: [NovoAutocompleteElement],
})
export class NovoAutoCompleteModule {}