
export class DataChangeEvent {
    static REFRESH:string = 'DateChange.REFRESH';
    static ADD:string = 'DateChange.ADD';
    static REMOVE:string = 'DateChange.REMOVE';
    static REMOVE_ALL:string = 'DateChange.REMOVE_ALL';
    static REPLACE:string = 'DateChange.REPLACE';
    static INVALIDATE_ALL:string = 'DateChange.INVALIDATE_ALL';
    static SORT:string = 'DateChange.SORT';
    static FILTER:string = 'DateChange.FILTER';

    type:string = '';
    data:Array = [];

    constructor(type = 'DateChange.REFRESH', data = []) {
        this.type = type;
        this.data = data;
    }
}
