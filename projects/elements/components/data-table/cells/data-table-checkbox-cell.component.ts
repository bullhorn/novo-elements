import { CdkCell, CdkColumnDef } from '@angular/cdk/table';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NovoDataTableRef, NOVO_DATA_TABLE_REF } from '../data-table.token';

@Component({
  selector: 'novo-data-table-checkbox-cell',
  template: `
    <div class="data-table-checkbox" (click)="onClick()" [tooltip]="getTooltip()" tooltipPosition="right">
      <input type="checkbox" [checked]="checked" />
      <label>
        <i [class.bhi-checkbox-disabled]="isAtLimit" [class.bhi-checkbox-empty]="!checked" [class.bhi-checkbox-filled]="checked"></i>
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
  @Input()
  public maxSelected: number = undefined;

  public checked: boolean = false;

  private selectionSubscription: Subscription;
  private resetSubscription: Subscription;

  get isAtLimit(): boolean {
    return this.maxSelected && this.dataTable.state.selectedRows.size >= this.maxSelected && !this.checked;
  }

  constructor(
    public columnDef: CdkColumnDef,
    elementRef: ElementRef,
    renderer: Renderer2,
    @Inject(NOVO_DATA_TABLE_REF) private dataTable: NovoDataTableRef,
    private ref: ChangeDetectorRef,
  ) {
    super(columnDef, elementRef);
    renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, 'novo-data-table-checkbox-cell');

    this.selectionSubscription = this.dataTable.state.selectionSource.subscribe(() => {
      this.checked = this.dataTable.isSelected(this.row) || (this.dataTable?.canSelectAll && this.dataTable?.allMatchingSelected);
      this.ref.markForCheck();
    });
    this.resetSubscription = this.dataTable.state.resetSource.subscribe(() => {
      this.checked = false;
      this.ref.markForCheck();
    });
  }

  public ngOnInit(): void {
    this.checked = this.dataTable.isSelected(this.row) || (this.dataTable?.canSelectAll && this.dataTable?.allMatchingSelected);
  }

  public onClick(): void {
    if (!this.isAtLimit) {
      this.dataTable.selectRow(this.row, 'onClick');
    }
  }

  public getTooltip() {
    return this.isAtLimit ? 'More than ' + this.maxSelected + ' items are not able to be selected at one time' : '';
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
