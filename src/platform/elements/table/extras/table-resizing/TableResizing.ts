// import { Directive, EventEmitter, ElementRef } from '@angular/core';
//
// @Directive({
//     selector: '[novoTableResizing]',
//     inputs: ['config: novoTableResizing'],
//     outputs: ['onTableResize']
// })
// export class TableResizing {
//     constructor(element:ElementRef) {
//         this.element = element;
//         this.startX = 0;
//         this.colsWidthPercents = [];
//         this.onTableResize = new EventEmitter();
//         this.resizeListener = this.onResize.bind(this);
//         this.resizeEndListener = this.onResizeEnd.bind(this);
//     }
//
//     ngAfterContentInit() {
//         if (this.config.resizing) {
//             const table = this.element;
//             this.columns = this.element.nativeElement.querySelectorAll('th');
//             this.tableWidth = table.nativeElement.clientWidth;
//
//             if (this.columns.length) {
//                 for (let i = 0; i < this.columns.length; i++) {
//                     const column = this.columns[i];
//                     const handle = column.querySelector('.handle');
//
//                     // Explicitly declare percentage widths on columns for manipulation later;
//                     column.style.width = `${column.clientWidth / this.tableWidth * 100}%`;
//
//                     handle && handle.addEventListener('mousedown', (event) => {
//                         if (event) {
//                             event.preventDefault();
//                             event.stopPropagation();
//                         }
//                         this.onStartResize(event, i);
//                     });
//                 }
//             }
//         }
//     }
//
//     onStartResize(event, _colIndex) {
//         this.startX = event.pageX;
//         this.colIndex = _colIndex;
//
//         for (let i = 0; i < this.columns.length; i++) {
//             this.colsWidthPercents.push(parseFloat(this.columns[i].style.width));
//         }
//
//         document.addEventListener('mousemove', this.resizeListener);
//         document.addEventListener('mouseup', this.resizeEndListener);
//     }
//
//     onResize(event) {
//         if (event) {
//             event.preventDefault();
//             event.stopPropagation();
//         }
//
//         const deltaPercent = (event.pageX - this.startX) / this.tableWidth * 100;
//         const colsRight = this.columns.length - (this.colIndex + 1);
//         const colsRightDeltaPercent = -1 * (deltaPercent / colsRight);
//
//         this.columns[this.colIndex].style.width = `${this.colsWidthPercents[this.colIndex] + deltaPercent}%`;
//
//         for (let i = this.colIndex + 1; i < this.columns.length; i++) {
//             this.columns[i].style.width = `${this.colsWidthPercents[i] + colsRightDeltaPercent}%`;
//         }
//     }
//
//     onResizeEnd(event) {
//         if (event) {
//             event.preventDefault();
//             event.stopPropagation();
//         }
//
//         document.removeEventListener('mousemove', this.resizeListener);
//         document.removeEventListener('mouseup', this.resizeEndListener);
//         this.colsWidthPercents = [];
//
//         for (let i = 0; i < this.columns.length; i++) {
//             this.colsWidthPercents.push(parseFloat(this.columns[i].style.width));
//         }
//
//         this.onTableResize.emit(true);
//     }
// }
