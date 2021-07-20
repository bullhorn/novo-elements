// App
import { NovoFormControl } from './NovoFormControl';
import { NovoFormGroup } from './NovoFormGroup';

describe('Elements: NovoFormGroup', () => {
  const component = new NovoFormGroup({});

  describe('Method: enableAllControls()', () => {
    it('should enable all controls', () => {
      component.controls = {
        firstName: new NovoFormControl('John', {}),
        lastName: new NovoFormControl('Doe', {}),
      };
      for (const key in component.controls) {
        jest.spyOn(component.controls[key], 'enable');
        (component.controls[key] as NovoFormControl).readOnly = true;
      }
      component.enableAllControls();
      for (const key in component.controls) {
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
      for (const key in component.controls) {
        jest.spyOn(component.controls[key], 'disable');
        (component.controls[key] as NovoFormControl).readOnly = false;
      }
      component.disableAllControls();
      for (const key in component.controls) {
        expect((component.controls[key] as NovoFormControl).readOnly).toEqual(true);
        expect((component.controls[key] as NovoFormControl).disable).toHaveBeenCalled();
      }
    });
  });
});
