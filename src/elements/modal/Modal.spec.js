import { Component } from '@angular/core';

import { testComponent, grabComponent } from '../../testing/TestHelpers';
import { NovoModal, ModalRef } from './Modal';

@Component({
    selector: 'test-cmp',
    directives: [NovoModal],
    template: '<novo-modal></novo-modal>'
})
class TestCmp {
    constructor() {
    }
}

describe('Element: NovoModal', () => {
    beforeEachProviders(() => [ModalRef]);

    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { instance, element } = grabComponent(fixture, NovoModal);
        expect(instance).toBeTruthy();
        expect(element).toBeTruthy();
    }));
});
