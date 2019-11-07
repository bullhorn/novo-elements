import {
  ElementRef,
  Input,
  Renderer2,
  HostBinding,
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CdkCell, CdkColumnDef } from '@angular/cdk/table';
import { Subscription } from 'rxjs';

import { NovoDataTable } from '../data-table.component';
import { DataTableState } from '../state/data-table-state.service';

@Component({
  selector: 'novo-data-table-expand-cell',
  template: `
    <i class="bhi-next data-table-icon" novo-data-table-expander="true" [class.expanded]="expanded"></i>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoDataTableExpandCell<T> extends CdkCell implements OnInit, OnDestroy {
  @HostBinding('attr.role')
  public role = 'gridcell';

  @Input()
  public row: T;

  public expanded: boolean = false;

  private expandSubscription: Subscription;

  constructor(
    public columnDef: CdkColumnDef,
    elementRef: ElementRef,
    renderer: Renderer2,
    public dataTable: NovoDataTable<T>,
    private ref: ChangeDetectorRef,
  ) {
    super(columnDef, elementRef);
    renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-expand-column-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, `novo-expand-column-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, 'novo-data-table-expand-cell');

    this.expandSubscription = this.dataTable.state.expandSource.subscribe(() => {
      this.expanded = this.dataTable.isExpanded(this.row);
      this.ref.markForCheck();
    });
  }

  public ngOnInit(): void {
    this.expanded = this.dataTable.isExpanded(this.row);
  }

  public onClick(): void {
    this.dataTable.expandRow(this.row);
  }

  public ngOnDestroy(): void {
    if (this.expandSubscription) {
      this.expandSubscription.unsubscribe();
    }
  }
}
