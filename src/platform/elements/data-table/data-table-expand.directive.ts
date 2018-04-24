import { Directive, HostBinding, HostListener, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { Helpers } from '../../utils/Helpers';

@Directive({
  selector: '[novoDataTableExpand]',
})
export class NovoDataTableExpandDirective<T> {
  @HostBinding('class.expanded') opened: boolean;

  @Input() row: T;
  @Input('novoDataTableExpand') template: TemplateRef<any>;

  constructor(public vcRef: ViewContainerRef) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if ((event.target as Element).hasAttribute('novo-data-table-expander')) {
      Helpers.swallowEvent(event);
      this.toggle();
    }
  }

  private toggle(): void {
    if (this.opened) {
      this.vcRef.clear();
    } else {
      this.render();
    }
    this.opened = this.vcRef.length > 0;
  }

  private render(): void {
    this.vcRef.clear();
    if (this.template && this.row) {
      this.vcRef.createEmbeddedView(this.template, { $implicit: this.row });
    }
  }
}
