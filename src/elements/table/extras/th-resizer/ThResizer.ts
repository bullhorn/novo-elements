// import { Component, EventEmitter, ElementRef } from '@angular/core';
//
// @Component({
//     selector: 'novo-resizer',
//     inputs: [
//         'config',
//         'column'
//     ],
//     outputs: ['onSizeChange'],
//     template: '<div class="grip" draggable="true" (dragstart)="onStartResize($event)" (drag)="onResizing($event)" (dragend)="onStopResize($event)"></div>'
// })
// export class ThResizer {
//     constructor(element:ElementRef) {
//         this.element = element;
//         this.config = null;
//         this.column = null;
//         this.onSizeChange = new EventEmitter();
//     }
//
//     onStartResize(event) {
//         event.preventDefault();
//
//         this.startMousePosition = event.clientX;
//         this.origWidth = Number(this.column.width || 100);
//
//         event.dataTransfer.effectAllowed = 'move';
//         event.dataTransfer.setData('text/html', 'test');
//     }
//
//     onResizing(event) {
//         this.resizing = true;
//         const diff = event.clientX - this.startMousePosition;
//         this.column.width = diff + this.origWidth;
//         return false;
//     }
//
//     onStopResize(event) {
//         if (event) {
//             event.preventDefault();
//             event.stopPropagation();
//         }
//
//         this.colsWidthPercents = [];
//         for (let i = 0; i < this.columns.length; i++) {
//             this.colsWidthPercents.push(parseFloat(this.columns[i].style.width));
//         }
//
//         this.onSizeChange.emit(this.column);
//         return false;
//     }
// }
