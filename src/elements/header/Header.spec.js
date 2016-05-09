import { Component } from '@angular/core';

import { NOVO_HEADER_ELEMENTS, NovoHeader } from './Header';
import { testComponent, grabComponent } from './../../testing/TestHelpers';

@Component({
    selector: 'test-cmp',
    directives: [NOVO_HEADER_ELEMENTS],
    template: '<header theme="contact"></header>'
})
class TestCmp {
    constructor() {
    }
}

describe('Element: NovoHeader', () => {
    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { instance, element, testComponentInstance, testComponentElement } = grabComponent(fixture, NovoHeader);
        expect(instance).toBeTruthy();
        expect(element).toBeTruthy();
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));
});
