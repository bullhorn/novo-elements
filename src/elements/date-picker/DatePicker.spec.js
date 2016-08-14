// TODO
// import { Component } from '@angular/core';
// import { COMMON_DIRECTIVES } from '@angular/common';
//
// import { DatePicker } from './DatePicker';
// import { testComponent, grabComponent } from './../../testing/TestHelpers';
// import moment from 'moment/moment';
//
// @Component({
//     selector: 'test-cmp',
//     directives: [DatePicker, COMMON_DIRECTIVES],
//     template: '<novo-date-picker [(ngModel)]="date"></novo-date-picker>'
// })
// class TestCmp {
//     constructor() {
//         this.date = new Date();
//     }
// }
//
//
// describe('Element: DatePicker', () => {
//     let comp;
//     beforeEachProviders(() => [
//         DatePicker
//     ]);
//
//     it('should initialize correctly', testComponent(TestCmp, (fixture) => {
//         const { instance, element, testComponentInstance, testComponentElement } = grabComponent(fixture, DatePicker);
//         expect(instance).toBeTruthy();
//         expect(element).toBeTruthy();
//         expect(testComponentInstance).toBeTruthy();
//         expect(testComponentElement).toBeTruthy();
//     }));
//
//     beforeEach(inject([DatePicker], _comp => {
//         comp = _comp;
//     }));
//
//     it('should initialize with all of its defaults.', () => {
//         expect(comp).toBeDefined();
//     });
//
//     describe('Function: select()', () => {
//         it('should set selected', () => {
//             expect(comp.select).toBeDefined();
//             comp.select(event, { date: undefined });
//             let day = { date: moment('12/08/16') };
//             let event = { preventDefault: jasmine.createSpy(), stopPropagation: jasmine.createSpy() };
//             comp.select(event, day);
//             expect(comp.selected).toBe(day.date);
//         });
//
//         it('should not set default selected values for range', () => {
//             expect(comp.select).toBeDefined();
//             comp.range = true;
//             expect(comp.selected).not.toBeDefined();
//             expect(comp.selected2).not.toBeDefined();
//         });
//
//         it('should set selected values for range', () => {
//             expect(comp.select).toBeDefined();
//             comp.select(event, { date: undefined });
//             let day = { date: moment('12/08/16') };
//             let day2 = { date: moment('12/10/16') };
//             let event = { preventDefault: jasmine.createSpy(), stopPropagation: jasmine.createSpy() };
//             comp.range = true;
//             comp.select(event, day);
//             comp.select(event, day2);
//             expect(comp.selected).toBe(day.date);
//             expect(comp.selected2).toBe(day2.date);
//         });
//
//         it('should not set selected2 value if not range', () => {
//             expect(comp.select).toBeDefined();
//             comp.select(event, { date: undefined });
//             let day = { date: moment('12/08/16') };
//             let day2 = { date: moment('12/10/16') };
//             let event = { preventDefault: jasmine.createSpy(), stopPropagation: jasmine.createSpy() };
//             comp.range = false;
//             comp.select(event, day);
//             comp.select(event, day2);
//             expect(comp.selected).toBe(day2.date);
//             expect(comp.selected2).toBe(undefined);
//         });
//
//         it('should swap the selected values if selected2 is before selected', () => {
//             expect(comp.select).toBeDefined();
//             comp.select(event, { date: undefined });
//             let day = { date: moment('12/10/16') };
//             let day2 = { date: moment('12/08/16') };
//             let event = { preventDefault: jasmine.createSpy(), stopPropagation: jasmine.createSpy() };
//             comp.range = true;
//             comp.select(event, day);
//             comp.select(event, day2);
//             expect(comp.selected2).toBe(day.date);
//             expect(comp.selected).toBe(day2.date);
//         });
//
//         it('should clear selected range on 3rd date selection', () => {
//             expect(comp.select).toBeDefined();
//             comp.select(event, { date: undefined });
//             let day = { date: moment('12/08/16') };
//             let day2 = { date: moment('12/09/16') };
//             let day3 = { date: moment('12/10/16') };
//             let event = { preventDefault: jasmine.createSpy(), stopPropagation: jasmine.createSpy() };
//             comp.range = true;
//             comp.select(event, day);
//             comp.select(event, day2);
//             comp.select(event, day3);
//             expect(comp.selected2).toBe(null);
//             expect(comp.selected).toBe(day3.date);
//         });
//     });
//
//     describe('Function: open()', () => {
//         it('should toggle the view to days and back', () => {
//             expect(comp.open).toBeDefined();
//             let event = { preventDefault: jasmine.createSpy(), stopPropagation: jasmine.createSpy() };
//             comp.view = 'days';
//             comp.open(event, 'months');
//             expect(comp.view).toBe('months');
//             //should reset view to days if same string is passed twice
//             comp.open(event, 'months');
//             expect(comp.view).toBe('days');
//         });
//     });
//
//     describe('Function: writeValue()', () => {
//         it('should set this.value', () => {
//             expect(comp.writeValue).toBeDefined();
//             comp.writeValue(123456);
//             expect(comp.value).toBe(123456);
//         });
//     });
// });
