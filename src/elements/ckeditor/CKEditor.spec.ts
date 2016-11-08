// TODO
// import { Renderer } from '@angular/core';
//
// import { CKEditor } from './CKEditor';
//
// class MockRenderer {
//     setElementProperty() {
//     }
//
//     invokeElementMethod() {
//     }
// }
//
// class MockInstance {
//     removeAllListeners() {
//     }
//
//     destroy() {
//     }
//
//     setData() {
//     }
//
//     replace() {
//         return this;
//     }
//
//     on() {
//     }
// }
//
// describe('Element: Editor', () => {
//     let comp;
//
//     beforeEachProviders(() => [
//         CKEditor,
//         { provide: Renderer, useClass: MockRenderer }
//     ]);
//
//     beforeEach(inject([CKEditor], _comp => {
//         comp = _comp;
//         comp.instance = new MockInstance();
//         comp.host = {
//             nativeElement: {
//                 value: 'INITIAL VALUE'
//             }
//         };
//
//         spyOn(comp.instance, 'removeAllListeners');
//         spyOn(comp.instance, 'destroy');
//         spyOn(comp.instance, 'setData');
//         spyOn(comp.instance, 'on');
//         spyOn(comp.change, 'emit');
//     }));
//
//     describe('Function: ngOnDestroy()', () => {
//         it('should be defined', () => {
//             expect(comp.ngOnDestroy).toBeDefined();
//         });
//
//         it('should remove everything if we have an instance of CKEditor', () => {
//             comp.ngOnDestroy();
//             expect(comp.instance).toBe(null);
//         });
//     });
//
//     describe('Function: ngAfterViewInit()', () => {
//         beforeEach(() => {
//             spyOn(comp, 'ckeditorInit');
//         });
//
//         it('should be defined', () => {
//             expect(comp.ngAfterViewInit).toBeDefined();
//         });
//
//         it('should set the base config', () => {
//             comp.config = {};
//             comp.ngAfterViewInit();
//             expect(comp.ckeditorInit).toHaveBeenCalledWith({});
//         });
//
//         it('should set with passed config', () => {
//             comp.config = { test: 123 };
//             comp.ngAfterViewInit();
//             expect(comp.ckeditorInit).toHaveBeenCalledWith({ test: 123 });
//         });
//     });
//
//     describe('Function: onValueChange()', () => {
//         it('should be defined', () => {
//             expect(comp.onValueChange).toBeDefined();
//         });
//
//         it('should emit the change', () => {
//             comp.onValueChange();
//             expect(comp.change.emit).toHaveBeenCalledWith('INITIAL VALUE');
//         });
//     });
//
//     describe('Function: ckeditorInit()', () => {
//         beforeEach(() => {
//             spyOn(console, 'error');
//         });
//
//         it('should be defined', () => {
//             expect(comp.ckeditorInit).toBeDefined();
//         });
//
//         it('should throw error if the CKEDITOR is not present', () => {
//             window.CKEDITOR = null;
//             comp.ckeditorInit({});
//             expect(console.error).toHaveBeenCalled(); // eslint-disable-line
//         });
//
//         describe('with CKEDITOR added', () => {
//             beforeEach(() => {
//                 window.CKEDITOR = new MockInstance();
//
//                 spyOn(window.CKEDITOR, 'removeAllListeners');
//                 spyOn(window.CKEDITOR, 'destroy');
//                 spyOn(window.CKEDITOR, 'setData');
//                 spyOn(window.CKEDITOR, 'on');
//             });
//
//             it('should create the instance', () => {
//                 comp.ckeditorInit({});
//                 expect(comp.instance).toBeDefined();
//             });
//
//             it('should set the data on the instance', () => {
//                 comp.ckeditorInit({});
//                 expect(comp.instance.setData).toHaveBeenCalled();
//             });
//
//             it('should setup the handlers', () => {
//                 comp.ckeditorInit({});
//                 expect(comp.instance.on).toHaveBeenCalled();
//             });
//         });
//     });
//
//     describe('Function: writeValue()', () => {
//         it('should be defined', () => {
//             expect(comp.writeValue).toBeDefined();
//         });
//
//         it('should work', () => {
//             comp.instance = null;
//             comp.writeValue({});
//             expect(comp.value).toEqual({});
//         });
//
//         it('should update the instance', () => {
//             comp.writeValue({});
//             expect(comp.instance.setData).toHaveBeenCalledWith({});
//         });
//     });
//
//     describe('Function: registerOnChange()', () => {
//         it('should be defined', () => {
//             expect(comp.registerOnChange).toBeDefined();
//         });
//
//         it('should work', () => {
//             comp.registerOnChange({});
//             expect(comp.onChange).toEqual({});
//         });
//     });
//
//     describe('Function: registerOnTouched()', () => {
//         it('should be defined', () => {
//             expect(comp.registerOnTouched).toBeDefined();
//         });
//
//         it('should work', () => {
//             comp.registerOnTouched({});
//             expect(comp.onTouched).toEqual({});
//         });
//     });
//
//     describe('Function: getBaseConfig()', () => {
//         it('should be defined', () => {
//             expect(comp.getBaseConfig).toBeDefined();
//         });
//
//         it('should work', () => {
//             let config = comp.getBaseConfig();
//             expect(config).toEqual({
//                 toolbar: [
//                     { name: 'clipboard', items: ['Paste', 'PasteText', 'PasteFromWord', 'Undo', 'Redo', 'Scayt'] },
//                     { name: 'paragraph', items: ['NumberedList', 'BulletedList', 'Outdent', 'Indent', 'Blockquote', 'CreateDiv', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'BidiLtr', 'BidiRtl'] },
//                     { name: 'links', items: ['Link'] },
//                     { name: 'tools', items: ['Maximize', 'Source'] },
//                     '/',
//                     { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'] },
//                     { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
//                     { name: 'colors', items: ['TextColor', 'BGColor'] }
//                 ]
//             });
//         });
//     });
// });
