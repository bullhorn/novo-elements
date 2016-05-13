import { Component } from 'angular2/core';
import { NgModel } from 'angular2/common';
import { By } from 'angular2/platform/common_dom';
import { beforeEach, expect, describe, it } from 'angular2/testing';

import { createTestContext } from './../../testing/TestContext';
import { Picker } from './Picker';

@Component({
    selector: 'test-cmp',
    directives: [Picker, NgModel],
    template: '<input [picker]="config" [(ngModel)]="value"/>'
})
class TestCmp {
    constructor() {
        this.config = {
            options: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
        };
        this.value = 'Alaska';
    }
}

describe('Element: Picker', () => {
    let ctx;
    let instance;
    let element;

    beforeEach(createTestContext(_ctx => ctx = _ctx));

    beforeEach(done => {
        ctx.init(TestCmp)
            .finally(done)
            .subscribe(() => {
                const cmpDebugElement = ctx.fixture.debugElement.query(By.directive(Picker));
                element = cmpDebugElement.nativeElement;
                instance = cmpDebugElement.componentInstance;
            });
    });

    it('should be defined', () => {
        expect(instance).toBeDefined();
        expect(element).toBeDefined();
    });

    xit('should setup the defaults of the picker.', () => {
        expect(instance.field).toBe('label');
        expect(instance.config).toBeDefined();
        expect(instance.config.options[0]).toBe(1);
    });

    xit('should call the dynamic component loader which shows the results.', () => {
        spyOn(instance.loader.loadNextToLocation).and.callFake(() => { });
        instance.showResults();
        expect(instance.loader.loadNextToLocation).toHaveBeenCalled();
    });

    xit('should dispose of the results HTML element.', () => {
        instance.popup = { then: () => { } };
        spyOn(instance.popup, 'then').and.callFake(() => { });
        instance.hideResults();
        expect(instance.popup.then).toHaveBeenCalled();
    });
});
