import { Directive, Input } from '@angular/core';
import { CdkColumnDef } from '@angular/cdk/table';

/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _NovoColumnDef = CdkColumnDef;

@Directive({
  selector: '[novoDataTableColumnDef]',
  providers: [{ provide: CdkColumnDef, useExisting: NovoDataTableColumnDef }],
})
export class NovoDataTableColumnDef extends _NovoColumnDef {
  @Input('novoDataTableColumnDef') name: string;
}
