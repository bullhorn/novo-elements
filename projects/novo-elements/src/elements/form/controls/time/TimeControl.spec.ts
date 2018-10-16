// APP
import { TimeControl } from './TimeControl';

describe('Control: TimeControl', () => {
  let control;

  beforeEach(() => {
    control = new TimeControl({});
  });

  it('should have the right control type', () => {
    expect(control.controlType).toEqual('time');
  });

  it('should set the validators', () => {
    expect(control.validators.length).toBe(0);
  });
});
