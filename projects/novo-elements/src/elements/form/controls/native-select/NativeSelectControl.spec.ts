// APP
import { NativeSelectControl } from './NativeSelectControl';

describe('Control: NativeSelectControl', () => {
  let control;

  beforeEach(() => {
    control = new NativeSelectControl({});
  });

  it('should have the right control type', () => {
    expect(control.controlType).toEqual('native-select');
  });

  it('should set the options', () => {
    expect(control.options.length).toBe(0);
  });

  it('should set the options if passed', () => {
    control = new NativeSelectControl({ options: ['ONE'] });
    expect(control.options.length).toBe(1);
  });
});
