// APP
import { AddressControl } from './AddressControl';

describe('Control: AddressControl', () => {
  let control;

  beforeEach(() => {
    control = new AddressControl({});
  });

  it('should have the right control type', () => {
    expect(control.controlType).toEqual('address');
  });

  it('should set the validators', () => {
    expect(control.validators.length).toBe(1);
  });
});
