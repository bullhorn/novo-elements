import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NovoButtonModule } from '../button';
import { NovoCheckboxModule } from '../checkbox';
import { NovoCommonModule } from '../common';
import { NovoFieldModule } from '../field/field.module';
import { NovoIconModule } from '../icon';
import { NovoLoadingModule } from '../loading';
import { NovoTooltipModule } from '../tooltip';
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
