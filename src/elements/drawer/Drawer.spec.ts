// import { ElementRef } from '@angular/core';
// import { NovoDrawerElement, NovoDrawerToggleElement } from './Drawer';
// import { APP_TEST_PROVIDERS } from './../../testing/test-providers';

// describe('Element: NovoDrawerElement', () => {
//     let component;
//     let MockElement = new ElementRef(document.createElement('div'));
//     //let FakeEvent;

//     beforeEach(() => {
//         addProviders([
//             NovoDrawerElement,
//             APP_TEST_PROVIDERS
//         ]);
//     });

//     beforeEach(inject([NovoDrawerElement], _component => {
//         component = _component;
//         component.drawerToggle = { el: MockElement };
//         //FakeEvent = { preventDefault: jasmine.createSpy(), stopPropagation: jasmine.createSpy() };
//     }));

//     describe('Function: ngOnInit()', () => {
//         it('should initialize properly', () => {
//             expect(component.ngOnInit).toBeDefined();
//             expect(component.onDrawerToggle).toBeDefined();
//             component.ngOnInit();
//             expect(component.autoClose).toBe('outsideClick');
//             expect(component.position).toBe('left');
//         });
//     });

//     describe('Function: toggle(open)', () => {
//         it('should open or close the drawer', () => {
//             //expect(component.toggle).toBeDefined();
//             let test = component.toggle(false);
//             expect(test).toBeTruthy();
//             test = component.toggle();
//             expect(test).toBeFalsy();
//         });
//     });

//     describe('Function: focusToggleElement()', () => {
//         it('should focus the toggleElement', () => {
//             expect(component.focusToggleElement).toBeDefined();
//             spyOn(component.toggleEl.nativeElement, 'focus');
//             component.focusToggleElement();
//             expect(component.toggleEl.nativeElement.focus).toHaveBeenCalled();
//         });
//     });
// });

// describe('Element: NovoDrawerToggleElement', () => {
//     let component;
//     let FakeEvent;

//     beforeEach(() => {
//         addProviders([
//             NovoDrawerElement,
//             NovoDrawerToggleElement,
//             APP_TEST_PROVIDERS
//         ]);
//     });

//     beforeEach(inject([NovoDrawerToggleElement], _component => {
//         component = _component;
//         FakeEvent = { preventDefault: jasmine.createSpy(), stopPropagation: jasmine.createSpy() };
//     }));

//     describe('Function: ngOnInit()', () => {
//         it('should initialize properly', () => {
//             expect(component.ngOnInit).toBeDefined();
//             expect(component.disabled).toBeFalsy();
//         });
//     });

//     describe('Function: toggleDrawer(event)', () => {
//         it('should toggle drawer', () => {
//             expect(component.toggleDrawer).toBeDefined();
//             spyOn(component.drawer, 'toggle');
//             component.toggleDrawer(FakeEvent);
//             expect(component.drawer.toggle).toHaveBeenCalled();
//         });
//     });

//     describe('Getter: isOpen()', () => {
//         it('should toggle isOpen value', () => {
//             let test = component.isOpen;
//             expect(test).toBeFalsy();
//         });
//     });
// });
