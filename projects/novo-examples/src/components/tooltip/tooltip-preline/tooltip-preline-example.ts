import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @title Tooltip Preline Multi-line Example
 */
@Component({
    selector: 'tooltip-preline-example',
    templateUrl: 'tooltip-preline-example.html',
    styleUrls: ['tooltip-preline-example.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class TooltipPrelineExample {
  public multiLineTooltip: string = 'Date Added: 09/07/2026, 11:46am\nDate Last Modified: 09/09/2026, 2:32pm';
}
