// NG
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoSelectElement } from './select';
import { NovoTooltipModule } from 'novo-elements/components/tooltip';
import { NovoDividerModule } from 'novo-elements/components/divider';
import { NovoOverlayModule } from 'novo-elements/common/overlay';
import { NovoOptionModule } from 'novo-elements/common';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoPipesModule } from 'novo-elements/pipes';

@NgModule({
  imports: [
    A11yModule,
    CommonModule,
    FormsModule,
    NovoButtonModule,
    NovoDividerModule,
    NovoOptionModule,
    NovoOverlayModule,
    NovoPipesModule,
    NovoTooltipModule,
  ],
  declarations: [NovoSelectElement],
  exports: [NovoSelectElement],
})
export class NovoSelectModule {}
