// import { NovoFileInputElement, NovoFile } from './FileInput';
// import { APP_TEST_PROVIDERS } from './../../../../testing/test-providers';
//
// describe('Element: NovoFileInputElement', () => {
//     let component;
//     let FakeEvent = () => {
//         return {
//             preventDefault: () => {
//             },
//             dataTransfer: {
//                 dropEffect: 'fake',
//                 types: ['File']
//             },
//             target: 'test-target'
//         };
//     };
//
//     beforeEach(() => {
//         addProviders([
//             NovoFileInputElement,
//             APP_TEST_PROVIDERS
//         ]);
//     });
//
//     beforeEach(inject([NovoFileInputElement], _component => {
//         component = _component;
//         component.name = 'test';
//     }));
//
//     describe('Method: ngOnInit()', () => {
//         it('should setup drag events', () => {
//             expect(component.ngOnInit).toBeDefined();
//             spyOn(component.element.nativeElement, 'addEventListener');
//             component.ngOnInit();
//             expect(component.element.nativeElement.addEventListener).toHaveBeenCalled();
//         });
//     });
//
//     describe('Method: ngOnDestroy()', () => {
//         it('should destroy events.', () => {
//             expect(component.ngOnDestroy).toBeDefined();
//             spyOn(component.element.nativeElement, 'removeEventListener');
//             component.ngOnDestroy();
//             expect(component.element.nativeElement.removeEventListener).toHaveBeenCalled();
//         });
//     });
//
//     describe('Method: dragEnterHandler(event)', () => {
//         it('should set active to true.', () => {
//             expect(component.dragEnterHandler).toBeDefined();
//             let evt = new FakeEvent();
//             component.dragEnterHandler(evt);
//             expect(evt.dataTransfer.dropEffect).toBe('copy');
//             expect(component.active).toBe(true);
//         });
//     });
//
//     describe('Method: dragLeaveHandler(event)', () => {
//         it('should set active to false.', () => {
//             expect(component.dragLeaveHandler).toBeDefined();
//             let evt = new FakeEvent();
//             component.dragLeaveHandler(evt);
//             expect(component.active).toBe(false);
//         });
//     });
//
//     describe('Method: dropHandler(event)', () => {
//         it('should set active to false.', () => {
//             expect(component.dropHandler).toBeDefined();
//             let evt = new FakeEvent();
//             component.dropHandler(evt);
//             expect(component.active).toBe(false);
//         });
//     });
//
//     describe('Method: writeValue()', () => {
//         it('should be defined.', () => {
//             expect(component.writeValue).toBeDefined();
//         });
//
//         it('should change the value', () => {
//             component.writeValue(10);
//             expect(component.model).toBe(10);
//         });
//     });
//
//     describe('Method: registerOnChange()', () => {
//         it('should be defined.', () => {
//             expect(component.registerOnChange).toBeDefined();
//         });
//     });
//
//     describe('Method: registerOnTouched()', () => {
//         it('should be defined.', () => {
//             expect(component.registerOnTouched).toBeDefined();
//         });
//     });
// });
//
//
// describe('Class: NovoFile', () => {
//     let file;
//     beforeEach(() => {
//         file = new NovoFile({
//             name: 'test.pdf',
//             type: 'application/pdf',
//             lastModified: 10,
//             size: 20
//         });
//     });
//
//     describe('Method: constructor()', () => {
//         it('should be initialized.', () => {
//             expect(file.name).toBe('test.pdf');
//             expect(file.contentType).toBe('application/pdf');
//             expect(file.lastModified).toBe(10);
//             expect(file.size).toBe(20);
//             expect(file.loaded).toBe(false);
//         });
//     });
//
//     describe('Method: read()', () => {
//         it('should read files.', () => {
//             spyOn(file.reader, 'readAsDataURL');
//             file.read();
//             expect(file.reader.readAsDataURL).toHaveBeenCalled();
//         });
//     });
//
//     describe('Method: toJSON()', () => {
//         it('should only show certain keys.', () => {
//             expect(Object.keys(file.toJSON()).length).toBe(5);
//         });
//     });
// });
