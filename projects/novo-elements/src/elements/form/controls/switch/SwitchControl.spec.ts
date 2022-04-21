// APP
import { SwitchControl } from './SwitchControl';

describe('Control: SwitchControl', () => {
  let control;

  beforeEach(() => {
    control = new SwitchControl({});
  });

  it('should have the right control type', () => {
    expect(control.controlType).toEqual('switch');
  });

  it('should set the validators', () => {
    expect(control.validators.length).toBe(0);
  });
});
