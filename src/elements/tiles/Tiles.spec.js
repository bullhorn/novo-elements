import { Component } from '@angular/core';

import { Tiles } from './Tiles';
import { testComponent, grabComponent } from './../../testing/TestHelpers';
import { NovoLabelService } from '../../services/novo-label-service';

@Component({
    selector: 'test-cmp',
    directives: [Tiles],
    template: '<novo-tiles [options]="demoTiles"></novo-tiles>'
})
class TestCmp {
    constructor() {
        this.demoTiles = [
            {
                label: '1',
                value: '1'
            },
            {
                label: '2',
                value: '2'
            },
            {
                label: '3',
                value: '3'
            }
        ];
    }
}

describe('Element: Tiles', () => {
    let comp;
    beforeEachProviders(() => [
        Tiles,
        NovoLabelService
    ]);

    it('should initialize correctly', testComponent(TestCmp, (fixture) => {
        const { instance, element, testComponentInstance, testComponentElement } = grabComponent(fixture, Tiles);
        expect(instance).toBeTruthy();
        expect(element).toBeTruthy();
        expect(element.outerHTML).toContain('novo-tiles');
        expect(testComponentInstance).toBeTruthy();
        expect(testComponentElement).toBeTruthy();
    }));

    beforeEach(inject([Tiles], _comp => {
        comp = _comp;
    }));

    describe('Function: ngOnInit()', () => {
        it('should be defined.', () => {
            expect(comp.ngOnInit).toBeDefined();
        });
    });

    describe('Function: select(event, item)', () => {
        it('should be defined.', () => {
            expect(comp.select).toBeDefined();
        });
    });
});
