import { CdkColumnDef, CdkHeaderCell } from '@angular/cdk/table';
import { Directive, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';
import { IDataTableColumn } from '../interfaces';

@Directive({
  selector: 'novo-data-table-header-cell',
})
export class NovoDataTableHeaderCell<T> extends CdkHeaderCell implements OnInit {
  @HostBinding('attr.role')
  public role = 'columnheader';

  @Input()
  public column: IDataTableColumn<T>;

  constructor(columnDef: CdkColumnDef, private elementRef: ElementRef, private renderer: Renderer2) {
    super(columnDef, elementRef);
    renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-column-header-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, `novo-column-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, 'novo-data-table-header-cell');
  }

  public ngOnInit(): void {
    if (this.column.width) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', `${this.column.width}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', `${this.column.width}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${this.column.width}px`);
    }
  }
}
