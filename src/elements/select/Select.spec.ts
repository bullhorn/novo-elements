// import { NovoSelectElement } from './Select';
// import { KeyCodes } from './../../utils/key-codes/KeyCodes';
// import { APP_TEST_PROVIDERS } from './../../testing/test-providers';

// const KeyEvent = (code) => {
//     let event = document.createEvent('Event');
//     event.keyCode = code;
//     return event;
// };


// describe('Element: NovoSelectElement', () => {
//     let component;

//     beforeEach(() => {
//         addProviders([
//             NovoSelectElement,
//             APP_TEST_PROVIDERS
//         ]);
//     });

//     beforeEach(inject([NovoSelectElement], _component => {
//         component = _component;
//         component.options = [
//             {
//                 label: 'one',
//                 value: '1'
//             },
//             {
//                 label: 'two',
//                 value: '2'
//             },
//             {
//                 label: 'three',
//                 value: '3'
//             }
//         ];
//     }));

//     describe('Function: ngOnInit()', () => {
//         it('should reformat array options to an object', () => {
//             expect(component.ngOnInit).toBeDefined();
//             component.options = ['1', '2', '3'];
//             component.ngOnInit();
//             expect(component.options).toBeDefined();
//             expect(component.options[0].value).toBe('1');
//             expect(component.options[0].label).toBe('1');
//         });
//     });

//     describe('Function: select(option, i)', () => {
//         it('should be defined.', () => {
//             expect(component.select).toBeDefined();
//         });

//         xit('should select second option', () => {
//             let i = 1;
//             let option = component.options[i];
//             component.select(option, i);
//             expect(component.selected).toBe(option.value);
//             expect(option.active).toBeTruthy();
//         });
//     });

//     describe('Function: clear()', () => {
//         it('should be defined.', () => {
//             expect(component.clear).toBeDefined();
//         });

//         it('should clear selected', () => {
//             component.selected = {
//                 label: 'test',
//                 value: 'test',
//                 active: true
//             };
//             component.clear();
//             expect(component.selected.active).toBeFalsy();
//             expect(component.selectedIndex).toBe(-1);
//             expect(component.empty).toBeTruthy();
//         });
//     });

//     describe('Function: onKeyDown(event)', () => {
//         it('should be defined.', () => {
//             expect(component.onKeyDown).toBeDefined();
//         });

//         it('should do nothing select is not open', () => {
//             component.active = false;
//             component.selectedIndex = 1;
//             component.onKeyDown(KeyEvent(KeyCodes.UP));
//             expect(component.selectedIndex).toBe(1);
//         });

//         it('should close select with ESC is pressed', () => {
//             component.active = true;
//             spyOn(component, 'toggleActive');
//             component.onKeyDown(KeyEvent(KeyCodes.ESC));
//             expect(component.toggleActive).toHaveBeenCalled();
//         });

//         it('should select a value and close when ENTER is pressed', () => {
//             component.active = true;
//             component.selectedIndex = 1;
//             spyOn(component, 'toggleActive');
//             spyOn(component, 'select');
//             component.onKeyDown(KeyEvent(KeyCodes.ENTER));
//             expect(component.toggleActive).toHaveBeenCalled();
//             expect(component.select).toHaveBeenCalledWith({
//                 label: 'two',
//                 value: '2'
//             }, 1);
//         });

//         it('should increment selected index when DOWN is pressed', () => {
//             component.active = true;
//             component.selectedIndex = 1;
//             spyOn(component, 'select');
//             component.onKeyDown(KeyEvent(KeyCodes.DOWN));
//             expect(component.selectedIndex).toBe(2);
//         });

//         it('should decrement selected index when UP is pressed', () => {
//             component.active = true;
//             component.selectedIndex = 2;
//             spyOn(component, 'select');
//             component.onKeyDown(KeyEvent(KeyCodes.UP));
//             expect(component.selectedIndex).toBe(1);
//         });
//     });

//     describe('Function: writeValue()', () => {
//         it('should be defined.', () => {
//             expect(component.writeValue).toBeDefined();
//         });

//         it('should change the value', () => {
//             component.writeValue(10);
//             expect(component.model).toBe(10);
//         });
//     });

//     describe('Function: registerOnChange()', () => {
//         it('should be defined.', () => {
//             expect(component.registerOnChange).toBeDefined();
//         });
//     });

//     describe('Function: registerOnTouched()', () => {
//         it('should be defined.', () => {
//             expect(component.registerOnTouched).toBeDefined();
//         });
//     });
// });
