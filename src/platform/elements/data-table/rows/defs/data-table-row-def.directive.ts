import { Directive, Input } from '@angular/core';
import { CdkRowDef } from '@angular/cdk/table';

/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _NovoCdkRowDef = CdkRowDef;

@Directive({
  selector: '[novoDataTableRowDef]',
  providers: [{ provide: CdkRowDef, useExisting: NovoDataTableRowDef }],
})
export class NovoDataTableRowDef<T> extends _NovoCdkRowDef<T> {
  @Input('novoDataTableRowDefColumns') columns;
}
