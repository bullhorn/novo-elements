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
