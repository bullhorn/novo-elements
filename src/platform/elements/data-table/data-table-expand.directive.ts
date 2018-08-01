import { Directive, HostListener, Input, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataTableState } from './state/data-table-state.service';
import { Helpers } from '../../utils/Helpers';
import { NovoDataTable } from './data-table.component';

@Directive({
  selector: '[novoDataTableExpand]',
})
export class NovoDataTableExpandDirective<T> implements OnDestroy {
  @Input()
  row: T;
  @Input('novoDataTableExpand')
  template: TemplateRef<any>;

  private subscription: Subscription;

  constructor(public vcRef: ViewContainerRef, private state: DataTableState<T>, private dataTable: NovoDataTable<T>) {
    this.subscription = this.state.expandSource.subscribe(() => {
      if (dataTable.isExpanded(this.row)) {
        this.render();
      } else {
        this.clear();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if ((event.target as Element).hasAttribute('novo-data-table-expander')) {
      Helpers.swallowEvent(event);
      this.dataTable.expandRow(this.row);
    }
  }

  private clear(): void {
    this.vcRef.clear();
  }

  private render(): void {
    this.vcRef.clear();
    if (this.template && this.row) {
      this.vcRef.createEmbeddedView(this.template, { $implicit: this.row });
    }
  }
}
