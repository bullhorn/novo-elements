// TODO - covert!
import { TestComponentBuilder, describe, expect, beforeEach, injectAsync, it } from 'angular2/testing';
import { Component } from 'angular2/core';
import { DOM } from 'angular2/src/platform/dom/dom_adapter';
import { Select } from './Select';

@Component({
    selector: 'test-cmp',
    directives: [Select],
    template: '<novo-select [items]="options" [placeholder]="placeholder"></novo-select>'
})
class TestComponent {
    constructor() {
        this.placeholder = 'Testing';
        this.options = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    }
}

describe('Select Component', () => {
    let fixture,
        instance,
        element,
        click = (el) => {
            let evt = document.createEvent('MouseEvents');
            evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
            el.dispatchEvent(evt);
            fixture.detectChanges();
        };

    beforeEach(injectAsync([TestComponentBuilder], (tcb) => {
        return tcb.createAsync(TestComponent).then((root) => {
            root.detectChanges();
            fixture = root;
            element = fixture.debugElement;
            instance = element.componentInstance;
            return true;
        });
    }));

    describe('Basic', () => {
        it('should work', () => {
            expect(instance).toBeDefined();
            expect(element).toBeDefined();
        });

        it('should have placeholder as button text', () => {
            let button = DOM.query('button');
            expect(button.innerText).toBe('Testing');
        });

        it('should create the menu items', () => {
            let items = document.querySelectorAll('.novo-select-list li span');
            expect(items.length).toBe(50);
            expect(items[0].innerText).toBe('Alabama');
        });

        it('should open/close on click', () => {
            let button = DOM.query('button'),
                menu = DOM.query('.novo-select-list');

            expect(menu.classList.contains('active')).toBe(false);
            click(button);
            expect(menu.classList.contains('active')).toBe(true);
            click(button);
            expect(menu.classList.contains('active')).toBe(false);
        });

        it('should close on document click', () => {
            let button = DOM.query('button'),
                menu = DOM.query('.novo-select-list');

            expect(menu.classList.contains('active')).toBe(false);
            click(button);
            expect(menu.classList.contains('active')).toBe(true);
            click(document.body);
            expect(menu.classList.contains('active')).toBe(false);
        });

        it('should set the value when an option is clicked', () => {
            let button = DOM.query('button'),
                menu = DOM.query('.novo-select-list'),
                items = document.querySelectorAll('.novo-select-list li span');

            click(button);
            expect(menu.classList.contains('active')).toBe(true);
            click(items[5]);
            expect(menu.classList.contains('active')).toBe(false);

            expect(button.innerText).toBe('Colorado');
        });
    });
});
