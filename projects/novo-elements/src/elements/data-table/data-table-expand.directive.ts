import { Directive, HostListener, Inject, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Helpers } from '../../utils/Helpers';
import { NovoDataTableRef, NOVO_DATA_TABLE_REF } from './data-table.token';
import { DataTableState } from './state/data-table-state.service';

@Directive({
  selector: '[novoDataTableExpand]',
})
export class NovoDataTableExpandDirective<T> implements OnDestroy {
  @Input()
  row: T;
  @Input('novoDataTableExpand')
  template: TemplateRef<any>;

  private subscription: Subscription;

  constructor(
    public vcRef: ViewContainerRef,
    private state: DataTableState<T>,
    @Inject(NOVO_DATA_TABLE_REF) private dataTable: NovoDataTableRef,
  ) {
    this.subscription = this.state.expandSource.subscribe((targetId?: number) => {
      if (this.shouldExpandAllRows(targetId) || this.shouldExpandOneRow(targetId)) {
        if (dataTable.isExpanded(this.row)) {
          this.render();
        } else {
          this.clear();
        }
      }
    });
  }

  shouldExpandAllRows = (targetId: number): boolean => targetId === undefined;

  shouldExpandOneRow = (targetId: number) => targetId === (this.row as unknown as { id: number }).id;

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
