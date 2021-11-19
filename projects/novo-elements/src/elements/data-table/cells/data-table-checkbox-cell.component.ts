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

@Component({
  selector: 'novo-data-table-checkbox-cell',
  template: `
    <div class="data-table-checkbox" (click)="onClick()" [tooltip]="getTooltip()" tooltipPosition="right">
      <input type="checkbox" [checked]="checked">
      <label>
        <i [class.bhi-checkbox-disabled]="isAtLimit"
          [class.bhi-checkbox-empty]="!checked"
          [class.bhi-checkbox-filled]="checked"></i>
      </label>
    </div>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoDataTableCheckboxCell<T> extends CdkCell implements OnInit, OnDestroy {
  @HostBinding('attr.role')
  public role = 'gridcell';

  @Input()
  public row: T;

  public checked: boolean = false;

  private selectionSubscription: Subscription;
  private resetSubscription: Subscription;

  get isAtLimit(): boolean {
    return this.dataTable.state.selectedRows.size + this.dataTable.state.pageSize >= 500;
  }

  constructor(
    public columnDef: CdkColumnDef,
    elementRef: ElementRef,
    renderer: Renderer2,
    public dataTable: NovoDataTable<T>,
    private ref: ChangeDetectorRef,
  ) {
    super(columnDef, elementRef);
    renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, 'novo-data-table-checkbox-cell');

    this.selectionSubscription = this.dataTable.state.selectionSource.subscribe(() => {
      this.checked = this.dataTable.isSelected(this.row);
      this.ref.markForCheck();
    });
    this.resetSubscription = this.dataTable.state.resetSource.subscribe(() => {
      this.checked = false;
      this.ref.markForCheck();
    });
  }

  public ngOnInit(): void {
    this.checked = this.dataTable.isSelected(this.row);
  }

  public onClick(): void {
    if (!this.isAtLimit) {
      this.dataTable.selectRow(this.row);
    }
  }

  public getTooltip() {
    return this.isAtLimit ? 'More than 500 items are not able to be selected at one time' : '';
  }

  public ngOnDestroy(): void {
    if (this.selectionSubscription) {
      this.selectionSubscription.unsubscribe();
    }
    if (this.resetSubscription) {
      this.resetSubscription.unsubscribe();
    }
  }
}
