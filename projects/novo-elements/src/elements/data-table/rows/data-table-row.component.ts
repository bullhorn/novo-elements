import { CdkRow, CDK_ROW_TEMPLATE } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'novo-data-table-row',
  template: CDK_ROW_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoDataTableRow extends CdkRow {
  @HostBinding('class')
  public rowClass = 'novo-data-table-row';
  @HostBinding('attr.role')
  public role = 'row';

  @HostBinding('attr.id')
  @Input()
  id;

  @HostBinding('attr.data-automation-id')
  @Input()
  dataAutomationId;
}
