// APP
import { PickerControl } from './PickerControl';

describe('Control: PickerControl', () => {
  let control;

  beforeEach(() => {
    control = new PickerControl({});
  });

  it('should have the right control type', () => {
    expect(control.controlType).toEqual('picker');
  });

  it('should set the options', () => {
    expect(control.options.length).toBe(0);
  });

  it('should set the options if passed', () => {
    control = new PickerControl({ options: ['ONE'] });
    expect(control.options.length).toBe(1);
  });
});
