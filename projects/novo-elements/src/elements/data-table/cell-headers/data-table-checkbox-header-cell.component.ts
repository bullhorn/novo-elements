import { CdkColumnDef, CdkHeaderCell } from '@angular/cdk/table';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NovoToastService } from '../../toast/ToastService';
import { NovoDataTableRef, NOVO_DATA_TABLE_REF } from '../data-table.token';

@Component({
  selector: 'novo-data-table-checkbox-header-cell',
  template: `
    <div class="data-table-checkbox" (click)="onClick()">
      <input type="checkbox" [checked]="checked" />
      <label>
        <i [class.bhi-checkbox-empty]="!checked" [class.bhi-checkbox-filled]="checked"></i>
      </label>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoDataTableCheckboxHeaderCell<T> extends CdkHeaderCell implements OnDestroy {
  @HostBinding('attr.role')
  public role = 'columnheader';
  @Input()
  public maxSelected: number = undefined;

  public checked: boolean = false;
  private selectionSubscription: Subscription;
  private paginationSubscription: Subscription;
  private resetSubscription: Subscription;

  get isAtLimit(): boolean {
    return (
      this.maxSelected && this.dataTable.state.selectedRows.size + this.dataTable.dataSource.data.length > this.maxSelected && !this.checked
    );
  }

  constructor(
    columnDef: CdkColumnDef,
    elementRef: ElementRef,
    renderer: Renderer2,
    @Inject(NOVO_DATA_TABLE_REF) private dataTable: NovoDataTableRef,
    private ref: ChangeDetectorRef,
    private toaster: NovoToastService,
  ) {
    super(columnDef, elementRef);
    renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-checkbox-column-header-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, 'novo-data-table-checkbox-header-cell');

    this.selectionSubscription = this.dataTable.state.selectionSource.subscribe(() => {
      this.checked = this.dataTable.allCurrentRowsSelected() || (this.dataTable?.canSelectAll && this.dataTable?.allMatchingSelected);
      if (this.dataTable?.canSelectAll) {
        this.selectAllChanged();
      }
      this.ref.markForCheck();
    });
    this.paginationSubscription = this.dataTable.state.paginationSource.subscribe((event: { isPageSizeChange: boolean }) => {
      if (event.isPageSizeChange) {
        this.checked = false;
        if (this.dataTable?.canSelectAll) {
          this.selectAllChanged();
        }
        this.dataTable.selectRows(false);
        this.dataTable.state.checkRetainment('pageSize');
        this.dataTable.state.reset(false, true);
      } else {
        this.checked = this.dataTable.allCurrentRowsSelected() || (this.dataTable?.canSelectAll && this.dataTable?.allMatchingSelected);
        if (this.dataTable?.canSelectAll) {
          this.selectAllChanged();
        }
      }
      this.ref.markForCheck();
    });
    this.resetSubscription = this.dataTable.state.resetSource.subscribe(() => {
      this.checked = false;
      if (this.dataTable?.canSelectAll) {
        this.resetAllMatchingSelected();
      }
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
    if (this.isAtLimit) {
      this.toaster.alert({
        theme: 'danger',
        position: 'fixedTop',
        message: 'Error, more than 500 items are not able to be selected at one time',
        icon: 'caution',
      });
    } else {
      this.dataTable.selectRows(!this.checked);
    }
    if (this.dataTable?.canSelectAll) {
      if (this.checked) {
        this.resetAllMatchingSelected();
      } else {
        this.selectAllChanged();
      }
    }
  }

  private resetAllMatchingSelected(): void {
    this.dataTable.state?.allMatchingSelectedSource?.next(false);
    this.dataTable.state?.onSelectionChange();
  }

  public selectAllChanged(): void {
    const allSelectedEvent = {
      allSelected: this.checked,
      selectedCount: this.dataTable?.state?.selected?.length,
      allMatchingSelected: this.dataTable?.allMatchingSelected,
    };
    this.dataTable.allSelected.emit(allSelectedEvent);
  }
}
