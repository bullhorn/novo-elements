// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoButtonModule, NovoLoadingModule } from './../../novo-elements';
import { CardElement } from './Card';
import { CardBestTimeElement } from './extras/best-time/CardBestTime';
import { CardDonutChartElement } from './extras/donut-chart/CardDonutChart';
import { CardTimelineElement } from './extras/timeline/CardTimeline';

@NgModule({
    imports: [CommonModule, NovoButtonModule, NovoLoadingModule],
    declarations: [CardElement, CardBestTimeElement, CardDonutChartElement, CardTimelineElement],
    exports: [CardElement, CardBestTimeElement, CardDonutChartElement, CardTimelineElement]
})
export class NovoCardModule {
}
