import {
  Component,
  HostBinding,
  OnDestroy,
  ElementRef,
  Renderer2,
  Optional,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CdkHeaderCell, CdkColumnDef } from '@angular/cdk/table';
import { Subscription } from 'rxjs';

import { NovoDataTable } from '../data-table.component';

@Component({
  selector: 'novo-data-table-expand-header-cell',
  template: `
    <i class="bhi-next data-table-icon" novo-data-table-expander="true" (click)="expandAll()" [class.expanded]="expanded"></i>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoDataTableExpandHeaderCell<T> extends CdkHeaderCell implements OnDestroy {
  @HostBinding('attr.role')
  public role = 'columnheader';

  public expanded: boolean = false;
  private expandSubscription: Subscription;

  constructor(
    columnDef: CdkColumnDef,
    elementRef: ElementRef,
    renderer: Renderer2,
    private dataTable: NovoDataTable<T>,
    private ref: ChangeDetectorRef,
  ) {
    super(columnDef, elementRef);
    renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-expand-column-header-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, `novo-expand-column-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, 'novo-data-table-expand-header-cell');

    this.expandSubscription = this.dataTable.state.expandSource.subscribe(() => {
      this.expanded = this.dataTable.allCurrentRowsExpanded();
      this.ref.markForCheck();
    });
  }

  public ngOnDestroy(): void {
    if (this.expandSubscription) {
      this.expandSubscription.unsubscribe();
    }
  }

  public expandAll(): void {
    this.dataTable.expandRows(!this.expanded);
  }
}
