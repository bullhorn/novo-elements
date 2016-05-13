import { Component } from '@angular/core';

import { NOVO_LIST_ELEMENTS, NovoList } from './List';
import { testComponent, grabComponent } from './../../testing/TestHelpers';

@Component({
    selector: 'test-cmp',
    directives: [NOVO_LIST_ELEMENTS],
    template: '<novo-list></novo-list>'
})
class TestCmp {
    constructor() {
    }
}

describe('Element: NovoList', () => {
    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { instance, element, testComponentInstance, testComponentElement } = grabComponent(fixture, NovoList);
        expect(instance).toBeTruthy();
        expect(element).toBeTruthy();
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));
});
