// APP
import { TextBoxControl } from './TextBoxControl';

describe('Control: TextBoxControl', () => {
  let control;

  beforeEach(() => {
    control = new TextBoxControl({});
  });

  it('should have the right control type', () => {
    expect(control.controlType).toEqual('textbox');
  });

  describe('Method: setValidators(type)', () => {
    it('should be defined', () => {
      expect(control.setValidators).toBeDefined();
    });
    it('should add a validator if email', () => {
      control.setValidators('email');
      expect(control.validators.length).toBe(1);
    });
    it('should add a validator if number', () => {
      control.setValidators('number');
      expect(control.validators.length).toBe(1);
    });
    it('should add a validator if currency', () => {
      control.setValidators('currency');
      expect(control.validators.length).toBe(1);
    });
    it('should add a validator if percentage', () => {
      control.setValidators('percentage');
      expect(control.validators.length).toBe(1);
    });
    it('should add a validator if float', () => {
      control.setValidators('float');
      expect(control.validators.length).toBe(1);
    });
  });

  describe('Method: getTextboxType(type)', () => {
    it('should be defined', () => {
      expect(control.getTextboxType).toBeDefined();
    });
    it('should return number for percentage', () => {
      expect(control.getTextboxType('percentage')).toEqual('number');
    });
    it('should return number for currency', () => {
      expect(control.getTextboxType('currency')).toEqual('number');
    });
    it('should return number for float', () => {
      expect(control.getTextboxType('float')).toEqual('number');
    });
    it('should return the type for all else', () => {
      expect(control.getTextboxType('TEST')).toEqual('TEST');
    });
  });
});
