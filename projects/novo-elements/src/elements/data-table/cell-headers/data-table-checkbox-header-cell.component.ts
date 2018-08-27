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
  selector: 'novo-data-table-checkbox-header-cell',
  template: `
    <div class="data-table-checkbox" (click)="onClick()">
      <input type="checkbox" [checked]="checked">
      <label>
        <i [class.bhi-checkbox-empty]="!checked"
          [class.bhi-checkbox-filled]="checked"></i>
      </label>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoDataTableCheckboxHeaderCell<T> extends CdkHeaderCell implements OnDestroy {
  @HostBinding('attr.role')
  public role = 'columnheader';

  public checked: boolean = false;
  private selectionSubscription: Subscription;
  private paginationSubscription: Subscription;
  private resetSubscription: Subscription;

  constructor(
    columnDef: CdkColumnDef,
    elementRef: ElementRef,
    renderer: Renderer2,
    private dataTable: NovoDataTable<T>,
    private ref: ChangeDetectorRef,
  ) {
    super(columnDef, elementRef);
    renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-checkbox-column-header-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, 'novo-data-table-checkbox-header-cell');

    this.selectionSubscription = this.dataTable.state.selectionSource.subscribe(() => {
      this.checked = this.dataTable.allCurrentRowsSelected();
      this.ref.markForCheck();
    });
    this.paginationSubscription = this.dataTable.state.paginationSource.subscribe((event: { isPageSizeChange: boolean }) => {
      if (event.isPageSizeChange) {
        this.checked = false;
        this.dataTable.selectRows(false);
      } else {
        this.checked = this.dataTable.allCurrentRowsSelected();
      }
      this.ref.markForCheck();
    });
    this.resetSubscription = this.dataTable.state.resetSource.subscribe(() => {
      this.checked = false;
      this.ref.markForCheck();
    });
  }

  public ngOnDestroy(): void {
    if (this.selectionSubscription) {
      this.selectionSubscription.unsubscribe();
    }
    if (this.paginationSubscription) {
      this.paginationSubscription.unsubscribe();
    }
    if (this.resetSubscription) {
      this.resetSubscription.unsubscribe();
    }
  }

  public onClick(): void {
    this.dataTable.selectRows(!this.checked);
  }
}
