import { CdkColumnDef, CdkHeaderCell } from '@angular/cdk/table';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NovoDataTableRef, NOVO_DATA_TABLE_REF } from '../data-table.token';

@Component({
  selector: 'novo-data-table-expand-header-cell',
  template: ` <i class="bhi-next data-table-icon" novo-data-table-expander="true" (click)="expandAll()" [class.expanded]="expanded"></i> `,
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
    @Inject(NOVO_DATA_TABLE_REF) private dataTable: NovoDataTableRef,
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
