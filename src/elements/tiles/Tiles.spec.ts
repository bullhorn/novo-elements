// // APP
// import { NovoTilesElement } from './Tiles';
// import { APP_TEST_PROVIDERS } from './../../testing/test-providers';
//
// describe('Element: Tiles', () => {
//     let comp;
//
//     beforeEach(() => {
//         addProviders([
//             NovoTilesElement,
//             APP_TEST_PROVIDERS
//         ]);
//     });
//
//     beforeEach(inject([NovoTilesElement], _comp => {
//         comp = _comp;
//         comp.options = [
//             {
//                 label: '1',
//                 value: '1'
//             },
//             {
//                 label: '2',
//                 value: '2'
//             },
//             {
//                 label: '3',
//                 value: '3'
//             }
//         ];
//     }));
//
//     describe('Method: ngOnInit()', () => {
//         it('should reformat array options to an object', () => {
//             expect(comp.ngOnInit).toBeDefined();
//             comp.options = [1, 2, 3, 4, 5];
//             comp.ngOnInit();
//             expect(comp._options).toBeDefined();
//             expect(comp._options[0].value).toBe(comp.options[0]);
//             expect(comp._options[0].label).toBe(comp.options[0]);
//         });
//
//         it('should add checked status to options', () => {
//             comp.ngOnInit();
//             expect('checked' in comp._options[0]).toBeTruthy();
//         });
//     });
//
//     describe('Method: select(event, item)', () => {
//         it('should be defined.', () => {
//             expect(comp.select).toBeDefined();
//         });
//
//         it('should set label 2 with checked equal to true', () => {
//             comp.options[1].checked = false;
//             comp.select(false, comp.options[1]);
//             expect(comp.options[1].checked).toBeTruthy();
//         });
//
//         it('should only allow one tile to be checked true', () => {
//             comp.ngOnInit();
//             comp.select(false, comp.options[0]);
//             expect(comp.options[0].checked).toBeTruthy();
//             expect(comp.options[1].checked).toBeFalsy();
//             expect(comp.options[2].checked).toBeFalsy();
//             comp.select(false, comp.options[1]);
//             expect(comp.options[0].checked).toBeFalsy();
//             expect(comp.options[1].checked).toBeTruthy();
//             expect(comp.options[2].checked).toBeFalsy();
//             comp.select(false, comp.options[2]);
//             expect(comp.options[0].checked).toBeFalsy();
//             expect(comp.options[1].checked).toBeFalsy();
//             expect(comp.options[2].checked).toBeTruthy();
//         });
//     });
//
//     describe('Method: writeValue()', () => {
//         it('should be defined.', () => {
//             expect(comp.writeValue).toBeDefined();
//         });
//
//         it('should change the value', () => {
//             comp.writeValue(10);
//             expect(comp.model).toBe(10);
//         });
//     });
//
//     describe('Method: registerOnChange()', () => {
//         it('should be defined.', () => {
//             expect(comp.registerOnChange).toBeDefined();
//         });
//     });
//
//     describe('Method: registerOnTouched()', () => {
//         it('should be defined.', () => {
//             expect(comp.registerOnTouched).toBeDefined();
//         });
//     });
// });
