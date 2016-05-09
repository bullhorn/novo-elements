import { Component } from '@angular/core';

import { testComponent, grabComponent } from '../../testing/TestHelpers';
import { NovoToast } from './Toast';

@Component({
    selector: 'test-cmp',
    directives: [NovoToast],
    template: '<novo-toast></novo-toast>'
})
class TestCmp {
    constructor() {
    }
}

describe('Element: NovoToast', () => {
    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { instance, element } = grabComponent(fixture, NovoToast);
        expect(instance).toBeTruthy();
        expect(element).toBeTruthy();
    }));
});
