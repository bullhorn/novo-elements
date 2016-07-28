// import { ElementRef } from '@angular/core';
//
// import { Slider } from './Slider';
//
// class MockElementRef {
//     nativeElement = document.createElement('div');
//
//     constructor() {
//         this.nativeElement.querySelector = () => {
//             return document.createElement('div');
//         };
//     }
// }
//
// describe('Element: Slider', () => {
//     let comp;
//
//     beforeEachProviders(() => [
//         Slider,
//         { provide: ElementRef, useClass: MockElementRef }
//     ]);
//
//     beforeEach(inject([Slider], _comp => {
//         comp = _comp;
//     }));
//
//     it('should initialize correctly', () => {
//         expect(comp).toBeDefined();
//     });
// });
