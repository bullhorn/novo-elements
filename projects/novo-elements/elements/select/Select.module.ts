// NG
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// App
import { NovoPipesModule } from 'novo-elements/pipes';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoOptionModule, NovoOverlayModule } from 'novo-elements/elements/common';
import { NovoDividerModule } from 'novo-elements/elements/divider';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
import { NovoSelectElement } from './Select';

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
