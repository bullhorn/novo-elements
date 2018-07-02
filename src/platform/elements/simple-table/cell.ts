import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, Renderer2, ViewChild
} from '@angular/core';
import { CdkCell, CdkCellDef, CdkColumnDef, CdkHeaderCell, CdkHeaderCellDef } from '@angular/cdk/table';
import { Subscription } from 'rxjs/Subscription';

import { NovoSelection } from './sort';
import { SimpleTableActionColumn, SimpleTableActionColumnOption, SimpleTableColumn } from './interfaces';
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';

/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _NovoCellDef = CdkCellDef;
export const _NovoHeaderCellDef = CdkHeaderCellDef;
export const _NovoColumnDef = CdkColumnDef;
export const _NovoHeaderCell = CdkHeaderCell;
export const _NovoCell = CdkCell;

@Directive({
  selector: '[novoSimpleCellDef]',
  providers: [{ provide: CdkCellDef, useExisting: NovoSimpleCellDef }],
})
export class NovoSimpleCellDef extends _NovoCellDef {}

@Directive({
  selector: '[novoSimpleHeaderCellDef]',
  providers: [{ provide: CdkHeaderCellDef, useExisting: NovoSimpleHeaderCellDef }],
})
export class NovoSimpleHeaderCellDef extends _NovoHeaderCellDef {}

@Directive({
  selector: '[novoSimpleColumnDef]',
  providers: [{ provide: CdkColumnDef, useExisting: NovoSimpleColumnDef }],
})
export class NovoSimpleColumnDef extends _NovoColumnDef {
  @Input('novoSimpleColumnDef') name: string;
}

@Directive({
  selector: 'novo-simple-header-cell',
})
export class NovoSimpleHeaderCell<T> extends _NovoHeaderCell implements OnInit {
  @HostBinding('attr.role') public role = 'columnheader';

  @Input() public column: SimpleTableColumn<T>;

  constructor(columnDef: CdkColumnDef, private elementRef: ElementRef, private renderer: Renderer2) {
    super(columnDef, elementRef);
    renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-column-header-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, `novo-column-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, 'novo-simple-header-cell');
  }

  public ngOnInit(): void {
    if (this.column.width) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', `${this.column.width}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', `${this.column.width}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${this.column.width}px`);
    }
  }
}

@Directive({
  selector: 'novo-simple-empty-header-cell',
})
export class NovoSimpleEmptyHeaderCell extends _NovoHeaderCell {
  @HostBinding('attr.role') public role = 'columnheader';

  constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2) {
    super(columnDef, elementRef);
    renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-column-header-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, `novo-column-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, 'novo-simple-empty-header-cell');
  }
}

@Component({
  selector: 'novo-simple-checkbox-header-cell',
  template: `<novo-checkbox [(ngModel)]="selectAll" (ngModelChange)="toggle($event)"></novo-checkbox>`,
})
export class NovoSimpleCheckboxHeaderCell extends _NovoHeaderCell implements OnDestroy {
  @HostBinding('attr.role') public role = 'columnheader';

  public selectAll: boolean = false;
  private selectAllSubscription: Subscription;

  constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, ref: ChangeDetectorRef, @Optional() private _selection: NovoSelection) {
    super(columnDef, elementRef);
    renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-checkbox-column-header-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, 'novo-simple-checkbox-header-cell');

    this.selectAllSubscription = _selection.novoSelectAllToggle.subscribe((value: boolean) => {
      this.selectAll = value;
      ref.markForCheck();
    });
  }

  public ngOnDestroy(): void {
    this.selectAllSubscription.unsubscribe();
  }

  public toggle(value: boolean): void {
    this._selection.selectAll(value);
  }
}

@Component({
  selector: 'novo-simple-cell',
  template: `    
    <span [class.clickable]="!!column.onClick" (click)="onClick($event)" #span>{{ column.renderer(row) }}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoSimpleCell<T> extends _NovoCell implements OnInit {
  @HostBinding('attr.role') public role = 'gridcell';

  @Input() public row: any;
  @Input() public column: SimpleTableColumn<T>;

  @ViewChild('span') private spanElement: ElementRef;

  constructor(columnDef: CdkColumnDef, private elementRef: ElementRef, private renderer: Renderer2) {
    super(columnDef, elementRef);
    renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-column-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, `novo-column-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, 'novo-simple-cell');
  }

  public ngOnInit(): void {
    if (this.column.customClass) {
      this.renderer.addClass(this.elementRef.nativeElement, this.column.customClass(this.row));
    }
    if (this.column.width) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', `${this.column.width}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', `${this.column.width}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${this.column.width}px`);
      // TODO - this inhibits resizing the page after the initial load -- but do we care?!?!
      // this.renderer.setStyle(this.spanElement.nativeElement, 'min-width', `${this.column.width - 20}px`);
      // this.renderer.setStyle(this.spanElement.nativeElement, 'max-width', `${this.column.width - 20}px`);
      // this.renderer.setStyle(this.spanElement.nativeElement, 'width', `${this.column.width - 20}px`);
    }
    // else {
    //     // TODO - this inhibits resizing the page after the initial load -- but do we care?!?!
    //     this.renderer.setStyle(this.spanElement.nativeElement, 'min-width', `${this.elementRef.nativeElement.offsetWidth - 20}px`);
    //     this.renderer.setStyle(this.spanElement.nativeElement, 'max-width', `${this.elementRef.nativeElement.offsetWidth - 20}px`);
    //     this.renderer.setStyle(this.spanElement.nativeElement, 'width', `${this.elementRef.nativeElement.offsetWidth - 20}px`);
    // }
  }

  public onClick(event: MouseEvent): void {
    Helpers.swallowEvent(event);
    if (this.column.onClick) {
      this.column.onClick(this.row);
    }
    return;
  }
}

