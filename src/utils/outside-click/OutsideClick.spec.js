import { describe, beforeEach, beforeEachProviders } from 'angular2/testing';

import { OutsideClick } from './OutsideClick';

describe('Util: OutsideClick', () => {
    let instance;

    // Inject whatever needed to fulfill DI
    beforeEachProviders(() => []);

    beforeEach(() => {
        instance = new OutsideClick({});
    });

    describe('Initialization', () => {
        it('should all be defined', () => {
            expect(instance).toBeDefined();
        });

        it('should default with the right variables', () => {
            expect(instance.active).toEqual(false);
        });
    });
});
