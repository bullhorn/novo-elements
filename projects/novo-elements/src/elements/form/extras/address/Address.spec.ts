// NG2
import { waitForAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NovoLabelService } from 'novo-elements/services';
import { NovoPickerModule } from 'novo-elements/elements/picker';
import { NovoSelectModule } from 'novo-elements/elements/select';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
// App
import { Helpers } from 'novo-elements/utils';
import { NovoAddressElement } from './Address';

describe('Elements: NovoAddressElement', () => {
  let fixture;
  let component;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NovoAddressElement],
      imports: [FormsModule, NovoSelectModule, NovoPickerModule, NovoTooltipModule],
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
  });

  describe('Method: initConfig()', () => {
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
    it('should be set up readOnly for address1', () => {
      component.config = {
        required: true,
        readOnly: true,
      };
      component.ngOnInit();
      expect(component.config.address1.readOnly).toBeTruthy();
    });
  });

  describe('onCountryChange()', () => {
    beforeEach(() => {
      component.model = {};
      component.disabled = {};
      component.tooltip = {};
      component.invalid = {};
      component.config = {
        countryID: {
          pickerConfig: {
            field: 'id',
            format: '{name}',
          },
          updated: false,
        },
        state: {
          pickerConfig: {},
        },
      };
    });
    it('should set countryID and enable state field when country is selected', () => {
      jest.spyOn(Helpers, 'interpolate').mockReturnValue('United States');
      const event = { rawValue: { id: 1, name: 'United States' } };

      component.onCountryChange(event as any);

      expect(component.model.countryID).toBe(1);
    });

    it('should clear countryID and disable state field when country is cleared', () => {
      const event = { rawValue: null };

      component.onCountryChange(event as any);

      expect(component.model.countryID).toBeUndefined();
      expect(component.disabled.state).toBe(true);
    });
  });

  describe('Method: onStateChange()', () => {
    it('should be defined.', () => {
      expect(component.onStateChange).toBeDefined();
    });
  });

  describe('Method: updateStates()', () => {
    let stateOptionsSpy;

    beforeEach(() => {
      component.disabled = {};
      component.stateOptions = () => {};
      jest.spyOn(component, 'setStateLabel');
      jest.spyOn(component.validityChange, 'emit');
      jest.spyOn(component, 'onInput');
      component.config = {
        state: {
          required: false,
          pickerConfig: {
            options: () => {},
          },
        },
      };
      component.model = {
        countryID: 1,
      };
      stateOptionsSpy = jest.spyOn(component, 'stateOptions').mockResolvedValue(['MA']);
    });
    it('should be defined.', () => {
      expect(component.updateStates).toBeDefined();
    });
    it('should reset state.pickerConfig.options', () => {
      component.updateStates();
      component.config.state.pickerConfig.options('query');
      expect(stateOptionsSpy).toHaveBeenCalledWith('query', component.model.countryID);
    });
    it('should set config.state.pickerConfig.defaultOptions', (done: any) => {
      component.updateStates();
      setTimeout(() => {
        expect(component.config.state.pickerConfig.defaultOptions).toEqual(['MA']);
        done();
      });
    });
    it('should reset tooltip and un-disable state & setStateLabel', (done: any) => {
      component.updateStates();
      setTimeout(() => {
        expect(component.tooltip.state).toBeUndefined();
        expect(component.disabled.state).toEqual(false);
        expect(component.setStateLabel).toHaveBeenCalled();
        done();
      });
    });
    it('should set tooltip and disable state & set validity of state when there are no state options', (done: any) => {
      const spy = jest.spyOn(component, 'stateOptions').mockResolvedValue([]);
      component.updateStates();
      setTimeout(() => {
        expect(component.tooltip.state).toEqual(component.labels.noStatesForCountry);
        expect(component.disabled.state).toEqual(true);
        expect(component.valid.state).toEqual(false);
        done();
      });
    });
    it('should set validity of state when there are no state options', (done: any) => {
      const spy = jest.spyOn(component, 'stateOptions').mockResolvedValue([]);
      component.config.state.required = true;
      component.updateStates();
      setTimeout(() => {
        expect(component.valid.state).toEqual(false);
        done();
      });
    });
    it('should emit validityChangeEvent and call onInput for state', (done: any) => {
      component.updateStates();
      setTimeout(() => {
        expect(component.validityChange.emit).toHaveBeenCalled();
        expect(component.onInput).toHaveBeenCalledWith(null, 'state');
        done();
      });
    });
  });

  describe('Method: writeValue()', () => {
    beforeEach(() => {
      component.config = {
        countryID: {
          required: true,
          pickerConfig: {
            getLabels: () => {},
          },
        },
        state: {
          required: false,
          pickerConfig: {},
        },
      };
      jest.spyOn(component.config.countryID.pickerConfig, 'getLabels').mockResolvedValue({ label: 'country name' });
      jest.spyOn(component, 'isValid');
      jest.spyOn(component, 'isInvalid');
      jest.spyOn(component, 'updateStates');
    });
    it('should be defined.', () => {
      expect(component.writeValue).toBeDefined();
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
        zip: {
          required: true,
        },
        address1: {
          required: true,
          maxlength: 5,
        },
        countryID: {
          required: true,
        },
        state: {
          required: false,
          pickerConfig: {},
        },
      };
    });
    it('should check validity of required field address1 when it is empty', () => {
      component.model = {
        address1: '',
      };
      component.isValid('address1');
      expect(component.valid.address1).toEqual(false);
    });
    it('should check validity of required field zip when it is empty', () => {
      component.model = {
        zip: '',
      };
      component.isValid('zip');
      expect(component.valid.zip).toEqual(false);
    });
    it('should check validity of required field address1 when it is not empty', () => {
      component.model = {
        address1: 'tste',
      };
      component.isValid('address1');
      expect(component.valid.address1).toEqual(true);
    });
    it('should check countryName value for country', () => {
      component.model = {
        countryName: 'usa',
        countryID: 1,
      };
      component.isValid('countryID');
      expect(component.valid.countryID).toEqual(true);
    });
    it('should check countryName value for country', () => {
      component.model = {
        countryName: '',
        countryID: undefined,
      };
      component.isValid('countryID');
      expect(component.valid.countryID).toEqual(false);
    });
    it('should ignore validity of non-required field state', () => {
      component.model = {
        state: 'TN',
      };
      component.isValid('state');
      expect(component.valid.state).toEqual(false);
    });
    it('should check value for state when it is required and no country is selected and there is no pickerConfig', () => {
      component.model = {
        state: '',
        countryName: undefined,
      };
      component.config.state.required = true;
      component.isValid('state');
      expect(component.valid.state).toEqual(false);
    });
    it('should check value for state when it is required and no country is selected and there is pickerConfig', () => {
      component.model = {
        state: '',
        countryName: undefined,
      };
      component.config.state.required = true;
      component.config.state.pickerConfig.defaultOptions = ['Massachusetts'];
      component.isValid('state');
      expect(component.valid.state).toEqual(false);
    });
    it('should check value for state when it is required and no country is selected', () => {
      component.model = {
        state: '',
        countryID: undefined,
      };
      component.config.state.required = true;
      component.isValid('state');
      expect(component.valid.state).toEqual(false);
    });
    it('should check value for state when it is required and country is selected which has state options', () => {
      component.model = {
        state: '',
        countryID: undefined,
      };
      component.config.state.required = true;
      component.config.state.pickerConfig.defaultOptions = ['Massachusetts'];
      component.isValid('state');
      expect(component.valid.state).toEqual(false);
    });
    it('should check value for state when it is required and country is selected which has no state options', () => {
      component.model = {
        state: '',
        countryID: undefined,
      };
      component.config.state.required = true;
      component.config.state.pickerConfig.defaultOptions = [];
      component.isValid('state');
      expect(component.valid.state).toEqual(false);
    });
    it('should check value for state when it is required and country is selected which has no state options', () => {
      component.model = {
        state: undefined,
        countryID: undefined,
      };
      component.config.state.required = true;
      component.config.state.pickerConfig.defaultOptions = [];
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
        countryID: {
          required: true,
        },
        state: {
          required: false,
          pickerConfig: {},
        },
      };
    });
    it('should check countryName value for country', () => {
      component.model = {
        countryName: 'r',
      };
      component.isInvalid('countryID');
      expect(component.invalid.countryID).toEqual(false);
    });
    it('should check countryID value for country when countryID is undefined and countryName is not', () => {
      component.model = {
        countryID: undefined,
        countryName: '',
      };
      component.isInvalid('countryID');
      expect(component.invalid.countryID).toEqual(false);
    });
    it('should check countryID value for country when countryID and countryName are undefined', () => {
      component.model = {
        countryID: undefined,
        countryName: undefined,
      };
      component.isInvalid('countryID');
      expect(component.invalid.countryID).toEqual(false);
    });
    it('should check countryID value for country when countryID and countryName are undefined and counrty is updated before', () => {
      component.model = {
        countryID: undefined,
        countryName: undefined,
      };
      component.config.state.updated = true;
      component.isInvalid('countryID');
      expect(component.invalid.countryID).toEqual(false);
    });
    it('should check validity of required field address1 when it is empty', () => {
      component.model = {
        address1: '',
      };
      component.isInvalid('address1');
      expect(component.invalid.address1).toEqual(true);
    });
    it('should check validity of required field address1 when it is undefined', () => {
      component.model = {
        address1: undefined,
      };
      component.isInvalid('address1');
      expect(component.invalid.address1).toEqual(false);
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
    it('should check value for state when it is required and no country is selected and state was never updated', () => {
      component.model = {
        state: '',
        countryName: undefined,
      };
      component.config.state.required = true;
      component.config.state.pickerConfig.defaultOptions = ['Massachusetts'];
      component.config.state.updated = false;
      component.isInvalid('state');
      expect(component.invalid.state).toEqual(false);
    });
    it('should check value for state when it is required and no country is selected and state was updated before', () => {
      component.model = {
        state: '',
        countryName: undefined,
      };
      component.config.state.required = true;
      component.config.state.updated = true;
      component.config.state.pickerConfig.defaultOptions = ['Massachusetts'];
      component.isInvalid('state');
      expect(component.invalid.state).toEqual(false);
    });
    it('should check value for state when it is required and no country is selected', () => {
      component.model = {
        state: '',
        countryID: undefined,
      };
      component.config.state.required = true;
      component.config.state.updated = false;
      component.config.state.pickerConfig.defaultOptions = ['Massachusetts'];
      component.isInvalid('state');
      expect(component.invalid.state).toEqual(false);
    });
    it('should check value for state when it is required and country is selected which has state options, state was never updated before', () => {
      component.model = {
        state: '',
        countryID: undefined,
      };
      component.config.state.required = true;
      component.config.state.pickerConfig.defaultOptions = ['Massachusetts'];
      component.config.state.updated = false;
      component.isInvalid('state');
      expect(component.invalid.state).toEqual(false);
    });
    it('should check value for state when it is required and country is selected which has state options, state was updated before', () => {
      component.model = {
        state: '',
        countryID: 1,
      };
      component.config.state.required = true;
      component.config.state.pickerConfig.defaultOptions = ['Massachusetts'];
      component.config.state.updated = true;
      component.isInvalid('state');
      expect(component.invalid.state).toEqual(true);
    });
    it('should check value for state when it is required and country is selected which has no state options', () => {
      component.model = {
        state: '',
        countryID: undefined,
      };
      component.config.state.required = true;
      component.config.state.updated = true;
      component.config.state.pickerConfig.defaultOptions = [];
      component.isInvalid('state');
      expect(component.invalid.state).toEqual(false);
    });
    it('should check value for state when it is required and country is selected which has no state options', () => {
      component.model = {
        state: undefined,
        countryID: undefined,
      };
      component.config.state.required = true;
      component.config.state.pickerConfig.defaultOptions = [];
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
    it('should render element disabled when containing control element set to readOnly', () => {
      component.config = {
        address1: { required: false },
        address2: { required: false },
        city: { required: false },
        state: { required: false, pickerConfig: {} },
        zip: { required: false },
        countryID: { required: false, pickerConfig: {} },
      };
      component.model = undefined;
      component.disabled = {};
      component.readOnly = true;
      component.fieldList.forEach((field: string) => {
        expect(component.disabled[field]).toEqual(true);
      });
      component.readOnly = false;
      component.fieldList.forEach((field: string) => {
        expect(component.disabled[field]).toEqual(false);
      });
    });
  });
  describe('Method: get default country config', () => {
    it('maps the countries global into a list of value/label objects', async () => {
      const result = await component.getDefaultCountryConfig().options();

      expect(result.length > 0).toBe(true);
      expect(result.every((country) => 'value' in country && 'label' in country && Object.keys(country).length === 2)).toBe(true);
    });
  });

  describe('Method: ngDoCheck()', () => {
    beforeEach(() => {
      component.config = {
        address1: { required: false },
        address2: { required: false },
        city: { required: false },
        state: { required: false },
        zip: { required: false },
        countryID: { required: false },
      };
      component.initComplete = true;
      component.model = {};
      jest.spyOn(component, 'isValid');
      jest.spyOn(component, 'isInvalid');
    });

    it('should not run if initComplete is false', () => {
      component.initComplete = false;
      component.ngDoCheck();
      expect(component.isValid).not.toHaveBeenCalled();
    });

    it('should call isValid and isInvalid when required state changes', () => {
      component.previousRequiredState = {
        address1: false,
        address2: false,
        city: false,
        state: false,
        zip: false,
        countryID: false,
      };
      component.config.address1.required = true;
      component.ngDoCheck();
      expect(component.isValid).toHaveBeenCalledWith('address1');
      expect(component.isInvalid).toHaveBeenCalledWith('address1');
      expect(component.previousRequiredState.address1).toBe(true);
    });

    it('should not call isValid or isInvalid when required state does not change', () => {
      component.previousRequiredState = {
        address1: false,
        address2: false,
        city: false,
        state: false,
        zip: false,
        countryID: false,
      };
      component.ngDoCheck();
      expect(component.isValid).not.toHaveBeenCalled();
      expect(component.isInvalid).not.toHaveBeenCalled();
    });
  });
});
