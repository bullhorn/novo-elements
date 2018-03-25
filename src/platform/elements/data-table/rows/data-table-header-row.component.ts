import { ChangeDetectionStrategy, Component, Input, HostBinding } from '@angular/core';
import { CdkHeaderRow, CDK_ROW_TEMPLATE } from '@angular/cdk/table';

/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _NovoHeaderRow = CdkHeaderRow;

@Component({
  selector: 'novo-data-table-header-row',
  template: CDK_ROW_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoDataTableHeaderRow extends _NovoHeaderRow {
  @HostBinding('class') public rowClass = 'novo-data-table-header-row';
  @HostBinding('attr.role') public role = 'row';
}
