// App
import { NovoFormGroup } from './NovoFormGroup';
import { NovoFormControl } from './NovoFormControl';

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
        (component.controls[key] as NovoFormControl).readOnly = true;
      }
      component.enableAllControls();
      for (let key in component.controls) {
        expect((component.controls[key] as NovoFormControl).readOnly).toEqual(false);
        expect((component.controls[key] as NovoFormControl).enable).toHaveBeenCalled();
      }
    });
    it('should enable all controls unless included in overrides', () => {
      component.controls = {
        firstName: new NovoFormControl('John', {}),
        lastName: new NovoFormControl('Doe', { readOnly: true }),
      };
      spyOn(component.controls.lastName, 'enable');
      (component.controls.lastName as NovoFormControl).readOnly = true;
      const overrides: string[] = ['lastName'];

      component.enableAllControls(overrides);
      expect((component.controls.lastName as NovoFormControl).readOnly).toEqual(true);
      expect(component.controls.lastName.enable).not.toHaveBeenCalled();
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
        (component.controls[key] as NovoFormControl).readOnly = false;
      }
      component.disableAllControls();
      for (let key in component.controls) {
        expect((component.controls[key] as NovoFormControl).readOnly).toEqual(true);
        expect((component.controls[key] as NovoFormControl).disable).toHaveBeenCalled();
      }
    });
  });
});
