// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
import { NovoPipesModule } from 'novo-elements/pipes';
// APP
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoCalendarElement } from './calendar.component';
import { NovoMonthSelectElement } from './month-select/month-select.component';
import { NovoMonthViewElement } from './month-view/month-view.component';
import { NovoYearSelectElement } from './year-select/year-select.component';

@NgModule({
  imports: [CommonModule, FormsModule, NovoButtonModule, NovoPipesModule, TextMaskModule, NovoIconModule],
  declarations: [NovoMonthViewElement, NovoMonthSelectElement, NovoYearSelectElement, NovoCalendarElement],
  exports: [NovoMonthViewElement, NovoMonthSelectElement, NovoYearSelectElement, NovoCalendarElement],
})
export class NovoCalendarModule {}
