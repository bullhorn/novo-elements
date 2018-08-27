// APP
import { TilesControl } from './TilesControl';

describe('Control: TilesControl', () => {
  let control;

  beforeEach(() => {
    control = new TilesControl({});
  });

  it('should have the right control type', () => {
    expect(control.controlType).toEqual('tiles');
  });

  it('should set the options', () => {
    expect(control.options.length).toBe(0);
  });

  it('should set the options if passed', () => {
    control = new TilesControl({ options: ['ONE'] });
    expect(control.options.length).toBe(1);
  });
});
