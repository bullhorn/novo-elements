import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Optional, ViewEncapsulation, OnDestroy, OnInit, HostBinding, HostListener, Directive, AfterViewInit, ElementRef } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkColumnDef } from '@angular/cdk/table';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { NovoSortFilter, NovoSortableFilterable, NovoTableChange } from './sort';
import { getNovoSortHeaderNotContainedWithinNovoSortError } from './sort-errors';

@Directive({
    selector: '[novoFilterFocus]'
})
export class NovoFilterFocus implements AfterViewInit {
    constructor(private element: ElementRef) { }

    ngAfterViewInit() {
        this.element.nativeElement.focus();
    }
}

@Component({
    moduleId: module.id,
    selector: '[novo-header-config]',
    template: `
        <label (click)="sort()"><ng-content></ng-content></label>
        <button *ngIf="config.sortable" theme="icon" [icon]="icon" (click)="sort()" [class.active]="sortActive"></button>
        <novo-dropdown *ngIf="config.filterable" appendToBody="true" parentScrollSelector=".table-container" containerClass="table-dropdown">
            <button type="button" theme="icon" icon="filter" [class.active]="filterActive"></button>
            <list>
                <item class="filter-search" keepOpen="true">
                    <div class="header">
                        <span>Filter</span>
                        <button theme="dialogue" color="negative" icon="times" (click)="clearFilter()" *ngIf="filter?.length > 0">Clear</button>
                    </div>
                    <input type="text" [(ngModel)]="filter" (ngModelChange)="filterData()" novoFilterFocus/>
                </item>
            </list>
        </novo-dropdown>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NovoSortHeader implements NovoSortableFilterable, OnInit, OnDestroy {
    private _rerenderSubscription: Subscription;
    private changeTimeout: any;

    @Input('novo-header-config')
    get config() { return this._config; }
    set config(v) {
        if (!v) {
            this._config = {
                sortable: false,
                filterable: false
            }
        } else {
            this._config = {
                sortable: coerceBooleanProperty(v.sortable), filterable: coerceBooleanProperty(v.filterable)
            }
        }
    }
    private _config: { sortable: boolean, filterable: boolean };

    public icon: string = 'sortable';
    public id: string;
    public filter: string;
    public direction: string;
    public filterActive: boolean = false;
    public sortActive: boolean = false;

    constructor(private changeDetectorRef: ChangeDetectorRef, @Optional() public _sort: NovoSortFilter, @Optional() public _cdkColumnDef: CdkColumnDef) {
        if (!_sort) {
            throw getNovoSortHeaderNotContainedWithinNovoSortError();
        }

        this._rerenderSubscription = merge(_sort.novoTableChange).subscribe((change: NovoTableChange) => {
            if (change.sort && change.sort.id === this.id) {
                this.icon = `sort-${change.sort.value}`;
                this.sortActive = true;
            } else {
                this.icon = 'sortable';
                this.sortActive = false;
            }
            if (change.filter && change.filter.id === this.id) {
                this.filterActive = true;
            } else {
                this.filterActive = false;
            }
            changeDetectorRef.markForCheck();
        });
    }

    ngOnInit() {
        if (this._cdkColumnDef) {
            this.id = this._cdkColumnDef.name;
        }
    }

    ngOnDestroy() {
        this._rerenderSubscription.unsubscribe();
    }

    // @HostBinding('class.novo-sort-header-sorted')
    // _isSorted() {
    //     return this._sort.active === this.id && this._sort.direction;
    // }

    sort() {
        console.log('SORTING', this.direction);
        if (this.changeTimeout) {
            clearTimeout(this.changeTimeout);
        }
        this.changeTimeout = setTimeout(() => {
            this.direction = this.getNextSortDirection(this.direction);
            this._sort.sort(this.id, this.direction);
            this.changeDetectorRef.markForCheck();
        }, 300);
    }

    filterData() {
        console.log('FILTERING', this.filter);
        if (this.changeTimeout) {
            clearTimeout(this.changeTimeout);
        }
        this.changeTimeout = setTimeout(() => {
            if (this.filter === '') {
                this.filter = null;
            }
            this._sort.filter(this.id, this.filter);
            this.changeDetectorRef.markForCheck();
        }, 300);
    }

    clearFilter() {
        this.filter = null;
        this.filterData();
    }

    getNextSortDirection(direction: string): string {
        if (!direction) { return 'asc'; }
        if (direction === 'asc') { return 'desc'; }
        return 'asc';
    }
}
