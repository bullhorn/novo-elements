// APP
import { FormValidators } from './FormValidators';

/**
 * Creates a mock address
 */
function createAddress(address1, city, state, zip, countryName) {
  return {
    address1: address1,
    city: city,
    state: state,
    zip: zip,
    countryName: countryName,
  };
}

describe('FormValidators', () => {
  describe('Method: maxInteger(control)', () => {
    it('should be defined', () => {
      expect(FormValidators.maxInteger).toBeDefined();
    });
    it('should return null if valid', () => {
      expect(FormValidators.maxInteger({ value: 123 })).toBe(null);
    });
    it('should return error if invalid', () => {
      expect(FormValidators.maxInteger({ value: 1234567891011123 })).toEqual({ integerTooLarge: true });
    });
  });

  describe('Method: maxDouble(control)', () => {
    it('should be defined', () => {
      expect(FormValidators.maxDouble).toBeDefined();
    });
    it('should return null if valid', () => {
      expect(FormValidators.maxDouble({ value: 123 })).toBe(null);
    });
    it('should return error if invalid', () => {
      expect(FormValidators.maxDouble({ value: 123456789101112323223 })).toEqual({ doubleTooLarge: true });
    });
  });

  describe('Method: isEmail(control)', () => {
    it('should be defined', () => {
      expect(FormValidators.isEmail).toBeDefined();
    });
    it('should return null if valid', () => {
      expect(FormValidators.isEmail({ value: 'test@test.com' })).toBe(null);
    });
    it('should return error if invalid', () => {
      expect(FormValidators.isEmail({ value: 'NOT_AN_EMAIL' })).toEqual({ invalidEmail: true });
    });
  });

  describe('Method: isValidAddress(control)', () => {
    let control: any;
    beforeEach(() => {
      control = {
        dirty: true,
        config: {
          address1: {
            label: 'address1',
            required: true,
            maxlength: 5,
          },
          countryID: {
            label: 'country',
            required: true,
            updated: true,
          },
          state: {
            required: false,
          },
        },
      };
    });
    it('should be defined', () => {
      expect(FormValidators.isValidAddress).toBeDefined();
    });
    it('should return null if no value', () => {
      expect(FormValidators.isValidAddress(control)).toBe(null);
    });
    it('should return null if valid', () => {
      control.value = createAddress('TEST', 'TEST', 'TEST', '12345', 'TEST');
      expect(FormValidators.isValidAddress(control)).toBe(null);
    });
    it('should return invalid if no address1', () => {
      control.value = createAddress('', 'TEST', 'TEST', '12345', 'TEST');
      expect(FormValidators.isValidAddress(control)).toEqual({
        invalidAddress: true,
        invalidAddressFields: ['address1'],
        invalidAddressForForm: true,
      });
    });
    it('should return invalid if no countryName', () => {
      control.value = createAddress('TEST', 'TEST', 'TEST', '12345', null);
      expect(FormValidators.isValidAddress(control)).toEqual({
        invalidAddress: true,
        invalidAddressFields: ['country'],
        invalidAddressForForm: true,
      });
    });
    it('should return null if no state', () => {
      control.value = createAddress('TEST', 'TEST', '', '12345', 'null');
      expect(FormValidators.isValidAddress(control)).toEqual(null);
    });
    it('should return invalid if a subfield length exceeds max length', () => {
      control.value = createAddress('TESTLENGTH', 'TEST', '', '12345', 'null');
      expect(FormValidators.isValidAddress(control)).toEqual({
        invalidAddressForForm: true,
        maxlength: true,
        maxlengthFields: ['address1'],
      });
    });
  });
});
