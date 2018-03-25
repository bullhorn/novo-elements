import { ElementRef, Input, Renderer2, HostBinding, Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CdkCell, CdkColumnDef } from '@angular/cdk/table';

import { IDataTableColumn } from '../interfaces';
import { NovoLabelService } from '../../../services/novo-label-service';

/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _NovoCell = CdkCell;

@Component({
  selector: 'novo-data-table-action-cell',
  template: `
        <ng-container *ngIf="!column?.action?.options">
            <button theme="icon" [icon]="column?.action?.icon" (click)="column.handlers?.click({ originalEvent: $event, row: row })" [disabled]="isDisabled(column, row)"></button>
        </ng-container>
        <ng-container *ngIf="column?.action?.options">
            <novo-dropdown appendToBody="true" parentScrollSelector=".novo-data-table" containerClass="novo-data-table-dropdown">
                <button type="button" theme="dialogue" icon="collapse" inverse>{{ column.label }}</button>
                <list>
                    <item *ngFor="let option of column?.action?.options" (action)="option.handlers.click({ originalEvent: $event?.originalEvent, row: row })" [disabled]="isDisabled(option, row)">
                        <span [attr.data-automation-id]="option.label">{{ option.label }}</span>
                    </item>
                </list>
            </novo-dropdown>
        </ng-container>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoDataTableActionCell<T> extends _NovoCell implements OnInit {
  @HostBinding('attr.role') public role = 'gridcell';

  @Input() public row: T;
  @Input() public column: IDataTableColumn<T>;

  constructor(columnDef: CdkColumnDef, private elementRef: ElementRef, private renderer: Renderer2, public labels: NovoLabelService) {
    super(columnDef, elementRef);
    renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-action-column-${columnDef.cssClassFriendlyName}`);
  }

  public ngOnInit(): void {
    if (this.column.action && this.column.action.options) {
      this.renderer.addClass(this.elementRef.nativeElement, 'novo-data-table-dropdown-cell');
    } else {
      this.renderer.addClass(this.elementRef.nativeElement, 'novo-data-table-button-cell');
    }
    if (this.column.cellClass) {
      this.renderer.addClass(this.elementRef.nativeElement, this.column.cellClass(this.row));
    }
    if (this.column.width) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', `${this.column.width}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', `${this.column.width}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${this.column.width}px`);
    }
  }

  public isDisabled(check: any, row: T): boolean {
    if (check.disabled === true) {
      return true;
    }
    if (check.disabledFunc) {
      return check.disabledFunc(row);
    }
    return false;
  }
}
