import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[novoTemplate]',
})
export class NovoTemplate {
  @Input()
  type: string;
  @Input('novoTemplate')
  name: string;

  constructor(public template: TemplateRef<any>) {}

  getType(): string {
    return this.name;
  }
}
