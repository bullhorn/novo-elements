import { CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef, CDK_ROW_TEMPLATE } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, Directive, HostBinding, Input } from '@angular/core';

/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _NovoHeaderRowDef = CdkHeaderRowDef;
export const _NovoCdkRowDef = CdkRowDef;
export const _NovoHeaderRow = CdkHeaderRow;
export const _NovoRow = CdkRow;

@Directive({
  selector: '[novoSimpleHeaderRowDef]',
  providers: [{ provide: CdkHeaderRowDef, useExisting: NovoSimpleHeaderRowDef }],
})
export class NovoSimpleHeaderRowDef extends _NovoHeaderRowDef {
  // TODO: add explicit constructor

  @Input('novoSimpleHeaderRowDef')
  columns;
}

@Directive({
  selector: '[novoSimpleRowDef]',
  providers: [{ provide: CdkRowDef, useExisting: NovoSimpleRowDef }],
})
export class NovoSimpleRowDef<T> extends _NovoCdkRowDef<T> {
  // TODO: add explicit constructor

  @Input('novoSimpleRowDefColumns')
  columns;
}

@Component({
  selector: 'novo-simple-header-row',
  template: CDK_ROW_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoSimpleHeaderRow extends _NovoHeaderRow {
  @HostBinding('class')
  public rowClass = 'novo-simple-header-row';
  @HostBinding('attr.role')
  public role = 'row';
}

@Component({
  selector: 'novo-simple-row',
  template: CDK_ROW_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoSimpleRow extends _NovoRow {
  @HostBinding('class')
  public rowClass = 'novo-simple-row';
  @HostBinding('attr.role')
  public role = 'row';
}
