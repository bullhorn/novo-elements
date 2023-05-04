// APP
import { RadioControl } from './RadioControl';

describe('Control: RadioControl', () => {
  let control;

  beforeEach(() => {
    control = new RadioControl({});
  });

  it('should have the right control type', () => {
    expect(control.controlType).toEqual('radio');
  });

  it('should set the options', () => {
    expect(control.options.length).toBe(0);
  });

  it('should set the options if passed', () => {
    control = new RadioControl({ options: ['ONE'] });
    expect(control.options.length).toBe(1);
  });
});
