// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
import { NovoYearSelectElement } from './year-select/year-select.component';
import { NovoMonthViewElement } from './month-view/month-view.component';
import { NovoMonthSelectElement } from './month-select/month-select.component';
import { NovoCalendarElement } from './calendar.component';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoPipesModule } from 'novo-elements/pipes';

@NgModule({
  imports: [CommonModule, FormsModule, NovoButtonModule, NovoPipesModule, TextMaskModule, NovoIconModule],
  declarations: [NovoMonthViewElement, NovoMonthSelectElement, NovoYearSelectElement, NovoCalendarElement],
  exports: [NovoMonthViewElement, NovoMonthSelectElement, NovoYearSelectElement, NovoCalendarElement],
})
export class NovoCalendarModule {}
