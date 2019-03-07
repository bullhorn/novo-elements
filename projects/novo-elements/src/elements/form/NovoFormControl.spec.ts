// NG2
import { Validators } from '@angular/forms';

// App
import { NovoFormControl, NovoFormGroup } from './NovoFormControl';

describe('Elements: NovoFormGroup', () => {
  let component = new NovoFormGroup({});

  describe('Method: enableAllControls()', () => {
    it('should enable all controls', () => {
      component.controls = {
        firstName: new NovoFormControl('John', {}),
        lastName: new NovoFormControl('Doe', {}),
      };
      for (let key in component.controls) {
        spyOn(component.controls[key], 'enable');
      }
      component.enableAllControls();
      for (let key in component.controls) {
        expect((component.controls[key] as NovoFormControl).readOnly).toEqual(false);
        expect((component.controls[key] as NovoFormControl).enable).toHaveBeenCalled();
      }
    });
  });

  describe('Method: disableAllControls()', () => {
    it('should disable all controls', () => {
      component.controls = {
        firstName: new NovoFormControl('John', {}),
        lastName: new NovoFormControl('Doe', {}),
      };
      for (let key in component.controls) {
        spyOn(component.controls[key], 'disable');
      }
      component.disableAllControls();
      for (let key in component.controls) {
        expect((component.controls[key] as NovoFormControl).readOnly).toEqual(true);
        expect((component.controls[key] as NovoFormControl).disable).toHaveBeenCalled();
      }
    });
  });
});

describe('Elements: NovoFormControl', () => {
  let component = new NovoFormControl('1', { validators: [] });
  it('initialize correctly', () => {
    expect(component).toBeDefined();
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
    beforeEach(() => {
      jest.spyOn(component, 'setValidators');
      jest.spyOn(component, 'updateValueAndValidity');
    });
    it("should add new a validator and update the value and validity if it wasn't required before.", () => {
      expect(component.setRequired).toBeDefined();
      component.hasRequiredValidator = false;
      component.setRequired(true);
      expect(component.hasRequiredValidator).toBe(true);
      // TODO: this method never updates the local instance of the validators; potential bug
      // expect(component.validators.length).toBe(1);
      expect(component.setValidators).toHaveBeenCalledWith([Validators.required]);
      expect(component.updateValueAndValidity).toHaveBeenCalled();
    });
    it("should add new a validator and update the value and validity if it wasn't required before.", () => {
      expect(component.setRequired).toBeDefined();
      component.hasRequiredValidator = true;
      component.setRequired(false);
      expect(component.hasRequiredValidator).toBe(false);
      expect(component.validators.length).toBe(0);
      expect(component.setValidators).toHaveBeenCalledWith([]);
      expect(component.updateValueAndValidity).toHaveBeenCalled();
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

  describe('Method: markAsInvalid(message)', () => {
    beforeEach(() => {
      jest.spyOn(component, 'markAsDirty');
      jest.spyOn(component, 'markAsTouched');
      jest.spyOn(component, 'setErrors');
    });
    it('should mark the control as having an error.', () => {
      expect(component.markAsInvalid).toBeDefined();
      component.markAsInvalid('Derp');
      expect(component.markAsDirty).toHaveBeenCalled();
      expect(component.markAsTouched).toHaveBeenCalled();
      expect(component.setErrors).toHaveBeenCalledWith({ custom: 'Derp' });
    });
  });
});
