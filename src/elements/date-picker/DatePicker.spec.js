import { Component } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';

import { DatePicker } from './DatePicker';
import { testComponent, grabComponent } from './../../testing/TestHelpers';

@Component({
    selector: 'test-cmp',
    directives: [DatePicker, COMMON_DIRECTIVES],
    template: '<novo-date-picker [(ngModel)]="date"></novo-date-picker>'
})
class TestCmp {
    constructor() {
        this.date = new Date();
    }
}

describe('Element: DatePicker', () => {
    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { instance, element, testComponentInstance, testComponentElement } = grabComponent(fixture, DatePicker);
        expect(instance).toBeTruthy();
        expect(element).toBeTruthy();
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));
});
