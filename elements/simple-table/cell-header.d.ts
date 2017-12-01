import { ChangeDetectorRef, OnDestroy, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CdkColumnDef } from '@angular/cdk/table';
import { NovoSimpleSortFilter } from './interfaces';
import { NovoSortFilter } from './sort';
import { NovoLabelService } from '../../services/novo-label-service';
import { SimpleTableColumnFilterConfig } from './interfaces';
import { NovoActivityTableState } from './state';
export declare class NovoSimpleFilterFocus implements AfterViewInit {
    private element;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
}
export declare class NovoSimpleCellHeader implements NovoSimpleSortFilter, OnInit, OnDestroy {
    private changeDetectorRef;
    labels: NovoLabelService;
    private state;
    _sort: NovoSortFilter;
    _cdkColumnDef: CdkColumnDef;
    defaultSort: {
        id: string;
        value: string;
    };
    config: {
        sortable: boolean;
        filterable: boolean;
        transforms?: {
            filter?: Function;
            sort?: Function;
        };
        filterConfig: SimpleTableColumnFilterConfig;
    };
    private _config;
    private _rerenderSubscription;
    private changeTimeout;
    icon: string;
    id: string;
    filter: string;
    direction: string;
    filterActive: boolean;
    sortActive: boolean;
    showCustomRange: boolean;
    activeDateFilter: string;
    constructor(changeDetectorRef: ChangeDetectorRef, labels: NovoLabelService, state: NovoActivityTableState, _sort: NovoSortFilter, _cdkColumnDef: CdkColumnDef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    sort(): void;
    filterData(filter?: any): void;
    clearFilter(): void;
    private getNextSortDirection(direction);
    private getDefaultDateFilterOptions();
}
