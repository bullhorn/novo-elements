"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// App
var Helpers_1 = require("../../../../utils/Helpers");
var ThOrderable = (function () {
    function ThOrderable(element) {
        this.element = element;
        this.onOrderChange = new core_1.EventEmitter();
        this.element = element;
    }
    Object.defineProperty(ThOrderable.prototype, "index", {
        get: function () {
            var index = null;
            if (this.element.nativeElement && this.element.nativeElement.parentNode) {
                var children = Array.prototype.slice.call(this.element.nativeElement.parentNode.children);
                index = children.indexOf(this.element.nativeElement);
            }
            return index;
        },
        enumerable: true,
        configurable: true
    });
    ThOrderable.prototype.ngOnInit = function () {
        if (this.column.ordering) {
            this.element.nativeElement.setAttribute('draggable', true);
            this.table = this.findTable(this.element.nativeElement);
        }
    };
    /**
     * @name onDragStart
     * @param event
     */
    ThOrderable.prototype.onDragStart = function (event) {
        if (this.column.ordering) {
            this.element.nativeElement.classList.add('dragging');
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', JSON.stringify(this.column));
            this.clone = this.table.cloneNode(true);
            this.clone.style.position = 'absolute';
            this.clone.style.left = '100%';
            this.clone.style.width = '150px';
            this.deleteColumns(this.clone);
            document.body.appendChild(this.clone);
            event.dataTransfer.setDragImage(this.clone, 75, 30);
        }
    };
    /**
     * @name deleteColumns
     * @param table
     */
    ThOrderable.prototype.deleteColumns = function (table) {
        // TODO: `table` should be immutable and this method should return the modified data to its caller
        if (table.rows.length > 0) {
            var allRows = table.rows;
            for (var i = 0; i < allRows.length; i++) {
                if (i > 10) {
                    table.deleteRow(-1);
                }
                else {
                    var cellLength = allRows[i].cells.length;
                    for (var c = 0; c < cellLength; c++) {
                        if (c < this.index) {
                            allRows[i].deleteCell(0);
                        }
                        else if (c > this.index) {
                            allRows[i].deleteCell(-1);
                        }
                    }
                }
            }
        }
    };
    ThOrderable.prototype.findTable = function (start) {
        var htmlElementNode = start;
        while (htmlElementNode) {
            htmlElementNode = htmlElementNode.parentNode;
            if (htmlElementNode && htmlElementNode.tagName.toLowerCase() === 'table') {
                return htmlElementNode;
            }
        }
        return undefined;
    };
    ThOrderable.prototype.onDrag = function (event) {
        Helpers_1.Helpers.swallowEvent(event);
        return false;
    };
    ThOrderable.prototype.onDragEnd = function (event) {
        Helpers_1.Helpers.swallowEvent(event);
        this.element.nativeElement.classList.remove('over');
        this.element.nativeElement.classList.remove('dragging');
        document.body.removeChild(this.clone);
        return false;
    };
    ThOrderable.prototype.onDrop = function (event) {
        Helpers_1.Helpers.swallowEvent(event);
        this.element.nativeElement.classList.remove('over');
        var data = JSON.parse(event.dataTransfer.getData('text/plain'));
        this.onOrderChange.emit({
            first: data,
            second: this.column
        });
        return false;
    };
    /**
     * @name onDragOver
     * @param event
     * @returns {boolean}
     */
    ThOrderable.prototype.onDragOver = function (event) {
        Helpers_1.Helpers.swallowEvent(event);
        event.dataTransfer.dropEffect = 'move';
        return false;
    };
    ThOrderable.prototype.onDragEnter = function (event) {
        this.element.nativeElement.classList.add('over');
        this.target = event.target;
    };
    ThOrderable.prototype.onDragLeave = function (event) {
        this.element.nativeElement.classList.remove('over');
    };
    return ThOrderable;
}());
ThOrderable.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[novoThOrderable]',
                host: {
                    '(dragstart)': 'onDragStart($event)',
                    '(dragover)': 'onDragOver($event)',
                    '(dragenter)': 'onDragEnter($event)',
                    '(dragleave)': 'onDragLeave($event)',
                    '(dragend)': 'onDragEnd($event)',
                    '(drop)': 'onDrop($event)'
                }
            },] },
];
/** @nocollapse */
ThOrderable.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
]; };
ThOrderable.propDecorators = {
    'column': [{ type: core_1.Input, args: ['novoThOrderable',] },],
    'onOrderChange': [{ type: core_1.Output },],
};
exports.ThOrderable = ThOrderable;
//# sourceMappingURL=ThOrderable.js.map