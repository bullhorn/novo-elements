import { Directive, Input } from '@angular/core';
import { CdkRowDef } from '@angular/cdk/table';

@Directive({
  selector: '[novoDataTableRowDef]',
  providers: [{ provide: CdkRowDef, useExisting: NovoDataTableRowDef }],
})
export class NovoDataTableRowDef<T> extends CdkRowDef<T> {
  @Input('novoDataTableRowDefColumns') columns;
}