@Component({
  selector: 'novo-simple-checkbox-cell',
  template: `
    <novo-checkbox [ngModel]="selected" (ngModelChange)="toggle($event)"></novo-checkbox>
  `,
})
export class NovoSimpleCheckboxCell extends _NovoCell implements OnDestroy, OnInit {
  @HostBinding('attr.role') public role = 'gridcell';

  @Input() public row: any;
  @Input() public index: any;

  public selected: boolean = false;
  private selectAllSubscription: Subscription;

  constructor(public columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, @Optional() public _selection: NovoSelection) {
    super(columnDef, elementRef);
    renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
    renderer.addClass(elementRef.nativeElement, 'novo-simple-checkbox-cell');

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

@Component({
  selector: 'novo-simple-action-cell',
  template: `
    <ng-container *ngIf="!column.options">
      <button theme="icon" [icon]="column.icon" (click)="column.onClick(row)" [disabled]="isDisabled(column, row)"></button>
    </ng-container>
    <ng-container *ngIf="column.options">
      <novo-dropdown parentScrollSelector=".novo-simple-table" containerClass="novo-table-dropdown-cell">
        <button type="button" theme="dialogue" icon="collapse" inverse>{{ column.label || labels.actions }}</button>
        <list>
          <item *ngFor="let option of column.options" (action)="option.onClick(row)" [disabled]="isDisabled(option, row)">
            <span [attr.data-automation-id]="option.label">{{ option.label }}</span>
          </item>
        </list>
      </novo-dropdown>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoSimpleActionCell<T> extends _NovoCell implements OnInit {
  @HostBinding('attr.role') public role = 'gridcell';

  @Input() public row: T;
  @Input() public column: SimpleTableActionColumn<T>;

  constructor(columnDef: CdkColumnDef, private elementRef: ElementRef, private renderer: Renderer2, private labels: NovoLabelService) {
    super(columnDef, elementRef);
    renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-action-column-${columnDef.cssClassFriendlyName}`);
  }

  public ngOnInit(): void {
    if (this.column.options) {
      this.renderer.addClass(this.elementRef.nativeElement, 'novo-simple-dropdown-cell');
    } else {
      this.renderer.addClass(this.elementRef.nativeElement, 'novo-simple-button-cell');
    }
  }

  public isDisabled(check: SimpleTableActionColumn<T> | SimpleTableActionColumnOption<T>, row: T): boolean {
    if (check.disabled === true) {
      return true;
    }
    if (check.disabledCheck) {
      return check.disabledCheck(row);
    }
    return false;
  }
}
