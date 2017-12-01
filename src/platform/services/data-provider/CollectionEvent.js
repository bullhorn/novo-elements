"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CollectionEvent = (function () {
    function CollectionEvent(type, data) {
        if (type === void 0) { type = 'Collection.REFRESH'; }
        if (data === void 0) { data = []; }
        this.type = '';
        this.data = [];
        this.type = type;
        this.data = data;
    }
    return CollectionEvent;
}());
CollectionEvent.REFRESH = 'Collection.REFRESH';
CollectionEvent.ADD = 'Collection.ADD';
CollectionEvent.REMOVE = 'Collection.REMOVE';
CollectionEvent.REMOVE_ALL = 'Collection.REMOVE_ALL';
CollectionEvent.REPLACE = 'Collection.REPLACE';
CollectionEvent.INVALIDATE_ALL = 'Collection.INVALIDATE_ALL';
CollectionEvent.SORT = 'Collection.SORT';
CollectionEvent.FILTER = 'Collection.FILTER';
CollectionEvent.CHANGE = 'Collection.CHANGE';
CollectionEvent.CURRENTPAGE_CHANGE = 'Collection.CURRENTPAGE_CHANGE';
CollectionEvent.PAGESIZE_CHANGE = 'Collection.PAGESIZE_CHANGE';
CollectionEvent.NUMBEROFPAGES_CHANGE = 'Collection.NUMBEROFPAGES_CHANGE';
exports.CollectionEvent = CollectionEvent;
//# sourceMappingURL=CollectionEvent.js.map