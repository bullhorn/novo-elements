import { ElementRef, Input, Renderer2, HostBinding, Component, OnInit, OnDestroy, Optional } from '@angular/core';
import { CdkCell, CdkColumnDef } from '@angular/cdk/table';
import { Subscription } from 'rxjs/Subscription';

import { NovoDataTableSelection } from '../selection/data-table-selection.directive';

@Component({
  selector: 'novo-data-table-checkbox-cell',
  template: `
        <novo-checkbox [ngModel]="selected" (ngModelChange)="toggle($event)"></novo-checkbox>
    `,
})
export class NovoDataTableCheckboxCell extends CdkCell implements OnInit, OnDestroy {
  @HostBinding('attr.role') public role = 'gridcell';

  @Input() public row: any;
  @Input() public index: any;

  public selected: boolean = false;
  private selectAllSubscription: Subscription;

  constructor(
    public columnDef: CdkColumnDef,
    elementRef: ElementRef,
    renderer: Renderer2,
    @Optional() public _selection: NovoDataTableSelection,
  ) {
    super(columnDef, elementRef);
    renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, 'novo-data-table-checkbox-cell');

    this.selectAllSubscription = _selection.novoSelectAllToggle.subscribe((value: boolean) => {
      this.selected = value;
    });
  }

  public ngOnInit(): void {
    this._selection.register(this.row.id || this.index, this.row);
    this.selected = this._selection.state.selectedRows.has(this.row.id || this.index);
  }

  public ngOnDestroy(): void {
    this._selection.deregister(this.row.id || this.index);
    this.selectAllSubscription.unsubscribe();
  }

  public toggle(value: boolean): void {
    this._selection.toggle(this.row.id || this.index, value, this.row);
  }
}
