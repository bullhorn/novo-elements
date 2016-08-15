import { NovoChipElement, NovoChipsElement } from './Chips';
import { APP_TEST_PROVIDERS } from './../../testing/test-providers';

describe('Element: NovoChipElement', () => {
    let component;

    beforeEach(() => {
        addProviders([
            NovoChipElement,
            APP_TEST_PROVIDERS
        ]);
    });

    beforeEach(inject([NovoChipElement], _component => {
        component = _component;
    }));

    describe('Function: ngOnInit()', () => {
        it('should initialize correctly', () => {
            expect(component).toBeTruthy();
            expect(component.select).toBeDefined();
            expect(component.remove).toBeDefined();
            expect(component.entity).toBeUndefined();
        });
    });

    describe('Function: onRemove(event)', () => {
        it('should emit remove event', () => {
            spyOn(component.remove, 'emit');
            component.onRemove();
            expect(component.remove.emit).toHaveBeenCalled();
        });
    });

    describe('Function: onSelect(event)', () => {
        it('should emit select event', () => {
            spyOn(component.select, 'emit');
            component.onSelect();
            expect(component.select.emit).toHaveBeenCalled();
        });
    });
});

describe('Element: NovoChipsElement', () => {
    let component;

    beforeEach(() => {
        addProviders([
            NovoChipsElement,
            APP_TEST_PROVIDERS
        ]);
    });

    beforeEach(inject([NovoChipsElement], _component => {
        component = _component;
    }));

    describe('Function: ngOnInit()', () => {
        it('should initialize correctly', () => {
            expect(component).toBeTruthy();
            expect(component.ngOnInit).toBeDefined();
            expect(component.changed).toBeDefined();
            expect(component.focus).toBeDefined();
            expect(component.blur).toBeDefined();
            expect(component.items.length).toBe(0);
        });

        it('should add keydown listeners', () => {
            spyOn(window.document, 'addEventListener');
            component.ngOnInit();
            expect(window.document.addEventListener).toHaveBeenCalled();
        });
    });

    describe('Function: ngOnDestroy(event)', () => {
        it('should remove keydown listeners', () => {
            spyOn(window.document, 'removeEventListener');
            component.ngOnDestroy();
            expect(window.document.removeEventListener).toHaveBeenCalled();
        });
    });

    describe('Function: deselectAll()', () => {
        it('should remove selection', () => {
            component.selected = 'test';
            component.deselectAll();
            expect(component.selected).toBeFalsy();
        });
    });

    describe('Function: select(event, item)', () => {
        it('should select item', () => {
            component.selected = 'before';
            component.select(null, 'after');
            expect(component.selected).toBe('after');
        });
    });

    describe('Function: onFocus(event)', () => {
        it('should remove selection', () => {
            spyOn(component.focus, 'emit');
            component.onFocus();
            expect(component.focus.emit).toHaveBeenCalled();
        });
    });

    describe('Function: add(event)', () => {
        it('should add an item', () => {
            component.add({ value: 'test' });
            expect(component.items[0].value).toBe('test');
        });
    });

    describe('Function: remove(event, item)', () => {
        it('should remove an item', () => {
            let item = { value: 'test' };
            component.items = [item];
            component.remove(null, item);
            expect(component.items.length).toBe(0);
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
