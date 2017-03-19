// NG2
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
// App
import { NovoPickerElement } from './Picker';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import { NovoPickerContainer } from './extras/picker-container/PickerContainer';

describe('Elements: NovoPickerElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoPickerElement,
                NovoPickerContainer
            ],
            providers: [
                { provide: ComponentUtils, useClass: ComponentUtils }
            ],
            imports: [
                FormsModule
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoPickerElement);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize correctly', () => {
        expect(component).toBeTruthy();
    });

    describe('Method: ngOnInit()', () => {
        it('should be defined.', () => {
            expect(component.ngOnInit).toBeDefined();
            // component.ngOnInit();
        });
    });

    describe('Method: onKeyUp()', () => {
        it('should be defined.', () => {
            expect(component.onKeyUp).toBeDefined();
            component.onKeyUp();
        });
    });

    describe('Method: clearValue()', () => {
        it('should be defined.', () => {
            expect(component.clearValue).toBeDefined();
            component.clearValue();
        });
    });

    describe('Method: onFocus()', () => {
        it('should be defined.', () => {
            expect(component.onFocus).toBeDefined();
            component.onFocus();
        });
    });

    describe('Method: showResults()', () => {
        it('should be defined.', () => {
            expect(component.showResults).toBeDefined();
            // component.showResults();
        });
    });

    describe('Method: hideResults()', () => {
        it('should be defined.', () => {
            expect(component.hideResults).toBeDefined();
            component.hideResults();
        });
    });

    describe('Method: checkTerm()', () => {
        it('should be defined.', () => {
            expect(component.checkTerm).toBeDefined();
            component.checkTerm();
        });
    });

    describe('Method: onTouched()', () => {
        it('should be defined.', () => {
            expect(component.onTouched).toBeDefined();
            component.onTouched();
        });
    });

    describe('Method: writeValue()', () => {
        it('should be defined.', () => {
            expect(component.writeValue).toBeDefined();
            // component.writeValue();
        });
    });

    describe('Method: registerOnChange()', () => {
        it('should be defined.', () => {
            expect(component.registerOnChange).toBeDefined();
            component.registerOnChange();
        });
    });

    describe('Method: registerOnTouched()', () => {
        it('should be defined.', () => {
            expect(component.registerOnTouched).toBeDefined();
            component.registerOnTouched();
        });
    });
});
