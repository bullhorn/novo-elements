import { NovoFileInputElement } from './FileInput';
import { APP_TEST_PROVIDERS } from './../../../../testing/test-providers';

describe('Element: NovoFileInputElement', () => {
    let component;
    let FakeEvent = () => {
        return {
            preventDefault: () => {},
            dataTransfer: {
                dropEffect: 'fake',
                types: ['File']
            },
            target: 'test-target'
        };
    };

    beforeEach(() => {
        addProviders([
            NovoFileInputElement,
            APP_TEST_PROVIDERS
        ]);
    });

    beforeEach(inject([NovoFileInputElement], _component => {
        component = _component;
        component.name = 'test';
    }));

    describe('Function: ngOnInit()', () => {
        it('should setup drag events', () => {
            expect(component.ngOnInit).toBeDefined();
            spyOn(component.element.nativeElement, 'addEventListener');
            component.ngOnInit();
            expect(component.element.nativeElement.addEventListener).toHaveBeenCalled();
        });
    });

    describe('Function: ngOnDestroy()', () => {
        it('should destroy events.', () => {
            expect(component.ngOnDestroy).toBeDefined();
            spyOn(component.element.nativeElement, 'removeEventListener');
            component.ngOnDestroy();
            expect(component.element.nativeElement.removeEventListener).toHaveBeenCalled();
        });
    });

    describe('Function: dragEnterHandler(event)', () => {
        it('should set active to true.', () => {
            expect(component.dragEnterHandler).toBeDefined();
            let evt = new FakeEvent();
            component.dragEnterHandler(evt);
            expect(evt.dataTransfer.dropEffect).toBe('copy');
            expect(component.active).toBe(true);
        });
    });

    describe('Function: dragLeaveHandler(event)', () => {
        it('should set active to false.', () => {
            expect(component.dragLeaveHandler).toBeDefined();
            let evt = new FakeEvent();
            component.dragLeaveHandler(evt);
            expect(component.active).toBe(false);
        });
    });

    describe('Function: dropHandler(event)', () => {
        it('should set active to false.', () => {
            expect(component.dropHandler).toBeDefined();
            let evt = new FakeEvent();
            component.dropHandler(evt);
            expect(component.active).toBe(false);
        });
    });

    describe('Function: writeValue()', () => {
        it('should be defined.', () => {
            expect(component.writeValue).toBeDefined();
        });

        it('should change the value', () => {
            component.writeValue(10);
            expect(component.model).toBe(10);
        });
    });

    describe('Function: registerOnChange()', () => {
        it('should be defined.', () => {
            expect(component.registerOnChange).toBeDefined();
        });
    });

    describe('Function: registerOnTouched()', () => {
        it('should be defined.', () => {
            expect(component.registerOnTouched).toBeDefined();
        });
    });
});
