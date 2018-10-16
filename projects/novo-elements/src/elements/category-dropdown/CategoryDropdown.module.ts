// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoCategoryDropdownElement } from './CategoryDropdown';
import { NovoTabModule } from './../tabs/Tabs.module';
import { NovoListModule } from './../list/List.module';

@NgModule({
  imports: [CommonModule, NovoTabModule, NovoListModule],
  declarations: [NovoCategoryDropdownElement],
  exports: [NovoCategoryDropdownElement],
})
export class NovoCategoryDropdownModule {}
