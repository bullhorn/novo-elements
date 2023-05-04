import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoCheckboxModule } from 'novo-elements/elements/checkbox';
import { NovoCommonModule } from 'novo-elements/elements/common';
import { NovoFieldModule } from 'novo-elements/elements/field';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
import { NovoSelectSearchClearDirective } from './select-search-clear.directive';
import { NovoSelectSearchComponent } from './select-search.component';

// export const NovoSelectSearchVersion = '3.3.0';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NovoCheckboxModule,
    NovoButtonModule,
    NovoCommonModule,
    NovoIconModule,
    NovoLoadingModule,
    NovoTooltipModule,
    NovoFieldModule,
  ],
  declarations: [NovoSelectSearchComponent, NovoSelectSearchClearDirective],
  exports: [NovoSelectSearchComponent, NovoSelectSearchClearDirective],
})
export class NovoSelectSearchModule {}
