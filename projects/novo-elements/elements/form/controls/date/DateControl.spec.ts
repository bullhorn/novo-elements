// APP
import { DateControl } from './DateControl';

describe('Control: DateControl', () => {
  let control;

  beforeEach(() => {
    control = new DateControl({});
  });

  it('should have the right control type', () => {
    expect(control.controlType).toEqual('date');
  });

  it('should set the validators', () => {
    expect(control.validators.length).toBe(0);
  });
});
