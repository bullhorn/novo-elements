import { Component, HostBinding, OnDestroy, ElementRef, Renderer2, Optional } from '@angular/core';
import { CdkHeaderCell, CdkColumnDef } from '@angular/cdk/table';
import { Subscription } from 'rxjs/Subscription';

import { NovoDataTableSelection } from '../selection/data-table-selection.directive';

/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _NovoHeaderCell = CdkHeaderCell;

@Component({
  selector: 'novo-data-table-checkbox-header-cell',
  template: `<novo-checkbox [(ngModel)]="selectAll" (ngModelChange)="toggle($event)"></novo-checkbox>`,
})
export class NovoDataTableCheckboxHeaderCell extends _NovoHeaderCell implements OnDestroy {
  @HostBinding('attr.role') public role = 'columnheader';

  public selectAll: boolean = false;
  private selectAllSubscription: Subscription;

  constructor(
    columnDef: CdkColumnDef,
    elementRef: ElementRef,
    renderer: Renderer2,
    @Optional() private _selection: NovoDataTableSelection,
  ) {
    super(columnDef, elementRef);
    renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-checkbox-column-header-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, 'novo-data-table-checkbox-header-cell');

    this.selectAllSubscription = _selection.novoSelectAllToggle.subscribe((value: boolean) => {
      this.selectAll = value;
    });
  }

  public ngOnDestroy(): void {
    this.selectAllSubscription.unsubscribe();
  }

  public toggle(value: boolean): void {
    this._selection.selectAll(value);
  }
}
