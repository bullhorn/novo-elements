// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoListModule } from 'novo-elements/elements/list';
import { NovoTabModule } from 'novo-elements/elements/tabs';
// APP
import { NovoCategoryDropdownElement } from './CategoryDropdown';

@NgModule({
  imports: [CommonModule, NovoTabModule, NovoListModule],
  declarations: [NovoCategoryDropdownElement],
  exports: [NovoCategoryDropdownElement],
})
export class NovoCategoryDropdownModule {}
