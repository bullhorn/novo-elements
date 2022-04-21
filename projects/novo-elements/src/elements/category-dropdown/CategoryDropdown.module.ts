// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoListModule } from './../list/List.module';
import { NovoTabModule } from './../tabs/Tabs.module';
// APP
import { NovoCategoryDropdownElement } from './CategoryDropdown';

@NgModule({
  imports: [CommonModule, NovoTabModule, NovoListModule],
  declarations: [NovoCategoryDropdownElement],
  exports: [NovoCategoryDropdownElement],
})
export class NovoCategoryDropdownModule {}
