import { Component } from '@angular/core';

import { NOVO_SWITCH_ELEMENTS, NovoSwitch } from './Switch';
import { testComponent, grabComponent } from './../../testing/TestHelpers';

@Component({
    selector: 'test-cmp',
    directives: [NOVO_SWITCH_ELEMENTS],
    template: '<novo-switch></novo-switch>'
})
class TestCmp {
    constructor() {
    }
}

describe('Element: Switch', () => {
    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { instance, element, testComponentInstance, testComponentElement } = grabComponent(fixture, NovoSwitch);
        expect(instance).toBeTruthy();
        expect(element).toBeTruthy();
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));
});
