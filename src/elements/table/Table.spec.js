import { Component } from '@angular/core';

import { NovoTable } from './Table';
import { testComponent, grabComponent } from './../../testing/TestHelpers';
import { NOVO_ELEMENTS_LABELS_PROVIDERS } from './../../novo-elements';

@Component({
    selector: 'test-cmp',
    directives: [NovoTable],
    template: '<novo-table [rows]="rows" [columns]="columns" [config]="config" (onTableChange)="onTableChange($event)"></novo-table>'
})
class TestCmp {
    constructor() {
        this.rows = [{ test: 'Hi' }, { test: 'Hey' }];
        this.columns = [{ name: 1 }, { name: 2 }];
        this.config = {};
    }

    onTableChange(event) {
        this.event = event;
    }
}

describe('Element: Table', () => {
    beforeEachProviders(() => [NOVO_ELEMENTS_LABELS_PROVIDERS]);

    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { instance, element, testComponentInstance, testComponentElement } = grabComponent(fixture, NovoTable);
        expect(instance).toBeTruthy();
        expect(element).toBeTruthy();
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));
});
