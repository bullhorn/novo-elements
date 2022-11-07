import { TextAreaControl } from './text-area-control';
describe('Control: TextAreaControl', () => {
  let control;

  beforeEach(() => {
    control = new TextAreaControl({});
  });

  it('should have the right control type', () => {
    expect(control.controlType).toEqual('text-area');
  });
});
