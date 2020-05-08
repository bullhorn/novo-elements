// APP
import { SavedSearchDropdown } from './SavedSearchDropdown';

describe('SavedSearchDropdown', () => {
    let instance: any;

    beforeEach(() => {
        addProviders([SavedSearchDropdown]);
    });

    beforeEach(inject([SavedSearchDropdown], (_instance) => {
        instance = _instance;
    }));

    describe('Initialization', () => {
        it('should all be defined', () => {
            expect(instance).toBeDefined();
        });
    });

    describe('callback()', () => {
        beforeEach(inject([SavedSearchDropdown], (_instance) => {
            instance.parent = {};
        }));
        it('should call config.callback', () => {
            instance.config = {
                callback(): any {},
            };
            spyOn(instance.config, 'callback');
            instance.triggerCallback();
            expect(instance.config.callback).toHaveBeenCalled();
        });
        it('should prevent farther handling', () => {
            const mockEvent: any = {
                preventDefault: () => {},
                stopPropagation: () => {},
            };
            spyOn(mockEvent, 'preventDefault');
            spyOn(mockEvent, 'stopPropagation');

            instance.triggerCallback(mockEvent);
            expect(mockEvent.preventDefault).toHaveBeenCalled();
            expect(mockEvent.stopPropagation).toHaveBeenCalled();
        });
    });
});
