// NG2
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
// App
import { NovoAddressElement } from './Address';
import { NovoSelectModule } from '../../../select/Select.module';
import { NovoLabelService } from '../../../../services/novo-label-service';

describe('Elements: NovoAddressElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoAddressElement
            ],
            imports: [
                FormsModule,
                NovoSelectModule
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
        it('should be set up label for address1', () => {
            component.config = {};
            component.ngOnInit();
            expect(component.config.address1.label).toBeDefined();
        });
        it('should be set up config', () => {
            component.ngOnInit();
            expect(component.config.address1.label).toBeDefined();
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
