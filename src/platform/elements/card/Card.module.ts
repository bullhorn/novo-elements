// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoLoadingModule } from '../loading/Loading.module';
import { NovoButtonModule } from '../button/Button.module';
import { NovoTooltipModule } from '../tooltip/Tooltip.module';
import { CardElement, CardActionsElement } from './Card';
import { CardBestTimeElement } from './extras/best-time/CardBestTime';
import { CardDonutChartElement } from './extras/donut-chart/CardDonutChart';
import { CardTimelineElement } from './extras/timeline/CardTimeline';

@NgModule({
    imports: [CommonModule, NovoButtonModule, NovoLoadingModule, NovoTooltipModule],
    declarations: [CardElement, CardActionsElement, CardBestTimeElement, CardDonutChartElement, CardTimelineElement],
    exports: [CardElement, CardActionsElement, CardBestTimeElement, CardDonutChartElement, CardTimelineElement]
})
export class NovoCardModule {
}
