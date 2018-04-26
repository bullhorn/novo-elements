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
      declarations: [NovoAddressElement],
      imports: [FormsModule, NovoSelectModule],
      providers: [{ provide: NovoLabelService, useClass: NovoLabelService }],
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
    it('should be set up label default for address1', () => {
      component.config = {
        label: 'test',
        address1: {},
      };
      component.ngOnInit();
      expect(component.config.address1.label).toBe('Address');
    });
    it('should be set up required for address1', () => {
      component.config = {
        required: true,
        address1: {},
      };
      component.ngOnInit();
      expect(component.config.address1.required).toBeTruthy();
    });
    it('should be hidden to true if address field does not exist in config object', () => {
      component.config = {
        required: true,
        address1: {},
      };
      component.ngOnInit();
      expect(component.config.address2.hidden).toBeTruthy();
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

  describe('Method: isValid(field: string): void', () => {
    beforeEach(() => {
      component.config = {
        address1: {
          required: true,
          maxlength: 5,
        },
        country: {
          required: true,
        },
        state: {
          required: false,
        },
      };
    });
    it('should check countryName value for country', () => {
      component.model = {
        countryName: 'usa',
      };
      component.isValid('country');
      expect(component.valid.country).toEqual(true);
    });
    it('should check validity of required field address1 when it is empty', () => {
      component.model = {
        address1: '',
      };
      component.isValid('address1');
      expect(component.valid.address1).toEqual(false);
    });
    it('should check validity of required field address1 when it is not empty', () => {
      component.model = {
        address1: 'tste',
      };
      component.isValid('address1');
      expect(component.valid.address1).toEqual(true);
    });
    it('should ignore validity of non-required field state', () => {
      component.model = {
        state: 'TN',
      };
      component.isValid('state');
      expect(component.valid.state).toEqual(false);
    });
    it('should check maxlength of field address1 when it is exceeding', () => {
      component.model = {
        address1: 'testlength',
      };
      component.isValid('address1');
      expect(component.valid.address1).toEqual(false);
    });
    it('should check maxlength of field address1 when it is correct', () => {
      component.model = {
        address1: 'test',
      };
      component.isValid('address1');
      expect(component.valid.address1).toEqual(true);
    });
  });

  describe('Method: isInvalid(field: string): void', () => {
    beforeEach(() => {
      component.config = {
        address1: {
          required: true,
          maxlength: 5,
        },
        country: {
          required: true,
        },
        state: {
          required: false,
        },
      };
    });
    it('should check countryName value for country', () => {
      component.model = {
        countryName: 'r',
      };
      component.isInvalid('country');
      expect(component.invalid.country).toEqual(false);
    });
    it('should check validity of required field address1 when it is empty', () => {
      component.model = {
        address1: '',
      };
      component.isInvalid('address1');
      expect(component.invalid.address1).toEqual(true);
    });
    it('should check validity of required field address1 when it is not empty', () => {
      component.model = {
        address1: 'tste',
      };
      component.isInvalid('address1');
      expect(component.invalid.address1).toEqual(false);
    });
    it('should ignore validity of non-required field state', () => {
      component.model = {
        state: 'TN',
      };
      component.isInvalid('state');
      expect(component.invalid.state).toEqual(false);
    });
    it('should check maxlength of field address1 when it is exceeding', () => {
      component.model = {
        address1: 'testlength',
      };
      component.isInvalid('address1');
      expect(component.invalid.address1).toEqual(true);
    });
    it('should check maxlength of field address1 when it is correct', () => {
      component.model = {
        address1: 'test',
      };
      component.isInvalid('address1');
      expect(component.invalid.address1).toEqual(false);
    });
  });
});
