import { Component } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';

import { TimePicker } from './TimePicker';
import { testComponent, grabComponent } from './../../testing/TestHelpers';

@Component({
    selector: 'test-cmp',
    directives: [TimePicker, COMMON_DIRECTIVES],
    template: '<novo-time-picker [(ngModel)]="date"></novo-time-picker>'
})
class TestCmp {
    constructor() {
        this.date = new Date();
    }
}

describe('Element: TimePicker', () => {
    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { instance, element, testComponentInstance, testComponentElement } = grabComponent(fixture, TimePicker);
        expect(instance).toBeTruthy();
        expect(element).toBeTruthy();
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));
});
