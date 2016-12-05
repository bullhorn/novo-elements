import { EventEmitter } from '@angular/core';

export interface DataSource {
    dataChange:EventEmitter<any>;
    length:number;
    list:Array<any>;
    page(num:number, size:number):Array<any>;
    pageSize:number;
    filter(filters):Promise<any>;
    sort(sorts):Promise<any>;
}
