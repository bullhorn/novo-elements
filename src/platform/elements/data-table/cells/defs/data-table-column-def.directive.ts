import { Directive, Input } from '@angular/core';
import { CdkColumnDef } from '@angular/cdk/table';

@Directive({
  selector: '[novoDataTableColumnDef]',
  providers: [{ provide: CdkColumnDef, useExisting: NovoDataTableColumnDef }],
})
export class NovoDataTableColumnDef extends CdkColumnDef {
  @Input('novoDataTableColumnDef') name: string;
}
