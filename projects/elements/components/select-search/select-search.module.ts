import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NovoCommonModule } from 'novo-elements/common';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoCheckboxModule } from 'novo-elements/components/checkbox';
import { NovoFieldModule } from 'novo-elements/components/field';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoLoadingModule } from 'novo-elements/components/loading';
import { NovoTooltipModule } from 'novo-elements/components/tooltip';
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
