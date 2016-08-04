import { Component } from '@angular/core';
import { Dropdown, Item } from './Dropdown';
import { testComponent, grabComponent } from './../../testing/TestHelpers';

@Component({
    selector: 'test-cmp',
    directives: [Dropdown, Item],
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

    describe('Element: Item', () => {
        let comp;

        beforeEachProviders(() => [
            Item
        ]);

        beforeEach(inject([Item], _comp => {
            comp = _comp;
        }));

        it('should initialize correctly', () => {
            expect(comp).toBeDefined();
        });

        describe('Function: click', () => {
            beforeEach(() => {
                spyOn(comp.action, 'emit');
            });

            it('should click if not disabled', () => {
                comp.disabled = false;
                comp.onClick();
                expect(comp.action.emit).toHaveBeenCalled();
            });

            it('should not click if disabled', () => {
                comp.disabled = true;
                comp.onClick();
                expect(comp.action.emit).not.toHaveBeenCalled();
            });
        });
    });
});
