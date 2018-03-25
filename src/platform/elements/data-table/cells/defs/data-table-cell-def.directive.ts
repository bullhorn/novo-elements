import { Directive } from '@angular/core';
import { CdkCellDef } from '@angular/cdk/table';

/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _NovoCellDef = CdkCellDef;

@Directive({
  selector: '[novoDataTableCellDef]',
  providers: [{ provide: CdkCellDef, useExisting: NovoDataTableCellDef }],
})
export class NovoDataTableCellDef extends _NovoCellDef {}
