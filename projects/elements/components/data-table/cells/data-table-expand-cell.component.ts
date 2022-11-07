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
  selector: 'novo-data-table-expand-cell',
  template: ` <i class="bhi-next data-table-icon" novo-data-table-expander="true" [class.expanded]="expanded"></i> `,
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
    @Inject(NOVO_DATA_TABLE_REF) private dataTable: NovoDataTableRef,
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
