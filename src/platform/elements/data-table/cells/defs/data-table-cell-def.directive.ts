import { Directive } from '@angular/core';
import { CdkCellDef } from '@angular/cdk/table';

@Directive({
  selector: '[novoDataTableCellDef]',
  providers: [{ provide: CdkCellDef, useExisting: NovoDataTableCellDef }],
})
export class NovoDataTableCellDef extends CdkCellDef {}
