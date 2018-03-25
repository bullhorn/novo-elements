import { Directive, Input } from '@angular/core';
import { CdkHeaderRowDef } from '@angular/cdk/table';

@Directive({
  selector: '[novoDataTableHeaderRowDef]',
  providers: [{ provide: CdkHeaderRowDef, useExisting: NovoDataTableHeaderRowDef }],
})
export class NovoDataTableHeaderRowDef extends CdkHeaderRowDef {
  @Input('novoDataTableHeaderRowDef') columns;
}
