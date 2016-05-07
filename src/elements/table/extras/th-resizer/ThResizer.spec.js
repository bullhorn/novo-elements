// // import {DOM} from 'angular2/src/platform/dom/dom_adapter';
// import { Component } from '@angular/core';
// import { By } from 'angular2/platform/common_dom';
// import { beforeEach, expect, describe, it } from '@angular/core/testing';
//
// import { createTestContext } from '../../../../testing/TestContext';
// import { ThResizer } from './ThResizer';
//
// @Component({
//     selector: 'test-cmp',
//     directives: [ThResizer],
//     template: '<novo-resizer [config]="config" [column]="column" (onSizeChange)="onSizeChange($event)"></novo-resizer>'
// })
// class TestCmp {
//     constructor() {
//         this.config = {};
//         this.column = { resize: true };
//     }
//
//     onSizeChange(event) {
//         this.event = event;
//     }
// }
//
// describe('Element: ThResizer', () => {
//     let ctx;
//     let instance;
//     let cmpElement;
//     let cmpInstance;
//
//     beforeEach(createTestContext(_ctx => ctx = _ctx));
//
//     beforeEach(done => {
//         ctx.init(TestCmp)
//             .finally(done)
//             .subscribe(() => {
//                 instance = ctx.fixture.componentInstance;
//                 const cmpDebugElement = ctx.fixture.debugElement.query(By.directive(ThResizer));
//                 cmpElement = cmpDebugElement.nativeElement;
//                 cmpInstance = cmpDebugElement.componentInstance;
//             });
//     });
//
//     it('should have the instance and cmpElement defined', () => {
//         expect(instance).toBeDefined();
//         expect(cmpElement).toBeDefined();
//         expect(cmpInstance).toBeDefined();
//     });
//
//     describe('Method: onStartResize(event)', () => {
//         it('should start the resizing of the element (default column width)', () => {
//             const mockEvent = {
//                 preventDefault: () => {
//                 },
//                 clientX: 10,
//                 dataTransfer: {
//                     setData: (key, value) => {
//                         mockEvent.dataTransfer[key] = value;
//                     }
//                 }
//             };
//
//             spyOn(mockEvent, 'preventDefault');
//
//             cmpInstance.onStartResize(mockEvent);
//
//             expect(mockEvent.preventDefault).toHaveBeenCalled();
//             expect(cmpInstance.startMousePosition).toEqual(10);
//             expect(cmpInstance.origWidth).toEqual(100);
//             expect(mockEvent.dataTransfer.effectAllowed).toEqual('move');
//             expect(mockEvent.dataTransfer['text/html']).toEqual('test');
//         });
//
//         it('should start the resizing of the element (column width supplied)', () => {
//             const mockEvent = {
//                 preventDefault: () => {
//                 },
//                 clientX: 10,
//                 dataTransfer: {
//                     setData: (key, value) => {
//                         mockEvent.dataTransfer[key] = value;
//                     }
//                 }
//             };
//
//             cmpInstance.column.width = 10;
//             cmpInstance.onStartResize(mockEvent);
//
//             expect(cmpInstance.origWidth).toEqual(10);
//         });
//     });
//
//     describe('Method: onResizing(event)', () => {
//         it('should set the width and say resizing', () => {
//             const mockEvent = {
//                 clientX: 10
//             };
//
//             cmpInstance.startMousePosition = 10;
//             cmpInstance.origWidth = 10;
//             const value = cmpInstance.onResizing(mockEvent);
//
//             expect(cmpInstance.resizing).toBe(true);
//             expect(cmpInstance.column.width).toEqual(10);
//             expect(value).toBe(false);
//         });
//     });
//
//     describe('Method: onStopResize(event)', () => {
//         it('should bubble a resize event', () => {
//             const mockEvent = {
//                 preventDefault: () => {
//                 },
//                 stopPropagation: () => {
//                 }
//             };
//
//             spyOn(cmpInstance.onSizeChange, 'emit');
//             spyOn(mockEvent, 'preventDefault');
//             spyOn(mockEvent, 'stopPropagation');
//
//             cmpInstance.columns = [{ style: { width: 10 } }];
//             cmpInstance.onStopResize(mockEvent);
//
//             expect(mockEvent.preventDefault).toHaveBeenCalled();
//             expect(mockEvent.stopPropagation).toHaveBeenCalled();
//             expect(cmpInstance.onSizeChange.emit).toHaveBeenCalledWith({ resize: true });
//             expect(cmpInstance.colsWidthPercents).toEqual([10]);
//         });
//
//         it('should ignore the event if not passed', () => {
//             spyOn(cmpInstance.onSizeChange, 'emit');
//
//             cmpInstance.columns = [{ style: { width: 10 } }];
//             cmpInstance.onStopResize();
//
//             expect(cmpInstance.onSizeChange.emit).toHaveBeenCalledWith({ resize: true });
//             expect(cmpInstance.colsWidthPercents).toEqual([10]);
//         });
//     });
// });
