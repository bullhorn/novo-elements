import {
  ElementRef,
  Input,
  Renderer2,
  HostBinding,
  Component,
  ChangeDetectionStrategy,
  OnInit,
  TemplateRef,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { CdkCell, CdkColumnDef } from '@angular/cdk/table';

import { IDataTableColumn } from '../interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'novo-data-table-cell',
  template: `
    <ng-container *ngTemplateOutlet="template; context: {$implicit: row, col: column}"></ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoDataTableCell<T> extends CdkCell implements OnInit, OnDestroy {
  @HostBinding('attr.role')
  public role = 'gridcell';

  @Input()
  public row: T;
  @Input()
  public template: TemplateRef<any>;
  @Input()
  public column: IDataTableColumn<T>;
  @Input()
  public resized: EventEmitter<IDataTableColumn<T>>;
  private subscriptions: Subscription[] = [];

  constructor(columnDef: CdkColumnDef, private elementRef: ElementRef, private renderer: Renderer2) {
    super(columnDef, elementRef);
    renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-column-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, `novo-column-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, 'novo-data-table-cell');
  }

  public ngOnInit(): void {
    if (this.column.cellClass) {
      this.renderer.addClass(this.elementRef.nativeElement, this.column.cellClass(this.row));
    }
    this.calculateWidths();
    this.subscriptions.push(
      this.resized.subscribe((column: IDataTableColumn<T>) => {
        if (column === this.column) {
          this.calculateWidths();
        }
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  private calculateWidths(): void {
    if (this.column.width) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', `${this.column.width}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', `${this.column.width}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${this.column.width}px`);
    }
  }
}
