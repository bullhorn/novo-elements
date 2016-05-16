import { Component } from '@angular/core';
import { Dropdown } from './Dropdown';
import { testComponent, grabComponent } from './../../testing/TestHelpers';

@Component({
    selector: 'test-cmp',
    directives: [Dropdown],
    template: `
        <novo-dropdown>
            <button type="button" theme="header" icon="collapse">Actions</button>
            <list>
                <item>Action 1</item>
                <item>Action 2</item>
                <item>Action 3</item>
            </list>
        </novo-dropdown>
    `
})
class TestCmp {
}

describe('Element: Dropdown', () => {
    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { instance, element, testComponentInstance, testComponentElement } = grabComponent(fixture, Dropdown);
        expect(instance).toBeTruthy();
        expect(element).toBeTruthy();
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));
});
