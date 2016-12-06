import moment from 'moment/moment';
import { NovoDateTimePickerElement } from './DateTimePicker';
import { APP_TEST_PROVIDERS } from './../../testing/test-providers';

describe('Element: NovoDateTimePickerElement', () => {
    let component;

    beforeEach(() => {
        addProviders([
            NovoDateTimePickerElement,
            APP_TEST_PROVIDERS
        ]);
    });

    beforeEach(inject([NovoDateTimePickerElement], _component => {
        component = _component;
    }));

    describe('Function: ngOnInit()', () => {
        it('should initialize correctly', () => {
            expect(component).toBeTruthy();
        });
    });

    describe('Function: select()', () => {
        it('should set selected', () => {
            expect(component.select).toBeDefined();
            component.select({}, { date: undefined });
            let day = { date: moment('12/08/16') };
            let event = { preventDefault: jasmine.createSpy(), stopPropagation: jasmine.createSpy() };
            component.select(event, day);
            expect(component.selected).toBe(day.date);
        });
    });

    describe('Function: open()', () => {
        it('should toggle the view to days and back', () => {
            expect(component.open).toBeDefined();
            let event = { preventDefault: jasmine.createSpy(), stopPropagation: jasmine.createSpy() };
            component.view = 'days';
            component.open(event, 'months');
            expect(component.view).toBe('months');
            //should reset view to days if same string is passed twice
            component.open(event, 'months');
            expect(component.view).toBe('days');
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
