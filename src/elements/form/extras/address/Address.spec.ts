// NG2
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
// App
import { NovoAddressElement } from './Address';
import { NovoSelectElement } from '../../../select/Select';
import { NovoLabelService } from '../../../../services/novo-label-service';

describe('Elements: NovoAddressElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoAddressElement,
                NovoSelectElement
            ],
            imports: [
                FormsModule
            ],
            providers: [
                { provide: NovoLabelService, useClass: NovoLabelService }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoAddressElement);
        component = fixture.debugElement.componentInstance;
    }));
    it('should initialize correctly.', () => {
        expect(component).toBeDefined();
    });

    describe('Method: ngOnInit()', () => {
        it('should be defined.', () => {
            expect(component.ngOnInit).toBeDefined();
            component.ngOnInit();
        });
    });

    describe('Method: onCountryChange()', () => {
        it('should be defined.', () => {
            expect(component.onCountryChange).toBeDefined();
            // component.onCountryChange();
        });
    });

    describe('Method: onStateChange()', () => {
        it('should be defined.', () => {
            expect(component.onStateChange).toBeDefined();
            // component.onStateChange();
        });
    });

    describe('Method: updateStates()', () => {
        it('should be defined.', () => {
            expect(component.updateStates).toBeDefined();
            // component.updateStates();
        });
    });

    describe('Method: updateControl()', () => {
        it('should be defined.', () => {
            expect(component.updateControl).toBeDefined();
            component.updateControl();
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
