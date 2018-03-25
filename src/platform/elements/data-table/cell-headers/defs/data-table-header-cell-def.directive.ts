import { Directive } from '@angular/core';
import { CdkHeaderCellDef } from '@angular/cdk/table';

@Directive({
  selector: '[novoDataTableHeaderCellDef]',
  providers: [{ provide: CdkHeaderCellDef, useExisting: NovoDataTableHeaderCellDef }],
})
export class NovoDataTableHeaderCellDef extends CdkHeaderCellDef {}
