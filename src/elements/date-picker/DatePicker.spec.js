import moment from 'moment/moment';
import { NovoDatePickerElement } from './DatePicker';
import { APP_TEST_PROVIDERS } from './../../testing/test-providers';

describe('Element: NovoDatePickerElement', () => {
    let component;

    beforeEach(() => {
        addProviders([
            NovoDatePickerElement,
            APP_TEST_PROVIDERS
        ]);
    });

    beforeEach(inject([NovoDatePickerElement], _component => {
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
            component.select(event, { date: undefined });
            let day = { date: moment('12/08/16') };
            let event = { preventDefault: jasmine.createSpy(), stopPropagation: jasmine.createSpy() };
            component.select(event, day);
            expect(component.selected).toBe(day.date);
        });

        it('should not set default selected values for range', () => {
            expect(component.select).toBeDefined();
            component.range = true;
            expect(component.selected).not.toBeDefined();
            expect(component.selected2).not.toBeDefined();
        });

        it('should set selected values for range', () => {
            expect(component.select).toBeDefined();
            component.select(event, { date: undefined });
            let day = { date: moment('12/08/16') };
            let day2 = { date: moment('12/10/16') };
            let event = { preventDefault: jasmine.createSpy(), stopPropagation: jasmine.createSpy() };
            component.range = true;
            component.select(event, day);
            component.select(event, day2);
            expect(component.selected).toBe(day.date);
            expect(component.selected2).toBe(day2.date);
        });

        it('should not set selected2 value if not range', () => {
            expect(component.select).toBeDefined();
            component.select(event, { date: undefined });
            let day = { date: moment('12/08/16') };
            let day2 = { date: moment('12/10/16') };
            let event = { preventDefault: jasmine.createSpy(), stopPropagation: jasmine.createSpy() };
            component.range = false;
            component.select(event, day);
            component.select(event, day2);
            expect(component.selected).toBe(day2.date);
            expect(component.selected2).toBe(undefined);
        });

        it('should swap the selected values if selected2 is before selected', () => {
            expect(component.select).toBeDefined();
            component.select(event, { date: undefined });
            let day = { date: moment('12/10/16') };
            let day2 = { date: moment('12/08/16') };
            let event = { preventDefault: jasmine.createSpy(), stopPropagation: jasmine.createSpy() };
            component.range = true;
            component.select(event, day);
            component.select(event, day2);
            expect(component.selected2).toBe(day.date);
            expect(component.selected).toBe(day2.date);
        });

        it('should clear selected range on 3rd date selection', () => {
            expect(component.select).toBeDefined();
            component.select(event, { date: undefined });
            let day = { date: moment('12/08/16') };
            let day2 = { date: moment('12/09/16') };
            let day3 = { date: moment('12/10/16') };
            let event = { preventDefault: jasmine.createSpy(), stopPropagation: jasmine.createSpy() };
            component.range = true;
            component.select(event, day);
            component.select(event, day2);
            component.select(event, day3);
            expect(component.selected2).toBe(null);
            expect(component.selected).toBe(day3.date);
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
