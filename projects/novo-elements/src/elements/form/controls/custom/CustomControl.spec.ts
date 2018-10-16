// APP
import { CustomControl } from './CustomControl';

describe('Control: CustomControl', () => {
  let control;

  beforeEach(() => {
    control = new CustomControl({ template: 'new', type: 'custom' });
  });

  it('should have the right control type', () => {
    expect(control.controlType).toEqual('new');
  });

  it('should set the placeholder', () => {
    expect(control.placeholder).toEqual('');
  });
});
