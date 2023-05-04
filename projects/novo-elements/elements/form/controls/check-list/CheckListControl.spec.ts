// APP
import { CheckListControl } from './CheckListControl';

describe('Control: CheckListControl', () => {
  let control;

  beforeEach(() => {
    control = new CheckListControl({});
  });

  it('should have the right control type', () => {
    expect(control.controlType).toEqual('checklist');
  });

  it('should set the options', () => {
    expect(control.options.length).toBe(0);
  });

  it('should set the options if passed', () => {
    control = new CheckListControl({ options: ['ONE'] });
    expect(control.options.length).toBe(1);
  });
});
