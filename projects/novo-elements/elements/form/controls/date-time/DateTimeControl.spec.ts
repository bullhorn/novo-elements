// APP
import { DateTimeControl } from './DateTimeControl';

describe('Control: DateTimeControl', () => {
  let control;

  beforeEach(() => {
    control = new DateTimeControl({});
  });

  it('should have the right control type', () => {
    expect(control.controlType).toEqual('date-time');
  });

  it('should set the validators', () => {
    expect(control.validators.length).toBe(0);
  });
});
