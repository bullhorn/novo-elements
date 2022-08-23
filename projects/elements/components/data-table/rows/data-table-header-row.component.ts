import { CdkHeaderRow, CDK_ROW_TEMPLATE } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'novo-data-table-header-row',
  template: CDK_ROW_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoDataTableHeaderRow extends CdkHeaderRow {
  @HostBinding('class')
  public rowClass = 'novo-data-table-header-row';
  @HostBinding('class.fixed-header')
  @Input()
  public fixedHeader: boolean = false;
  @HostBinding('attr.role')
  public role = 'row';
}
