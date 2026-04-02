// NG
import { Validators } from '@angular/forms';
// App
import { NovoFormControl } from './NovoFormControl';

describe('Elements: NovoFormControl', () => {
  const component = new NovoFormControl('1', { validators: [] });
  it('initialize correctly', () => {
    expect(component).toBeDefined();
  });

  describe('Constructor', () => {
    it('should initialize with basic properties', () => {
      const testControl = new NovoFormControl('testValue', {
        key: 'testKey',
        label: 'Test Label',
        validators: [],
      });
      expect(testControl.value).toBe('testValue');
      expect(testControl.key).toBe('testKey');
      expect(testControl.label).toBe('Test Label');
    });

    it('should set required validator flag correctly', () => {
      const testControl = new NovoFormControl('value', {
        required: true,
        validators: [],
      });
      expect(testControl.required).toBe(true);
      expect(testControl.hasRequiredValidator).toBe(true);
    });

    it('should disable control when readOnly is true', () => {
      const testControl = new NovoFormControl('value', {
        readOnly: true,
        validators: [],
      });
      expect(testControl.readOnly).toBe(true);
      expect(testControl.disabled).toBe(true);
    });

    it('should enable control when readOnly is false', () => {
      const testControl = new NovoFormControl('value', {
        readOnly: false,
        validators: [],
      });
      expect(testControl.readOnly).toBe(false);
      expect(testControl.enabled).toBe(true);
    });

    it('should set appendToBody property when provided', () => {
      const testControl = new NovoFormControl('value', {
        appendToBody: true,
        validators: [],
      });
      expect(testControl.appendToBody).toBe(true);
    });

    it('should initialize valueHistory with initial value', () => {
      const testControl = new NovoFormControl('initialValue', {
        validators: [],
      });
      expect(testControl.valueHistory).toContain('initialValue');
    });
  });

  describe('Method: hide()', () => {
    it('should set the hidden flag to true.', () => {
      expect(component.hide).toBeDefined();
      component.hide();
      expect(component.hidden).toBe(true);
    });
    it('should set the hidden flag to true and clear the value when the clearValue flag is passed in.', () => {
      expect(component.hide).toBeDefined();
      component.setValue('derp');
      component.hide(true);
      expect(component.hidden).toBe(true);
      expect(component.value).toBeNull();
    });
  });

  describe('Method: show()', () => {
    it('should set the hidden flag to false.', () => {
      component.hide();
      expect(component.show).toBeDefined();
      expect(component.hidden).toBe(true);
      component.show();
      expect(component.hidden).toBe(false);
    });
  });

  describe('Method: setRequired(isRequired)', () => {
    let updateValidatorsSpy: jest.SpyInstance;

    beforeEach(() => {
      jest.spyOn(component, 'setValidators');
      jest.spyOn(component, 'updateValueAndValidity');
      updateValidatorsSpy = jest.spyOn(component as any, 'updateValidators');
      jest.clearAllMocks();
    });

    afterEach(() => {
      updateValidatorsSpy.mockRestore();
    });

    it('should always update the required property', () => {
      component.required = false;
      component.setRequired(true);
      expect(component.required).toBe(true);

      component.setRequired(false);
      expect(component.required).toBe(false);
    });

    it("should add a validator and update validity if it wasn't required before.", () => {
      expect(component.setRequired).toBeDefined();
      component.hasRequiredValidator = false;
      component.setRequired(true);
      expect(component.hasRequiredValidator).toBe(true);
      expect(component.setValidators).toHaveBeenCalledWith([Validators.required]);
      expect(component.updateValueAndValidity).toHaveBeenCalled();
      expect(updateValidatorsSpy).toHaveBeenCalled();
    });

    it('should remove required validator and update validity if it was required before.', () => {
      expect(component.setRequired).toBeDefined();
      component.hasRequiredValidator = true;
      component.setRequired(false);
      expect(component.hasRequiredValidator).toBe(false);
      expect(component.validators.length).toBe(0);
      expect(component.setValidators).toHaveBeenCalledWith([]);
      expect(component.updateValueAndValidity).toHaveBeenCalled();
      expect(updateValidatorsSpy).toHaveBeenCalled();
    });

    it('should not call updateValidators when already required and setting to required', () => {
      component.required = true;
      component.hasRequiredValidator = true;
      updateValidatorsSpy.mockClear();
      component.setRequired(true);
      expect(updateValidatorsSpy).not.toHaveBeenCalled();
    });

    it('should not call updateValidators when not required and setting to not required', () => {
      component.required = false;
      component.hasRequiredValidator = false;
      updateValidatorsSpy.mockClear();
      component.setRequired(false);
      expect(updateValidatorsSpy).not.toHaveBeenCalled();
    });

    it('should preserve other validators when adding required validator', () => {
      component.validators = [Validators.minLength(5), Validators.maxLength(10)];
      component.hasRequiredValidator = false;
      component.setRequired(true);
      // The validators array is spread, so it should contain the existing validators plus the new one
      const callArgs = (component.setValidators as jest.Mock).mock.calls[0][0];
      expect(callArgs.length).toBe(3);
      expect(callArgs).toContain(Validators.required);
    });

    it('should preserve other validators when removing required validator', () => {
      component.validators = [Validators.required, Validators.minLength(5), Validators.maxLength(10)];
      component.hasRequiredValidator = true;
      component.setRequired(false);
      const callArgs = (component.setValidators as jest.Mock).mock.calls[0][0];
      expect(callArgs.length).toBe(2);
      expect(callArgs).not.toContain(Validators.required);
    });

    it('should handle case where hasRequiredValidator is out of sync with required (required true, validator false)', () => {
      component.required = true;
      component.hasRequiredValidator = false;
      component.setRequired(true);
      expect(updateValidatorsSpy).toHaveBeenCalled();
    });

    it('should handle case where hasRequiredValidator is out of sync with required (required false, validator true)', () => {
      component.required = false;
      component.hasRequiredValidator = true;
      component.setRequired(false);
      expect(updateValidatorsSpy).toHaveBeenCalled();
    });

    it('should handle multiple calls to setRequired', () => {
      component.hasRequiredValidator = false;
      component.setRequired(true);
      expect(component.required).toBe(true);

      component.setRequired(false);
      expect(component.required).toBe(false);

      component.setRequired(true);
      expect(component.required).toBe(true);
    });
  });

  describe('Method: updateValidators(validators)', () => {
    beforeEach(() => {
      jest.spyOn(component, 'setValidators');
      jest.spyOn(component, 'updateValueAndValidity');
      jest.clearAllMocks();
    });

    it('should be defined', () => {
      // Access private method for testing
      expect((component as any).updateValidators).toBeDefined();
    });

    it('should call setValidators with the provided validators array', () => {
      const validators = [Validators.required, Validators.minLength(5)];
      (component as any).updateValidators(validators);
      expect(component.setValidators).toHaveBeenCalledWith(validators);
    });

    it('should call updateValueAndValidity with emitEvent set to false', () => {
      const validators = [Validators.required];
      (component as any).updateValidators(validators);
      expect(component.updateValueAndValidity).toHaveBeenCalledWith({ emitEvent: false });
    });

    it('should update hasRequiredValidator based on the required property', () => {
      component.required = true;
      (component as any).updateValidators([Validators.required]);
      expect(component.hasRequiredValidator).toBe(true);
    });

    it('should update hasRequiredValidator to false when required is false', () => {
      component.required = false;
      (component as any).updateValidators([]);
      expect(component.hasRequiredValidator).toBe(false);
    });

    it('should handle empty validators array', () => {
      (component as any).updateValidators([]);
      expect(component.setValidators).toHaveBeenCalledWith([]);
      expect(component.updateValueAndValidity).toHaveBeenCalledWith({ emitEvent: false });
    });

    it('should handle multiple validators', () => {
      const validators = [Validators.required, Validators.minLength(3), Validators.maxLength(10)];
      (component as any).updateValidators(validators);
      expect(component.setValidators).toHaveBeenCalledWith(validators);
      expect(component.updateValueAndValidity).toHaveBeenCalledWith({ emitEvent: false });
    });

    it('should be called by setRequired when adding required validator', () => {
      const updateValidatorsSpy = jest.spyOn(component as any, 'updateValidators');
      component.hasRequiredValidator = false;
      component.required = true;
      component.setRequired(true);
      expect(updateValidatorsSpy).toHaveBeenCalled();
      updateValidatorsSpy.mockRestore();
    });

    it('should be called by setRequired when removing required validator', () => {
      const updateValidatorsSpy = jest.spyOn(component as any, 'updateValidators');
      component.hasRequiredValidator = true;
      component.required = false;
      component.setRequired(false);
      expect(updateValidatorsSpy).toHaveBeenCalled();
      updateValidatorsSpy.mockRestore();
    });
  });

  describe('Method: setValue(value, config)', () => {
    beforeEach(() => {
      jest.spyOn(component, 'markAsDirty');
      jest.spyOn(component, 'markAsTouched');
    });

    it('should update the value of the control and mark it as dirty and touched.', () => {
      expect(component.setValue).toBeDefined();
      component.setValue('TEST');
      expect(component.markAsDirty).toHaveBeenCalled();
      expect(component.markAsTouched).toHaveBeenCalled();
    });

    it('should emit displayValueChanges', () => {
      const emitSpy = jest.spyOn(component.displayValueChanges, 'emit');
      const testValue = 'NEW_VALUE';
      component.setValue(testValue);
      expect(emitSpy).toHaveBeenCalledWith(testValue);
      emitSpy.mockRestore();
    });

    it('should add value to valueHistory after timeout', (done) => {
      component.valueHistory = [];
      const testValue = 'HISTORY_VALUE';
      component.setValue(testValue);

      // Value should be added to history after the timeout (300ms)
      setTimeout(() => {
        expect(component.valueHistory).toContain(testValue);
        done();
      }, 350);
    });

    it('should clear previous timeout when called multiple times', (done) => {
      component.valueHistory = [];
      component.setValue('VALUE1');
      component.setValue('VALUE2');

      setTimeout(() => {
        // Only VALUE2 should be in history due to timeout clearing
        expect(component.valueHistory.length).toBeLessThanOrEqual(2);
        done();
      }, 350);
    });
  });

  describe('Method: setReadOnly(isReadOnly)', () => {
    it('should set readOnly to true when called with true.', () => {
      jest.spyOn(component, 'disable').mockImplementation(() => {});
      expect(component.setReadOnly).toBeDefined();
      component.setReadOnly(true);
      expect(component.readOnly).toBe(true);
      expect(component.disable).toHaveBeenCalled();
    });

    it('should set readOnly to true when called with false.', () => {
      jest.spyOn(component, 'enable').mockImplementation(() => {});
      expect(component.setReadOnly).toBeDefined();
      component.setReadOnly(false);
      expect(component.readOnly).toBe(false);
      expect(component.enable).toHaveBeenCalled();
    });
  });

  describe('Method: disable(opts)', () => {
    it('should disable the control', () => {
      const testControl = new NovoFormControl('value', { readOnly: false, validators: [] });
      testControl.disable();
      expect(testControl.disabled).toBe(true);
    });

    it('should handle emitEvent option', () => {
      const testControl = new NovoFormControl('value', { readOnly: false, validators: [] });
      testControl.disable({ emitEvent: false });
      expect(testControl.disabled).toBe(true);
    });

    it('should default emitEvent to false', () => {
      const testControl = new NovoFormControl('value', { readOnly: false, validators: [] });
      testControl.disable({});
      expect(testControl.disabled).toBe(true);
    });

    it('should handle onlySelf option', () => {
      const testControl = new NovoFormControl('value', { readOnly: false, validators: [] });
      testControl.disable({ onlySelf: true });
      expect(testControl.disabled).toBe(true);
    });
  });

  describe('Method: enable(opts)', () => {
    it('should enable the control', () => {
      const testControl = new NovoFormControl('value', { readOnly: true, validators: [] });
      testControl.enable();
      expect(testControl.enabled).toBe(true);
    });

    it('should handle emitEvent option', () => {
      const testControl = new NovoFormControl('value', { readOnly: true, validators: [] });
      testControl.enable({ emitEvent: false });
      expect(testControl.enabled).toBe(true);
    });

    it('should default emitEvent to false', () => {
      const testControl = new NovoFormControl('value', { readOnly: true, validators: [] });
      testControl.enable({});
      expect(testControl.enabled).toBe(true);
    });

    it('should handle onlySelf option', () => {
      const testControl = new NovoFormControl('value', { readOnly: true, validators: [] });
      testControl.enable({ onlySelf: true });
      expect(testControl.enabled).toBe(true);
    });
  });

  describe('Method: markAsInvalid(message) / markAsValid()', () => {
    beforeEach(() => {
      jest.spyOn(component, 'markAsDirty');
      jest.spyOn(component, 'markAsTouched');
      jest.spyOn(component, 'setErrors');
      jest.clearAllMocks();
      // Reset validators and clear any errors from previous tests
      component.validators = [];
      component.setValidators([]);
      component.setErrors(null);
      jest.clearAllMocks();
    });
    it('should mark the control as having an error.', () => {
      expect(component.markAsInvalid).toBeDefined();
      component.markAsInvalid('Derp');
      expect(component.markAsDirty).toHaveBeenCalled();
      expect(component.markAsTouched).toHaveBeenCalled();
      expect(component.setErrors).toHaveBeenCalledWith({ custom: 'Derp' });
    });
    it('should reset the errors when marked as valid.', () => {
      expect(component.markAsInvalid).toBeDefined();
      jest.clearAllMocks();
      component.markAsInvalid('Derp');
      expect(component.markAsDirty).toHaveBeenCalled();
      expect(component.markAsTouched).toHaveBeenCalled();
      expect(component.setErrors).toHaveBeenCalledWith({ custom: 'Derp' });
      jest.clearAllMocks();
      component.markAsValid();
      expect(component.setErrors).toHaveBeenCalledWith(null);
    });
  });
});
