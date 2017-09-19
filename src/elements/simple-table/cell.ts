import { Directive, ElementRef, Input, Renderer2, HostBinding, Component, ChangeDetectionStrategy, ChangeDetectorRef, Optional, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CdkCell, CdkCellDef, CdkColumnDef, CdkHeaderCell, CdkHeaderCellDef, DataSource } from '@angular/cdk/table';
import { Subscription } from 'rxjs/Subscription';

import { NovoSelection } from './sort';
import { SimpleTableColumn, SimpleTableButtonColumn } from './interfaces';
import { Helpers } from '../../utils/Helpers';

/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _NovoCellDef = CdkCellDef;
export const _NovoHeaderCellDef = CdkHeaderCellDef;
export const _NovoColumnDef = CdkColumnDef;
export const _NovoHeaderCell = CdkHeaderCell;
export const _NovoCell = CdkCell;

@Directive({
    selector: '[novoCellDef]',
    providers: [{ provide: CdkCellDef, useExisting: NovoCellDef }]
})
export class NovoCellDef extends _NovoCellDef { }

@Directive({
    selector: '[novoHeaderCellDef]',
    providers: [{ provide: CdkHeaderCellDef, useExisting: NovoHeaderCellDef }]
})
export class NovoHeaderCellDef extends _NovoHeaderCellDef { }

@Directive({
    selector: '[novoColumnDef]',
    providers: [{ provide: CdkColumnDef, useExisting: NovoColumnDef }],
})
export class NovoColumnDef extends _NovoColumnDef {
    @Input('novoColumnDef') name: string;
}

@Directive({
    selector: 'novo-header-cell'
})
export class NovoHeaderCell extends _NovoHeaderCell {
    @HostBinding('class') public headerCellClass = 'novo-header-cell';
    @HostBinding('attr.role') public role = 'columnheader';

    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2) {
        super(columnDef, elementRef, renderer);
        renderer.addClass(elementRef.nativeElement, `novo-column-${columnDef.cssClassFriendlyName}`);
    }
}

@Directive({
    selector: 'novo-empty-header-cell'
})
export class NovoEmptyHeaderCell extends _NovoHeaderCell {
    @HostBinding('class') public headerCellClass = 'novo-empty-header-cell';
    @HostBinding('attr.role') public role = 'columnheader';

    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2) {
        super(columnDef, elementRef, renderer);
        renderer.addClass(elementRef.nativeElement, `novo-column-${columnDef.cssClassFriendlyName}`);
    }
}

@Component({
    selector: 'novo-checkbox-header-cell',
    template: `<novo-checkbox [(ngModel)]="selectAll" (ngModelChange)="toggle($event)"></novo-checkbox>`
})
export class NovoCheckboxHeaderCell extends _NovoHeaderCell {
    @HostBinding('class') public headerCellClass = 'novo-checkbox-header-cell';
    @HostBinding('attr.role') public role = 'columnheader';

    public selectAll: boolean = false;

    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, @Optional() public _selection: NovoSelection) {
        super(columnDef, elementRef, renderer);
        renderer.addClass(elementRef.nativeElement, `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
    }

    public toggle(value: boolean): void {
        console.log('[NovoCheckboxHeaderCell] toggle', value)
        this._selection.selectAll(value);
    }
}

@Component({
    selector: 'novo-cell',
    template: `
        <span [class.clickable]="!!column.onClick" (click)="onClick($event)">{{ column.renderer(row) }}</span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NovoCell<T> extends _NovoCell {
    @HostBinding('class') public cellClass = 'novo-cell';
    @HostBinding('attr.role') public role = 'gridcell';

    @Input() public row: any;
    @Input() public column: SimpleTableColumn<T>;

    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2) {
        super(columnDef, elementRef, renderer);
        renderer.addClass(elementRef.nativeElement, `novo-column-${columnDef.cssClassFriendlyName}`);
    }

    public onClick(event: MouseEvent) {
        Helpers.swallowEvent(event);
        if (this.column.onClick) {
            this.column.onClick(this.row);
        }
        return;
    }
}

@Component({
    selector: 'novo-checkbox-cell',
    template: `
        <novo-checkbox [ngModel]="selected" (ngModelChange)="toggle($event)"></novo-checkbox>
    `
})
export class NovoCheckboxCell extends _NovoCell implements OnDestroy, OnInit {
    @HostBinding('class') public cellClass = 'novo-checkbox-cell';
    @HostBinding('attr.role') public role = 'gridcell';

    @Input() public row: any;
    @Input() public index: any;

    public selected: boolean = false;
    private selectAllSubscription: Subscription;

    constructor(public columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2, @Optional() public _selection: NovoSelection) {
        super(columnDef, elementRef, renderer);
        renderer.addClass(elementRef.nativeElement, `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);

        this.selectAllSubscription = _selection.novoSelectAllToggle.subscribe((value: boolean) => {
            this.selected = value;
        });
    }

    public ngOnInit(): void {
        this._selection.register(this.row.id || this.index, this.row);
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
    selector: 'novo-button-cell',
    template: `
        <button theme="icon" [icon]="column.icon" (click)="column.onClick(row)"></button>
    `
})
export class NovoButtonCell<T> extends _NovoCell {
    @HostBinding('class') public cellClass = 'novo-button-cell';
    @HostBinding('attr.role') public role = 'gridcell';

    @Input() public row: T;
    @Input() public column: SimpleTableButtonColumn<T>;
}
