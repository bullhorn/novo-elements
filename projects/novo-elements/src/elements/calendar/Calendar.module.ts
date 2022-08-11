// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Vendor
import { IMaskDirectiveModule } from 'angular-imask';
import { NovoPipesModule } from '../../pipes/Pipes.module';
// APP
import { NovoButtonModule } from '../button';
import { NovoIconModule } from '../icon/Icon.module';
import { NovoCalendarElement } from './calendar.component';
import { NovoMonthSelectElement } from './month-select/month-select.component';
import { NovoMonthViewElement } from './month-view/month-view.component';
import { NovoYearSelectElement } from './year-select/year-select.component';

@NgModule({
  imports: [CommonModule, FormsModule, IMaskDirectiveModule, NovoButtonModule, NovoPipesModule, NovoIconModule],
  declarations: [NovoMonthViewElement, NovoMonthSelectElement, NovoYearSelectElement, NovoCalendarElement],
  exports: [NovoMonthViewElement, NovoMonthSelectElement, NovoYearSelectElement, NovoCalendarElement],
})
export class NovoCalendarModule {}
