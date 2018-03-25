import { Directive, Input } from '@angular/core';
import { CdkHeaderRowDef } from '@angular/cdk/table';

/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _NovoHeaderRowDef = CdkHeaderRowDef;

@Directive({
  selector: '[novoDataTableHeaderRowDef]',
  providers: [{ provide: CdkHeaderRowDef, useExisting: NovoDataTableHeaderRowDef }],
})
export class NovoDataTableHeaderRowDef extends _NovoHeaderRowDef {
  @Input('novoDataTableHeaderRowDef') columns;
}
