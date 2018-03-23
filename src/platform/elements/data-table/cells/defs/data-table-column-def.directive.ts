import { Directive, Input } from '@angular/core';
import { CdkColumnDef } from '@angular/cdk/table';

@Directive({
  selector: '[novoDataTableColumnDef]',
  providers: [{ provide: CdkColumnDef, useExisting: NovoIDataTableColumnDef }],
})
export class NovoIDataTableColumnDef extends CdkColumnDef {
  @Input('novoDataTableColumnDef') name: string;
}
