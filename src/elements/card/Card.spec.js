
import { Component } from '@angular/core';

import { Card } from './Card';
import { testComponent, grabComponent } from './../../testing/TestHelpers';

@Component({
    selector: 'test-cmp',
    directives: [Card],
    template: `
        <novo-card [title]="'All Attributes :)'"
                [loading]="loading"
                [message]="message"
                [refresh]="refresh"
                [close]="close"
                (onRefresh)="onRefresh()"
                (onClose)="onClose()">
            This is the ALL attribute card content!
            <footer>I AM THE FOOTER</footer>
        </novo-card>
    `
})
class TestCmp {
    constructor() {
        this.refresh = true;
        this.close = true;
    }

    onClose() {
        console.log('CLOSE'); // eslint-disable-line
    }

    onRefresh() {
        console.log('REFRESH'); // eslint-disable-line
    }
}

describe('Element: Card', () => {
    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { instance, element, testComponentInstance, testComponentElement } = grabComponent(fixture, Card);
        expect(instance).toBeTruthy();
        expect(element).toBeTruthy();
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));
});
