import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoPipesModule } from 'novo-elements/pipes';
import { NovoCalendarElement } from './calendar.component';
import { NovoMonthSelectElement } from './month-select/month-select.component';
import { NovoMonthViewElement } from './month-view/month-view.component';
import { NovoYearSelectElement } from './year-select/year-select.component';

@NgModule({
  imports: [CommonModule, FormsModule, NovoButtonModule, NovoPipesModule, NovoIconModule],
  declarations: [NovoMonthViewElement, NovoMonthSelectElement, NovoYearSelectElement, NovoCalendarElement],
  exports: [NovoMonthViewElement, NovoMonthSelectElement, NovoYearSelectElement, NovoCalendarElement],
})
export class NovoCalendarModule {}
