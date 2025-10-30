import { DataSource } from '@angular/cdk/table';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { NovoActivityTableState } from './state';
export interface ActivityTableService<T> {
    getTableResults(sort: {
        id: string;
        value: string;
        transform?: Function;
    }, filter: {
        id: string;
        value: string;
        transform?: Function;
    }, page: number, pageSize: number, globalSearch?: string, outsideFilter?: any): Observable<{
        results: T[];
        total: number;
    }>;
}
export declare abstract class RemoteActivityTableService<T> implements ActivityTableService<T> {
    abstract getTableResults(sort: {
        id: string;
        value: string;
        transform?: Function;
    }, filter: {
        id: string;
        value: string;
        transform?: Function;
    }, page: number, pageSize: number, globalSearch?: string, outsideFilter?: any): Observable<{
        results: T[];
        total: number;
    }>;
}
export declare class StaticActivityTableService<T> implements ActivityTableService<T> {
    private data;
    constructor(data?: T[]);
    getTableResults(sort: {
        id: string;
        value: string;
        transform?: Function;
    }, filter: {
        id: string;
        value: string;
        transform?: Function;
    }, page: number, pageSize: number, globalSearch?: string, outsideFilter?: any): Observable<{
        results: T[];
        total: number;
    }>;
}
export declare class ActivityTableDataSource<T> extends DataSource<T> {
    private tableService;
    private state;
    private ref;
    total: number;
    current: number;
    loading: boolean;
    pristine: boolean;
    get totallyEmpty(): boolean;
    get currentlyEmpty(): boolean;
    constructor(tableService: ActivityTableService<T>, state: NovoActivityTableState, ref: ChangeDetectorRef);
    connect(): Observable<any[]>;
    disconnect(): void;
}
