// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoCategoryDropdownElement } from './category-dropdown';
import { NovoTabModule } from 'novo-elements/components/tabs';
import { NovoListModule } from 'novo-elements/components/list';

@NgModule({
  imports: [CommonModule, NovoTabModule, NovoListModule],
  declarations: [NovoCategoryDropdownElement],
  exports: [NovoCategoryDropdownElement],
})
export class NovoCategoryDropdownModule {}
