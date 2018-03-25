import { Directive } from '@angular/core';
import { CdkHeaderCellDef } from '@angular/cdk/table';

/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _NovoHeaderCellDef = CdkHeaderCellDef;

@Directive({
  selector: '[novoDataTableHeaderCellDef]',
  providers: [{ provide: CdkHeaderCellDef, useExisting: NovoDataTableHeaderCellDef }],
})
export class NovoDataTableHeaderCellDef extends _NovoHeaderCellDef {}
