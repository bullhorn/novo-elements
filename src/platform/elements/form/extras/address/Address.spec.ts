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

    describe('Method: showRequired()', () => {
        beforeEach(() => {
            component.config = {
                country: {
                    label: 'country'
                }
            };
        });
        it('should return true if config for field is set', () => {
            component.config.country.required = true;
            expect(component.showRequired('country')).toEqual(true);
        });
        it('should return false if config for field is set to false', () => {
            component.config.country.required = false;
            expect(component.showRequired('country')).toEqual(false);
        });
        it('should return true if config.required is true', () => {
            component.config.required = true;
            expect(component.showRequired('country')).toEqual(true);
        });
    });

    describe('Method: isValid(field: string): boolean', () => {
        beforeEach(() => {
            component.config = {
                address1: {
                    required: true
                },
                country: {
                    required: true
                },
                state: {
                    required: false
                }
            };
        });
        it('should check countryName value for country', () => {
            component.model = {
                countryName: 'usa'
            };
            expect(component.isValid('country')).toEqual(true);
        });
        it('should check validity of required field address1 when it is empty', () => {
            component.model = {
                address1: ''
            };
            expect(component.isValid('address1')).toEqual(false);
        });
        it('should check validity of required field address1 when it is not empty', () => {
            component.model = {
                address1: 'tste'
            };
            expect(component.isValid('address1')).toEqual(true);
        });
        it('should ignore validity of non-required field state', () => {
            component.model = {
                state: 'TN'
            };
            expect(component.isValid('state')).toEqual(false);
        });

    });
});
