import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'collapsable-column',
  template: `
    <h1>Collapsable Column</h1>
  `,
  styleUrls: ['./CollapsableColumn.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoCollapsableColumnComponent {

}
