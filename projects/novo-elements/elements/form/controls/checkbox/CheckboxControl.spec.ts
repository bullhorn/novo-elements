// APP
import { CheckboxControl } from './CheckboxControl';

describe('Control: CheckboxControl', () => {
  let control;

  beforeEach(() => {
    control = new CheckboxControl({});
  });

  it('should have the right control type', () => {
    expect(control.controlType).toEqual('checkbox');
  });

  it('should set the validators', () => {
    expect(control.validators.length).toBe(0);
  });
});
