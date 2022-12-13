import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoCommonModule, NovoOptionModule } from 'novo-elements/common';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoSelectModule } from 'novo-elements/components/select';
import { NovoPaginationElement } from './pagination';

@NgModule({
  imports: [CommonModule, FormsModule, NovoCommonModule, NovoOptionModule, NovoIconModule, NovoSelectModule],
  declarations: [NovoPaginationElement],
  exports: [NovoPaginationElement],
})
export class NovoPaginationModule {}
