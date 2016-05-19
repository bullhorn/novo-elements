import { Component } from '@angular/core';
import { NgModel } from '@angular/common';
import { Chips } from './Chips';
import { testComponent, grabComponent } from './../../testing/TestHelpers';

@Component({
    selector: 'test-cmp',
    directives: [Chips, NgModel],
    template: '<chips [source]="config" [(value)]="value"></chips>'
})
class TestCmp {
    constructor() {
        this.config = {
            options: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
        };
        this.value = 'Alaska';
    }
}

describe('Element: Chips', () => {
    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { element, testComponentInstance, testComponentElement } = grabComponent(fixture, Chips);
        //expect(instance).toBeTruthy();
        expect(element).toBeTruthy();
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));

    xit('should setup the defaults of the picker.', testComponent(TestCmp, (fixture) => {
        const { instance } = grabComponent(fixture, Chips);
        expect(instance.field).toBe('label');
        expect(instance.config).toBeDefined();
        expect(instance.config.options[0]).toBe(1);
    }));

    xit('should call the dynamic component loader which shows the results.', testComponent(TestCmp, (fixture) => {
        const { instance } = grabComponent(fixture, Chips);
        spyOn(instance.loader.loadNextToLocation).and.callFake(() => {
        });
        instance.showResults();
        expect(instance.loader.loadNextToLocation).toHaveBeenCalled();
    }));

    xit('should dispose of the results HTML element.', testComponent(TestCmp, (fixture) => {
        const { instance } = grabComponent(fixture, Chips);
        instance.popup = {
            then: () => {
            }
        };
        spyOn(instance.popup, 'then').and.callFake(() => {
        });
        instance.hideResults();
        expect(instance.popup.then).toHaveBeenCalled();
    }));
});
