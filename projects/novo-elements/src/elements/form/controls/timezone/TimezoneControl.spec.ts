// APP
import { TimezoneControl } from './TimezoneControl';

describe('Control: TimezoneControl', () => {
  let control;

  beforeEach(() => {
    control = new TimezoneControl({});
  });

  it('should have the right control type', () => {
    expect(control.controlType).toEqual('timezone');
  });

  it('should set the options', () => {
    expect(control.options.length).toBe(387);
  });

  it('should set the placeholder', () => {
    expect(control.placeholder).toEqual('');
  });

  it('should set the placeholder if passed', () => {
    control = new TimezoneControl({ placeholder: 'TEST' });
    expect(control.placeholder).toEqual('TEST');
  });
});
